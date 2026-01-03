import Link from 'next/link';

import { css } from '@/styled-system/css';

interface MyPageSummaryProps {
    memberName?: string;
    gradeLabel?: string;
    accumulationAmt?: number;
    couponCount?: number;
    reviewCount?: number;
}

export default function MyPageSummary({
    memberName = '홍길동',
    gradeLabel = 'WELCOME',
    accumulationAmt = 12500,
    couponCount = 3,
    reviewCount = 5,
}: MyPageSummaryProps) {
    return (
        <section
            className={css({
                width: '100%',
                backgroundColor: '#111',
                borderRadius: '8px',
                padding: '30px 40px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '40px',
            })}
        >
            {/* 왼쪽: 회원 정보 */}
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    paddingRight: '40px',
                    borderRight: '1px solid #333',
                    minWidth: '200px',
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
                    {memberName}님
                </div>
            </div>

            {/* 오른쪽: 통계 정보 (적립금, 쿠폰, 후기) */}
            <div
                className={css({
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                })}
            >
                <SummaryItem
                    label="적립금"
                    value={`${accumulationAmt.toLocaleString()}원`}
                />
                <SummaryItem label="보유쿠폰" value={`${couponCount}장`} />
                <SummaryItem label="후기 작성" value={`${reviewCount}건`} />
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
                _after: {
                    content: '""',
                    position: 'absolute',
                    right: '-40px', // 대략적인 구분선 위치 조정
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1px',
                    height: '40%',
                    backgroundColor: '#333',
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
                    fontSize: '20px',
                    fontWeight: 'bold',
                })}
            >
                {value}
            </span>
        </Link>
    );
}
