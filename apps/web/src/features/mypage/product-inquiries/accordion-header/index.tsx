import { clsx } from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { LockIcon } from '@/shared/ui/icons';
import * as styles from '@/features/mypage/product-inquiries/accordion-header/index.css';
import { PATHS } from '@/const/paths';
import { vars } from '@/styles/theme.css';

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
                            <LockIcon
                                width={15}
                                height={16}
                                currentColor={vars.color.black}
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
                        <LockIcon
                            width={15}
                            height={16}
                            currentColor={vars.color.black}
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
