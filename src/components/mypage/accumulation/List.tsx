'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef } from 'react';
import dayjs from 'dayjs';

import {
    GetAccumulationsParams,
    GetAccumulationsResponse,
} from '@/models/manage/accumulation';
import { css } from '@/styled-system/css';
import { useInfiniteAccumulationList } from '@/hooks/infiniteQueries/manage/accumulation';
import { token } from '@/styled-system/tokens';
import { POINT } from '@/utils/currency';

interface AccumulationListProps {
    searchParams: GetAccumulationsParams;
    initialData: {
        data: GetAccumulationsResponse;
        pageNumber: number;
    }[];
}

export default function AccumulationList({
    searchParams,
    initialData,
}: AccumulationListProps) {
    const { t } = useTranslation();

    const {
        data: infiniteAccumulationListData,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteAccumulationList({
        searchParams,
        initialPageParam: searchParams.pageNumber || 1,
        options: {
            initialData: {
                pages: initialData.map((item) => ({
                    data: item.data,
                    pageNumber: item.pageNumber,
                })),
                pageParams: initialData.map((item) => item.pageNumber),
            },
        },
    });

    const accumulationList = useMemo(() => {
        return (
            infiniteAccumulationListData?.pages?.flatMap(
                (page) => page.data.items
            ) ?? []
        );
    }, [infiniteAccumulationListData]);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 컬럼 비율 설정
    const gridTemplate = '1.5fr 3fr 1fr 1fr 3fr';

    return (
        <div className={css({ width: '100%', mt: '40px' })}>
            {/* Header */}
            <div
                className={css({
                    display: 'grid',
                    gridTemplateColumns: gridTemplate,
                    backgroundColor: '#f9f9f9',
                    borderTop: '2px solid #333',
                    borderBottom: '1px solid #eee',
                    textAlign: 'center',
                    py: '15px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#333',
                })}
            >
                <div>{t('일자')}</div>
                <div>{t('적립내역')}</div>
                <div>{t('적립')}</div>
                <div>{t('차감')}</div>
                <div>{t('유효기간')}</div>
            </div>

            {/* List Items */}
            <div className={css({ display: 'flex', flexDirection: 'column' })}>
                {accumulationList.map((item, index) => (
                    <div
                        key={`${item.accumulationNo}-${index}`}
                        className={css({
                            display: 'grid',
                            gridTemplateColumns: gridTemplate,
                            borderBottom: '1px solid #eee',
                            textAlign: 'center',
                            alignItems: 'center',
                            py: '20px',
                            fontSize: '14px',
                            color: '#666',
                            _hover: { backgroundColor: '#fafafa' },
                            transition: 'background-color 0.2s',
                        })}
                    >
                        <div>{item.registerYmdt}</div>
                        <div
                            className={css({
                                textAlign: 'center',
                                color: token('colors.black'),
                                fontWeight: '500',
                                px: '10px',
                            })}
                        >
                            {item.accumulationReserveReasonDisplay}
                        </div>
                        <div
                            className={css({
                                fontWeight: 'bold',
                                color: '#222',
                            })}
                        >
                            {item.accumulationStatusGroupType === 'PAYMENT'
                                ? POINT(item.accumulationAmt).format()
                                : '-'}
                        </div>
                        <div>
                            {item.accumulationStatusGroupType === 'DEDUCTION'
                                ? POINT(item.accumulationAmt).format()
                                : '-'}
                        </div>
                        <div
                            className={css({ fontSize: '13px', color: '#999' })}
                        >
                            {item.accumulationStatusGroupType === 'PAYMENT'
                                ? `${dayjs(item.startYmdt).format('YYYY-MM-DD')} ~ ${dayjs(item.expireYmdt).format('YYYY-MM-DD')}`
                                : '-'}
                        </div>
                    </div>
                ))}
            </div>

            {/* Infinite Scroll Trigger (Mobile Only) */}
            <div
                ref={loadMoreRef}
                className={css({
                    height: '20px',
                    display: { base: 'block', lg: 'none' },
                })}
            />
        </div>
    );
}
