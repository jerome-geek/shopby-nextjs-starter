import { includes, isEmpty, some } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { clsx } from 'clsx';
import { ArrowDownToLine, Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/features/event/detail/components/event-coupons/index.css';
import { useCouponMutation } from '@/hooks/mutations';
import { couponKeys, eventKeys } from '@/hooks/queryKeys';
import { useEvent } from '@/hooks/suspenseQuery/display/event';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useCoupons } from '@/hooks/utils/useCoupons';
import useDialog from '@/hooks/utils/useDialog';
import type { IssueFailCoupon } from '@/models/promotion';
import { vars } from '@/styles/theme.css';
import { CURRENCY, RATE } from '@/utils/currency';

interface EventCouponsProps {
    eventKey: string | number;
}

const toUniqueFailMessages = (issueFailCoupons: IssueFailCoupon[]) => [
    ...new Set(
        issueFailCoupons
            .map(({ failMessage }) => failMessage.trim())
            .filter((message) => message.length > 0),
    ),
];

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

export const EventCoupons = ({ eventKey }: EventCouponsProps) => {
    const { t } = useTranslation();

    const { data: eventData } = useEvent({
        eventKey,
        searchParams: {
            preview: true,
            includeNonMemberCoupon: false,
        },
    });

    const coupon = eventData.coupon;
    const eventNo = eventData.eventNo;

    const queryClient = useQueryClient();

    const { addToast } = useToast();

    const { openLoginDialog } = useDialog();

    const isLogin = useAuth();

    const { getPriceConstraint, getCouponConstraint } = useCoupons();

    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const couponImageUrls = {
        BEFORE_ISSUE: coupon.beforeIssueImageUrl,
        ALREADY_ISSUED: coupon.alreadyIssuedImageUrl,
        GUIDE: coupon.guideImageUrl,
        SOLD_OUT: coupon.soldOutImageUrl,
        DATE_EXPIRED: coupon.dateExpiredImageUrl,
        ISSUED: coupon.issuedImageUrl,
    };

    const hasGuide = !!couponImageUrls.GUIDE?.trim();

    const hasDownloadableCoupon = some(
        (couponItem) => couponItem.downloadable,
        coupon.coupons,
    );

    const {
        issue: { mutate: issueMutate },
        issueByEventNo: {
            mutate: issueByEventNoMutate,
            isPending: isIssueByEventNoPending,
        },
    } = useCouponMutation();

    const onDownloadButtonClick = (couponNo: number) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        issueMutate(
            { couponNo },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [
                                ...eventKeys.all,
                                ...couponKeys.all,
                            ]),
                        refetchType: 'all',
                    });
                    addToast({
                        message: t('쿠폰이 발급되었습니다.'),
                        variant: 'success',
                    });
                },
                onError: (error) => {
                    addToast({
                        message: isAxiosError(error)
                            ? error.response?.data?.message ??
                              t('쿠폰 발급에 실패했습니다.')
                            : t('쿠폰 발급에 실패했습니다.'),
                        variant: 'error',
                    });
                },
            },
        );
    };

    const onDownloadAllButtonClick = () => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        issueByEventNoMutate(
            { eventNo },
            {
                onSuccess: ({ data }) => {
                    queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [
                                ...eventKeys.all,
                                ...couponKeys.all,
                            ]),
                        refetchType: 'all',
                    });

                    if (data.issuedCoupons.length === coupon.coupons.length) {
                        addToast({
                            message: t('모든 쿠폰을 받았습니다.'),
                            variant: 'success',
                        });
                    }

                    if (data.issueFailCoupons.length > 0) {
                        const uniqueFailMessages = toUniqueFailMessages(
                            data.issueFailCoupons,
                        );
                        const failDetails = uniqueFailMessages.join('\n');
                        const hasPartialSuccess = data.issuedCoupons.length > 0;

                        addToast({
                            message: hasPartialSuccess
                                ? `${t(
                                      '일부 쿠폰 발급에 실패했습니다.',
                                  )}\n${failDetails}`
                                : failDetails || t('쿠폰 발급에 실패했습니다.'),
                            variant: 'error',
                        });
                    }
                },
                onError: (error) => {
                    addToast({
                        message: isAxiosError(error)
                            ? error.response?.data?.message ??
                              t('쿠폰 발급에 실패했습니다.')
                            : t('쿠폰 발급에 실패했습니다.'),
                        variant: 'error',
                    });
                },
            },
        );
    };

    if (isEmpty(coupon.coupons)) {
        return null;
    }

    return (
        <section className={styles.container} aria-label={t('기획전 쿠폰')}>
            <ul className={styles.couponList}>
                {coupon.coupons.map((couponItem) => (
                    <motion.li
                        key={couponItem.couponNo}
                        variants={itemVariants}
                        initial='hidden'
                        animate='visible'
                        whileTap={{ scale: 0.985 }}
                        className={styles.couponItem}
                    >
                        <div className={styles.couponInfo}>
                            <div className={styles.couponNameContainer}>
                                <p className={styles.discountValue}>
                                    {couponItem.discountInfo.fixedAmt
                                        ? CURRENCY(
                                              couponItem.discountInfo
                                                  .discountAmt,
                                          ).format()
                                        : RATE(
                                              couponItem.discountInfo
                                                  .discountRate,
                                          ).format()}
                                </p>
                                <p className={styles.couponName}>
                                    {couponItem.couponName}
                                </p>
                            </div>

                            <div className={styles.couponCondition}>
                                {getPriceConstraint(
                                    couponItem.useConstraint.minSalePrice,
                                    couponItem.useConstraint.maxSalePrice,
                                    couponItem.discountInfo.maxDiscountAmt,
                                )}
                                <br />
                                {getCouponConstraint(couponItem.useConstraint)}
                            </div>
                        </div>

                        <button
                            type='button'
                            className={styles.downloadBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDownloadButtonClick(couponItem.couponNo);
                            }}
                            disabled={!couponItem.downloadable}
                        >
                            {couponItem.downloadable ? (
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
            </ul>

            {coupon.coupons.length > 1 && (
                <button
                    type='button'
                    className={styles.downloadAllButton}
                    onClick={onDownloadAllButtonClick}
                    disabled={!hasDownloadableCoupon || isIssueByEventNoPending}
                >
                    {t('쿠폰 모두 받기')}
                </button>
            )}

            {hasGuide && (
                <div className={styles.guideSection}>
                    <button
                        type='button'
                        className={styles.guideToggleButton}
                        aria-expanded={isGuideOpen}
                        onClick={() => setIsGuideOpen((prev) => !prev)}
                    >
                        <span>{t('쿠폰 사용안내')}</span>
                        <ChevronDown
                            className={clsx(
                                styles.guideToggleIcon,
                                isGuideOpen && styles.guideToggleIconOpen,
                            )}
                            aria-hidden
                        />
                    </button>

                    <AnimatePresence initial={false}>
                        {isGuideOpen && (
                            <motion.div
                                key='event-coupon-guide'
                                className={styles.guideContent}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.2,
                                    ease: 'easeInOut',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: couponImageUrls.GUIDE,
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            )}
        </section>
    );
};
