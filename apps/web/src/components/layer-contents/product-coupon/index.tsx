import { includes, isEmpty } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowDownToLine, Check } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import * as styles from '@/components/layer-contents/product-coupon/index.css';
import { type DefaultModalLayoutProps } from '@/components/layout';
import { useCouponMutation } from '@/hooks/mutations';
import { useCouponListByProductNo } from '@/hooks/query/promotion/coupon';
import { couponKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import { useCoupons } from '@/hooks/utils/useCoupons';
import { vars } from '@/styles/theme.css';
import { CURRENCY, RATE } from '@/utils/currency';

interface ProductCouponLayerContentProps extends DefaultModalLayoutProps {
    productNo: number;
}

const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

export const ProductCoupon = ({
    productNo,
}: ProductCouponLayerContentProps) => {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const { addToast } = useToast();

    const {
        data: couponListByProductNoData = [],
        isLoading: isCouponListByProductNoLoading,
    } = useCouponListByProductNo({
        productNo,
        options: { enabled: !!productNo },
    });

    const {
        issue: { mutate: issueMutate },
        issueByProductNo: {
            mutate: issueByProductNoMutate,
            isPending: isIssueByProductNoPending,
        },
    } = useCouponMutation();

    const onDownloadAllButtonClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        issueByProductNoMutate(
            { productNo },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...couponKeys.all]),
                    });
                    addToast({
                        message: t('모든 쿠폰을 받았습니다.'),
                        variant: 'success',
                    });
                },
            },
        );
    };

    const onDownloadButtonClick = (couponNo: number) => {
        issueMutate(
            { couponNo },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...couponKeys.all]),
                    });
                    addToast({
                        message: t('쿠폰이 발급되었습니다.'),
                        variant: 'success',
                    });
                },
            },
        );
    };

    const { getPriceConstraint, getCouponConstraint } = useCoupons();

    useEffect(
        function handleSubmitButtonDisabledState() {
            const submitButton = document.getElementById(
                'product-coupon-form-submit-button',
            ) as HTMLButtonElement;

            if (!submitButton) {
                return;
            }

            submitButton.disabled = isIssueByProductNoPending;
        },
        [isIssueByProductNoPending],
    );

    return (
        <form
            className={styles.container}
            onSubmit={onDownloadAllButtonClick}
            id='product-coupon-form'
        >
            <LoadingWrapper
                isLoading={isCouponListByProductNoLoading}
                isLoadedAnimation
            >
                {isEmpty(couponListByProductNoData) ? (
                    <NoResult text={t('해당 상품의 쿠폰이 없습니다.')} />
                ) : (
                    <ul className={styles.scrollArea}>
                        {couponListByProductNoData.map((coupon) => (
                            <motion.li
                                key={coupon.couponNo}
                                variants={itemVariants}
                                whileTap={{ scale: 0.985 }}
                                className={styles.couponItem}
                            >
                                <div className={styles.couponInfo}>
                                    <div className={styles.couponNameContainer}>
                                        <p className={styles.discountValue}>
                                            {coupon.discountInfo.fixedAmt
                                                ? CURRENCY(
                                                      coupon.discountInfo
                                                          .discountAmt,
                                                  ).format()
                                                : RATE(
                                                      coupon.discountInfo
                                                          .discountRate,
                                                  ).format()}
                                        </p>
                                        <p className={styles.couponName}>
                                            {coupon.couponName}
                                        </p>
                                    </div>

                                    <div className={styles.couponCondition}>
                                        {getPriceConstraint(
                                            coupon.useConstraint.minSalePrice,
                                            coupon.useConstraint.maxSalePrice,
                                            coupon.discountInfo.maxDiscountAmt,
                                        )}
                                        <br />
                                        {getCouponConstraint(
                                            coupon.useConstraint,
                                        )}
                                    </div>
                                </div>

                                <button
                                    className={styles.downloadBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDownloadButtonClick(coupon.couponNo);
                                    }}
                                    disabled={!coupon.downloadable}
                                >
                                    {coupon.downloadable ? (
                                        <>
                                            <ArrowDownToLine
                                                size={24}
                                                color={vars.color.gray['60']}
                                                strokeWidth={1.5}
                                            />
                                            <span
                                                className={styles.downloadText}
                                            >
                                                {t('쿠폰 받기')}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Check
                                                size={24}
                                                color={vars.color.gray['60']}
                                                strokeWidth={1.5}
                                            />
                                            <span
                                                className={styles.downloadText}
                                            >
                                                {t('받기 완료')}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </LoadingWrapper>
        </form>
    );
};
