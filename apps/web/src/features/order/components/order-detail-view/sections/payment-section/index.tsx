import React from 'react';
import { useTranslation } from 'react-i18next';

import type { ReceiptInfo } from '@/models/order';

import type { PaymentInfoItem } from '../types';

export const PaymentSection = ({
    title,
    paymentInfoList,
    receiptInfos,
}: {
    title: string;
    paymentInfoList: PaymentInfoItem[];
    receiptInfos?: ReceiptInfo[];
}) => {
    const { t } = useTranslation();
    const otherReceipts =
        receiptInfos?.filter((r) => r.receiptType !== 'CASH_RECEIPT') || [];

    return (
        <section style={{ marginTop: '40px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #111',
                }}
            >
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                    {title}
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {otherReceipts.map((r, idx) => (
                        <button
                            key={idx}
                            type='button'
                            onClick={() =>
                                window.open(
                                    r.url,
                                    'receipt',
                                    'width=500,height=700',
                                )
                            }
                            style={{
                                padding: '4px 8px',
                                fontSize: '12px',
                                border: '1px solid #ccc',
                                background: '#fff',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {t('거래명세서 보기')}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                {paymentInfoList.map((info, idx) => (
                    <div
                        key={idx}
                        style={{
                            flex: '1 1 280px',
                            background: '#f8f8f8',
                            padding: '16px',
                            borderRadius: '8px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '20px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                            }}
                        >
                            <span>{info.totalPayTitle}</span>
                            <span>{info.totalPay}</span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            }}
                        >
                            {info.detailList.map((detail, dIdx) => (
                                <div
                                    key={dIdx}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: '14px',
                                        color: '#555',
                                    }}
                                >
                                    <span>{detail.title}</span>
                                    <span>{detail.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

