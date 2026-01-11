import Link from 'next/link';

import Menu from '@/components/common/Menu';
import {
    BigBellIcon,
    BigCartIcon,
    BigHeartIcon,
    BigSearchIcon,
    UserIcon,
} from '@/components/icons';
import { PATHS } from '@/const/paths';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { getCachedCategoryData } from '@/api/display/category.server';
import { center } from '@/styled-system/patterns';

export default async function Header() {
    const cartCount = 13; // TODO: 실제 장바구니 아이템 수로 교체

    const categoryData = await getCachedCategoryData();

    const iconList = [
        {
            id: 'user',
            href: PATHS.MYPAGE.MAIN,
            Icon: <UserIcon currentColor={token('colors.black')} />,
        },
        { id: 'heart', href: PATHS.MYPAGE.WISH, Icon: <BigHeartIcon /> },
        { id: 'cart', href: PATHS.ORDER.CART, Icon: <BigCartIcon /> },
    ];

    try {
        return (
            <header
                id='header'
                className={css({
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    width: '100%',
                    backgroundColor: token('colors.white'),
                    borderBottom: `1px solid ${token('colors.gray20')}`,
                    padding: { base: '29px 0 64px', md: '0' },
                })}
            >
                {/* 메인 헤더 */}
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingX: { base: '20px', md: '16px' },
                        maxWidth: { base: '100%', lg: '1200px' },
                        gap: { base: '0', md: '32px' },
                        marginX: 'auto',
                        position: 'relative',
                    })}
                >
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: { base: 'column', md: 'row' },
                            alignItems: 'center',
                            gap: '30px',
                        })}
                    >
                        {/* 브랜드 로고 */}
                        <Link
                            href={PATHS.MAIN}
                            prefetch={false}
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

                        <Menu categoryData={categoryData} />
                    </div>

                    {/* 유틸리티 아이콘들 */}
                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        })}
                    >
                        {iconList.map((icon) => {
                            return (
                                <Link
                                    key={icon.href}
                                    href={icon.href}
                                    prefetch={false}
                                    className={center({
                                        position: 'relative',
                                        width: '24px',
                                        height: '24px',
                                        cursor: 'pointer',
                                        _hover: {
                                            opacity: 0.7,
                                        },
                                    })}
                                >
                                    {icon.Icon}
                                    {icon.id === 'cart' && cartCount > 0 && (
                                        <span
                                            className={center({
                                                position: 'absolute',
                                                top: '-6px',
                                                right: '-6px',
                                                width: '20px',
                                                height: '20px',
                                                fontSize: '1rem',
                                                fontWeight: 'semibold',
                                                lineHeight: '1.5',
                                                letterSpacing: '-2%',
                                                color: token('colors.white'),
                                                backgroundColor:
                                                    token('colors.red'),
                                                borderRadius: '50%',
                                            })}
                                        >
                                            {cartCount > 99 ? '99+' : cartCount}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}

                        {/* 검색 아이콘 */}
                        <button
                            className={center({
                                order: { base: 1, md: 2 },
                                width: '24px',
                                height: '24px',
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
                            className={center({
                                display: { base: 'flex', md: 'none' },
                                order: { base: 2 },
                                width: '24px',
                                height: '24px',
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
