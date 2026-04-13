import { includes } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowDownToLine, Check } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { ModalLayout, type DefaultModalLayoutProps } from '@/components/layout';
import * as styles from '@/components/modal/product-coupon/index.css';
import { useCouponMutation } from '@/hooks/mutations';
import { useCouponListByProductNo } from '@/hooks/query/promotion/coupon';
import { couponKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import { useCoupons } from '@/hooks/utils/useCoupons';
import { CURRENCY, RATE } from '@/utils/currency';
import { vars } from '@/styles/theme.css';

interface ProductCouponModalProps extends DefaultModalLayoutProps {
    productNo: number;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

// TODO: BottomSheet 추가 필요
export const ProductCouponModal = ({
    productNo,
    ...props
}: ProductCouponModalProps) => {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const { addToast } = useToast();

    const { data: couponListByProductNoData = [] } = useCouponListByProductNo({
        productNo,
        options: { enabled: !!productNo },
    });

    const {
        issue: { mutate: issueMutate },
        issueByProductNo: { mutate: issueByProductNoMutate },
    } = useCouponMutation();

    const onDownloadAllButtonClick = () => {
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

    return (
        <ModalLayout
            {...props}
            title='쿠폰 받기'
            width='588px'
            height='60vh'
            footerButtonList={[
                <motion.button
                    key='download-all'
                    whileTap={{ scale: 0.98 }}
                    className={styles.footerButton}
                    onClick={onDownloadAllButtonClick}
                >
                    {t('쿠폰 모두 받기')}
                </motion.button>,
            ]}
        >
            <div className={styles.container}>
                <motion.ul
                    className={styles.scrollArea}
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                >
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
                                    {getCouponConstraint(coupon.useConstraint)}
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
                                        <span className={styles.downloadText}>
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
                                        <span className={styles.downloadText}>
                                            {t('받기 완료')}
                                        </span>
                                    </>
                                )}
                            </button>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </ModalLayout>
    );
};
