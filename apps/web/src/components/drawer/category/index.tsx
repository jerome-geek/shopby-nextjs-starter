import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

import FetchBoundary from '@/components/common/FetchBoundary';
import * as styles from '@/components/drawer/category/index.css';
import { QuickMenuSkeleton } from '@/components/drawer/category/quick-menu-skeleton';
import { QuickMenuSwiper } from '@/components/drawer/category/quick-menu-swiper';
import { RecommendProductsSection } from '@/components/drawer/search/recommend-products-section';
import { RecommendProductsSkeleton } from '@/components/drawer/search/recommend-products-section/skeleton';
import { BigCartIcon } from '@/components/icons';
import { DefaultModalLayoutProps } from '@/components/layout';
import { ProductListSearchInput } from '@/components/product-list/search-input';
import { PATHS } from '@/const/paths';
import useCart from '@/hooks/cart/useCart';

type Tab = '쇼핑' | '레시피';
const TABS: Tab[] = ['쇼핑', '레시피'];

export const CategoryDrawer = ({
    isOpen,
    close,
    unmount,
}: DefaultModalLayoutProps) => {
    const { totalCount } = useCart();
    const [activeTab, setActiveTab] = useState<Tab>('쇼핑');

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                    />
                    <motion.div
                        className={styles.drawer}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className={styles.searchRow}>
                            <ProductListSearchInput
                                onBack={close}
                                searchAfterAction={close}
                                autoFocus={false}
                                className={styles.searchInputOverride}
                            />
                            <Link
                                href={PATHS.CART}
                                className={styles.cartButton}
                                onClick={close}
                                aria-label='장바구니'
                            >
                                <BigCartIcon width={24} height={24} />
                                {totalCount > 0 && (
                                    <span className={styles.cartBadge}>
                                        {totalCount > 99 ? '99+' : totalCount}
                                    </span>
                                )}
                            </Link>
                        </div>

                        <FetchBoundary fallback={<QuickMenuSkeleton />}>
                            <QuickMenuSwiper onNavigate={close} />
                        </FetchBoundary>

                        <div className={styles.tabBar}>
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab;
                                return (
                                    <motion.button
                                        key={tab}
                                        type='button'
                                        role='tab'
                                        aria-selected={isActive}
                                        data-active={isActive}
                                        className={styles.tabItem}
                                        onClick={() => setActiveTab(tab)}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId='mobile-menu-tab-bg'
                                                className={
                                                    styles.activeIndicator
                                                }
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                        <span
                                            style={{
                                                position: 'relative',
                                                zIndex: 1,
                                            }}
                                        >
                                            {tab}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div>{/* TODO: 카테고리 영역 */}</div>

                        <div className={styles.content} data-lenis-prevent>
                            <FetchBoundary
                                fallback={<RecommendProductsSkeleton />}
                            >
                                <RecommendProductsSection />
                            </FetchBoundary>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
