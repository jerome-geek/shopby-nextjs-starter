import React from 'react';
import { useTranslation } from 'react-i18next';

import { RETURN_WAY_MAP } from '@/const/label';
import type { AdditionalPayInfo, RefundInfo } from '@/entities/order/model';

import { InfoSection } from '../info-section';

export const ReturnSection = (info: RefundInfo | AdditionalPayInfo) => {
    const { t } = useTranslation();
    if (!info.returnAddress) return null;

    const infoList = [
        {
            label: t('반품 수거 방법'),
            content: (RETURN_WAY_MAP as Record<string, string>)[
                info.returnWayType ?? 'SELLER_COLLECT'
            ],
        },
        {
            label: t('반품자명'),
            content: info.returnAddress.name,
        },
        {
            label: t('수거지 주소'),
            content: `[${info.returnAddress.zipCd}] ${info.returnAddress.address} ${info.returnAddress.detailAddress}`,
        },
        {
            label: t('휴대폰 번호'),
            content: info.returnAddress.contact1,
        },
        ...(info.returnAddress.contact2
            ? [{ label: t('전화번호'), content: info.returnAddress.contact2 }]
            : []),
        {
            label: t('수거 시 참고사항'),
            content: info.returnAddress.note || '-',
        },
    ];

    return <InfoSection title={t('반품 수거 정보')} infoList={infoList} />;
};
