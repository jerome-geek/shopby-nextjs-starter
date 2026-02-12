import { useCallback, useEffect, useRef, useState } from 'react';

export const useTimer = () => {
    const [remainTime, setRemainTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = useCallback((initialTime: number = 0) => {
        setRemainTime(initialTime);
        setIsActive(true);
    }, []);

    const stopTimer = useCallback(() => {
        setIsActive(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, []);

    const resetTimer = useCallback((initialTime: number = 0) => {
        setRemainTime(initialTime);
        setIsActive(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, []);

    useEffect(() => {
        if (isActive && remainTime > 0) {
            timerRef.current = setInterval(() => {
                setRemainTime((prev) => prev - 1);
            }, 1000);
        } else if (remainTime === 0) {
            setIsActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, remainTime]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return {
        remainTime,
        isActive,
        startTimer,
        stopTimer,
        resetTimer,
        formattedTime: formatTime(remainTime),
    };
};
