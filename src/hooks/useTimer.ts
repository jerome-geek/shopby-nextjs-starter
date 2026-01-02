import { useCallback, useEffect, useState } from 'react';

interface UseTimerReturn {
    remainTime: number;
    formattedTime: string;
    startTimer: (seconds: number) => void;
    stopTimer: () => void;
}

const formatTime = (seconds: number) => {
    if (seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const useTimer = (): UseTimerReturn => {
    const [remainTime, setRemainTime] = useState(0);
    const [endTime, setEndTime] = useState<number | null>(null);

    const startTimer = useCallback((seconds: number) => {
        setEndTime(Date.now() + seconds * 1000);
        setRemainTime(seconds);
    }, []);

    const stopTimer = useCallback(() => {
        setEndTime(null);
        setRemainTime(0);
    }, []);

    useEffect(() => {
        if (!endTime) return;

        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const difference = Math.ceil((endTime - currentTime) / 1000);

            if (difference <= 0) {
                setRemainTime(0);
                setEndTime(null);
                clearInterval(intervalId);
            } else {
                setRemainTime(difference);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [endTime]);

    return {
        remainTime,
        formattedTime: formatTime(remainTime),
        startTimer,
        stopTimer,
    };
};
