import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import { useResponsive } from '@/hooks/utils';
import type { EventContent } from '@/models/display';
import { normalizeImageUrl } from '@/shared/utils/shopby';

import * as styles from '@/features/event/list/components/event-item/index.css';

const EventItem = ({
    eventNo,
    id,
    url,
    pcImageUrl,
    mobileimageUrl,
    label,
    promotionText,
    startYmdt,
    endYmdt,
    eventYn,
    displayPeriodType,
}: EventContent) => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const detailPath = PATHS.EVENTS.DETAIL.replace(
        '[eventNoOrId]',
        id || eventNo.toString(),
    );
    const customUrl = url?.trim() ?? '';
    const hasCustomUrl = customUrl.length > 0;
    const isExternalUrl = customUrl.startsWith('https');
    const linkPath = hasCustomUrl
        ? isExternalUrl
            ? customUrl
            : `/${customUrl.replace(/^\/+/, '')}`
        : detailPath;

    const imageUrl = normalizeImageUrl(isMobile ? mobileimageUrl : pcImageUrl);
    const dateText =
        eventYn === 'Y'
            ? dayjs(startYmdt).format('YY.MM.DD') ||
              t('이벤트 기간: 별도 명시 없음')
            : displayPeriodType === 'REGULAR'
              ? t('상시 진행')
              : `${dayjs(startYmdt).format('YY.MM.DD')}-${dayjs(endYmdt).format(
                    'YY.MM.DD',
                )}`;

    const content = (
        <>
            <div className={styles.thumbnail}>
                {imageUrl && (
                    <img src={imageUrl} alt={label} className={styles.image} />
                )}
            </div>
            <div className={styles.infoBox}>
                <div className={styles.info}>
                    <h2
                        className={styles.label}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                    {!isEmpty(promotionText) && (
                        <p
                            className={styles.promotionText}
                            dangerouslySetInnerHTML={{ __html: promotionText }}
                        />
                    )}
                </div>
                <span className={styles.date}>{dateText}</span>
            </div>
        </>
    );

    if (isExternalUrl) {
        return (
            <a
                href={linkPath}
                className={styles.wrapper}
                target='_blank'
                rel='noopener noreferrer'
            >
                {content}
            </a>
        );
    }

    return (
        <Link href={linkPath} className={styles.wrapper}>
            {content}
        </Link>
    );
};

export default EventItem;
