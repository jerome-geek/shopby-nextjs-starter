'use client';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { useInfiniteAccumulationList } from '@/hooks/infiniteQueries/manage/accumulation';
import useMediaQuery from '@/hooks/useMediaQuery';
import {
    GetAccumulationsParams,
    GetAccumulationsResponse,
} from '@/models/manage/accumulation';
import { POINT } from '@/utils/currency';

interface AccumulationListProps {
    searchParams: GetAccumulationsParams;
    initialData: {
        data: GetAccumulationsResponse;
        pageNumber: number;
    }[];
    isMobile: boolean;
}

export default function AccumulationList({
    searchParams,
    initialData,
    isMobile,
}: AccumulationListProps) {
    const { t } = useTranslation();

    // [Client] 실시간 화면 크기 감지
    const isMobileView = useMediaQuery('(max-width: 1023px)');
    // 서버에서 받은 UA 정보와 클라이언트 뷰포트 정보를 조합 (Hydration 전에는 UA 정보 사용)
    const activeIsMobile = isMobileView ?? isMobile;

    const {
        data: infiniteAccumulationListData,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteAccumulationList({
        searchParams,
        initialPageParam: initialData[0]?.pageNumber || 1,
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

    // PC 모드(넓은 화면)일 때는 서버에서 받은 해당 페이지 데이터만,
    // 모바일 모드(좁은 화면)일 때는 무한 스크롤 누적 데이터를 보여줍니다.
    const accumulationList = useMemo(() => {
        if (!activeIsMobile) {
            // PC: 현재 URL에 해당하는 페이지 데이터(initialData의 마지막 항목)만 표시
            return initialData[initialData.length - 1].data.items;
        }
        // Mobile: 무한 스크롤 누적 데이터 표시
        return (
            infiniteAccumulationListData?.pages?.flatMap(
                (page) => page.data.items,
            ) ?? []
        );
    }, [activeIsMobile, initialData, infiniteAccumulationListData]);

    // 모바일 모드에서 [더보기] 클릭 시 URL의 pageNumber를 최신 페이지로 업데이트 (새로고침 시 상태 유지용)
    useEffect(() => {
        if (
            activeIsMobile &&
            !isFetchingNextPage &&
            infiniteAccumulationListData
        ) {
            const pages = infiniteAccumulationListData.pages;
            const lastPage = pages[pages.length - 1];
            const currentPage = lastPage?.pageNumber;

            if (currentPage && currentPage > 1) {
                const params = new URLSearchParams(window.location.search);
                if (params.get('pageNumber') !== currentPage.toString()) {
                    params.set('pageNumber', currentPage.toString());
                    const newUrl = `${window.location.pathname}?${params.toString()}`;
                    window.history.replaceState(
                        { ...window.history.state, as: newUrl, url: newUrl },
                        '',
                        newUrl,
                    );
                }
            }
        }
    }, [infiniteAccumulationListData, activeIsMobile, isFetchingNextPage]);

    const getExpireYmdt = ({
        registerYmdt,
        expireYmdt,
    }: {
        registerYmdt: string;
        expireYmdt: string;
    }) => {
        if (expireYmdt === null) {
            return '-';
        }

        if (dayjs(expireYmdt).format('YYYY') === '9999') {
            return t('제한없음');
        }

        return isMobile
            ? `${dayjs(registerYmdt).format('YYYY-MM-DD HH:mm:ss')} ~ ${dayjs(
                  expireYmdt,
              ).format('YYYY-MM-DD HH:mm:ss')}`
            : `${dayjs(registerYmdt).format('YYYY-MM-DD HH:mm:ss')}
        <br/>
        ~
        <br/>
        ${dayjs(expireYmdt).format('YYYY-MM-DD HH:mm:ss')}`;
    };

    // 컬럼 비율 설정 (PC용)
    const gridTemplate = '1.5fr 3fr 1fr 1fr 3fr';

    return (
        <div className={css({ width: '100%' })}>
            {/* Header (PC 전용 - activeIsMobile이 false일 때만 노출) */}
            {!activeIsMobile && (
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
                    <div className={css({ textAlign: 'left', pl: '20px' })}>
                        {t('적립내역')}
                    </div>
                    <div>{t('적립')}</div>
                    <div>{t('차감')}</div>
                    <div>{t('유효기간')}</div>
                </div>
            )}

            {/* List Items */}
            <div className={css({ display: 'flex', flexDirection: 'column' })}>
                {accumulationList.map((item, index) => (
                    <div
                        key={`${item.accumulationNo}-${index}`}
                        className={css({
                            display: 'grid',
                            // 화면 모드에 따른 그리드 레이아웃 전환
                            gridTemplateColumns: activeIsMobile
                                ? '1fr auto'
                                : gridTemplate,
                            gridTemplateRows: activeIsMobile
                                ? 'auto auto'
                                : '1fr',
                            borderBottom: '1px solid #eee',
                            textAlign: activeIsMobile ? 'left' : 'center',
                            alignItems: 'center',
                            py: '20px',
                            px: activeIsMobile ? '20px' : '0',
                            gap: activeIsMobile ? '8px 0' : '0',
                            fontSize: '14px',
                            color: '#666',
                            _hover: { backgroundColor: '#fafafa' },
                            transition: 'background-color 0.2s',
                        })}
                    >
                        {/* 일자 */}
                        <div
                            className={css({
                                gridColumn: activeIsMobile ? '1 / 2' : 'auto',
                                fontSize: activeIsMobile ? '12px' : '14px',
                                color: '#999',
                            })}
                        >
                            <span
                                className={css({
                                    textStyle: 'body1.regular',
                                })}
                            >
                                {dayjs(item.registerYmdt).format('YYYY-MM-DD')}
                                <br />
                                {dayjs(item.registerYmdt).format('HH:mm:ss')}
                            </span>
                        </div>

                        {/* 적립내역 */}
                        <div
                            className={css({
                                gridColumn: activeIsMobile ? '1 / 2' : 'auto',
                                gridRow: activeIsMobile ? '2 / 3' : 'auto',
                                color: token('colors.black'),
                                fontWeight: '500',
                                textAlign: 'left',
                                pr: '10px',
                                pl: !activeIsMobile ? '20px' : '0',
                            })}
                        >
                            <span>{item.accumulationReserveReasonDisplay}</span>
                            <br />
                            {item.reasonDetail && (
                                <span>({item.reasonDetail})</span>
                            )}
                        </div>

                        {/* 적립/차감 금액 */}
                        <div
                            className={css({
                                gridColumn: activeIsMobile ? '2 / 3' : '3 / 4',
                                gridRow: activeIsMobile ? '1 / 2' : 'auto',
                                textAlign: activeIsMobile ? 'right' : 'center',
                                fontWeight: 'bold',
                                color:
                                    item.accumulationStatusGroupType ===
                                    'PAYMENT'
                                        ? token('colors.black')
                                        : '#222',
                            })}
                        >
                            {item.accumulationStatusGroupType === 'PAYMENT' ? (
                                <span className={css({ color: '#ff4d4f' })}>
                                    {POINT(item.accumulationAmt).format()}
                                </span>
                            ) : (
                                '-'
                            )}
                        </div>

                        <div
                            className={css({
                                gridColumn: activeIsMobile ? '2 / 3' : '4 / 5',
                                gridRow: activeIsMobile ? '2 / 3' : 'auto',
                                textAlign: activeIsMobile ? 'right' : 'center',
                                color: token('colors.black'),
                                display: {
                                    base:
                                        item.accumulationStatusGroupType ===
                                            'DEDUCTION' || !activeIsMobile
                                            ? 'block'
                                            : 'none',
                                },
                            })}
                        >
                            <span>
                                {item.accumulationStatusGroupType ===
                                'DEDUCTION'
                                    ? POINT(item.accumulationAmt)
                                          .multiply(-1)
                                          .format()
                                    : '-'}
                            </span>
                        </div>

                        {/* 유효기간 */}
                        <div
                            className={css({
                                gridColumn: activeIsMobile ? '1 / 3' : 'auto',
                                gridRow: activeIsMobile ? '3 / 4' : 'auto',
                                fontSize: '12px',
                                color: '#999',
                                textAlign: activeIsMobile ? 'left' : 'center',
                                mt: activeIsMobile ? '4px' : '0',
                                display:
                                    item.accumulationStatusGroupType ===
                                    'PAYMENT'
                                        ? 'block'
                                        : activeIsMobile
                                          ? 'none'
                                          : 'block',
                            })}
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: getExpireYmdt({
                                        registerYmdt: item.registerYmdt,
                                        expireYmdt: item.expireYmdt,
                                    }),
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Manual 'More' Button (모바일 모드일 때만 노출) */}
            {activeIsMobile && (
                <div
                    className={css({
                        mt: '24px',
                        px: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                    })}
                >
                    {hasNextPage ? (
                        <Button
                            frame='outlined'
                            variant='primary'
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className={css({ width: '100%!', py: '12px!' })}
                        >
                            <span>
                                {isFetchingNextPage
                                    ? t('로딩 중...')
                                    : t('더보기')}
                            </span>
                        </Button>
                    ) : (
                        <span
                            className={css({
                                fontSize: '13px',
                                color: '#999',
                                py: '20px',
                            })}
                        >
                            {t('마지막 내역입니다.')}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
