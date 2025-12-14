import { cache } from 'react';
import Link from 'next/link';

import { css } from '@/styled-system/css';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { BellIcon } from '@/components/icons/BellIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { PATHS } from '@/const/paths';
import { mall } from '@/api/admin';

// Server Component에서 사용하기 위해 cache() 적용
// options를 받을 수 있도록 래핑
const getMallCached = cache((options?: Parameters<typeof mall.getMall>[0]) =>
    mall.getMall(options)
);

export default async function Header() {
    const cartCount = 13; // TODO: 실제 장바구니 아이템 수로 교체
    const data = await getMallCached();

    return (
        <header
            className={css({
                position: 'sticky',
                top: 0,
                zIndex: 50,
                width: '100%',
                backgroundColor: '{colors.background}',
                borderBottom: '1px solid {colors.border}',
            })}
        >
            {/* 메인 헤더 */}
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '56px',
                    paddingX: '16px',
                    maxWidth: { base: '100%', lg: '1200px' },
                    marginX: 'auto',
                })}
            >
                {/* 브랜드 로고 */}
                <Link
                    href="/"
                    className={css({
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '{colors.foreground}',
                        textDecoration: 'none',
                        _hover: {
                            opacity: 0.7,
                        },
                    })}
                >
                    WannaMake
                </Link>

                {/* 유틸리티 아이콘들 */}
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    })}
                >
                    {/* 검색 아이콘 */}
                    <button
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            color: '{colors.foreground}',
                            cursor: 'pointer',
                            _hover: {
                                opacity: 0.7,
                            },
                        })}
                    >
                        <SearchIcon
                            className={css({ width: '24px', height: '24px' })}
                        />
                    </button>

                    {/* 알림 아이콘 */}
                    <button
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            color: '{colors.foreground}',
                            cursor: 'pointer',
                            _hover: {
                                opacity: 0.7,
                            },
                        })}
                    >
                        <BellIcon
                            className={css({ width: '24px', height: '24px' })}
                        />
                    </button>

                    {/* 장바구니 아이콘 */}
                    <Link
                        href={PATHS.ORDER.CART}
                        className={css({
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            color: '{colors.foreground}',
                            cursor: 'pointer',
                            _hover: {
                                opacity: 0.7,
                            },
                        })}
                    >
                        <CartIcon
                            className={css({ width: '24px', height: '24px' })}
                        />
                        {cartCount > 0 && (
                            <span
                                className={css({
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '18px',
                                    height: '18px',
                                    paddingX: '4px',
                                    backgroundColor: '#EF4444',
                                    color: 'white',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    borderRadius: 'full',
                                    border: '2px solid {colors.background}',
                                })}
                            >
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
