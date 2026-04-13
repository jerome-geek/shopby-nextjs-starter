'use client';

import { memo, useEffect, useState } from 'react';
import * as styles from '@/components/product/countdown-timer/index.css';

const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};

const formatNumber = (n: number) => n.toString().padStart(2, '0');

/**
 * 24:00:00 자정까지 남은 시간을 표시하는 타이머 컴포넌트입니다.
 * 부모 컴포넌트의 리렌더링에 영향을 주지 않기 위해 메모이제이션 처리되었습니다.
 */
const CountdownTimer = memo(() => {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const initTimerId = setTimeout(() => {
            setMounted(true);
            setTimeLeft(calculateTimeLeft());
        }, 0);

        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearTimeout(initTimerId);
            clearInterval(intervalId);
        };
    }, []);

    if (!mounted) {
        return <div className={styles.timer}>-- : -- : --</div>;
    }

    const { hours, minutes, seconds } = timeLeft;

    return (
        <div className={styles.timer}>
            {`${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)}`}
        </div>
    );
});

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer;
