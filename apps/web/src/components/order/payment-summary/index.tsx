import { every, find, map, pipe, toArray } from '@fxts/core';
import { overlay } from 'overlay-kit';
import { useFormContext, useWatch } from 'react-hook-form';

import * as styles from '@/components/order/payment-summary/index.css';
import { Button } from '@/components/ui/button';
import TermDialog from '@/components/ui/dialog/term';
import InputCheckbox from '@/components/ui/input/checkbox';
import { useOrderSheetCalculate } from '@/hooks/order';
import { OrderTermsType } from '@/models';
import { PaymentReserveSchemaType } from '@/schema';
import { CURRENCY } from '@/utils/currency';

const OrderPaymentSummary = ({ orderSheetNo }: { orderSheetNo: string }) => {
    const { orderSheetData, calculateOrderSheetData } = useOrderSheetCalculate({
        orderSheetNo,
    });

    const orderTermList = orderSheetData?.termsInfos || [];
    const paymentAmt = calculateOrderSheetData?.paymentInfo.paymentAmt || 0;

    // 총 상품 금액
    const totalStandardAmt =
        calculateOrderSheetData?.paymentInfo.totalStandardAmt || 0;
    // 총 배송비 = 배송비(deliveryAmt) + 추가배송비(remoteDeliveryAmt)
    const totalDeliveryAmt = CURRENCY(
        calculateOrderSheetData?.paymentInfo.deliveryAmt || 0,
    ).add(calculateOrderSheetData?.paymentInfo.remoteDeliveryAmt || 0);

    // 총 할인금액 (상품할인, 쿠폰할인, 적립금사용)
    const totalProductDiscountAmt =
        (calculateOrderSheetData?.paymentInfo?.totalImmediateDiscountAmt ?? 0) +
        (calculateOrderSheetData?.paymentInfo?.totalAdditionalDiscountAmt ?? 0);
    const totalCouponDiscountAmt =
        (calculateOrderSheetData?.paymentInfo?.cartCouponAmt ?? 0) +
        (calculateOrderSheetData?.paymentInfo?.productCouponAmt ?? 0);
    const subPayAmt =
        calculateOrderSheetData?.paymentInfo?.usedAccumulationAmt || 0;

    const accumulationAmtWhenBuyConfirm =
        calculateOrderSheetData?.paymentInfo.accumulationAmtWhenBuyConfirm || 0;

    const {
        control,
        setValue,
        formState: { isSubmitting },
    } = useFormContext<PaymentReserveSchemaType>();
    const agreementTermsTypesWatch = useWatch({
        control,
        name: 'agreementTermsAgrees',
    });

    const onTermDetailClick = (name: string, contents: string) => {
        overlay.open((props) => {
            return <TermDialog {...props} title={name} contents={contents} />;
        });
    };

    const isTermChecked = (term: OrderTermsType) => {
        const termData = pipe(
            agreementTermsTypesWatch ?? [],
            find((a) => a.termsType === term),
        );

        return termData?.isAgree ?? false;
    };

    const isTermAllChecked = pipe(
        agreementTermsTypesWatch ?? [],
        every((a) => a.isAgree),
    );

    const onAllTermCheckButtonClick = () => {
        setValue(
            'agreementTermsAgrees',
            pipe(
                agreementTermsTypesWatch,
                map((a) => {
                    return { ...a, isAgree: !isTermAllChecked };
                }),
                toArray,
            ),
        );
    };

    const onTermCheckboxClick = (term: OrderTermsType) => {
        if (!agreementTermsTypesWatch) {
            return;
        }

        if (!isTermChecked(term)) {
            setValue(
                'agreementTermsAgrees',
                pipe(
                    agreementTermsTypesWatch,
                    map((a) => ({
                        ...a,
                        isAgree: a.termsType === term ? true : a.isAgree,
                    })),
                    toArray,
                ),
            );
            return;
        }

        setValue(
            'agreementTermsAgrees',
            pipe(
                agreementTermsTypesWatch,
                map((a) => ({
                    ...a,
                    isAgree: a.termsType === term ? false : a.isAgree,
                })),
                toArray,
            ),
        );
    };

    return (
        <aside className={styles.container}>
            <div>
                <h2 className={styles.title}>결제 금액</h2>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                    }}
                >
                    <div className={styles.priceContent}>
                        <dl className={styles.priceList}>
                            <div className={styles.priceRow}>
                                <dt>총 상품 금액</dt>
                                <dd>{CURRENCY(totalStandardAmt).format()}</dd>
                            </div>

                            <div className={styles.priceRow}>
                                <dt>총 배송비</dt>
                                <dd>
                                    {totalDeliveryAmt.intValue === 0
                                        ? '무료'
                                        : totalDeliveryAmt.format()}
                                </dd>
                            </div>

                            <div className={styles.priceRow}>
                                <dt>총 할인금액</dt>
                                <dd>
                                    {CURRENCY(totalProductDiscountAmt)
                                        .add(totalCouponDiscountAmt)
                                        .add(subPayAmt)
                                        .multiply(-1)
                                        .format()}
                                </dd>
                            </div>

                            <div className={styles.priceRow}>
                                <dt>적립 예정 금액</dt>
                                <dd>
                                    {CURRENCY(
                                        accumulationAmtWhenBuyConfirm,
                                    ).format()}
                                </dd>
                            </div>
                        </dl>

                        <hr className={styles.divider} />

                        <dl>
                            <div className={styles.priceRow}>
                                <dt className={styles.totalPriceTitle}>
                                    총 결제 금액
                                </dt>
                                <dd className={styles.totalPrice}>
                                    {CURRENCY(paymentAmt).format()}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <ul className={styles.termsList}>
                        <li className={styles.termListItemTitle}>
                            <label className={styles.termCheckboxContainer}>
                                <InputCheckbox
                                    checked={isTermAllChecked}
                                    onCheckedChange={onAllTermCheckButtonClick}
                                />
                                <span>
                                    주문 내용을 확인하였으며, 아래 내용에 모두
                                    동의합니다.
                                </span>
                            </label>
                        </li>

                        {orderTermList.map(
                            ({
                                termsNo,
                                termsType,
                                termsName,
                                required,
                                contents,
                            }) => {
                                return (
                                    <li
                                        key={termsNo}
                                        className={styles.termListItem}
                                    >
                                        <label
                                            className={
                                                styles.termCheckboxContainer
                                            }
                                        >
                                            <InputCheckbox
                                                checked={isTermChecked(
                                                    termsType,
                                                )}
                                                onCheckedChange={() => {
                                                    onTermCheckboxClick(
                                                        termsType,
                                                    );
                                                }}
                                            />
                                            <span>
                                                {`[${
                                                    required ? '필수' : '선택'
                                                }] ${termsName}`}
                                            </span>
                                        </label>

                                        <button
                                            type='button'
                                            className={styles.termDetailButton}
                                            onClick={() => {
                                                onTermDetailClick(
                                                    termsName,
                                                    contents,
                                                );
                                            }}
                                        >
                                            전체보기
                                        </button>
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </div>
            </div>

            <div className={styles.buttonWrapper}>
                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    disabled={isSubmitting}
                >
                    {`${CURRENCY(paymentAmt).format()} 결제하기`}
                </Button>
            </div>
        </aside>
    );
};

export default OrderPaymentSummary;
