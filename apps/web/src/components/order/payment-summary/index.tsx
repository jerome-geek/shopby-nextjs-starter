import * as styles from '@/components/order/payment-summary/index.css';
import { Button } from '@/components/ui/button';
import InputCheckbox from '@/components/ui/input/Checkbox';
import { useOrderSheetCalculate } from '@/hooks/order';
import { OrderTermsType } from '@/models';
import { PaymentReserveSchemaType } from '@/schema';
import { CURRENCY } from '@/utils/currency';
import { find, map, pipe, prop, toArray } from '@fxts/core';
import { useFormContext, useWatch } from 'react-hook-form';

const OrderPaymentSummary = ({ orderSheetNo }: { orderSheetNo: string }) => {
    const { orderSheetData, calculateOrderSheetData } = useOrderSheetCalculate({
        orderSheetNo,
    });
    console.log(
        '🚀 ~ OrderPaymentSummary ~ calculateOrderSheetData:',
        calculateOrderSheetData,
    );
    console.log('🚀 ~ OrderPaymentSummary ~ orderSheetData:', orderSheetData);

    const orderTermList = orderSheetData?.termsInfos || [];

    const paymentAmt = calculateOrderSheetData?.paymentInfo.paymentAmt || 0;

    const { control, setValue } = useFormContext<PaymentReserveSchemaType>();
    const agreementTermsTypesWatch = useWatch({
        control,
        name: 'agreementTermsAgrees',
    });

    const onTermDetailClick = (type: OrderTermsType) => {
        console.log('🚀 ~ onTermDetailClick ~ type:', type);
    };

    const isTermChecked = (term: OrderTermsType) => {
        console.log('🚀 ~ isTermChecked ~ term:', term);
        // console.log(
        //     pipe(
        //         agreementTermsTypesWatch ?? [],
        //         find((a) => a.termsType === term),
        //     ),
        // );
        // return pipe(
        //     agreementTermsTypesWatch ?? [],
        //     find((a) => a.termsType === term),
        // );
        return false;
    };

    // const isTermAllChecked = () => {
    //     return agreementTermsTypesWatch?.every(
    //         (agreement) => agreement.isAgree,
    //     );
    // };

    // const handleSelectAll = () => {
    //     if (!agreementTermsTypesWatch) {
    //         return;
    //     }

    //     if (!isTermAllChecked()) {
    //         setValue(
    //             'agreementTermsAgrees',
    //             pipe(
    //                 agreementTermsTypesWatch,
    //                 map((a) => {
    //                     return { ...a, isAgree: true };
    //                 }),
    //                 toArray,
    //             ),
    //         );
    //         return;
    //     }

    //     setValue(
    //         'agreementTermsAgrees',
    //         pipe(
    //             agreementTermsTypesWatch,
    //             map((a) => {
    //                 return { ...a, isAgree: false };
    //             }),
    //             toArray,
    //         ),
    //     );
    // };

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

                <div className={styles.priceContent}>
                    {/* 상단 가격 내열 */}
                    <dl className={styles.priceList}>
                        <div className={styles.priceRow}>
                            <dt>상품 금액</dt>
                            <dd>58,700원</dd>
                        </div>
                        <div className={styles.priceRow}>
                            <dt>배송비</dt>
                            <dd>무료</dd>
                        </div>
                    </dl>
                    <hr className={styles.divider} />
                    {/* 하단 최종 합계 */}
                    <dl className={styles.totalPriceRow}>
                        <dt>총 결제 금액</dt>
                        <dd>{CURRENCY(paymentAmt).format()}</dd>
                    </dl>
                </div>

                <ul className={styles.termsList}>
                    <li className={styles.termListItemTitle}>
                        <label className={styles.termCheckboxContainer}>
                            <InputCheckbox
                            // checked={
                            //     !!isTermChecked(term.termsType)
                            // }
                            // onCheckedChange={() => {
                            //     onTermCheckboxClick(term.termsType);
                            // }}
                            />
                            <span>
                                주문 내용을 확인하였으며, 아래 내용에 모두
                                동의합니다.
                            </span>
                        </label>
                    </li>

                    {orderTermList.map((term) => {
                        return (
                            <li
                                key={term.termsNo}
                                className={styles.termListItem}
                            >
                                <label className={styles.termCheckboxContainer}>
                                    <InputCheckbox
                                        checked={
                                            !!isTermChecked(term.termsType)
                                        }
                                        onCheckedChange={() => {
                                            onTermCheckboxClick(term.termsType);
                                        }}
                                    />
                                    <span>
                                        {`[${
                                            term.required ? '필수' : '선택'
                                        }] ${term.termsName}`}
                                    </span>
                                </label>

                                <button
                                    type='button'
                                    className={styles.termDetailButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onTermDetailClick(term.termsType);
                                    }}
                                >
                                    전체보기
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <Button type='submit' frame='solid' variant='primary' disabled>
                결제하기
            </Button>
        </aside>
    );
};

export default OrderPaymentSummary;
