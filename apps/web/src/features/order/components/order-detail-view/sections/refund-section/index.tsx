import React from 'react';
import { useTranslation } from 'react-i18next';

import type { RefundInfo } from '@/entities/order/model';
import { CURRENCY } from '@/utils/currency';

import { InfoSection } from '../info-section';

export const RefundSection = (info: RefundInfo) => {
    const { t } = useTranslation();
    const infoList = [
        {
            label: t('환불 상품'),
            content: (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                >
                    {info.refundOrderOptions?.map((option, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                            }}
                        >
                            {option.imageUrl && (
                                <img
                                    src={option.imageUrl}
                                    alt={option.productName ?? ''}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <div>
                                <div style={{ fontSize: '13px' }}>
                                    {option.productName}
                                </div>
                                <div
                                    style={{ fontSize: '11px', color: '#666' }}
                                >
                                    {option.optionName}: {option.optionValue}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            label: t('환불 상품 금액'),
            content: CURRENCY(info.productAmtInfo.totalAmt || 0).format(),
        },
        {
            label: t('환불 배송비'),
            content: CURRENCY(info.deliveryAmtInfo.totalAmt || 0).format(),
        },
        {
            label: t('환불 차감 금액'),
            content: CURRENCY(info.subtractionAmtInfo.totalAmt || 0).format(),
        },
        {
            label: t('환불 적립금'),
            content: CURRENCY(info.refundSubPayAmt || 0).format(),
        },
        {
            label: t('환불 금액'),
            content: CURRENCY(info.refundPayAmt || 0).format(),
        },
        {
            label: t('환불 수단'),
            content: info.refundTypeLabel,
        },
        ...(info.refundBankAccount?.bankAccount
            ? [
                  {
                      label: t('환불 계좌'),
                      content: `${info.refundBankAccount.bankName} / ${info.refundBankAccount.bankAccount} / ${info.refundBankAccount.bankDepositorName}`,
                  },
              ]
            : []),
    ];

    return <InfoSection title={t('환불 정보')} infoList={infoList} />;
};
