'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { css, cx } from '@/styled-system/css';

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
        console.log('logout');
    };

    return (
        <aside
            className={css({
                width: '180px',
                flexShrink: 0,
                position: 'sticky',
                top: '100px',
                height: 'fit-content',
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
                })}
            />

            <nav
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
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
                                                {item.title}
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
                                                {item.title}
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
