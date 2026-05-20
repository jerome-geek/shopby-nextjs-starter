import { clsx } from 'clsx';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { ArrowIcon } from '@/components/icons/ArrowIcon';
import * as styles from '@/components/mypage/side-navigation/index.css';
import { PATHS } from '@/const/paths';
import { useRouteChange } from '@/hooks/utils';

export type MypageMenuList = {
    title: string;
    children: {
        title: string;
        url?: string;
        onClick?: () => void;
        isHidden?: boolean;
    }[];
}[];

export function MypageSideNavigation({
    menuList,
}: {
    menuList: MypageMenuList;
}) {
    const router = useRouter();
    const currentPath = router.asPath.split('?')[0].replace(/\/$/, '') || '/';

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);

    const handleMenuButtonClick = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null;
            if (!navRef.current || !target) {
                return;
            }
            if (navRef.current.contains(target)) {
                return;
            }
            setIsMenuOpen(false);
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [isMenuOpen]);

    const isNavActive = (currentPath: string, href: string) => {
        if (currentPath === href) {
            return true;
        }

        if (href !== PATHS.MYPAGE.MAIN && currentPath.startsWith(`${href}/`)) {
            return true;
        }

        return false;
    };

    useRouteChange(() => {
        setIsMenuOpen(false);
    });

    return (
        <motion.nav
            ref={navRef}
            className={styles.nav}
            aria-label='마이페이지 메뉴'
            initial={{ x: -200 }}
            animate={{ x: isMenuOpen ? 0 : -200 }}
            transition={{ damping: 50, stiffness: 500, type: 'spring' }}
        >
            <div className={styles.menuButtonContainer}>
                <button
                    className={styles.menuButton}
                    onClick={handleMenuButtonClick}
                >
                    <ArrowIcon direction={isMenuOpen ? 'left' : 'right'} />
                </button>
            </div>

            {menuList.map((group) => (
                <div key={group.title} className={styles.group}>
                    <p className={styles.groupTitle}>{group.title}</p>
                    <ul className={styles.list}>
                        {group.children
                            .filter((item) => !item.isHidden)
                            .map((item) => {
                                const active =
                                    item.url &&
                                    isNavActive(currentPath, item.url);

                                if (item.onClick && !item.url) {
                                    return (
                                        <li key={item.title}>
                                            <button
                                                type='button'
                                                className={styles.buttonLink}
                                                onClick={item.onClick}
                                            >
                                                {item.title}
                                            </button>
                                        </li>
                                    );
                                }

                                if (!item.url) {
                                    return null;
                                }

                                return (
                                    <li key={item.url}>
                                        <Link
                                            href={item.url}
                                            className={clsx(
                                                styles.link,
                                                active && styles.linkActive,
                                            )}
                                            onClick={() => setIsMenuOpen(false)}
                                            prefetch={false}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            ))}
        </motion.nav>
    );
}
