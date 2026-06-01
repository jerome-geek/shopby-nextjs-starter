import { SEARCH_TABS, type SearchTabId } from '@/features/search/constants';
import * as styles from '@/pages/search/index.css';

type SearchTabNavProps = {
    activeTab: SearchTabId;
    onTabChange: (tab: SearchTabId) => void;
};

export const SearchTabNav = ({
    activeTab,
    onTabChange,
}: SearchTabNavProps) => {
    return (
        <ul className={styles.tabList} role='tablist'>
            {SEARCH_TABS.map((tab) => (
                <li key={tab.id} className={styles.tabListItem}>
                    <button
                        type='button'
                        role='tab'
                        className={styles.tabButton}
                        data-selected={
                            activeTab === tab.id ? 'true' : undefined
                        }
                        aria-selected={activeTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                </li>
            ))}
        </ul>
    );
};
