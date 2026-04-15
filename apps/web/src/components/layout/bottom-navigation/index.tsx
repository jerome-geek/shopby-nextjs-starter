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
import { PATHS } from '@/const/paths';

// UX 설정을 위한 상수값
const SCROLL_THRESHOLD_PX = {
    BOTTOM: 20,
    TOP: 10,
} as const;

const IDLE_DETECTION_DELAY_MS = 600;
const ANIMATION_DURATION_SEC = 0.2;
const ICON_SIZE_PX = 24;

export default function BottomNavigation() {
    const { t } = useTranslation();
    const router = useRouter();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isRecipeDetail = router.pathname === '/recipes/[sno]';

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
                hidden ? '0px' : '64px',
            );
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [hidden]);

    if (isRecipeDetail) return null;

    const navItems = [
        {
            label: t('홈'),
            href: PATHS.MAIN,
            icon: HomeIcon,
        },
        {
            label: t('쇼핑'),
            href: PATHS.SHOP.DISCOVERY,
            icon: ShoppingIcon,
        },
        {
            label: t('만들기'),
            href: {
                pathname: router.pathname,
                query: { ...router.query, modal: 'recipe-create' },
            },
            icon: CreateIcon,
        },
        {
            label: t('스크랩북'),
            href: PATHS.RECIPES.SCRAP,
            icon: ScrapIcon,
        },
        {
            label: t('마이'),
            href: PATHS.MYPAGE.MAIN,
            icon: MyPageIcon,
        },
    ];

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
            {navItems.map(({ label, href, icon: Icon }) => {
                const isActive =
                    typeof href === 'string'
                        ? router.pathname === href
                        : router.query.modal === (href.query as any)?.modal;

                return (
                    <Link
                        key={label}
                        href={href}
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
}
