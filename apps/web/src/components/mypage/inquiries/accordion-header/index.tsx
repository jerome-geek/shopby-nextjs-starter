import dayjs from 'dayjs';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import type { InquiryAnswer } from '@/models/manage';
import * as styles from '@/components/mypage/inquiries/accordion-header/index.css';

type AnswerSummary = Nullable<Omit<InquiryAnswer, 'files'>>;

interface InquiryHeaderProps {
    answer: AnswerSummary;
    inquiryTitle: string;
    registerYmdt: string;
    inquiryTypeName?: string;
    variant?: 'mobile' | 'desktop';
    className?: string;
}

export const InquiryHeader = ({
    answer,
    inquiryTitle,
    registerYmdt,
    inquiryTypeName,
    variant = 'mobile',
    className,
}: InquiryHeaderProps) => {
    const { t } = useTranslation();
    const isAnswered = Boolean(answer);

    if (variant === 'desktop') {
        return (
            <div className={clsx(styles.desktopContainer, className)}>
                <div className={styles.desktopCell}>
                    <span
                        className={clsx(
                            styles.statusBadge,
                            isAnswered
                                ? styles.statusBadgeActive
                                : styles.statusBadgeInactive,
                        )}
                    >
                        {t(isAnswered ? '답변 완료' : '답변 대기중')}
                    </span>
                </div>
                <div className={styles.desktopCell}>
                    {inquiryTypeName ? (
                        <span className={styles.typeBadge}>
                            {inquiryTypeName}
                        </span>
                    ) : null}
                </div>
                <div className={styles.desktopCell}>
                    <span
                        className={styles.desktopTitleEllipsis}
                        title={inquiryTitle}
                    >
                        {inquiryTitle}
                    </span>
                </div>
                <div className={styles.desktopCell}>
                    <span className={styles.date}>
                        {dayjs(registerYmdt).format('YYYY-MM-DD')}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.inner}>
                <div className={styles.badgeRow}>
                    <span
                        className={clsx(
                            styles.statusBadge,
                            isAnswered
                                ? styles.statusBadgeActive
                                : styles.statusBadgeInactive,
                        )}
                    >
                        {t(isAnswered ? '답변 완료' : '답변 대기중')}
                    </span>

                    {inquiryTypeName ? (
                        <span className={styles.typeBadge}>
                            {inquiryTypeName}
                        </span>
                    ) : null}
                </div>

                <span className={styles.date}>
                    {dayjs(registerYmdt).format('YYYY-MM-DD')}
                </span>
            </div>

            <p className={styles.title}>{inquiryTitle}</p>
        </div>
    );
};
