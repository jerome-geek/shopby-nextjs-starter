'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { css } from '@/styled-system/css';
import { flex } from '@/styled-system/patterns';

export interface Tab {
    id: string;
    label: string;
    count?: number;
}

export default function ProductDetailTab({ tabs }: { tabs: Tab[] }) {
    const { t } = useTranslation();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('tab') || 'info';

    return (
        <div
            className={css({
                borderBottom: '1px solid {colors.gray20}',
                width: '100%',
                marginTop: { base: '40px', md: '60px' },
                position: 'sticky',
                top: '0', // 헤더가 있다면 헤더 높이만큼 조절 필요
                backgroundColor: 'white',
                zIndex: 10,
            })}
        >
            <ul
                className={flex({ width: '100%', height: '56px' })}
                role='tablist'
                aria-label={t('상품 상세 정보 탭')}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('tab', tab.id);

                    return (
                        <li
                            key={tab.id}
                            className={flex({
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                            })}
                            role='presentation'
                        >
                            <Link
                                href={`${pathname}?${params.toString()}`}
                                scroll={false}
                                role='tab'
                                id={`tab-${tab.id}`}
                                aria-selected={isActive}
                                aria-controls={`tabpanel-${tab.id}`}
                                className={flex({
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textDecoration: 'none',
                                    _after: isActive
                                        ? {
                                              content: '""',
                                              position: 'absolute',
                                              bottom: '-1px',
                                              left: 0,
                                              width: '100%',
                                              height: '2px',
                                              backgroundColor: 'black',
                                          }
                                        : undefined,
                                })}
                            >
                                <span
                                    className={css({
                                        fontSize: '1.4rem',
                                        fontWeight: isActive ? '700' : '500',
                                        color: isActive ? 'black' : 'gray60',
                                    })}
                                >
                                    {tab.label}{' '}
                                    {tab.count !== undefined &&
                                        `(${tab.count})`}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
