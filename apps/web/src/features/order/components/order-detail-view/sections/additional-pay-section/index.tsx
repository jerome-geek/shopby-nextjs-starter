import React from 'react';
import { useTranslation } from 'react-i18next';

import type { AdditionalPayInfo } from '@/entities/order/model';
import { CURRENCY } from '@/utils/currency';

import { InfoSection } from '../info-section';

export const AdditionalPaySection = (info: AdditionalPayInfo) => {
    const { t } = useTranslation();
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
            label: t('교환 상품 금액'),
            content: CURRENCY(info.productAmtInfo.totalAmt).format(),
        },
        {
            label: t('반품/교환 배송비'),
            content: CURRENCY(info.deliveryAmtInfo.totalAmt).format(),
        },
        {
            label: t('차감 금액'),
            content: CURRENCY(info.subtractionAmtInfo.totalAmt).format(),
        },
        ...(info.subtractionAmtInfo.totalAmt > 0
            ? [
                  {
                      label: t('환불금액조정 사유'),
                      content: info.subtractionAmtInfo.refundAdjustReason ?? '',
                  },
              ]
            : []),
        {
            label: t('추가 결제 금액'),
            content: CURRENCY(info.exchangePayAmt).format(),
        },
        {
            label: t('결제 수단'),
            content: info.payTypeLabel ?? '',
        },
        ...(info.bankAccount?.bankAccount
            ? [
                  {
                      label: t('입금 계좌'),
                      content: `${info.bankAccount.bankName} / ${info.bankAccount.bankAccount} / ${info.bankAccount.bankDepositorName}`,
                  },
              ]
            : []),
    ];

    return <InfoSection title={t('추가 결제 정보')} infoList={infoList} />;
};
