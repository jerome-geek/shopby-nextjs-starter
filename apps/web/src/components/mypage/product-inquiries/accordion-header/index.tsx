import dayjs from 'dayjs';
import { clsx } from 'clsx';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';

import * as styles from './index.css';

interface ProductInquiryHeaderProps {
    replied: boolean;
    inquiryTitle: string;
    registerYmdt: string;
    inquiryTypeName?: string;
    secreted: boolean;
    productName: string;
    imageUrl?: string;
    productNo: number;
    variant?: 'mobile' | 'desktop';
    className?: string;
}

export const ProductInquiryHeader = ({
    replied,
    inquiryTitle,
    registerYmdt,
    inquiryTypeName,
    secreted,
    productName,
    imageUrl,
    productNo,
    variant = 'mobile',
    className,
}: ProductInquiryHeaderProps) => {
    const { t } = useTranslation();

    const productHref = PATHS.PRODUCTS.DETAIL.replace(
        '[productNo]',
        String(productNo),
    );

    if (variant === 'desktop') {
        return (
            <div className={clsx(styles.desktopContainer, className)}>
                <div className={styles.desktopCell}>
                    <span
                        className={clsx(
                            styles.statusBadge,
                            replied
                                ? styles.statusBadgeActive
                                : styles.statusBadgeInactive,
                        )}
                    >
                        {t(replied ? '답변 완료' : '답변 대기중')}
                    </span>
                </div>
                <div className={styles.desktopCell}>
                    <span className={styles.badgeRow}>
                        {inquiryTypeName ? (
                            <span className={styles.typeBadge}>
                                {inquiryTypeName}
                            </span>
                        ) : null}
                        {secreted ? (
                            <Lock
                                size={14}
                                strokeWidth={2}
                                className={styles.lockIcon}
                                aria-label={t('비밀글')}
                            />
                        ) : null}
                    </span>
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
                    <div className={styles.desktopProductRow}>
                        {imageUrl ? (
                            <Link
                                href={productHref}
                                className={styles.productThumbLink}
                            >
                                <img
                                    src={imageUrl}
                                    alt=''
                                    className={styles.productThumbImg}
                                />
                            </Link>
                        ) : null}
                        <Link href={productHref} className={styles.productName}>
                            {productName}
                        </Link>
                    </div>
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
            <div className={styles.topRow}>
                <div className={styles.badgeRow}>
                    <span
                        className={clsx(
                            styles.statusBadge,
                            replied
                                ? styles.statusBadgeActive
                                : styles.statusBadgeInactive,
                        )}
                    >
                        {t(replied ? '답변 완료' : '답변 대기중')}
                    </span>

                    {inquiryTypeName ? (
                        <span className={styles.typeBadge}>
                            {inquiryTypeName}
                        </span>
                    ) : null}

                    {secreted ? (
                        <Lock
                            size={14}
                            strokeWidth={2}
                            className={styles.lockIcon}
                            aria-label={t('비밀글')}
                        />
                    ) : null}
                </div>

                <span className={styles.date}>
                    {dayjs(registerYmdt).format('YYYY-MM-DD')}
                </span>
            </div>

            <p className={styles.title}>{inquiryTitle}</p>

            <div className={styles.productRow}>
                {imageUrl ? (
                    <Link
                        href={productHref}
                        className={styles.productThumbLink}
                    >
                        <img
                            src={imageUrl}
                            alt=''
                            className={styles.productThumbImg}
                        />
                    </Link>
                ) : null}
                <span className={styles.productName} title={productName}>
                    {productName}
                </span>
            </div>
        </div>
    );
};
