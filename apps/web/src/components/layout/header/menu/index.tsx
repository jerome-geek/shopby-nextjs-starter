import { pipe, some, values } from '@fxts/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { overlay, useOverlayData } from 'overlay-kit';
import { useState } from 'react';

import { CategoryDrawer } from '@/components/drawer/category';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { MenuDrawer } from '@/components/layout/header/menu/drawer';
import * as styles from '@/components/layout/header/menu/index.css';
import { BANNER_ID } from '@/const/banner';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import { useBannerList } from '@/hooks/query/display/banner';
import { useResponsive } from '@/hooks/utils/useResponsive';

const MenuIcon = () => (
    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
        <path
            d='M3 12H21M3 6H21M3 18H21'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export const MENU_LIST = [
    {
        label: '발견',
        href: PATHS.SHOP.DISCOVERY,
    },
    {
        label: '키즈',
        href: PATHS.SHOP.KIDS,
    },
    {
        label: '라이프',
        href: PATHS.SHOP.LIFE,
    },
    {
        label: '베스트',
        href: PATHS.PRODUCTS.BEST,
    },
    {
        label: '기획전',
        href: PATHS.EVENTS.MAIN,
    },
    {
        label: '신상품',
        href: PATHS.PRODUCTS.NEW,
    },
    {
        label: '특가',
        href: PATHS.TIME_SALE.MAIN,
    },
];

export function Menu() {
    const router = useRouter();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { isMobile } = useResponsive();

    useBannerList({
        type: 'id',
        banners: [BANNER_ID.QUICK_MENU],
        options: {
            enabled: isMobile,
        },
    });

    const overlayData = useOverlayData();
    const isMenuDrawerOpen = pipe(
        overlayData,
        values,
        some((item) => item.id === OVERLAY_ID.CATEGORY_DRAWER),
    );

    const toggleDrawer = () => {
        if (isMobile) {
            if (isMenuDrawerOpen) {
                overlay.close(OVERLAY_ID.CATEGORY_DRAWER);
                return;
            }

            overlay.open((props) => <CategoryDrawer {...props} />, {
                overlayId: OVERLAY_ID.CATEGORY_DRAWER,
            });
            return;
        }
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div className={styles.container} id='header-menu-container'>
            <button
                className={styles.categoryButton}
                onClick={toggleDrawer}
                aria-expanded={isDrawerOpen}
            >
                <MenuIcon />
                <span className={styles.categoryText}>카테고리</span>
            </button>

            <div className={styles.menuListContainer}>
                <Link href={PATHS.MAIN} className={styles.homeItem}>
                    <span>홈</span>
                </Link>

                <div className={styles.separator} />

                <ul className={styles.menuList}>
                    {MENU_LIST.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={styles.menuItem}
                                data-selected={item.href === router.asPath}
                            >
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <ShopbyApiErrorBoundary fallback={<></>} errorFallback={<></>}>
                <MenuDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
            </ShopbyApiErrorBoundary>
        </div>
    );
}

export default Menu;
