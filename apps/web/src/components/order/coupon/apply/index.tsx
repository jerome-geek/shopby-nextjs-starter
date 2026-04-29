import { Select } from '@/components/ui/input';
import { filter, flatMap, map, pipe, prepend, toArray } from '@fxts/core';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SingleValue } from 'react-select';

import {
    BottomSheetLayout,
    DefaultModalLayoutProps,
    ModalLayout,
} from '@/components/layout';
import * as styles from '@/components/order/coupon/apply/index.css';
import { Button } from '@/components/ui';
import Image from '@/components/ui/image';
import { useOrderSheetMutation } from '@/hooks/mutations';
import { useOrderSheetCalculate } from '@/hooks/order';
import { useProfile } from '@/hooks/query/member/profile';
import { useAvailableCouponList } from '@/hooks/query/order/orderSheet';
import { useDialog, useResponsive } from '@/hooks/utils';
import { PaymentReserveSchemaType } from '@/schema';
import { CURRENCY } from '@/utils/currency';

interface CouponItem {
    couponIssueNo: number;
    couponName: string;
    couponDiscountAmt: number;
    displayCouponName: string;
    cartCouponUsable?: boolean;
    isSelected?: boolean;
    isNotProductCouponUsable?: boolean;
}

interface AppliedProductCoupon {
    productNo: number;
    couponIssueNo: number;
}

