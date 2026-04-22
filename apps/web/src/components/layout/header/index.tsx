import { pipe, some, values } from '@fxts/core';
import { BookmarkIcon, CirclePlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { overlay, useOverlayData } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { SearchDrawer } from '@/components/drawer/search';
import { BigCartIcon, BigSearchIcon, UserIcon } from '@/components/icons';
import * as styles from '@/components/layout/header/index.css';
import { Menu } from '@/components/layout/header/menu';
import MobileMenu from '@/components/layout/header/mobile-menu';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import useCart from '@/hooks/cart/useCart';
import { useCustomDialog } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { vars } from '@/styles/theme.css';

import logoImage from '@/assets/logo.png';

export function Header() {
    const { t } = useTranslation();
    const router = useRouter();

    const isLogin = useAuth();

    const { totalCount } = useCart();
    const { openLoginDialog } = useCustomDialog();

    const overlayData = useOverlayData();

    const isSearchOpen = pipe(
        overlayData,
        values,
        some((item) => item.id === OVERLAY_ID.SEARCH_DRAWER),
    );

    const handleRecipeButtonClick = (e: React.MouseEvent) => {
        if (!isLogin) {
            e.preventDefault();
            const [basePath, existingSearch] = router.asPath.split('?');
            const params = new URLSearchParams(existingSearch);
            params.set(MODAL_QUERY_KEY, MODAL_TYPE.RECIPE_CREATE);
            const returnUrl = `${basePath}?${params.toString()}`;
            openLoginDialog(returnUrl);
            return;
        }

        router.replace(
            {
                query: {
                    ...router.query,
                    [MODAL_QUERY_KEY]: MODAL_TYPE.RECIPE_CREATE,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const handleSearchClick = () => {
        if (isSearchOpen) {
            overlay.close(OVERLAY_ID.SEARCH_DRAWER);
            return;
        }

        overlay.closeAll();
        overlay.open(
            (props) => {
                return <SearchDrawer {...props} />;
            },
            { overlayId: OVERLAY_ID.SEARCH_DRAWER },
        );
    };

    return (
        <header id='header' className={styles.header}>
            <div className={styles.headerInner}>
                <Menu />

                <Link href={PATHS.MAIN} className={styles.logo}>
                    <Image src={logoImage} alt='Jolly pot' fill priority />
                </Link>

                <div className={styles.utilitySection}>
                    <button
                        type='button'
                        className={styles.recipeButton}
                        onClick={handleRecipeButtonClick}
                    >
                        <CirclePlusIcon
                            width={24}
                            height={24}
                            color={vars.color.white}
                        />
                        <span>{t('레시피 만들기')}</span>
                    </button>

                    <ul className={styles.iconList}>
                        <li>
                            <button
                                className={styles.searchIcon}
                                onClick={handleSearchClick}
                            >
                                <BigSearchIcon width={24} height={24} />
                            </button>
                        </li>
                        <li className={styles.mobileHiddenItem}>
                            <Link
                                href={PATHS.RECIPES.SCRAP}
                                className={styles.iconLink}
                            >
                                <BookmarkIcon
                                    width={24}
                                    height={24}
                                    strokeWidth={1.5}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={PATHS.CART}
                                className={`${styles.iconLink} ${styles.mobileVisibleIcon}`}
                            >
                                <BigCartIcon width={24} height={24} />
                                {totalCount > 0 && (
                                    <span className={styles.cartBadge}>
                                        {totalCount > 99 ? '99+' : totalCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className={styles.mobileHiddenItem}>
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

            <MobileMenu />
        </header>
    );
}
