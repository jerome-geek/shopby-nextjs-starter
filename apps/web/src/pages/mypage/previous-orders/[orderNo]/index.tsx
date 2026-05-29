import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { InfoSection } from '@/components/mypage/previous-orders/info-section';
import { PreviousOrderItem } from '@/components/mypage/previous-orders/item';
import { usePreviousOrderDetail } from '@/hooks/suspenseQuery/order/previousOrder';
import * as styles from '@/pages/mypage/previous-orders/[orderNo]/index.css';
import { CURRENCY } from '@/utils/currency';

function MypagePreviousOrderDetailPageContent({ orderNo }: { orderNo: string }) {
    const router = useRouter();
    const { t } = useTranslation();

    const {
        data: previousOrderDetailData,
        isFetched: isPreviousOrderDetailFetched,
    } = usePreviousOrderDetail({
        orderNo,
    });

    const paymentMethod = previousOrderDetailData?.paymentMethod;
    const orderYmdt = paymentMethod?.orderYmdt || paymentMethod?.payYmdt || '';

    const orderer = previousOrderDetailData?.orderer;
    const receiver = previousOrderDetailData?.receiver?.[0];

    const ordererInfoList = [
        { label: t('주문자명'), content: orderer?.ordererName ?? '-' },
        { label: t('아이디'), content: orderer?.memberId ?? '-' },
        {
            label: t('휴대폰번호'),
            content: orderer?.ordererMobileNumber ?? '-',
        },
        { label: t('이메일'), content: orderer?.ordererEmail ?? '-' },
        { label: t('주문메모'), content: orderer?.orderMemo ?? '-' },
    ];

    const deliveryInfoList = [
        { label: t('수령자명'), content: receiver?.receiverName ?? '-' },
        {
            label: t('휴대폰번호'),
            content: receiver?.receiverMobileNumber ?? '-',
        },
        { label: t('전화번호'), content: receiver?.receiverPhoneNumber ?? '-' },
        { label: t('우편번호'), content: receiver?.receiverZipCd ?? '-' },
        { label: t('주소'), content: receiver?.receiverAddress ?? '-' },
        {
            label: t('상세주소'),
            content: receiver?.receiverDetailAddress ?? '-',
        },
        { label: t('배송메모'), content: receiver?.deliveryMemo ?? '-' },
        { label: t('개인통관번호'), content: receiver?.customsIdNumber ?? '-' },
    ];

    const paymentInfoList = [
        {
            label: t('결제수단'),
            content:
                paymentMethod?.payTypeLabel ?? paymentMethod?.payType ?? '-',
        },
        {
            label: t('주문일시'),
            content: orderYmdt
                ? dayjs(orderYmdt).format('YYYY.MM.DD HH:mm')
                : '-',
        },
        {
            label: t('상품금액'),
            content: previousOrderDetailData?.firstPayment
                ? CURRENCY(
                      previousOrderDetailData.firstPayment.standardAmt,
                   ).format()
                : '-',
        },
        {
            label: t('할인금액'),
            content: previousOrderDetailData?.firstPayment
                ? CURRENCY(
                      previousOrderDetailData.firstPayment.discountAmt,
                   ).format()
                : '-',
        },
        {
            label: t('배송비'),
            content: previousOrderDetailData?.firstPayment
                ? CURRENCY(
                      previousOrderDetailData.firstPayment.deliveryAmt,
                   ).format()
                : '-',
        },
        {
            label: t('실 결제금액'),
            content: previousOrderDetailData?.firstPayment
                ? CURRENCY(
                      previousOrderDetailData.firstPayment.mainPayAmt,
                   ).format()
                : '-',
        },
    ];

    const refundInfoList = [
        {
            label: t('환불방법'),
            content: previousOrderDetailData?.refund?.refundTypeLabel ?? '-',
        },
        {
            label: t('환불처리일시'),
            content: previousOrderDetailData?.refund?.refundCompleteYmdt
                ? dayjs(
                      previousOrderDetailData.refund.refundCompleteYmdt,
                   ).format('YYYY.MM.DD HH:mm')
                : '-',
        },
        {
            label: t('환불금액'),
            content:
                typeof previousOrderDetailData?.refund?.refundAmt === 'number'
                    ? CURRENCY(
                          previousOrderDetailData.refund.refundAmt,
                       ).format()
                    : '-',
        },
        {
            label: t('환불계좌'),
            content: (() => {
                const bank = previousOrderDetailData?.refund?.refundBankAccount;
                if (!bank) return '-';
                const bankName = bank.bank ?? '';
                const account = bank.account ?? '';
                const depositor = bank.depositorName ?? '';
                return (
                    [bankName, account, depositor]
                        .filter(Boolean)
                        .join(' / ') || '-'
                );
            })(),
        },
    ];

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <Seo title={t('이전 주문 상세')} noindex={true} />
            <LoadingWrapper
                isLoading={!isPreviousOrderDetailFetched}
                containerStyle={{ height: '50vh' }}
            >
            <div className={card.container}>
                <section className={card.section}>
                    <div className={card.toolbar}>
                        <div className={card.toolbarTop}>
                            <span />
                        </div>
                    </div>

                    <div className={`${card.list} ${styles.list}`}>
                        <ul className={styles.orderList}>
                            <li className={styles.orderListItem}>
                                <div className={styles.orderTitleContainer}>
                                    <span className={styles.orderNoText}>
                                        {orderNo}
                                    </span>
                                    {orderYmdt && (
                                        <span className={styles.orderDate}>
                                            {dayjs(orderYmdt).format(
                                                'YYYY.MM.DD',
                                            )}
                                        </span>
                                    )}
                                </div>

                                <div className={styles.orderProductsContainer}>
                                    <ul className={styles.orderOptionList}>
                                        {previousOrderDetailData.orderProduct?.map(
                                            (product, idx) => (
                                                <PreviousOrderItem
                                                    key={`${
                                                        product.optionNo ?? idx
                                                    }-${idx}`}
                                                    productName={
                                                        product.productName
                                                    }
                                                    optionName={
                                                        product.optionName
                                                    }
                                                    optionValue={
                                                        product.optionValue
                                                    }
                                                    orderCnt={product.orderCnt}
                                                    salePrice={
                                                        product.salePrice
                                                    }
                                                    orderStatusType={
                                                        product.orderStatusType
                                                    }
                                                />
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </li>
                        </ul>

                        <InfoSection
                            title={t('주문자 정보')}
                            infoList={ordererInfoList}
                        />
                        <InfoSection
                            title={t('배송지 정보')}
                            infoList={deliveryInfoList}
                        />
                        <InfoSection
                            title={t('결제 정보')}
                            infoList={paymentInfoList}
                        />
                        <InfoSection
                            title={t('환불 정보')}
                            infoList={refundInfoList}
                        />
                    </div>
                </section>

                <div className={styles.backSection}>
                    <button
                        type='button'
                        onClick={handleBack}
                        className={styles.backButton}
                    >
                        {t('돌아가기')}
                    </button>
                </div>
            </div>
            </LoadingWrapper>
        </>
    );
}

export default function MypagePreviousOrderDetailPage() {
    const router = useRouter();
    const orderNo =
        typeof router.query.orderNo === 'string' ? router.query.orderNo : '';

    return router.isReady && orderNo ? (
        <MypagePreviousOrderDetailPageContent orderNo={orderNo} />
    ) : null;
}

MypagePreviousOrderDetailPage.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
