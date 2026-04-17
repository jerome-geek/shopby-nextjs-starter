import { compact, isEmpty, isUndefined, pipe, sum } from '@fxts/core';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useCallback, useMemo, useState } from 'react';

import { event } from '@/api/display';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import Seo from '@/components/common/seo';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import EventErrorState from '@/components/event/detail/event-error-state';
import EventProductSection from '@/components/event/detail/event-product-section';
import EventSectionTab from '@/components/event/detail/event-section-tab';
import EventTop from '@/components/event/detail/event-top';
import { eventKeys } from '@/hooks/queryKeys';
import { useEvent } from '@/hooks/suspenseQuery/display/event';
import {
    GetEventParams,
    GetEventProductDisplaySectionParams,
    GetEventProductDisplaySectionResponse,
} from '@/models/display';
import * as styles from '@/pages/events/[eventNo].css';
import EventContents from '@/components/event/detail/event-contents';

const EventDetailView = ({
    eventNo,
    searchParams,
}: {
    eventNo: number;
    searchParams: GetEventParams;
}) => {
    const { data: eventData } = useEvent({
        eventKey: eventNo,
        searchParams,
    });

    const [activeSectionNo, setActiveSectionNo] = useState<number | null>(null);

    const handleTabClick = useCallback((sectionNo: number | null) => {
        setActiveSectionNo(sectionNo);
    }, []);

    const visibleSections = useMemo(() => {
        if (!eventData) {
            return [];
        }

        if (activeSectionNo === null) {
            return eventData.section;
        }

        return eventData.section.filter((s) => s.sectionNo === activeSectionNo);
    }, [eventData, activeSectionNo]);

    const productSectionSearchParams: GetEventProductDisplaySectionParams =
        useMemo(() => {
            return {
                pageNumber: 1,
                pageSize: 30,
                order: 'ADMIN_SETTING',
                // TODO: 추후 판매 상태 수정 필요
                // saleStatus: 'RESERVATION_AND_ONSALE',
                // includeStopProduct: true,
            };
        }, []);

    const queryClient = useQueryClient();

    const totalCount = useMemo(() => {
        if (!eventNo) {
            return;
        }

        try {
            const totalCountList = visibleSections.map((section) => {
                const data =
                    queryClient.getQueryData<GetEventProductDisplaySectionResponse>(
                        eventKeys.productSection(
                            Number(eventNo),
                            section.sectionNo,
                            productSectionSearchParams,
                        ),
                    );

                if (!data) {
                    return;
                }

                return data.totalCount;
            });

            if (totalCountList?.some((count) => isUndefined(count))) {
                return;
            }

            return pipe(totalCountList, compact, sum);
        } catch (error) {
            console.error(error);
            return;
        }
    }, [visibleSections, eventNo, productSectionSearchParams, queryClient]);

    console.log(eventData);

    return (
        <div className={styles.pageContainer}>
            {/* 상단 이미지 + 제목 영역 */}
            <div className={styles.topSection}>
                <div className={styles.contentWrapper}>
                    <EventTop
                        label={eventData.label}
                        imgUrlInfo={{
                            pc: eventData.pcImageUrl,
                            mobile: eventData.mobileimageUrl,
                        }}
                        promotionText={eventData.promotionText}
                    />
                </div>
            </div>

            <EventContents top={eventData.top} />

            {/* 섹션 탭 */}
            {!isEmpty(eventData.section) && (
                <>
                    <EventSectionTab
                        sectionTabList={eventData.section}
                        activeSectionNo={activeSectionNo}
                        onTabClick={handleTabClick}
                    />

                    <div className={styles.divisor} />

                    {/* 상품 섹션 목록 */}
                    <div className={styles.contentWrapper}>
                        {totalCount === 0 ? (
                            <NoResult text='진열된 상품이 없습니다.' />
                        ) : (
                            <ul className={styles.productsSection} role='list'>
                                {visibleSections.map((section) => (
                                    <EventProductSection
                                        key={section.sectionNo}
                                        eventNo={eventData.eventNo}
                                        sectionNo={section.sectionNo}
                                        searchParams={
                                            productSectionSearchParams
                                        }
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default function EventDetailPage({
    eventNo,
    searchParams,
    errorStatusCode,
    errorMessage,
    seoData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // 1단계 [비즈니스 에러]: API에서 받은 메시지를 그대로 사용자에게 노출
    if (errorStatusCode) {
        return (
            <EventErrorState
                errorStatusCode={errorStatusCode}
                errorMessage={errorMessage}
            />
        );
    }

    return (
        <>
            {seoData && <Seo type='event' {...seoData} />}

            <ShopbyApiErrorBoundary
                fallback={
                    <LoadingWrapper
                        isLoading
                        containerStyle={{
                            height: '50vh',
                        }}
                    >
                        <span />
                    </LoadingWrapper>
                }
            >
                <EventDetailView
                    eventNo={eventNo}
                    searchParams={searchParams}
                />
            </ShopbyApiErrorBoundary>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    res,
    params,
    query,
}) => {
    const queryClient = new QueryClient();

    const eventNo = Number(params?.eventNo) || 0;
    if (!eventNo) {
        return { notFound: true };
    }

    const searchParams = {
        preview: query.preview === 'true',
        includeNonMemberCoupon: true,
    };

    let seoData = null;

    try {
        const eventData = await queryClient.fetchQuery({
            queryKey: eventKeys.detail(eventNo, searchParams),
            queryFn: async () => {
                const { data } = await event.getEvent(eventNo, searchParams);

                return data;
            },
        });

        // ── SEO 데이터 추출 ──
        if (eventData?.label) {
            const { label, promotionText } = eventData;

            const title = `${label} | JollyPot`;

            const description = promotionText || `${label} 기획전`;

            const image =
                eventData.pcImageUrl || eventData.mobileimageUrl || '';

            const url = `${
                process.env.NEXT_PUBLIC_BASE_URL || ''
            }/events/${eventNo}`;

            seoData = {
                title,
                description,
                image,
                url,
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@type': 'Event',
                    name: label,
                    image,
                    description,
                },
            };
        }
    } catch (error) {
        if (isAxiosError(error)) {
            const status =
                error.response?.status || HttpStatusCode.InternalServerError;

            // ⚠️ [비즈니스 에러]: 4xx 에러 (권한 없음, 존재하지 않음 등) 처리
            if (status >= 400 && status < 500) {
                res.statusCode = status; // SEO 대응

                return {
                    props: {
                        eventNo,
                        searchParams,
                        errorStatusCode: status,
                        errorMessage:
                            error.response?.data?.message ||
                            '기획전을 불러올 수 없습니다.',
                    },
                };
            }

            // [시스템 에러]: 5xx 에러는 그대로 두어 클라이언트 ErrorBoundary 유도
            console.warn('🚀 getServerSideProps fetch failure:', error);
        }
    }

    return {
        props: {
            eventNo,
            searchParams,
            seoData,
            dehydratedState: dehydrate(queryClient),
        },
    };
};
