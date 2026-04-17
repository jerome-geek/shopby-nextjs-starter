import { clsx } from 'clsx';
import * as styles from './index.css';
import type { EventSection } from '@/models/display';

interface EventSectionTabProps {
    sectionTabList: EventSection[];
    activeSectionNo: number | null;
    onTabClick: (sectionNo: number | null) => void;
}

const EventSectionTab = ({
    sectionTabList,
    activeSectionNo,
    onTabClick,
}: EventSectionTabProps) => {
    return (
        <nav className={styles.stickyTabWrapper} aria-label='기획전 섹션 탭'>
            <div className={styles.tabInner}>
                <button
                    className={clsx(
                        styles.sectionTabButton,
                        activeSectionNo === null &&
                            styles.sectionTabButtonActive,
                    )}
                    onClick={() => onTabClick(null)}
                    aria-pressed={activeSectionNo === null}
                >
                    전체
                </button>
                {sectionTabList.map((tab) => {
                    return (
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
                                <img src={tab.imageUrl} alt='섹션 탭 이미지' />
                            ) : (
                                <span>{tab.label}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default EventSectionTab;
