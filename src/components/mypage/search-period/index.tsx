'use client';

import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { css } from '@/styled-system/css';
import { flex, hstack } from '@/styled-system/patterns';

type PeriodType = '7d' | '1m' | '3m' | '1y' | 'custom';

export default function MypageSearchPeriod() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const startYmd = searchParams.get('startYmd');
    const endYmd = searchParams.get('endYmd');

    // 현재 선택된 기간 스타일을 위한 판별 로직
    const getActivePeriod = (): PeriodType => {
        if (!startYmd || !endYmd) return '3m'; // 기본값 (페이지 초기 진입 시 등)

        const start = dayjs(startYmd);
        const end = dayjs(endYmd);
        const diffDays = end.diff(start, 'day');

        // 정확한 날짜 차이 체크 (월/년 단위는 dayjs diff 활용)
        if (diffDays === 7) return '7d';
        if (
            start.format('YYYY-MM-DD') ===
            end.subtract(1, 'month').format('YYYY-MM-DD')
        )
            return '1m';
        if (
            start.format('YYYY-MM-DD') ===
            end.subtract(3, 'month').format('YYYY-MM-DD')
        )
            return '3m';
        if (
            start.format('YYYY-MM-DD') ===
            end.subtract(1, 'year').format('YYYY-MM-DD')
        )
            return '1y';

        return 'custom';
    };

    const activePeriod = getActivePeriod();

    const handlePeriodChange = (period: PeriodType) => {
        if (period === 'custom') return; // 달력 미구현으로 일단 리턴

        const end = dayjs();
        let start = dayjs();

        switch (period) {
            case '7d':
                start = end.subtract(7, 'day');
                break;
            case '1m':
                start = end.subtract(1, 'month');
                break;
            case '3m':
                start = end.subtract(3, 'month');
                break;
            case '1y':
                start = end.subtract(1, 'year');
                break;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set('startYmd', start.format('YYYY-MM-DD'));
        params.set('endYmd', end.format('YYYY-MM-DD'));
        params.delete('pageNumber'); // 기간 변경 시 1페이지로 리셋

        // [사용자 요청] 히스토리가 쌓이지 않도록 replace 사용
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const periods: { label: string; value: PeriodType }[] = [
        { label: '7일', value: '7d' },
        { label: '1개월', value: '1m' },
        { label: '3개월', value: '3m' },
        { label: '1년', value: '1y' },
        { label: '직접입력', value: 'custom' },
    ];

    return (
        <section
            className={css({
                width: '100%',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                padding: { base: '20px', md: '24px 30px' },
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                alignItems: { base: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: '16px',
            })}
        >
            {/* 왼쪽: 기간 선택 버튼군 */}
            <div className={hstack({ gap: { base: '12px', md: '24px' } })}>
                {periods.map((period) => {
                    const isActive = activePeriod === period.value;
                    return (
                        <button
                            key={period.value}
                            type='button'
                            onClick={() => handlePeriodChange(period.value)}
                            className={css({
                                fontSize: '14px',
                                fontWeight: isActive ? '700' : '500',
                                color: isActive ? '#111' : '#888',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'color 0.2s ease',
                                _hover: { color: '#333' },
                            })}
                        >
                            {period.label}
                        </button>
                    );
                })}
            </div>

            {/* 오른쪽: 날짜 입력 필드 */}
            <div
                className={hstack({
                    gap: '8px',
                    width: { base: '100%', md: 'auto' },
                })}
            >
                <div
                    className={flex({
                        alignItems: 'center',
                        gap: '8px',
                        flex: { base: 1, md: 'none' },
                    })}
                >
                    <input
                        type='text'
                        readOnly
                        value={
                            startYmd ||
                            dayjs().subtract(3, 'month').format('YYYY-MM-DD')
                        }
                        className={dateInputStyle}
                    />
                    <span className={css({ color: '#ccc' })}>~</span>
                    <input
                        type='text'
                        readOnly
                        value={endYmd || dayjs().format('YYYY-MM-DD')}
                        className={dateInputStyle}
                    />
                </div>
            </div>
        </section>
    );
}

const dateInputStyle = css({
    width: { base: '100%', md: '140px' },
    height: '44px',
    backgroundColor: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '4px',
    padding: '0 12px',
    fontSize: '14px',
    color: '#333',
    textAlign: 'center',
    outline: 'none',
    cursor: 'pointer',
});
