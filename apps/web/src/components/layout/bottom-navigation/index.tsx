import { includes } from '@fxts/core';
import { clsx } from 'clsx';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    CreateIcon,
    HomeIcon,
    MyPageIcon,
    ScrapIcon,
    ShoppingIcon,
} from '@/components/icons/footer';
import * as styles from '@/components/layout/bottom-navigation/index.css';
import { BOTTOM_NAV_INVISIBLE_PATHS } from '@/const/bottomNavigation';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { PATHS } from '@/const/paths';
import { useCustomDialog } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { globalVars } from '@/styles/global.css';

interface NavItem {
    label: string;
    href: string | null;
    icon: React.ComponentType<{
        width: number;
        height: number;
        currentColor?: string;
    }>;
    onClick?: () => void;
}

// UX 설정을 위한 상수값
const SCROLL_THRESHOLD_PX = {
    BOTTOM: 20,
    TOP: 10,
} as const;

const IDLE_DETECTION_DELAY_MS = 600;
const ANIMATION_DURATION_SEC = 0.2;
const ICON_SIZE_PX = 24;

export const BottomNavigation = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { scrollY } = useScroll();
    const isLogin = useAuth();
    const { openLoginDialog } = useCustomDialog();
    const [hidden, setHidden] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isInvisible = includes(router.pathname, BOTTOM_NAV_INVISIBLE_PATHS);

    const handleScroll = (latest: number) => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const isBottom =
            latest + clientHeight >= scrollHeight - SCROLL_THRESHOLD_PX.BOTTOM;
        const isTop = latest <= SCROLL_THRESHOLD_PX.TOP;

        // 1. 모든 스크롤 동작 중에는 숨김 처리
        if (!isTop && !isBottom) {
            setHidden(true);
        } else {
            // 최상단이나 최하단에서는 즉시 노출
            setHidden(false);
        }

        // 2. 정지 감지 (동작이 멈추면 다시 노출)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setHidden(false);
        }, IDLE_DETECTION_DELAY_MS);
    };

    useMotionValueEvent(scrollY, 'change', handleScroll);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty(
                '--bottom-nav-active-height',
                hidden
                    ? '0px'
                    : `calc(${globalVars.bottomNav.height} + env(safe-area-inset-bottom))`,
            );
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [hidden]);

    const handleCreateClick = () => {
        if (!isLogin) {
            const [basePath, existingSearch] = router.asPath.split('?');
            const params = new URLSearchParams(existingSearch);
            params.set(MODAL_QUERY_KEY, MODAL_TYPE.RECIPE_CREATE);
            openLoginDialog(`${basePath}?${params.toString()}`);
            return;
        }

        router.replace(
            {
                query: {
                    ...router.query,
                    [MODAL_QUERY_KEY]: MODAL_TYPE.RECIPE_CREATE,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const isCreateActive =
        router.query[MODAL_QUERY_KEY] === MODAL_TYPE.RECIPE_CREATE;

    const navItems: NavItem[] = [
        { label: t('홈'), href: PATHS.MAIN, icon: HomeIcon },
        { label: t('쇼핑'), href: PATHS.SHOP.DISCOVERY, icon: ShoppingIcon },
        {
            label: t('만들기'),
            href: null,
            icon: CreateIcon,
            onClick: handleCreateClick,
        },
        { label: t('스크랩북'), href: PATHS.RECIPES.SCRAP, icon: ScrapIcon },
        { label: t('마이'), href: PATHS.MYPAGE.MAIN, icon: MyPageIcon },
    ];

    if (isInvisible) {
        return null;
    }

    return (
        <motion.nav
            className={styles.bottomNavigationContainer}
            variants={{
                visible: { y: 0 },
                hidden: { y: '100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{
                duration: ANIMATION_DURATION_SEC,
                ease: 'easeInOut',
            }}
        >
            {navItems.map(({ label, href, icon: Icon, onClick }) => {
                const isActive = onClick
                    ? isCreateActive
                    : router.pathname === href;

                if (onClick) {
                    return (
                        <button
                            key={label}
                            type='button'
                            className={clsx(styles.navItem, {
                                [styles.activeNavItem]: isActive,
                            })}
                            onClick={onClick}
                        >
                            <Icon
                                width={ICON_SIZE_PX}
                                height={ICON_SIZE_PX}
                                currentColor={isActive ? 'black' : undefined}
                            />
                            <span className={styles.navLabel}>{label}</span>
                        </button>
                    );
                }

                return (
                    <Link
                        key={label}
                        href={href!}
                        className={clsx(styles.navItem, {
                            [styles.activeNavItem]: isActive,
                        })}
                    >
                        <Icon
                            width={ICON_SIZE_PX}
                            height={ICON_SIZE_PX}
                            currentColor={isActive ? 'black' : undefined}
                        />
                        <span className={styles.navLabel}>{label}</span>
                    </Link>
                );
            })}
        </motion.nav>
    );
};
