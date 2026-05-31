import React from 'react';
import { useTranslation } from 'react-i18next';

import type { AdditionalPayInfo, RefundInfo } from '@/entities/order/model';

import { InfoSection } from '../info-section';

export const ExchangeSection = (info: RefundInfo | AdditionalPayInfo) => {
    const { t } = useTranslation();
    if (!info.exchangeAddress) return null;

    const infoList = [
        {
            label: t('교환 출고 상품'),
            content: (
                <div
                    style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                    }}
                >
                    {info.exchangeOrderOption?.imageUrl && (
                        <img
                            src={info.exchangeOrderOption.imageUrl}
                            alt={info.exchangeOrderOption.productName ?? ''}
                            style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                            }}
                        />
                    )}
                    <div>
                        <div style={{ fontWeight: '500' }}>
                            {info.exchangeOrderOption?.productName}
                        </div>
                        <div
                            style={{
                                fontSize: '12px',
                                color: '#666',
                                marginTop: '4px',
                            }}
                        >
                            {info.exchangeOrderOption?.optionName}:{' '}
                            {info.exchangeOrderOption?.optionValue}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            label: t('수령자명'),
            content: info.exchangeAddress.name,
        },
        {
            label: t('배송지 주소'),
            content: `[${info.exchangeAddress.zipCd}] ${info.exchangeAddress.address} ${info.exchangeAddress.detailAddress}`,
        },
        {
            label: t('휴대폰 번호'),
            content: info.exchangeAddress.contact1,
        },
        ...(info.exchangeAddress.contact2
            ? [{ label: t('전화번호'), content: info.exchangeAddress.contact2 }]
            : []),
        {
            label: t('배송 메시지'),
            content: info.exchangeAddress.note || '-',
        },
    ];

    return <InfoSection title={t('교환 출고 정보')} infoList={infoList} />;
};
