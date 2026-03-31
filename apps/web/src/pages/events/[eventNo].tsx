import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

import EventProductSection from '@/components/event/detail/event-product-section';
import EventSectionTab from '@/components/event/detail/event-section-tab';
import EventTop from '@/components/event/detail/event-top';
import { useEvent } from '@/hooks/query/display/event';

import * as styles from '@/pages/events/[eventNo].css';

const EventDetailPage = () => {
    const router = useRouter();
    const { eventNo } = router.query;

    const eventKey = eventNo as string | number;

    const { data: eventData, isLoading } = useEvent({
        eventKey,
        searchParams: {
            includeNonMemberCoupon: true,
        },
    });

    const [activeSectionNo, setActiveSectionNo] = useState<number | null>(null);
    const setSectionList = useState<number[]>([])[1];

    const handleTabClick = useCallback((sectionNo: number | null) => {
        setActiveSectionNo(sectionNo);
    }, []);

    const visibleSections = useMemo(() => {
        if (!eventData) return [];
        if (activeSectionNo === null) return eventData.section;
        return eventData.section.filter((s) => s.sectionNo === activeSectionNo);
    }, [eventData, activeSectionNo]);

    if (isLoading) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.contentWrapper}>
                    <div
                        style={{
                            width: '100%',
                            height: '300px',
                            backgroundColor: '#F1F1F1',
                            borderRadius: '4px',
                        }}
                    />
                </div>
            </div>
        );
    }

    if (!eventData) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.noResult}>
                    <p>존재하지 않는 기획전입니다.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{eventData.label} | JollyPot</title>
                <meta
                    name='description'
                    content={
                        eventData.promotionText || `${eventData.label} 기획전`
                    }
                />
            </Head>

            <div className={styles.pageContainer}>
                {/* 상단 이미지 + 제목 영역 */}
                <div className={styles.topSection}>
                    <div className={styles.contentWrapper}>
                        <EventTop
                            label={eventData.label}
                            top={eventData.top}
                            promotionText={eventData.promotionText}
                        />
                    </div>
                </div>

                {/* 섹션 탭 */}
                {eventData.section.length > 1 && (
                    <EventSectionTab
                        sectionTabList={eventData.section}
                        activeSectionNo={activeSectionNo}
                        onTabClick={handleTabClick}
                    />
                )}

                <div className={styles.divisor} />

                {/* 상품 섹션 목록 */}
                <div className={styles.contentWrapper}>
                    <ul className={styles.productsSection} role='list'>
                        {visibleSections.map((section) => (
                            <EventProductSection
                                key={section.sectionNo}
                                eventNo={eventData.eventNo}
                                sectionNo={section.sectionNo}
                                setSectionList={setSectionList}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default EventDetailPage;
