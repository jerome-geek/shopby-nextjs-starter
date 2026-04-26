import dayjs from 'dayjs';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

import * as styles from '@/components/product/additional-discount/index.css';
import { AdditionalDiscountWithProductNo } from '@/models/product/additionalDiscount';

interface ProductAdditionalDiscountProps {
    type: 'thumbnail' | 'detail';
    isTimeSaleEnabled?: boolean;
    additionalDiscount: AdditionalDiscountWithProductNo;
}

export const ProductAdditionalDiscount = ({
    type,
    additionalDiscount,
}: ProductAdditionalDiscountProps) => {
    const endDateTime = additionalDiscount?.endDateTime;

    const calculateTimeLeft = (targetDate?: string) => {
        if (!targetDate) return '';

        const end = dayjs(targetDate);
        const now = dayjs();
        if (end.diff(now) <= 0) {
            return '';
        }

        const days = end.diff(now, 'day');
        if (days >= 1) {
            return `${days}일 남음`;
        }

        const hours = end.diff(now, 'hour');
        const minutes = end.diff(now, 'minute') % 60;

        // HH:mm format
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0',
        )}`;
    };

    const [timeLeft, setTimeLeft] = useState(() =>
        calculateTimeLeft(endDateTime),
    );

    useEffect(() => {
        if (!endDateTime) return;

        const timerId = setInterval(() => {
            const time = calculateTimeLeft(endDateTime);
            setTimeLeft(time);
            if (!time) {
                clearInterval(timerId);
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [endDateTime]);

    if (!timeLeft) {
        return null;
    }

    if (type === 'thumbnail') {
        return (
            <div className={styles.container}>
                <span className={styles.timeText}>{timeLeft}</span>
            </div>
        );
    }

    if (type === 'detail') {
        return (
            <div className={styles.detailContainer}>
                <Clock size={20} />
                <span
                    className={styles.detailTimeText}
                >{`타임특가 ${timeLeft}`}</span>
            </div>
        );
    }
};
