import Link from 'next/link';

import { PATHS } from '@/const/paths';
import { css } from '@/styled-system/css';
import {
    BigHeartIcon,
    UserIcon,
    BigSearchIcon,
    BigCartIcon,
    BigBellIcon,
} from '@/components/icons';
import { token } from '@/styled-system/tokens';

export default async function Header() {
    const cartCount = 13; // TODO: 실제 장바구니 아이템 수로 교체

    try {
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
                        href={PATHS.MAIN}
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
                        <Link
                            href={PATHS.MYPAGE.MAIN}
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
                            <UserIcon currentColor={token('colors.black')} />
                        </Link>

                        <Link
                            href={PATHS.MYPAGE.WISH}
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
                            <BigHeartIcon />
                        </Link>

                        {/* 장바구니 아이콘 */}
                        <Link
                            href={PATHS.ORDER.CART}
                            className={css({
                                position: 'relative',
                                display: 'flex',
                                order: { base: 3, md: 1 },
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
                            <BigCartIcon />
                            {cartCount > 0 && (
                                <span
                                    className={css({
                                        position: 'absolute',
                                        top: '-6px',
                                        right: '-6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '20px',
                                        height: '20px',
                                        fontSize: '1rem',
                                        fontWeight: 'semibold',
                                        lineHeight: '1.5',
                                        letterSpacing: '-2%',
                                        color: token('colors.white'),
                                        backgroundColor: token('colors.red'),
                                        borderRadius: '50%',
                                    })}
                                >
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* 검색 아이콘 */}
                        <button
                            className={css({
                                display: 'flex',
                                order: { base: 1, md: 2 },
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
                            <BigSearchIcon />
                        </button>

                        {/* 알림 아이콘 */}
                        <button
                            className={css({
                                display: { base: 'flex', md: 'none' },
                                order: { base: 2, md: 3 },
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
                            <BigBellIcon />
                        </button>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error(error);
        return null;
    }
}
