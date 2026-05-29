import { isEmpty } from '@fxts/core';
import { SuspenseQuery } from '@suspensive/react-query';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import { Fragment, useCallback, useMemo, useState } from 'react';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import Seo from '@/shared/components/common/seo';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { bannerListOptions } from '@/entities/banner/queries';
import { eventDetailOptions } from '@/entities/event/queries';
import EventContents from '@/features/event/detail/components/event-contents';
import { EventCoupons } from '@/features/event/detail/components/event-coupons';
import { EventDetailHero } from '@/features/event/detail/components/event-detail-hero';
import { EventDetailHeroSkeleton } from '@/features/event/detail/components/event-detail-hero/skeleton';
import EventErrorState from '@/features/event/detail/components/event-error-state';
import EventProductSection from '@/features/event/detail/components/event-product-section';
import EventSectionTab from '@/features/event/detail/components/event-section-tab';
import { useEvent } from '@/hooks/suspenseQuery/display/event';
import * as styles from '@/pages/events/[eventNoOrId]/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

interface EventDetailViewProps {
    eventKey: string | number;
    searchParams: {
        preview: boolean;
        includeNonMemberCoupon: boolean;
    };
}

const EventDetailView = ({ eventKey, searchParams }: EventDetailViewProps) => {
    const { data: eventData } = useEvent({
        eventKey,
        searchParams,
    });

    const [activeSectionNo, setActiveSectionNo] = useState<number | null>(
        eventData.section?.[0]?.sectionNo ?? null,
    );

    const handleTabClick = useCallback((sectionNo: number) => {
        setActiveSectionNo(sectionNo);
    }, []);

    const visibleSection = useMemo(() => {
        if (activeSectionNo === null) {
            return null;
        }

        return (
            eventData.section.find((s) => s.sectionNo === activeSectionNo) ??
            null
        );
    }, [eventData.section, activeSectionNo]);

    return (
        <div className={styles.pageContainer}>
            <ShopbyAsyncBoundary fallback={<EventDetailHeroSkeleton />}>
                <SuspenseQuery
                    {...bannerListOptions({
                        type: 'id',
                        banners: [eventKey.toString()],
                    })}
                >
                    {({ data: bannerData }) => {
                        return (
                            <EventDetailHero
                                bannerData={bannerData}
                                label={eventData.label}
                                promotionText={eventData.promotionText}
                                pcImageUrl={eventData.pcImageUrl}
                                mobileImageUrl={eventData.mobileimageUrl}
                            />
                        );
                    }}
                </SuspenseQuery>
            </ShopbyAsyncBoundary>

            {eventData.orders.map((order, index) => {
                const key = `${order}-${index}`;

                switch (order) {
                    case 'TOP':
                        return <EventContents key={key} top={eventData.top} />;

                    case 'COUPONS':
                        return <EventCoupons key={key} eventKey={eventKey} />;

                    case 'SECTIONS':
                        if (isEmpty(eventData.section) || !visibleSection) {
                            return null;
                        }

                        return (
                            <Fragment key={key}>
                                <EventSectionTab
                                    sectionTabList={eventData.section}
                                    activeSectionNo={activeSectionNo!}
                                    onTabClick={handleTabClick}
                                />

                                <div className={styles.divisor} />

                                {/* 상품 섹션 목록 - 내부에서 Suspense/ErrorBoundary/Pagination 처리 */}
                                <div className={styles.contentWrapper}>
                                    <EventProductSection
                                        key={visibleSection.sectionNo}
                                        eventNo={eventData.eventNo}
                                        sectionNo={visibleSection.sectionNo}
                                    />
                                </div>
                            </Fragment>
                        );

                    default:
                        return null;
                }
            })}
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
        preview: false,
        includeNonMemberCoupon: true,
    };

    let seoData = null;

    try {
        const eventData = await queryClient.fetchQuery(
            eventDetailOptions({ eventKey, searchParams }),
        );

        // ── SEO 데이터 추출 ──
        if (eventData?.label) {
            const { label, promotionText } = eventData;
            const description = promotionText || `${label} 기획전`;
            const image =
                eventData.pcImageUrl || eventData.mobileimageUrl || '';
            const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/events/${
                eventData.eventNo
            }`;

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
                    revalidate: ONE_HOUR_IN_SECONDS,
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
