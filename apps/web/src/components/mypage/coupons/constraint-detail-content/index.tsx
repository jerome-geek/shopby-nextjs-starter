import { compact, isEmpty, pipe, toArray } from '@fxts/core';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useCoupons } from '@/hooks/utils/useCoupons';
import type { Coupon } from '@/models/promotion';
import type { PlatformType } from '@/models';

import * as styles from '@/components/mypage/coupons/constraint-detail-content/index.css';

type UsablePlatform = Omit<PlatformType, 'RESPONSIVE'>;

type ConstraintDetailSection = {
    id: string;
    title: string;
    values: string[];
    wrap?: boolean;
};

const formatPlatformLabel = (
    platform: UsablePlatform,
    translate: (key: string) => string,
) => {
    switch (platform) {
        case 'PC': {
            return translate('PC');
        }
        case 'MOBILE_WEB': {
            return translate('모바일웹');
        }
        case 'MOBILE_APP': {
            return translate('앱');
        }
        default: {
            return '';
        }
    }
};

interface CouponConstraintDetailContentProps {
    coupon: Coupon;
    showExpireSection?: boolean;
}

export const CouponConstraintDetailContent = ({
    coupon,
    showExpireSection = false,
}: CouponConstraintDetailContentProps) => {
    const { t } = useTranslation();
    const { getPriceConstraint } = useCoupons();

    const platformLine = coupon.usablePlatforms
        .map((platform) => formatPlatformLabel(platform, t))
        .filter(Boolean)
        .join(', ');

    const priceLine = getPriceConstraint(
        coupon.minSalePrice,
        coupon.maxSalePrice,
        coupon.maxDiscountAmt,
    );

    const limitLines = pipe(
        [
            coupon.cartCouponUsable ? null : t('장바구니 쿠폰 사용 불가'),
            coupon.productCouponUsable ? null : t('상품 쿠폰 사용 불가'),
            coupon.skipsAccumulation ? t('적립금 적립 불가') : null,
        ],
        compact,
        toArray,
    );

    const sections = pipe(
        [
            platformLine
                ? ({
                      id: 'usablePlatforms',
                      title: t('사용 가능 플랫폼'),
                      values: [platformLine],
                  } satisfies ConstraintDetailSection)
                : null,
            {
                id: 'maxDiscountAmt',
                title: t('최대 할인금액'),
                values: [priceLine],
                wrap: true,
            } satisfies ConstraintDetailSection,
            !isEmpty(limitLines)
                ? ({
                      id: 'usableLimit',
                      title: t('사용 시 혜택 제한'),
                      values: limitLines,
                  } satisfies ConstraintDetailSection)
                : null,
            showExpireSection
                ? ({
                      id: 'expireYmdt',
                      title: t('만료일'),
                      values: [
                          dayjs(coupon.useEndYmdt).format(
                              'YYYY-MM-DD HH:mm:ss',
                          ),
                      ],
                  } satisfies ConstraintDetailSection)
                : null,
        ],
        compact,
        toArray,
    );

    return (
        <div className={styles.list}>
            {sections.map((section) => (
                <div key={section.id} className={styles.item}>
                    <p className={styles.title}>{section.title}</p>
                    <ul className={styles.valueList}>
                        {section.values.map((value) => (
                            <li
                                key={`${section.id}-${value}`}
                                className={
                                    section.wrap
                                        ? styles.valueItemWrap
                                        : styles.valueItem
                                }
                            >
                                {`- ${value}`}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
