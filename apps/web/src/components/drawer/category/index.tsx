import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

import FetchBoundary from '@/components/common/FetchBoundary';
import * as styles from '@/components/drawer/category/index.css';
import { QuickMenuSkeleton } from '@/components/drawer/category/quick-menu-skeleton';
import { QuickMenuSwiper } from '@/components/drawer/category/quick-menu-swiper';
import Recipe from '@/components/drawer/category/recipe';
import Shopping from '@/components/drawer/category/shopping';
import { BigCartIcon } from '@/components/icons';
import { DefaultModalLayoutProps } from '@/components/layout';
import { ProductListSearchInput } from '@/components/product-list/search-input';
import { PATHS } from '@/const/paths';
import useCart from '@/hooks/cart/useCart';
import { useResponsive } from '@/hooks/utils';

type Tab = '쇼핑' | '레시피';
const TABS: Tab[] = ['쇼핑', '레시피'];

export const CategoryDrawer = ({
    isOpen,
    close,
    unmount,
}: DefaultModalLayoutProps) => {
    const { isMobile } = useResponsive();

    const { totalCount } = useCart();
    const [activeTab, setActiveTab] = useState<Tab>('쇼핑');

    if (!isMobile) {
        unmount();
        return null;
    }

    return (
        <AnimatePresence onExitComplete={unmount}>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                    />

                    <motion.div
                        className={styles.drawer}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 50,
                        }}
                        id='category-drawer-container'
                        data-lenis-prevent
                    >
                        <div className={styles.searchRow}>
                            <div className={styles.searchRowInner}>
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
                                            {totalCount > 99
                                                ? '99+'
                                                : totalCount}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>

                        <FetchBoundary fallback={<QuickMenuSkeleton />}>
                            <QuickMenuSwiper onNavigate={close} />
                        </FetchBoundary>

                        <div className={styles.tabBar}>
                            <div className={styles.tabBarInner}>
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
                        </div>

                        <div className={styles.tabContentViewport}>
                            <motion.div
                                className={styles.tabContentTrack}
                                animate={{
                                    x: activeTab === '쇼핑' ? '0%' : '-50%',
                                }}
                                data-active-tab={activeTab}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 50,
                                }}
                            >
                                <div
                                    className={styles.tabPane}
                                    aria-hidden={activeTab !== '쇼핑'}
                                >
                                    <Shopping />
                                </div>
                                <div
                                    className={styles.tabPane}
                                    aria-hidden={activeTab !== '레시피'}
                                >
                                    <Recipe />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
