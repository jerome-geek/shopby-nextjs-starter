import { useState } from 'react';

import * as styles from '@/components/product/productTabs/index.css';

interface ProductTabsProps {
    reviewCount?: number;
    inquiryCount?: number;
    productContent?: string;
}

export default function ProductTabs({
    reviewCount = 0,
    inquiryCount = 0,
    productContent,
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'info' | 'review' | 'inquiry'>(
        'info',
    );

    return (
        <div>
            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'info' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('info')}
                >
                    상품 정보
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'review' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('review')}
                >
                    리뷰 ({reviewCount})
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'inquiry' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('inquiry')}
                >
                    상품 문의 ({inquiryCount})
                </button>
            </div>

            <div className={styles.tabContentContainer}>
                {activeTab === 'info' && (
                    <div className={styles.descriptionSection}>
                        <h3 className={styles.descriptionTitle}>상품 설명</h3>
                        <div
                            className={styles.descriptionText}
                            dangerouslySetInnerHTML={{
                                __html: productContent || '',
                            }}
                        />
                    </div>
                )}
                {activeTab === 'review' && (
                    <div className={styles.descriptionSection}>
                        <p className={styles.descriptionText}>
                            리뷰 영역을 구현 중입니다.
                        </p>
                    </div>
                )}
                {activeTab === 'inquiry' && (
                    <div className={styles.descriptionSection}>
                        <p className={styles.descriptionText}>
                            상품 문의 영역을 구현 중입니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
