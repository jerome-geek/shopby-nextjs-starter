import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { OrderOptionsItem } from '@/components/mypage/orders/order-options-item';
import * as orderStyles from '@/components/mypage/orders/order-options.css';
import { RETURN_WAY_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import useOrderDetail from '@/hooks/suspenseQuery/order/myOrder/useOrderDetail';
import useOrderConfiguration from '@/hooks/suspenseQuery/order/orderConfiguration/useOrderConfiguration';
import { useResponsive } from '@/hooks/utils';
import type {
    AdditionalPayInfo,
    CashReceiptInfo,
    ReceiptInfo,
    RefundInfo,
} from '@/models/order';
import { CURRENCY } from '@/utils/currency';

interface InfoSectionProps {
    title: string;
    infoList: { label: string; content: string | React.ReactNode }[];
}

const InfoSection = ({ title, infoList }: InfoSectionProps) => {
    return (
        <section style={{ marginTop: '40px' }}>
            <h3
                style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #111',
                }}
            >
                {title}
            </h3>
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

interface PaymentInfoDetail {
    title: string;
    content: string | number;
}

interface PaymentInfoItem {
    totalPayTitle: string;
    totalPay: string;
    detailList: PaymentInfoDetail[];
}

const PaymentSection = ({
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
                            padding: '24px',
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

const CashReceiptSection = ({
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

const AdditionalPaySection = (info: AdditionalPayInfo) => {
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

const ReturnSection = (info: RefundInfo | AdditionalPayInfo) => {
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

const ExchangeSection = (info: RefundInfo | AdditionalPayInfo) => {
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

const RefundSection = (info: RefundInfo) => {
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

const OrderDetail = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();

    const orderNo = String(router.query.orderNo ?? '');

    const { data: orderConfigurationData } = useOrderConfiguration();
    const { data: orderDetailData } = useOrderDetail({ orderNo });

    const orderOptionsGroupByPartner =
        orderDetailData?.orderOptionsGroupByPartner ?? [];

    const orderInfoList = useMemo(() => {
        return [
            {
                label: t('주문자 정보'),
                content: orderDetailData?.orderer?.ordererName ?? '',
            },
            {
                label: t('휴대폰 번호'),
                content: orderDetailData?.orderer?.ordererContact1 ?? '',
            },
            {
                label: t('전화번호'),
                content: orderDetailData?.orderer?.ordererContact2 ?? '',
            },
            {
                label: t('이메일'),
                content: orderDetailData?.orderer?.ordererEmail ?? '',
            },
            {
                label: t('주문 메모'),
                content: orderDetailData?.orderMemo ?? '',
            },
        ];
    }, [t, orderDetailData]);

    const deliveryInfoList = useMemo(() => {
        return [
            {
                label: t('배송자 정보'),
                content: orderDetailData?.shippingAddress?.receiverName ?? '',
            },
            {
                label: t('휴대폰 번호'),
                content:
                    orderDetailData?.shippingAddress?.receiverContact1 ?? '',
            },
            {
                label: t('전화번호'),
                content:
                    orderDetailData?.shippingAddress?.receiverContact2 ?? '',
            },
            {
                label: t('주소'),
                content: `${
                    orderDetailData?.shippingAddress?.receiverZipCd
                        ? `(${orderDetailData.shippingAddress.receiverZipCd}) `
                        : ''
                }${orderDetailData?.shippingAddress?.receiverAddress ?? ''} ${
                    orderDetailData?.shippingAddress?.receiverDetailAddress ??
                    ''
                }`,
            },
            {
                label: t('배송메모'),
                content: orderDetailData?.deliveryMemo ?? '',
            },
        ];
    }, [t, orderDetailData]);

    const paymentInfoList = useMemo(() => {
        const standardAmt = orderDetailData?.lastOrderAmount?.standardAmt ?? 0;
        const deliveryAmt = orderDetailData?.lastOrderAmount?.deliveryAmt ?? 0;
        const remoteDeliveryAmt =
            orderDetailData?.lastOrderAmount?.remoteDeliveryAmt ?? 0;

        const discountAmt =
            (orderDetailData?.lastOrderAmount?.additionalDiscountAmt ?? 0) +
            (orderDetailData?.lastOrderAmount?.immediateDiscountAmt ?? 0);

        const couponDiscountAmt =
            (orderDetailData?.lastOrderAmount?.cartCouponDiscountAmt ?? 0) +
            (orderDetailData?.lastOrderAmount?.productCouponDiscountAmt ?? 0);

        const subPayAmt = orderDetailData?.lastOrderAmount?.subPayAmt ?? 0;
        const payAmt = orderDetailData?.lastOrderAmount?.payAmt ?? 0;

        const payTypeLabel = orderDetailData?.payTypeLabel ?? '';

        const payType = orderDetailData?.payInfo?.payType;
        const isBank = (
            ['ACCOUNT', 'VIRTUAL_ACCOUNT', 'ESCROW_VIRTUAL_ACCOUNT'] as string[]
        ).includes(payType ?? '');

        const basePaymentInfo = [
            {
                totalPayTitle: t('주문금액'),
                totalPay: CURRENCY(standardAmt)
                    .add(deliveryAmt)
                    .add(remoteDeliveryAmt)
                    .format(),
                detailList: [
                    {
                        title: t('상품금액'),
                        content: CURRENCY(standardAmt).format(),
                    },
                    {
                        title: t('배송비'),
                        content:
                            deliveryAmt === 0
                                ? t('무료')
                                : CURRENCY(deliveryAmt).format(),
                    },
                    {
                        title: t('지역추가배송비'),
                        content:
                            remoteDeliveryAmt === 0
                                ? t('무료')
                                : CURRENCY(remoteDeliveryAmt).format(),
                    },
                ],
            },
            {
                totalPayTitle: t('할인금액'),
                totalPay: CURRENCY(discountAmt)
                    .add(couponDiscountAmt)
                    .add(subPayAmt)
                    .format(),
                detailList: [
                    {
                        title: t('상품할인'),
                        content: CURRENCY(discountAmt).format(),
                    },
                    {
                        title: t('쿠폰할인'),
                        content: CURRENCY(couponDiscountAmt).format(),
                    },
                    {
                        title: t('적립금 사용'),
                        content: CURRENCY(subPayAmt).format(),
                    },
                ],
            },
            {
                totalPayTitle: t('결제금액'),
                totalPay: CURRENCY(payAmt).subtract(subPayAmt).format(),
                detailList: isBank
                    ? [
                          {
                              title: t('결제수단'),
                              content: payTypeLabel,
                          },
                          {
                              title: t('입금은행'),
                              content:
                                  orderDetailData?.payInfo?.bankInfo
                                      ?.bankName ?? '',
                          },
                          {
                              title: t('입금계좌'),
                              content:
                                  orderDetailData?.payInfo?.bankInfo?.account ??
                                  '',
                          },
                          {
                              title: t('예금주명'),
                              content:
                                  orderDetailData?.payInfo?.bankInfo
                                      ?.depositorName ?? '',
                          },
                          {
                              title: t('입금금액'),
                              content: CURRENCY(
                                  orderDetailData?.payInfo?.bankInfo
                                      ?.depositAmt ??
                                      orderDetailData?.payInfo?.payAmt ??
                                      0,
                              ).format(),
                          },
                          {
                              title: t('입금자명'),
                              content:
                                  orderDetailData?.payInfo?.bankInfo
                                      ?.remitterName ?? '',
                          },
                          {
                              title: t('입금기한'),
                              content:
                                  orderDetailData?.payInfo?.bankInfo
                                      ?.paymentExpirationYmdt ?? '',
                          },
                      ]
                    : [
                          {
                              title: payTypeLabel,
                              content: '',
                          },
                      ],
            },
        ];

        return basePaymentInfo;
    }, [t, orderDetailData]);

    const handleBack = () => {
        void router.push(PATHS.MYPAGE.ORDERS.MAIN);
    };

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {t('주문상세')}
                        </h2>
                    </div>
                </div>

                <div className={card.list}>
                    {!isMobile && (
                        <div className={card.headerRow}>
                            <div className={card.headerCell}>
                                {t('주문번호 / 주문일자 / 상품정보')}
                            </div>
                            <div className={card.headerCell}>
                                {t('주문상태')}
                            </div>
                            <div className={card.headerCell}>{t('선택')}</div>
                        </div>
                    )}

                    <ul className={orderStyles.orderList}>
                        <li className={orderStyles.orderListItem}>
                            <div className={orderStyles.orderTitleContainer}>
                                <span
                                    className={orderStyles.orderNoLink}
                                    style={{ cursor: 'default' }}
                                >
                                    {orderDetailData.orderNo}
                                </span>
                                <span className={orderStyles.orderDate}>
                                    {dayjs(orderDetailData.orderYmdt).format(
                                        'YYYY.MM.DD',
                                    )}
                                </span>
                            </div>

                            <div>
                                {orderOptionsGroupByPartner.map((partner) => (
                                    <div
                                        key={partner.partnerNo}
                                        style={{
                                            marginTop: '20px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                padding: '12px 0',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                borderBottom: `1px solid #f0f0f0`,
                                            }}
                                        >
                                            {partner.partnerName}
                                        </div>
                                        {partner.orderOptionsGroupByDelivery.map(
                                            (delivery) => (
                                                <div
                                                    key={delivery.deliveryNo}
                                                    style={{
                                                        borderBottom:
                                                            '1px solid #f0f0f0',
                                                    }}
                                                >
                                                    <ul
                                                        className={
                                                            orderStyles.orderOptionList
                                                        }
                                                    >
                                                        {delivery.orderOptions.map(
                                                            (option) => (
                                                                <OrderOptionsItem
                                                                    key={
                                                                        option.orderOptionNo
                                                                    }
                                                                    {...option}
                                                                    inputs={
                                                                        option.inputs
                                                                    }
                                                                    orderNo={
                                                                        orderDetailData.orderNo
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </ul>
                                                    <div
                                                        style={{
                                                            padding: '12px',
                                                            background:
                                                                '#fcfcfc',
                                                            fontSize: '12px',
                                                            color: '#666',
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: '16px',
                                                        }}
                                                    >
                                                        {delivery.invoiceNo ? (
                                                            <>
                                                                <span>
                                                                    {
                                                                        delivery.deliveryCompanyTypeLabel
                                                                    }
                                                                </span>
                                                                <span>
                                                                    {t(
                                                                        '운송장 번호',
                                                                    )}
                                                                    :{' '}
                                                                    <strong>
                                                                        {
                                                                            delivery.invoiceNo
                                                                        }
                                                                    </strong>
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span>
                                                                {t(
                                                                    '배송 정보 준비중',
                                                                )}
                                                            </span>
                                                        )}
                                                        <span>
                                                            {t('배송비')}:{' '}
                                                            <strong>
                                                                {delivery.deliveryAmt >
                                                                0
                                                                    ? CURRENCY(
                                                                          delivery.deliveryAmt,
                                                                      ).format()
                                                                    : t('무료')}
                                                            </strong>
                                                        </span>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                ))}
                            </div>
                        </li>
                    </ul>

                    <InfoSection
                        title={t('주문자 정보')}
                        infoList={orderInfoList}
                    />
                    <InfoSection
                        title={t('배송지 정보')}
                        infoList={deliveryInfoList}
                    />
                    <PaymentSection
                        title={t('결제 정보')}
                        paymentInfoList={paymentInfoList}
                        receiptInfos={orderDetailData.receiptInfos}
                    />
                    {orderDetailData.cashReceiptInfo &&
                        orderConfigurationData?.cashReceipt && (
                            <CashReceiptSection
                                cashReceiptInfo={
                                    orderDetailData.cashReceiptInfo
                                }
                                receiptInfos={orderDetailData.receiptInfos}
                            />
                        )}
                    {orderDetailData.additionalPayInfos?.map((info) => (
                        <Fragment key={`additional-${info.claimNo}`}>
                            <AdditionalPaySection {...info} />
                            <ReturnSection {...info} />
                            <ExchangeSection {...info} />
                        </Fragment>
                    ))}
                    {orderDetailData.refundInfos?.map((info) => (
                        <Fragment key={`refund-${info.claimNo}`}>
                            {info.refundType !== 'ZERO_REFUND' && (
                                <RefundSection {...info} />
                            )}
                            <ReturnSection {...info} />
                            <ExchangeSection {...info} />
                        </Fragment>
                    ))}
                </div>
            </section>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: isMobile ? '16px' : '40px 0',
                }}
            >
                <button
                    type='button'
                    onClick={handleBack}
                    style={{
                        padding: '12px 60px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                    }}
                >
                    {t('돌아가기')}
                </button>
            </div>
        </div>
    );
};

OrderDetail.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default OrderDetail;
