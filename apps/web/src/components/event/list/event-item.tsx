import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import { useResponsive } from '@/hooks/utils';
import type { EventContent } from '@/models/display';
import { normalizeImageUrl } from '@/utils/shopby';

import * as styles from '@/components/event/list/event-item.css';

const EventItem = ({
    eventNo,
    id,
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

    const getDateText = () => {
        if (eventYn === 'Y') {
            return (
                dayjs(startYmdt).format('YY.MM.DD') ||
                t('이벤트 기간: 별도 명시 없음')
            );
        }

        if (displayPeriodType === 'REGULAR') {
            return t('상시 진행');
        }

        return `${dayjs(startYmdt).format('YY.MM.DD')}-${dayjs(endYmdt).format(
            'YY.MM.DD',
        )}`;
    };

    const imageUrl = normalizeImageUrl(isMobile ? mobileimageUrl : pcImageUrl);

    return (
        <Link href={detailPath} className={styles.wrapper}>
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
                <span className={styles.date}>{getDateText()}</span>
            </div>
        </Link>
    );
};

export default EventItem;
