import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderOptionsItem } from '@/components/mypage/orders/order-options-item';
import { Button } from '@/components/ui';
import ButtonV2 from '@/components/ui/button/v2';
import { useCustomDialog } from '@/features/dialog/hooks/useCustomDialog';
import {
    AdditionalPaySection,
    CashReceiptSection,
    ExchangeSection,
    InfoSection,
    PaymentSection,
    RefundSection,
    ReturnSection,
} from '@/features/order/components/order-detail-view/sections';
import { useProfile } from '@/hooks/query/member/profile';
import { useResponsive } from '@/hooks/utils';
import type { OrderDetailResponse } from '@/models/order';
import type { GetOrderConfigsResponse } from '@/models/order/orderConfiguration';
import { CURRENCY } from '@/utils/currency';

import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import * as orderStyles from '@/components/mypage/orders/order-options.css';
import * as styles from '@/features/order/components/order-detail-view/index.css';
import { includes } from '@fxts/core';

interface OrderDetailViewProps {
    orderDetailData: OrderDetailResponse;
    orderConfigurationData?: GetOrderConfigsResponse;
    backPath: string;
}

export const OrderDetailView = ({
    orderDetailData,
    orderConfigurationData,
    backPath,
}: OrderDetailViewProps) => {
    console.log('🚀 ~ OrderDetailView ~ orderDetailData:', orderDetailData);
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { openShippingAddressChangeDialog } = useCustomDialog();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const handleShippingAddressChange = () => {
        openShippingAddressChangeDialog({
            orderNo: orderDetailData.orderNo,
            memberNo,
        });
    };

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
                label: t('개인통관고유부호'),
                content:
                    orderDetailData?.shippingAddress?.customsIdNumber ?? '',
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

        return [
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
    }, [t, orderDetailData]);

    const handleBack = () => {
        router.push(backPath);
    };

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div
                    className={card.list}
                    style={{
                        marginTop: 0,
                    }}
                >
                    <div className={styles.container}>
                        <div className={styles.orderTitleContainer}>
                            <span
                                className={styles.orderNo}
                                style={{ cursor: 'default' }}
                            >
                                {orderDetailData.orderNo}
                            </span>
                            <span className={styles.orderDate}>
                                {dayjs(orderDetailData.orderYmdt).format(
                                    'YYYY.MM.DD',
                                )}
                            </span>
                        </div>

                        <div>
                            {orderOptionsGroupByPartner.map((partner) => (
                                <div key={partner.partnerNo}>
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
                                                        background: '#fcfcfc',
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
                    </div>

                    <InfoSection
                        title={t('주문자 정보')}
                        infoList={orderInfoList}
                    />
                    <InfoSection
                        title={t('배송지 정보')}
                        infoList={deliveryInfoList}
                        rightContent={
                            includes(orderDetailData.defaultOrderStatusType, [
                                'DEPOSIT_WAIT',
                                'PAY_DONE',
                            ]) && (
                                <ButtonV2
                                    frame='text'
                                    size='small'
                                    variant='primary'
                                    onClick={handleShippingAddressChange}
                                >
                                    {t('배송지 변경')}
                                </ButtonV2>
                            )
                        }
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
                <Button
                    type='button'
                    onClick={handleBack}
                    frame='outlined'
                    variant='secondary'
                    style={{
                        maxWidth: '330px',
                    }}
                >
                    {t('돌아가기')}
                </Button>
            </div>
        </div>
    );
};

export default OrderDetailView;
