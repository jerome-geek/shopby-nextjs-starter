import Image from 'next/image';
import { PATHS } from '@/const/paths';
import * as styles from './Header.css';
import {
    useCategoriesByCode,
    useCategory,
} from '@/hooks/query/display/category';
import { Menu } from './Menu';
import { BigCartIcon, BigSearchIcon, UserIcon } from '@/components/icons';
import { vars } from '@/styles/theme.css';
import logoImage from '@/assets/logo.png';
import Link from 'next/link';
import { BookmarkIcon, CirclePlusIcon } from 'lucide-react';

export function Header() {
    const cartCount = 2; // 이미지와 동일하게 2로 설정

    const { data: categoriesByCodeData } = useCategoriesByCode({
        data: { codes: ['MAIN'] },
    });
    const categoryNo = categoriesByCodeData?.[0]?.displayCategoryNo ?? 0;

    const { data: categoryData } = useCategory({
        categoryNo,
    });

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <div className={styles.logoSection}>
                    <Link href={PATHS.MAIN} className={styles.logo}>
                        <Image
                            src={logoImage}
                            alt="Jolly pot"
                            width={107}
                            height={40}
                            priority
                        />
                    </Link>
                    <Menu categoryData={categoryData} />
                </div>

                <div className={styles.utilitySection}>
                    <button className={styles.recipeButton}>
                        <CirclePlusIcon
                            width={24}
                            height={24}
                            color={vars.color.white}
                        />
                        <span>레시피 만들기</span>
                    </button>

                    <ul className={styles.iconList}>
                        <li>
                            <button className={styles.searchIcon}>
                                <BigSearchIcon width={24} height={24} />
                            </button>
                        </li>
                        <li>
                            <Link
                                href={PATHS.MYPAGE.WISH}
                                className={styles.iconLink}
                            >
                                <BookmarkIcon width={24} height={24} />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={PATHS.ORDER.CART}
                                className={styles.iconLink}
                            >
                                <BigCartIcon width={24} height={24} />
                                {cartCount > 0 && (
                                    <span className={styles.cartBadge}>
                                        {cartCount > 99 ? '99+' : cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={PATHS.MYPAGE.MAIN}
                                className={styles.iconLink}
                            >
                                <UserIcon
                                    width={24}
                                    height={24}
                                    currentColor={vars.color.black}
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
