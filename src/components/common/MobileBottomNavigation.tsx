'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { overlay, useOverlayData } from 'overlay-kit';

import { css } from '@/styled-system/css';
import {
    SearchIcon,
    MenuIcon,
    HomeIcon,
    HeartIcon,
    UserIcon,
} from '@/components/icons';
import { PATHS } from '@/const/paths';
import Categories from '@/components/drawer/categories';
import { OVERLAY_ID } from '@/const/overlay';

interface NavItem {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    onClick?: () => void;
}

export default function MobileBottomNavigation() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    const overlayData = useOverlayData();

    const isCategoriesDrawerOpen =
        overlayData?.[OVERLAY_ID.CATEGORIES_DRAWER]?.isOpen ?? false;

    const handleCategoriesClick = useCallback(() => {
        if (isCategoriesDrawerOpen) {
            overlay.close(OVERLAY_ID.CATEGORIES_DRAWER);
            return;
        }

        overlay.open(
            (props) => {
                return <Categories {...props} />;
            },
            {
                overlayId: OVERLAY_ID.CATEGORIES_DRAWER,
            },
        );
    }, [isCategoriesDrawerOpen]);

    // navItems 메모이제이션 (불필요한 재생성 방지)
    const navItems = useMemo<NavItem[]>(
        () => [
            {
                label: '검색',
                icon: SearchIcon,
                href: PATHS.SEARCH,
            },
            {
                label: '카테고리',
                icon: MenuIcon,
                href: '',
                onClick: handleCategoriesClick,
            },
            {
                label: '홈',
                icon: HomeIcon,
                href: PATHS.MAIN,
            },
            {
                label: '찜',
                icon: HeartIcon,
                href: PATHS.MYPAGE.WISH,
            },
            {
                label: '마이페이지',
                icon: UserIcon,
                href: PATHS.MYPAGE.MAIN,
            },
        ],
        [handleCategoriesClick],
    );

    // 스크롤 핸들러 메모이제이션 (성능 최적화)
    const handleScroll = useCallback(() => {
        // requestAnimationFrame으로 스크롤 이벤트 최적화
        requestAnimationFrame(() => {
            setIsVisible(false);
        });
    }, []);

    // 스크롤 멈춤 감지 핸들러
    const handleScrollEnd = useCallback(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    useEffect(() => {
        let scrollTimer: NodeJS.Timeout;

        const handleScrollWithDebounce = () => {
            // 스크롤 중일 때는 숨김
            handleScroll();

            // 기존 타이머 클리어
            clearTimeout(scrollTimer);

            // 스크롤이 멈춘 후 150ms 후에 나타남
            scrollTimer = setTimeout(() => {
                handleScrollEnd();
            }, 150);
        };

        // passive 옵션으로 스크롤 성능 최적화
        window.addEventListener('scroll', handleScrollWithDebounce, {
            passive: true,
        });

        return () => {
            window.removeEventListener('scroll', handleScrollWithDebounce);
            clearTimeout(scrollTimer);
        };
    }, [handleScroll, handleScrollEnd]);

    return (
        <motion.nav
            initial={false}
            animate={{
                y: isVisible ? 0 : '100%',
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
            }}
            style={{
                willChange: 'transform', // GPU 가속 힌트
            }}
            className={css({
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backgroundColor: 'white',
                borderTop: '1px solid {colors.border}',
                display: { base: 'flex', md: 'none' },
                gap: '8px',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: '10px',
                paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
                paddingX: '8px',
                boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.08)',
            })}
        >
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isCategoriesDrawerOpen
                    ? item.label === '카테고리'
                    : pathname === item.href;

                return (
                    <motion.div
                        key={item.href}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className={css({
                            flex: 1,
                        })}
                    >
                        {item.onClick ? (
                            <button
                                onClick={item.onClick}
                                className={css({
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    textDecoration: 'none',
                                    color: isActive
                                        ? '{colors.primary}'
                                        : '#666666',
                                })}
                            >
                                <Icon
                                    className={css({
                                        width: '24px',
                                        height: '24px',
                                    })}
                                />
                                <motion.span
                                    animate={{
                                        fontWeight: isActive
                                            ? 'bold'
                                            : 'normal',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={css({
                                        fontSize: '10px',
                                    })}
                                >
                                    {item.label}
                                </motion.span>
                            </button>
                        ) : (
                            <Link
                                href={item.href}
                                onClick={() => {
                                    if (isCategoriesDrawerOpen) {
                                        overlay.close(
                                            OVERLAY_ID.CATEGORIES_DRAWER,
                                        );
                                        return;
                                    }
                                }}
                                className={css({
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    textDecoration: 'none',
                                    color: isActive
                                        ? '{colors.primary}'
                                        : '#666666',
                                })}
                            >
                                <Icon
                                    className={css({
                                        width: '24px',
                                        height: '24px',
                                    })}
                                />
                                <motion.span
                                    animate={{
                                        fontWeight: isActive
                                            ? 'bold'
                                            : 'normal',
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={css({
                                        fontSize: '10px',
                                    })}
                                >
                                    {item.label}
                                </motion.span>
                            </Link>
                        )}
                    </motion.div>
                );
            })}
        </motion.nav>
    );
}
