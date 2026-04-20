import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import * as styles from '@/components/time-sale/timer/index.css';

const formatRemainingTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
        .map((unit) => String(unit).padStart(2, '0'))
        .join(' : ');
};

const Timer = () => {
    const [remainingTime, setRemainingTime] = useState('00:00:00');

    useEffect(() => {
        const updateRemainingTime = () => {
            const now = dayjs();
            const midnight = now.add(1, 'day').startOf('day');
            const diffSeconds = Math.max(midnight.diff(now, 'second'), 0);

            setRemainingTime(formatRemainingTime(diffSeconds));
        };

        updateRemainingTime();

        const intervalId = window.setInterval(updateRemainingTime, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    return <div className={styles.timer}>{remainingTime}</div>;
};

export default Timer;
