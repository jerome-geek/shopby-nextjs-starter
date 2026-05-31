import { isNumber } from '@fxts/core';
import { useLenis } from 'lenis/react';
import { motion } from 'motion/react';
import { useCallback, useState } from 'react';

import { RelatedProductList } from '@/features/product/components';
import AfterServiceInfo from '@/features/product/components/product-tabs/after-service-info';
import ProductContents from '@/features/product/components/product-tabs/contents';
import DeliveryInfo from '@/features/product/components/product-tabs/delivery-info';
import DutyInfo from '@/features/product/components/product-tabs/duty-info';
import * as styles from '@/features/product/components/product-tabs/index.css';
import Inquiries from '@/features/product/components/product-tabs/inquiries';
import PopularProducts from '@/features/product/components/product-tabs/popular-products';
import RefundInfo from '@/features/product/components/product-tabs/refund-info';
import RelatedProducts from '@/features/product/components/product-tabs/related-products';
import Review from '@/features/product/components/product-tabs/review';
import SellerInfo from '@/features/product/components/product-tabs/seller-info';
import { useResponsive } from '@/hooks/utils';
import { ProductDetailResponse } from '@/entities/product/model/product';

interface ProductTabsProps {
    reviewCount?: number;
    inquiryCount?: number;
    productContent?: string;
    productDetailData: ProductDetailResponse;
}

export function ProductTabs({
    reviewCount = 0,
    inquiryCount = 0,
    productContent,
    productDetailData,
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'info' | 'review' | 'inquiry'>(
        'info',
    );

    const lenis = useLenis();

    const { isTablet } = useResponsive();

    // NOTE: apps/web/src/styles/global.css.ts 의 globalVars.header 값을 기준으로 사용
    const pcOffsetPx = 90;
    const mobileOffsetPx = 70;
    const tabButtonHeight = 45;

    const scrollToSection = useCallback(
        (value: 'info' | 'review' | 'inquiry', immediate: boolean = false) => {
            const headerHeight = isTablet ? mobileOffsetPx : pcOffsetPx;
            const offset = -(headerHeight + tabButtonHeight);

            lenis?.scrollTo(`#product-tab-${value}`, {
                offset,
                duration: 0.9,
                immediate,
            });
        },
        [isTablet, mobileOffsetPx, pcOffsetPx, lenis],
    );

    const handleTabClick = (value: 'info' | 'review' | 'inquiry') => {
        scrollToSection(value);
    };

    useLenis(() => {
        const headerHeight = isTablet ? mobileOffsetPx : pcOffsetPx;
        const threshold = headerHeight + tabButtonHeight + 8;

        const infoEl = document.getElementById('product-tab-info');
        const reviewEl = document.getElementById('product-tab-review');
        const inquiryEl = document.getElementById('product-tab-inquiry');

        if (!infoEl || !reviewEl || !inquiryEl) {
            return;
        }

        const reviewTop = reviewEl.getBoundingClientRect().top;
        const inquiryTop = inquiryEl.getBoundingClientRect().top;

        setActiveTab((prev) => {
            const next =
                inquiryTop <= threshold
                    ? 'inquiry'
                    : reviewTop <= threshold
                      ? 'review'
                      : 'info';
            return prev === next ? prev : next;
        });
    });

    const tabList = [
        {
            label: '상품 정보',
            value: 'info',
            onClick: () => handleTabClick('info'),
        },
        {
            label: '리뷰',
            value: 'review',
            count: reviewCount,
            onClick: () => handleTabClick('review'),
        },
        {
            label: '상품 문의',
            value: 'inquiry',
            count: inquiryCount,
            onClick: () => handleTabClick('inquiry'),
        },
    ];

    return (
        <section>
            <div className={styles.tabsContainer}>
                {tabList.map((tab) => (
                    <button
                        key={tab.value}
                        className={`${styles.tabButton}`}
                        role='tab'
                        onClick={tab.onClick}
                        aria-selected={activeTab === tab.value}
                    >
                        {`${tab.label} ${
                            isNumber(tab.count) ? `(${tab.count})` : ''
                        }`}
                        {activeTab === tab.value && (
                            <motion.div
                                layoutId='active-tab'
                                className={styles.activeTabIndicator}
                                initial={{
                                    y: 'none',
                                }}
                                animate={{
                                    y: 'none',
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 380,
                                    damping: 30,
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className={styles.tabContentContainer}>
                <div
                    id='product-tab-info'
                    className={styles.descriptionSection}
                >
                    <ProductContents
                        content={productContent}
                        onClick={() => scrollToSection('info', true)}
                    />

                    <div className={styles.infoContainer}>
                        <DutyInfo
                            dutyInfo={productDetailData.baseInfo.dutyInfo}
                        />
                        <DeliveryInfo deliveryGuide={productDetailData.deliveryGuide} />
                        <AfterServiceInfo afterServiceGuide={productDetailData.afterServiceGuide} />
                        <RefundInfo
                            exchangeGuide={productDetailData.exchangeGuide}
                            refundGuide={productDetailData.refundGuide}
                        />
                        <SellerInfo partnerInfo={productDetailData.partner} />
                    </div>
                </div>

                <div className={styles.productsContainer}>
                    <PopularProducts />
                    <RelatedProducts />
                </div>

                <div
                    id='product-tab-review'
                    className={styles.descriptionSection}
                >
                    <Review onClick={() => scrollToSection('review', true)} />
                </div>

                <div
                    id='product-tab-inquiry'
                    className={styles.descriptionSection}
                >
                    <Inquiries />
                </div>
            </div>

            <RelatedProductList />
        </section>
    );
}
