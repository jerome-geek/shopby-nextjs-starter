import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CashReceiptInfo, ReceiptInfo } from '@/entities/order/model';

export const CashReceiptSection = ({
    cashReceiptInfo,
    receiptInfos,
}: {
    cashReceiptInfo: CashReceiptInfo;
    receiptInfos?: ReceiptInfo[];
}) => {
    const { t } = useTranslation();
    if (!cashReceiptInfo) return null;

    const infoList = [
        {
            label: t('발급상태'),
            content:
                cashReceiptInfo.cashReceiptIssueType === 'COMPLETE'
                    ? t('발급완료')
                    : t('신청중'),
        },
        {
            label: t('발급용도'),
            content:
                cashReceiptInfo.cashReceiptIssuePurposeType ===
                'INCOME_TAX_DEDUCTION'
                    ? t('소득공제용')
                    : t('지출증빙용'),
        },
        { label: t('인증번호'), content: cashReceiptInfo.cashReceiptKey },
        ...(cashReceiptInfo.issueYmdt
            ? [{ label: t('발급일시'), content: cashReceiptInfo.issueYmdt }]
            : []),
        ...(cashReceiptInfo.cashReceiptAuthNo
            ? [
                  {
                      label: t('승인번호'),
                      content: cashReceiptInfo.cashReceiptAuthNo,
                  },
              ]
            : []),
    ];

    const cashReceiptUrls =
        receiptInfos?.filter((r) => r.receiptType === 'CASH_RECEIPT') || [];

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
                    {t('현금영수증 정보')}
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {cashReceiptUrls.map((r, idx) => (
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
                            {t('현금영수증 보기')}
                        </button>
                    ))}
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    padding: '0 8px',
                }}
            >
                {infoList.map((info, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            fontSize: '14px',
                            lineHeight: '20px',
                        }}
                    >
                        <div
                            style={{
                                width: '140px',
                                color: '#666',
                                flexShrink: 0,
                            }}
                        >
                            {info.label}
                        </div>
                        <div
                            style={{
                                color: '#111',
                                flex: 1,
                                wordBreak: 'break-all',
                            }}
                        >
                            {info.content || '-'}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

