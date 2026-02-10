import Link from 'next/link';

import { PATHS } from '@/const/paths';
import * as styles from './Header.css';
import {
    useCategoriesByCode,
    useCategory,
} from '@/hooks/query/display/category';
import { Menu } from './Menu';

// 간단한 아이콘 컴포넌트들 (나중에 별도 파일로 분리 가능)
const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle
            cx="12"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const HeartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22249 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const CartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="21" r="1" fill="currentColor" />
        <circle cx="20" cy="21" r="1" fill="currentColor" />
        <path
            d="M1 1H5L7.68 14.39C7.77 14.83 8.02 15.22 8.38 15.5C8.74 15.78 9.19 15.92 9.64 15.9H19.4C19.84 15.92 20.28 15.78 20.64 15.5C21 15.22 21.25 14.83 21.34 14.39L23 6H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface HeaderProps {
    cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
    const { data: categoriesByCodeData } = useCategoriesByCode({
        data: { codes: ['MAIN'] },
    });
    console.log('🚀 ~ Header ~ data:', categoriesByCodeData);
    const categoryNo = categoriesByCodeData?.[0]?.displayCategoryNo ?? 0;
    const { data: categoryData } = useCategory({
        categoryNo,
    });
    console.log('🚀 ~ Header ~ categoryData:', categoryData);

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                {/* 로고 & 네비게이션 */}
                <div className={styles.logoSection}>
                    <Link href={PATHS.MAIN} className={styles.logo}>
                        WannaMake
                    </Link>
                    <Menu categoryData={categoryData} />
                </div>

                {/* 유틸리티 아이콘들 */}
                <div className={styles.utilitySection}>
                    {/* 검색 */}
                    <button className={styles.iconButton} aria-label="검색">
                        <SearchIcon />
                    </button>

                    {/* 마이페이지 */}
                    <Link
                        href={PATHS.MYPAGE.MAIN}
                        className={styles.iconLink}
                        aria-label="마이페이지"
                    >
                        <UserIcon />
                    </Link>

                    {/* 위시리스트 */}
                    <Link
                        href={PATHS.MYPAGE.WISH}
                        className={styles.iconLink}
                        aria-label="위시리스트"
                    >
                        <HeartIcon />
                    </Link>

                    {/* 장바구니 */}
                    <Link
                        href={PATHS.ORDER.CART}
                        className={styles.iconLink}
                        aria-label="장바구니"
                    >
                        <CartIcon />
                        {cartCount > 0 && (
                            <span className={styles.cartBadge}>
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* 모바일 메뉴 버튼 */}
                    <button
                        className={styles.mobileMenuButton}
                        aria-label="메뉴"
                    >
                        <MenuIcon />
                    </button>
                </div>
            </div>
        </header>
    );
}
