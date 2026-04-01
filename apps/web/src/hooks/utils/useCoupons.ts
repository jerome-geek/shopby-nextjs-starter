import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import type { CouponType } from '@/models';
import type { Coupon, DateInfo, UseConstraint } from '@/models/promotion';
import { CURRENCY } from '@/utils/currency';

/**
 * 쿠폰 목록·상세 표시용 포맷터
 * - 최소/최대 기준금액이 제한 없을 때 API마다 null vs 0 등으로 내려올 수 있어 falsy(0 포함)를 제한 없음으로 봅니다.
 */
export const useCoupons = () => {
    const { t } = useTranslation();

    const getBenefitAmt = (coupon: Coupon) => {
        if (coupon.couponType === 'CART_DELIVERY' && coupon.freeDelivery) {
            return t('무료배송');
        }

        const { couponType, benefitAmt, fixedAmt, discountAmt, discountRate } =
            coupon;

        switch (couponType) {
            case 'GIFT': {
                return CURRENCY(benefitAmt).format();
            }
            case 'PRODUCT':
            case 'CART':
            case 'CART_DELIVERY': {
                return fixedAmt
                    ? CURRENCY(discountAmt, {
                          precision: 0,
                          pattern: `#!`,
                      }).format()
                    : CURRENCY(discountRate, {
                          symbol: '%',
                          precision: 0,
                          pattern: `#!`,
                      }).format();
            }
            default: {
                return '';
            }
        }
    };

    const getPriceConstraint = (
        minSalePrice: Nullable<number>,
        maxSalePrice: Nullable<number>,
        maxDiscountAmt: number = 0,
    ) => {
        const noMin = !minSalePrice;
        const noMax = !maxSalePrice;
        const isMaxDiscountAmtVisible = maxDiscountAmt > 0;

        if (noMin && noMax) {
            return t('사용 제한없음');
        }

        if (noMin && maxSalePrice) {
            return isMaxDiscountAmtVisible && maxSalePrice > 0
                ? t(
                      '{{maxSalePrice}} 이하 구매시 (최대 {{maxDiscountAmt}} 할인)',
                      {
                          maxSalePrice: CURRENCY(maxSalePrice).format(),
                          maxDiscountAmt: CURRENCY(maxDiscountAmt).format(),
                      },
                  )
                : t('{{maxSalePrice}} 이하 구매시 사용 가능', {
                      maxSalePrice: CURRENCY(maxSalePrice).format(),
                  });
        }

        if (!noMin && noMax && minSalePrice) {
            return isMaxDiscountAmtVisible && minSalePrice > 0
                ? t(
                      '{{minSalePrice}} 이상 구매시 (최대 {{maxDiscountAmt}} 할인)',
                      {
                          minSalePrice: CURRENCY(minSalePrice).format(),
                          maxDiscountAmt: CURRENCY(maxDiscountAmt).format(),
                      },
                  )
                : t('{{minSalePrice}} 이상 구매시 사용 가능', {
                      minSalePrice: CURRENCY(minSalePrice).format(),
                  });
        }

        if (minSalePrice && maxSalePrice) {
            return isMaxDiscountAmtVisible
                ? t(
                      '{{minSalePrice}} 이상 {{maxSalePrice}} 이하 구매시 (최대 {{maxDiscountAmt}} 할인)',
                      {
                          minSalePrice: CURRENCY(minSalePrice).format(),
                          maxSalePrice: CURRENCY(maxSalePrice).format(),
                          maxDiscountAmt: CURRENCY(maxDiscountAmt).format(),
                      },
                  )
                : t(
                      '{{minSalePrice}} 이상 {{maxSalePrice}} 이하 구매시 사용 가능',
                      {
                          minSalePrice: CURRENCY(minSalePrice).format(),
                          maxSalePrice: CURRENCY(maxSalePrice).format(),
                      },
                  );
        }

        return t('사용 제한없음');
    };

    const getCouponConstraint = ({
        useDays,
        useEndYmdt,
    }: Pick<UseConstraint, 'useDays' | 'useEndYmdt'>) => {
        if (useEndYmdt) {
            return t('{{useEndYmdt}}까지 사용가능', {
                useEndYmdt: dayjs(useEndYmdt).format('YYYY.MM.DD'),
            });
        }

        if (useDays === -1) {
            return t('제한없음');
        }
        if (useDays === 31) {
            return t('월말까지 사용가능');
        }
        if (useDays === 0) {
            return t('당일만 사용가능');
        }
        if (useDays > 0) {
            return t('{{expireDate}}까지 사용 가능', {
                expireDate: dayjs().add(useDays, 'day').format('YYYY.MM.DD'),
            });
        }

        return '';
    };

    const getCouponIssueDate = ({
        issueEndYmdt,
    }: Pick<DateInfo, 'issueEndYmdt'>) => {
        const now = dayjs();
        const end = dayjs(issueEndYmdt);
        const diffInHours = end.diff(now, 'hour');
        const diffInDays = end.diff(now, 'day');

        if (diffInHours < 1) {
            return t('발급기한 {{minutes}}분 전', {
                minutes: end.diff(now, 'minutes'),
            });
        }
        if (diffInHours < 24) {
            return t('발급기한 {{hours}}시간 전', {
                hours: end.diff(now, 'hours'),
            });
        }

        return t('발급기한 {{days}}일 전', { days: diffInDays });
    };

    const getCouponType = (couponType: CouponType) => {
        switch (couponType) {
            case 'PRODUCT': {
                return t('상품할인');
            }
            case 'CART': {
                return t('주문할인');
            }
            case 'CART_DELIVERY': {
                return t('배송비할인');
            }
            case 'GIFT': {
                return t('기프트');
            }
            default: {
                return '';
            }
        }
    };

    return {
        getBenefitAmt,
        getPriceConstraint,
        getCouponConstraint,
        getCouponIssueDate,
        getCouponType,
    };
};
