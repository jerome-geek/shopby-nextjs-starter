import Link from 'next/link';

import { PATHS } from '@/const/paths';
import * as styles from './Header.css';
import {
    useCategoriesByCode,
    useCategory,
} from '@/hooks/query/display/category';
import { Menu } from './Menu';
import {
    BigBellIcon,
    BigCartIcon,
    BigHeartIcon,
    BigSearchIcon,
    UserIcon,
} from '@/components/icons';
import { vars } from '@/styles/theme.css';

export function Header() {
    const cartCount = 13;

    const { data: categoriesByCodeData } = useCategoriesByCode({
        data: { codes: ['MAIN'] },
    });
    console.log('🚀 ~ Header ~ data:', categoriesByCodeData);
    const categoryNo = categoriesByCodeData?.[0]?.displayCategoryNo ?? 0;
    const { data: categoryData } = useCategory({
        categoryNo,
    });
    console.log('🚀 ~ Header ~ categoryData:', categoryData);

    const iconList = [
        {
            id: 'user',
            href: PATHS.MYPAGE.MAIN,
            Icon: <UserIcon currentColor={vars.color.black} />,
        },
        { id: 'heart', href: PATHS.MYPAGE.WISH, Icon: <BigHeartIcon /> },
        { id: 'cart', href: PATHS.ORDER.CART, Icon: <BigCartIcon /> },
    ];

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
                    {iconList.map((icon) => {
                        return (
                            <Link
                                key={icon.href}
                                href={icon.href}
                                prefetch={false}
                                className={styles.iconLink}
                            >
                                {icon.Icon}
                                {icon.id === 'cart' && cartCount > 0 && (
                                    <span className={styles.cartBadge}>
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                    {/* 검색 아이콘 */}
                    <button className={styles.searchIcon}>
                        <BigSearchIcon />
                    </button>

                    {/* 알림 아이콘 */}
                    <button className={styles.alarmIcon}>
                        <BigBellIcon />
                    </button>
                </div>
            </div>
        </header>
    );
}
