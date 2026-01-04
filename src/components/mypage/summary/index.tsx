import dayjs from 'dayjs';
import Link from 'next/link';

import { accumulation } from '@/api/manage';
import { getCachedProfile } from '@/api/member/profile.server';
import { coupon } from '@/api/promotion';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { KRW } from '@/utils/currency';

interface MyPageSummaryProps {
    gradeLabel?: string;
    reviewCount?: number;
}

export default async function MyPageSummary({
    gradeLabel = 'WELCOME',
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
        coupon.getCouponSummary().json(),
    ]);
    console.log('🚀 ~ MyPageSummary ~ profileData:', profileData);

    return (
        <section
            className={css({
                width: '100%',
                backgroundColor: '#111',
                borderRadius: '8px',
                padding: { base: '20px', md: '30px 40px' },
                color: '#fff',
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                alignItems: { base: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                marginBottom: { base: '30px', md: '40px' },
                gap: { base: '20px', md: '0' },
            })}
        >
            {/* 왼쪽: 회원 정보 */}
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    paddingRight: { base: '0', md: '40px' },
                    paddingBottom: { base: '20px', md: '0' },
                    borderRight: { base: 'none', md: '1px solid #333' },
                    borderBottom: { base: '1px solid #333', md: 'none' },
                    minWidth: { base: '100%', md: '200px' },
                    width: { base: '100%', md: 'auto' },
                })}
            >
                <div
                    className={css({
                        fontSize: '14px',
                        color: '#ddd',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    })}
                >
                    {gradeLabel}
                    <span className={css({ fontSize: '12px' })}>{'>'}</span>
                </div>
                <div
                    className={css({
                        fontSize: '24px',
                        fontWeight: 'bold',
                    })}
                >
                    {t('{{memberName}}님', {
                        memberName: profileData.memberName,
                    })}
                </div>
            </div>

            {/* 오른쪽: 통계 정보 (적립금, 쿠폰, 후기) */}
            <div
                className={css({
                    display: 'flex',
                    flex: 1,
                    width: '100%',
                    justifyContent: 'space-around',
                    paddingTop: { base: '10px', md: '0' },
                })}
            >
                <SummaryItem
                    label={t('적립금')}
                    value={KRW(accumulationData.totalAvailableAmt).format()}
                />
                <SummaryItem
                    label={t('보유쿠폰')}
                    value={t('{{couponCount}}장', {
                        couponCount: couponData.usableCouponCnt,
                    })}
                />
                <SummaryItem
                    label={t('후기 작성')}
                    value={t('{{reviewCount}}건', {
                        reviewCount,
                    })}
                />
            </div>
        </section>
    );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <Link
            href="#"
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
                padding: '0 20px',
                whiteSpace: 'nowrap',
                _after: {
                    content: '""',
                    position: 'absolute',
                    right: { base: '-10px', sm: '-20px', md: '-40px' },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '40%',
                    backgroundColor: '#333',
                    display: 'block',
                },
                _last: {
                    _after: {
                        display: 'none',
                    },
                },
            })}
        >
            <span
                className={css({
                    fontSize: '13px',
                    color: '#888',
                })}
            >
                {label}
            </span>
            <span
                className={css({
                    fontSize: { base: '18px', md: '20px' },
                    fontWeight: 'bold',
                })}
            >
                {value}
            </span>
        </Link>
    );
}
