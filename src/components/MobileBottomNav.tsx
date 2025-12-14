'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '@/styled-system/css';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { PATHS } from '@/const/path';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        let scrollTimer: NodeJS.Timeout;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // 스크롤 중일 때는 숨김
            setIsVisible(false);

            // 스크롤 타이머 클리어
            clearTimeout(scrollTimer);

            // 스크롤이 멈춘 후 150ms 후에 나타남
            scrollTimer = setTimeout(() => {
                setIsVisible(true);
            }, 150);

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimer);
        };
    }, []);

    const navItems = [
        {
            label: '검색',
            icon: SearchIcon,
            href: '/search',
        },
        {
            label: '카테고리',
            icon: MenuIcon,
            href: '/categories',
        },
        {
            label: '홈',
            icon: HomeIcon,
            href: PATHS.MAIN,
        },
        {
            label: '찜',
            icon: HeartIcon,
            href: '/wishlist',
        },
        {
            label: '마이페이지',
            icon: UserIcon,
            href: PATHS.MYPAGE.MAIN,
        },
    ];

    return (
        <nav
            className={css({
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backgroundColor: 'white',
                borderTop: '1px solid {colors.border}',
                display: { base: 'flex', md: 'none' },
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingY: '8px',
                paddingX: '16px',
                transition: 'transform 0.3s ease-in-out',
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
            })}
        >
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            flex: 1,
                            paddingY: '8px',
                            textDecoration: 'none',
                            color: isActive ? '{colors.primary}' : '#666666',
                        })}
                    >
                        <Icon
                            className={css({
                                width: '24px',
                                height: '24px',
                            })}
                        />
                        <span
                            className={css({
                                fontSize: '10px',
                                fontWeight: isActive ? 'bold' : 'normal',
                            })}
                        >
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}