export const CouponApplyOverlay = (props: DefaultModalLayoutProps) => {
    const { close, isOpen, unmount } = props;
    const { t } = useTranslation();
    const { isMobile } = useResponsive();
    const { openDialog } = useDialog();

    const { setValue } = useFormContext<PaymentReserveSchemaType>();
    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const { calculateOrderSheetData, couponsWatch, subPayAmtWatch } =
        useOrderSheetCalculate({ orderSheetNo });

    const { data: profile } = useProfile();
    const { data: couponListData } = useAvailableCouponList({
        orderSheetNo,
        memberNo: profile?.memberNo,
    });

    const { couponApply } = useOrderSheetMutation();

    const cartCouponList = useMemo(
        () =>
            pipe(
                couponListData?.cartCoupons ?? [],
                map((a) => ({
                    couponIssueNo: a.couponIssueNo,
                    couponName: a.couponName,
                    couponDiscountAmt: a.couponDiscountAmt,
                    displayCouponName: `${a.couponName} - ${CURRENCY(
                        a.couponDiscountAmt,
                    ).format()}`,
                    isNotProductCouponUsable: !a.productCouponUsable,
                })),
                toArray,
            ),
        [couponListData],
    );

    const cartOptionList = useMemo(() => {
        return pipe(
            cartCouponList,
            (iter) => {
                if (couponsWatch?.cartCouponIssueNo) {
                    return prepend(
                        {
                            couponIssueNo: 0,
                            couponName: t('쿠폰 미적용'),
                            couponDiscountAmt: 0,
                            displayCouponName: t('쿠폰 미적용'),
                            isNotProductCouponUsable: false,
                        },
                        iter,
                    );
                }
                return iter;
            },
            toArray,
        );
    }, [cartCouponList, couponsWatch?.cartCouponIssueNo, t]);

    const selectCartCoupon = cartCouponList.find(
        (item) => item.couponIssueNo === couponsWatch?.cartCouponIssueNo,
    );

    const totalCouponAmt = CURRENCY(
        (calculateOrderSheetData?.paymentInfo.productCouponAmt ?? 0) +
            (calculateOrderSheetData?.paymentInfo?.cartCouponAmt ?? 0),
    ).format();

    const productList = useMemo(
        () =>
            pipe(
                calculateOrderSheetData?.deliveryGroups ?? [],
                flatMap((a) => a.orderProducts),
                map((a) => ({
                    productNo: a.productNo,
                    productName: a.productName,
                    imageUrl: a.imageUrl,
                    brandName: a.brandName,
                    totalOrderCnt: a.orderProductOptions.reduce(
                        (acc, curr) => acc + curr.orderCnt,
                        0,
                    ),
                    buyAmt: a.orderProductOptions.reduce(
                        (acc, curr) => acc + curr.price.buyAmt,
                        0,
                    ),
                })),
                toArray,
            ),
        [calculateOrderSheetData],
    );

    const productCouponListData = useMemo(() => {
        return pipe(
            productList,
            map((product) => {
                const couponInfo = couponListData?.products?.find(
                    (c) => c.productNo === product.productNo,
                );
                return {
                    ...product,
                    productCoupons: couponInfo?.productCoupons ?? [],
                    isCouponUse: !!couponInfo,
                };
            }),
            toArray,
        );
    }, [productList, couponListData]);

    const setSubPayAmt = (subPayAmt: number) => {
        return subPayAmtWatch > subPayAmt ? subPayAmt : subPayAmtWatch;
    };

    const onCartCouponChange = (option: SingleValue<CouponItem>) => {
        if (!option) {
            return;
        }

        couponApply.mutate(
            {
                orderSheetNo,
                data: {
                    productCoupons: couponsWatch?.productCoupons ?? [],
                    cartCouponIssueNo: option.couponIssueNo,
                    promotionCode: couponsWatch?.promotionCode ?? '',
                    channelType: couponsWatch?.channelType ?? '',
                },
            },
            {
                onSuccess: ({ data }) => {
                    if (data.appliedCoupons) {
                        setValue(
                            'coupons.cartCouponIssueNo',
                            data.appliedCoupons.cartCouponIssueNo,
                        );
                    }
                    setValue(
                        'subPayAmt',
                        setSubPayAmt(
                            data.paymentInfo.availableMaxAccumulationAmt,
                        ),
                    );
                },
                onError: (error) => {
                    if (isAxiosError(error)) {
                        if (error?.response?.data?.code === 'C2009') {
                            setValue('coupons.cartCouponIssueNo', 0);
                            couponApply.mutate({
                                orderSheetNo,
                                data: {
                                    promotionCode:
                                        couponsWatch?.promotionCode ?? '',
                                    channelType:
                                        couponsWatch?.channelType ?? '',
                                    cartCouponIssueNo: 0,
                                    productCoupons:
                                        couponsWatch?.productCoupons ?? [],
                                },
                            });
                        }

                        if (error?.response?.data?.code === 'C2010') {
                            couponApply.mutate({
                                orderSheetNo,
                                data: {
                                    productCoupons:
                                        couponsWatch?.productCoupons ?? [],
                                    promotionCode:
                                        couponsWatch?.promotionCode ?? '',
                                    channelType:
                                        couponsWatch?.channelType ?? '',
                                    cartCouponIssueNo: 0,
                                },
                            });
                        }
                    }

                    openDialog({
                        message: isAxiosError(error)
                            ? error.response?.data.message ??
                              t('쿠폰 적용에 실패했습니다.')
                            : t('쿠폰 적용에 실패했습니다.'),
                    });
                },
            },
        );
    };

    const onProductCouponChange = (
        productNo: number,
        option: SingleValue<CouponItem>,
    ) => {
        if (!option) {
            return;
        }

        const productCoupons = pipe(
            couponsWatch?.productCoupons ?? [],
            filter(
                (a: AppliedProductCoupon) =>
                    a.couponIssueNo !== option.couponIssueNo,
            ),
            filter((a: AppliedProductCoupon) => a.productNo !== productNo),
            toArray,
        );

        if (option.couponIssueNo !== 0) {
            productCoupons.push({
                productNo,
                couponIssueNo: option.couponIssueNo,
            });
        }

        couponApply.mutate(
            {
                orderSheetNo,
                data: {
                    promotionCode: couponsWatch?.promotionCode ?? '',
                    channelType: couponsWatch?.channelType ?? '',
                    cartCouponIssueNo: couponsWatch?.cartCouponIssueNo ?? 0,
                    productCoupons,
                },
            },
            {
                onSuccess: ({ data }) => {
                    if (data.appliedCoupons) {
                        setValue(
                            'coupons.productCoupons',
                            data.appliedCoupons.productCoupons || [],
                        );
                    }
                    setValue(
                        'subPayAmt',
                        setSubPayAmt(
                            data.paymentInfo.availableMaxAccumulationAmt,
                        ),
                    );
                },
                onError: (error) => {
                    if (isAxiosError(error)) {
                        if (error?.response?.data?.code === 'C2009') {
                            couponApply.mutate({
                                orderSheetNo,
                                data: {
                                    promotionCode:
                                        couponsWatch?.promotionCode ?? '',
                                    channelType:
                                        couponsWatch?.channelType ?? '',
                                    cartCouponIssueNo:
                                        couponsWatch?.cartCouponIssueNo ?? 0,
                                    productCoupons: productCoupons.filter(
                                        (a: AppliedProductCoupon) =>
                                            a.productNo !== productNo,
                                    ),
                                },
                            });
                        }

                        if (error?.response?.data?.code === 'C2010') {
                            couponApply.mutate({
                                orderSheetNo,
                                data: {
                                    promotionCode:
                                        couponsWatch?.promotionCode ?? '',
                                    channelType:
                                        couponsWatch?.channelType ?? '',
                                    cartCouponIssueNo:
                                        couponsWatch?.cartCouponIssueNo ?? 0,
                                    productCoupons: productCoupons.filter(
                                        (a: AppliedProductCoupon) =>
                                            a.productNo !== productNo,
                                    ),
                                },
                            });
                        }
                    }

                    openDialog({
                        message: isAxiosError(error)
                            ? error.response?.data.message ??
                              t('쿠폰 적용에 실패했습니다.')
                            : t('쿠폰 적용에 실패했습니다.'),
                    });
                },
            },
        );
    };

    const content = (
        <div className={styles.container}>
            <ul className={styles.list}>
                {productCouponListData.length > 0 && (
                    <li className={styles.listItem}>
                        <h4 className={styles.listTitle}>{t('상품 쿠폰')}</h4>
                        <ul className={styles.productCouponList}>
                            {productCouponListData.map((product) => {
                                const currentSelected =
                                    couponsWatch?.productCoupons?.find(
                                        (c) =>
                                            c.productNo === product.productNo,
                                    );

                                const options: CouponItem[] = pipe(
                                    product.productCoupons ?? [],
                                    map(
                                        (c): CouponItem => ({
                                            couponIssueNo: c.couponIssueNo,
                                            couponName: c.couponName,
                                            couponDiscountAmt:
                                                c.couponDiscountAmt,
                                            displayCouponName: `${
                                                c.couponName
                                            } - ${CURRENCY(
                                                c.couponDiscountAmt,
                                            ).format()}`,
                                            cartCouponUsable:
                                                c.cartCouponUsable,
                                            isSelected:
                                                couponsWatch?.productCoupons?.some(
                                                    (pc) =>
                                                        pc.couponIssueNo ===
                                                        c.couponIssueNo,
                                                ),
                                        }),
                                    ),
                                    (iter) => {
                                        if (currentSelected) {
                                            return prepend(
                                                {
                                                    couponIssueNo: 0,
                                                    couponName:
                                                        t('쿠폰 미적용'),
                                                    couponDiscountAmt: 0,
                                                    displayCouponName:
                                                        t('쿠폰 미적용'),
                                                    isSelected: false,
                                                },
                                                iter,
                                            );
                                        }
                                        return iter;
                                    },
                                    toArray,
                                );

                                const selectedValue =
                                    options.find(
                                        (o) =>
                                            o.couponIssueNo ===
                                            currentSelected?.couponIssueNo,
                                    ) || null;

                                return (
                                    <li key={product.productNo}>
                                        <div
                                            className={
                                                styles.productInfoContainer
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.productImageContainer
                                                }
                                            >
                                                <Image
                                                    src={product.imageUrl || ''}
                                                    alt={product.productName}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.productTextContainer
                                                }
                                            >
                                                <p className={styles.brandName}>
                                                    {product.brandName}
                                                </p>
                                                <p
                                                    className={
                                                        styles.productName
                                                    }
                                                >
                                                    {product.productName}
                                                </p>
                                                <p
                                                    className={
                                                        styles.productDetailText
                                                    }
                                                >
                                                    {t('수량 {{count}}', {
                                                        count: product.totalOrderCnt,
                                                    })}
                                                </p>
                                                <p
                                                    className={
                                                        styles.productPrice
                                                    }
                                                >
                                                    {CURRENCY(
                                                        product.buyAmt,
                                                    ).format()}
                                                </p>
                                            </div>
                                        </div>
                                        <Select
                                            menuPortalTarget={
                                                typeof document !== 'undefined'
                                                    ? document.body
                                                    : undefined
                                            }
                                            options={options}
                                            value={selectedValue}
                                            placeholder={
                                                product.isCouponUse
                                                    ? options.length > 0
                                                        ? t(
                                                              '쿠폰을 선택해주세요',
                                                          )
                                                        : t(
                                                              '사용 가능한 쿠폰이 없습니다',
                                                          )
                                                    : t(
                                                          '쿠폰 적용 불가 상품이에요',
                                                      )
                                            }
                                            isDisabled={
                                                options.length === 0 ||
                                                !product.isCouponUse
                                            }
                                            getOptionLabel={(option) =>
                                                option.displayCouponName
                                            }
                                            getOptionValue={(option) =>
                                                option.couponIssueNo.toString()
                                            }
                                            onChange={(opt) =>
                                                onProductCouponChange(
                                                    product.productNo,
                                                    opt,
                                                )
                                            }
                                            isOptionSelected={(option) =>
                                                option.couponIssueNo ===
                                                selectedValue?.couponIssueNo
                                            }
                                            formatOptionLabel={(option) => (
                                                <div
                                                    className={
                                                        styles.couponLabel
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.couponNameContainer
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.couponName
                                                            }
                                                        >
                                                            {option.couponName}
                                                        </span>
                                                        {option.cartCouponUsable ===
                                                            false && (
                                                            <span
                                                                className={
                                                                    styles.couponNotice
                                                                }
                                                            >
                                                                [
                                                                {t(
                                                                    '장바구니 쿠폰 사용 불가',
                                                                )}
                                                                ]
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span
                                                        className={
                                                            styles.couponPrice
                                                        }
                                                    >
                                                        {option.couponDiscountAmt >
                                                            0 &&
                                                            `-${CURRENCY(
                                                                option.couponDiscountAmt,
                                                            ).format()}`}
                                                    </span>
                                                </div>
                                            )}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                )}

                <li className={styles.listItem}>
                    <h4 className={styles.listTitle}>{t('주문 쿠폰')}</h4>
                    <Select
                        menuPortalTarget={
                            typeof document !== 'undefined'
                                ? document.body
                                : undefined
                        }
                        options={cartOptionList}
                        value={
                            selectCartCoupon ||
                            (couponsWatch?.cartCouponIssueNo === 0
                                ? cartOptionList[0]
                                : null)
                        }
                        placeholder={
                            cartOptionList.length > 0
                                ? t('쿠폰을 선택해주세요')
                                : t('사용 가능한 쿠폰이 없습니다')
                        }
                        isDisabled={cartOptionList.length === 0}
                        getOptionLabel={(o: CouponItem) => o.displayCouponName}
                        getOptionValue={(o: CouponItem) =>
                            o.couponIssueNo.toString()
                        }
                        isOptionSelected={(o) =>
                            o.couponIssueNo ===
                            (selectCartCoupon?.couponIssueNo ||
                                (couponsWatch?.cartCouponIssueNo === 0
                                    ? cartOptionList[0]?.couponIssueNo
                                    : null))
                        }
                        onChange={onCartCouponChange}
                        formatOptionLabel={(option) => (
                            <div className={styles.couponLabel}>
                                <div className={styles.couponNameContainer}>
                                    <span className={styles.couponName}>
                                        {option.couponName}
                                    </span>
                                    {option.isNotProductCouponUsable && (
                                        <span className={styles.couponNotice}>
                                            [{t('상품 쿠폰 사용 불가')}]
                                        </span>
                                    )}
                                </div>
                                <span className={styles.couponPrice}>
                                    {option.couponDiscountAmt > 0 &&
                                        `-${CURRENCY(
                                            option.couponDiscountAmt,
                                        ).format()}`}
                                </span>
                            </div>
                        )}
                    />
                </li>
            </ul>
        </div>
    );

    const footer = [
        <Button
            key='coupon-apply-complete-button'
            frame='solid'
            variant='primary'
            onClick={close}
        >
            {t('쿠폰 적용 완료 (할인 금액: {{amt}})', {
                amt: totalCouponAmt,
            })}
        </Button>,
    ];

    if (isMobile) {
        return (
            <BottomSheetLayout
                isOpen={isOpen}
                close={close}
                unmount={unmount}
                title={t('쿠폰 적용')}
                type='fullscreen'
                footerButtonList={footer}
            >
                {content}
            </BottomSheetLayout>
        );
    }

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('쿠폰 적용')}
            width='500px'
            footerButtonList={footer}
        >
            {content}
        </ModalLayout>
    );
};
