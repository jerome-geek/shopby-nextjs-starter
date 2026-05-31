import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { ClockIcon } from '@/shared/ui/icons/ClockIcon';
import * as styles from '@/features/product/components/additional-discount/index.css';
import { AdditionalDiscountWithProductNo } from '@/entities/product/model/additionalDiscount';

interface ProductAdditionalDiscountProps {
    type: 'thumbnail' | 'detail' | 'detail-mobile';
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
        const seconds = end.diff(now, 'second') % 60;

        if (type === 'thumbnail') {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }

        // HH:mm:ss format for details
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0',
        )}:${String(seconds).padStart(2, '0')} 남음`;
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
                <ClockIcon />
                <span
                    className={styles.detailTimeText}
                >{`타임특가 ${timeLeft}`}</span>
            </div>
        );
    }

    if (type === 'detail-mobile') {
        return (
            <div className={styles.detailMobileContainer}>
                <ClockIcon />
                <span
                    className={styles.detailTimeText}
                >{`타임특가 ${timeLeft}`}</span>
            </div>
        );
    }
};
