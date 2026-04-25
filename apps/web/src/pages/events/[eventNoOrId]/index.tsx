import { compact, isEmpty, isUndefined, pipe, sum } from '@fxts/core';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import { useCallback, useMemo, useState } from 'react';

import { event } from '@/api/display';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import Seo from '@/components/common/seo';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import EventContents from '@/components/event/detail/event-contents';
import EventErrorState from '@/components/event/detail/event-error-state';
import EventProductSection from '@/components/event/detail/event-product-section';
import EventSectionTab from '@/components/event/detail/event-section-tab';
import EventTop from '@/components/event/detail/event-top';
import { eventKeys } from '@/hooks/queryKeys';
import { useEvent } from '@/hooks/suspenseQuery/display/event';
import { ONE_HOUR_IN_SECONDS, ONE_MINUTE_IN_SECONDS } from '@/const/time';
import {
    GetEventParams,
    GetEventProductDisplaySectionParams,
    GetEventProductDisplaySectionResponse,
} from '@/models/display';

import * as styles from '@/pages/events/[eventNoOrId]/index.css';

interface EventDetailViewProps {
    eventKey: string | number;
    searchParams: GetEventParams;
}

const EventDetailView = ({ eventKey, searchParams }: EventDetailViewProps) => {
    const { data: eventData } = useEvent({
        eventKey,
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
        if (!eventKey) {
            return;
        }

        try {
            const totalCountList = visibleSections.map((section) => {
                const data =
                    queryClient.getQueryData<GetEventProductDisplaySectionResponse>(
                        eventKeys.productSection(
                            Number(eventData.eventNo),
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
    }, [
        visibleSections,
        eventKey,
        eventData.eventNo,
        productSectionSearchParams,
        queryClient,
    ]);

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
    eventKey,
    searchParams,
    errorStatusCode,
    errorMessage,
    seoData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
                    eventKey={eventKey}
                    searchParams={searchParams}
                />
            </ShopbyApiErrorBoundary>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], // 초기 빌드 시에는 비워두고 접속 시 생성 (blocking)
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();

    const eventNoOrId = (params?.eventNoOrId as string) || '';
    if (!eventNoOrId) {
        return { notFound: true };
    }

    // 숫자인 경우 숫자로 변환, 아니면 문자열 그대로 사용
    const eventKey = !isNaN(Number(eventNoOrId))
        ? Number(eventNoOrId)
        : eventNoOrId;

    const searchParams = {
        preview: false, // ISR에서는 빌드 시점/백그라운드 갱신 시점이므로 preview는 false가 기본
        includeNonMemberCoupon: true,
    };

    let seoData = null;

    try {
        const eventData = await queryClient.fetchQuery({
            queryKey: eventKeys.detail(eventKey, searchParams),
            queryFn: async () => {
                if (typeof eventKey === 'string') {
                    const { data } = await event.getEventById(
                        eventKey,
                        searchParams,
                    );
                    return data;
                }
                const { data } = await event.getEvent(eventKey, searchParams);

                return data;
            },
        });

        // ── SEO 데이터 추출 ──
        if (eventData?.label) {
            const { label, promotionText } = eventData;
            const description = promotionText || `${label} 기획전`;
            const image =
                eventData.pcImageUrl || eventData.mobileimageUrl || '';
            const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/events/${eventData.eventNo}`;

            seoData = {
                title: label,
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

            if (status >= 400 && status < 500) {
                return {
                    props: {
                        eventKey,
                        searchParams,
                        errorStatusCode: status,
                        errorMessage:
                            error.response?.data?.message ||
                            '기획전을 불러올 수 없습니다.',
                    },
                    revalidate: ONE_MINUTE_IN_SECONDS, // 에러 발생 시 짧은 주기로 재시도
                };
            }
        }
        return { notFound: true };
    }

    return {
        props: {
            eventKey,
            searchParams,
            seoData,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: ONE_HOUR_IN_SECONDS,
    };
};
