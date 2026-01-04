'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { cookieTokenManager } from '@/api/core/cookie';
import { css, cx } from '@/styled-system/css';
import { PATHS } from '@/const/paths';

type MenuItem = {
    title: string;
    url?: string;
    onClick?: () => void;
    children?: MenuItem[];
};

interface MyPageSidebarProps {
    menuList: MenuItem[];
}

export default function MyPageSidebar({ menuList }: MyPageSidebarProps) {
    const { t } = useTranslation();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        cookieTokenManager.clearTokens();
        router.replace(PATHS.MAIN);
    };

    return (
        <aside
            className={css({
                flexShrink: 0,
                position: 'sticky',
                top: '100px',
                height: 'fit-content',
                overflow: 'hidden',
                whiteSpace: 'nowrap', // 텍스트 줄바꿈 원천 차단

                // 1. 레이아웃 모션 (Panda CSS)
                display: { base: 'none', md: 'block' },
                width: { base: '0px', lg: '180px' },
                opacity: { base: 0, lg: 1 },
                transform: { base: 'translateX(-40px)', lg: 'translateX(0)' },
                visibility: { base: 'hidden', lg: 'visible' },

                transitionProperty: 'width, opacity, transform, visibility',
                transitionDuration: '0.5s',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            })}
        >
            <h2
                className={css({
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#000',
                    lineHeight: 1,
                    letterSpacing: '-1px',
                    marginBottom: '20px',
                })}
            >
                {t('마이페이지')}
            </h2>

            <hr
                className={css({
                    border: 'none',
                    borderTop: '2px solid #000',
                    marginBottom: '30px',
                    width: '180px', // 가로선 너비 고정
                })}
            />

            <nav
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                    width: '180px', // 네비게이션 영역 너비 고정
                })}
            >
                {menuList.map((category, index) => (
                    <div key={index}>
                        <h3
                            className={css({
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#000',
                                marginBottom: '16px',
                            })}
                        >
                            {category.title}
                        </h3>
                        <ul
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                            })}
                        >
                            {category.children?.map((item, itemIndex) => {
                                const isActive = item.url === pathname;
                                return (
                                    <li key={itemIndex}>
                                        {item.url ? (
                                            <Link
                                                href={item.url}
                                                className={cx(
                                                    css({
                                                        display: 'block',
                                                        fontSize: '14px',
                                                        color: '#999',
                                                        fontWeight: '500',
                                                        transition:
                                                            'color 0.2s',
                                                        _hover: {
                                                            color: '#000',
                                                        },
                                                    }),
                                                    isActive &&
                                                        css({
                                                            color: '#000 !important',
                                                            fontWeight: 'bold',
                                                        })
                                                )}
                                            >
                                                <motion.span
                                                    whileHover={{ x: 5 }}
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 400,
                                                        damping: 20,
                                                    }}
                                                    className={css({
                                                        display: 'inline-block',
                                                    })}
                                                >
                                                    {item.title}
                                                </motion.span>
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={item.onClick}
                                                className={css({
                                                    fontSize: '14px',
                                                    color: '#999',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'color 0.2s',
                                                    _hover: {
                                                        color: '#000',
                                                    },
                                                })}
                                            >
                                                <motion.span
                                                    whileHover={{ x: 5 }}
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 400,
                                                        damping: 20,
                                                    }}
                                                    className={css({
                                                        display: 'inline-block',
                                                    })}
                                                >
                                                    {item.title}
                                                </motion.span>
                                            </button>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            <button
                onClick={handleLogout}
                className={css({
                    marginTop: '60px',
                    fontSize: '14px',
                    color: '#999',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '180px', // 버튼 너비 고정
                    _hover: {
                        color: '#000',
                    },
                })}
            >
                {t('로그아웃')}
            </button>
        </aside>
    );
}
