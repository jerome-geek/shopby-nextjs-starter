import dayjs from 'dayjs';
import Link from 'next/link';

import { accumulation } from '@/api/manage';
import { getCachedProfile } from '@/api/member/profile.server';
import { getCachedCouponSummary } from '@/api/promotion/coupon.server';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { flex, hstack, vstack } from '@/styled-system/patterns';
import { KRW } from '@/utils/currency';

interface MyPageSummaryProps {
    reviewCount?: number;
}

export default async function MyPageSummary({
    reviewCount = 5,
}: MyPageSummaryProps) {
    const { t } = await getTranslation();

    const [profileData, accumulationData, couponData] = await Promise.all([
        getCachedProfile(),
        accumulation
            .getAccumulationSummary({
                expireStartYmdt: dayjs()
                    .subtract(3, 'month')
                    .format('YYYY-MM-DD HH:mm:ss'),
                expireEndYmdt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            })
            .json(),
        getCachedCouponSummary(),
    ]);

    return (
        <section
            className={css({
                width: '100%',
                backgroundColor: '#151515',
                borderRadius: '12px',
                padding: { base: '24px', md: '44px 50px' },
                color: '#fff',
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                alignItems: { base: 'stretch', md: 'center' },
                marginBottom: { base: '30px', md: '40px' },
            })}
        >
            {/* 왼쪽: 회원 정보 */}
            <div
                className={vstack({
                    alignItems: 'flex-start',
                    gap: '6px',
                    paddingRight: { base: '0', md: '50px' },
                    paddingBottom: { base: '24px', md: '0' },
                    borderRight: { base: 'none', md: '1px solid #333' },
                    borderBottom: { base: '1px solid #333', md: 'none' },
                    minWidth: { md: '260px' },
                })}
            >
                <Link
                    href='#'
                    className={hstack({
                        fontSize: '14px',
                        color: '#eee',
                        fontWeight: '500',
                        gap: '4px',
                        _hover: { color: '#fff' },
                    })}
                >
                    {profileData.memberGradeName}
                    <span
                        className={css({ fontSize: '12px', marginTop: '1px' })}
                    >
                        &gt;
                    </span>
                </Link>
                <h2
                    className={css({
                        fontSize: { base: '22px', md: '26px' },
                        fontWeight: '700',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.3,
                    })}
                >
                    {t('{{memberName}}님', {
                        memberName: profileData.memberName,
                    })}
                </h2>
            </div>

            {/* 오른쪽: 통계 정보 (적립금, 쿠폰, 후기) */}
            <div
                className={flex({
                    flex: 1,
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingLeft: { base: '0', md: '10px' },
                    paddingTop: { base: '24px', md: '0' },
                })}
            >
                <SummaryItem
                    label={t('적립금')}
                    value={KRW(accumulationData.totalAvailableAmt).format()}
                    href='/mypage/accumulations'
                />
                <SummaryItem
                    label={t('보유쿠폰')}
                    value={t('{{couponCount}}장', {
                        couponCount: couponData.usableCouponCnt,
                    })}
                    href='/mypage/coupons'
                />
                <SummaryItem
                    label={t('후기 작성')}
                    value={t('{{reviewCount}}건', {
                        reviewCount,
                    })}
                    href='/mypage/reviews/writeable'
                    isLast
                />
            </div>
        </section>
    );
}

interface SummaryItemProps {
    label: string;
    value: string;
    href: string;
    isLast?: boolean;
}

function SummaryItem({ label, value, href, isLast }: SummaryItemProps) {
    return (
        <Link
            href={href}
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                gap: '8px',
                position: 'relative',
                transition: 'all 0.2s ease',
                _hover: {
                    transform: 'translateY(-2px)',
                    '& span:first-child': { color: '#aaa' },
                },
                _after: !isLast
                    ? {
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '1px',
                          height: '24px',
                          backgroundColor: '#333',
                      }
                    : {},
            })}
        >
            <span
                className={css({
                    fontSize: '13px',
                    color: '#888',
                    fontWeight: '500',
                })}
            >
                {label}
            </span>
            <span
                className={css({
                    fontSize: { base: '18px', md: '22px' },
                    fontWeight: '700',
                    color: '#fff',
                })}
            >
                {value}
            </span>
        </Link>
    );
}
