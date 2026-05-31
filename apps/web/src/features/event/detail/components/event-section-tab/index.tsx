import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/features/event/detail/components/event-section-tab/index.css';
import type { EventSection } from '@/entities/display/model';
import { BREAKPOINTS } from '@/styles/media';

interface EventSectionTabProps {
    sectionTabList: EventSection[];
    activeSectionNo: number;
    onTabClick: (sectionNo: number) => void;
}

const EventSectionTab = ({
    sectionTabList,
    activeSectionNo,
    onTabClick,
}: EventSectionTabProps) => {
    return (
        <nav className={styles.stickyTabWrapper} aria-label='기획전 섹션 탭'>
            <Swiper
                className={styles.tabInner}
                slidesPerView='auto'
                spaceBetween={4}
                breakpoints={{
                    [BREAKPOINTS.SM]: {
                        spaceBetween: 6,
                    },
                }}
            >

                {sectionTabList.map((tab) => {
                    return (
                        <SwiperSlide
                            key={tab.sectionNo}
                            style={{
                                width: 'auto',
                            }}
                        >
                            <button
                                key={tab.sectionNo}
                                className={clsx(
                                    styles.sectionTabButton,
                                    activeSectionNo === tab.sectionNo &&
                                        styles.sectionTabButtonActive,
                                )}
                                onClick={() => onTabClick(tab.sectionNo)}
                                aria-pressed={activeSectionNo === tab.sectionNo}
                            >
                                {tab.label === '' && tab.imageUrl ? (
                                    <img
                                        src={tab.imageUrl}
                                        alt='섹션 탭 이미지'
                                    />
                                ) : (
                                    <span>{tab.label}</span>
                                )}
                            </button>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </nav>
    );
};

export default EventSectionTab;
