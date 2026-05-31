import { isEmpty } from '@fxts/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductListSearchInput } from '@/features/product/list/search-input';
import { PATHS } from '@/const/paths';
import useCart from '@/hooks/cart/useCart';
import { useToast } from '@/hooks/ui';
import { useCategoryMenu } from '@/hooks/utils/useCategoryMenu';
import { Menu } from '@/shared/components/layout/header/menu';
import { MobileBottomMenu } from '@/shared/components/layout/header/mobile/bottom-menu';
import * as styles from '@/shared/components/layout/header/mobile/index.css';
import { vars } from '@/styles/theme.css';
import {
    getHeaderType,
    getIconListType,
    MobileHeaderType,
} from '@/utils/header';
import { getPathTitle } from '@/utils/path';

import logoImage from '@/assets/logo.png';
import {
    ArrowIcon,
    BigCartIcon,
    HomeIcon,
    SearchIcon,
    ShareIcon,
} from '@/shared/ui/icons';

export const MobileHeader = ({
    handleSearchClick,
}: {
    handleSearchClick: () => void;
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { totalCount } = useCart();

    const { addToast } = useToast();

    const headerType = getHeaderType(router.pathname);
    const iconListType = getIconListType(router.pathname);
    const pathTitle = getPathTitle(router.pathname);

    const categoryNo = router.query.categoryNo as string;
    const { depth2CategoryLabel } = useCategoryMenu(Number(categoryNo) || 0);

    const handleShare = async () => {
        try {
            const url = window.location.href;

            if (navigator.share) {
                await navigator.share({ title: document.title, url });
                return;
            }

            await navigator.clipboard.writeText(url);
            addToast({
                message: t('링크가 복사되었습니다.'),
                variant: 'success',
            });
        } catch {
            addToast({
                message: t('주소 복사에 실패했습니다.'),
                variant: 'error',
            });
        }
    };

    const BackButton = (
        <button className={styles.iconWrapper} onClick={() => router.back()}>
            <ArrowIcon direction='left' currentColor={vars.color.black} />
        </button>
    );

    const HomeButton = (
        <Link href={PATHS.MAIN} className={styles.iconWrapper}>
            <HomeIcon />
        </Link>
    );

    const BackWithHome = (
        <div className={styles.leftButtonGroup}>
            {BackButton}
            {HomeButton}
        </div>
    );

    const SearchButton = (
        <button className={styles.iconWrapper} onClick={handleSearchClick}>
            <SearchIcon />
        </button>
    );

    const CartLink = (
        <Link href={PATHS.CART} className={styles.iconWrapper}>
            <BigCartIcon />
            {totalCount > 0 && (
                <span className={styles.cartBadge}>
                    {totalCount > 99 ? '99+' : totalCount}
                </span>
            )}
        </Link>
    );

    const ShareButton = (
        <button className={styles.iconWrapper} onClick={handleShare}>
            <ShareIcon />
        </button>
    );

    const renderIconList = (items: ReactNode[]) => {
        if (isEmpty(items)) {
            return null;
        }

        return (
            <ul className={styles.iconList}>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        );
    };

    const iconItemsByType = {
        EMPTY: [],
        SEARCH: [SearchButton],
        SEARCH_CART: [SearchButton, CartLink],
        SEARCH_CART_SHARE: [SearchButton, CartLink, ShareButton],
    };

    const getPreset = (type: MobileHeaderType) => {
        switch (type) {
            case 'LOGO':
                return {
                    wrapperClassName: styles.container,
                    left: <Menu />,
                    center: (
                        <Link href={PATHS.MAIN} className={styles.logo}>
                            <Image
                                src={logoImage}
                                alt='Jolly pot'
                                fill
                                priority
                            />
                        </Link>
                    ),
                    right: renderIconList([SearchButton, CartLink]),
                };
            case 'SEARCH':
                return {
                    wrapperClassName: styles.searchInputContainer,
                    left: BackWithHome,
                    center: (
                        <ProductListSearchInput
                            syncKeywordFromUrl
                            className={styles.searchInput}
                        />
                    ),
                    right: null,
                };
            case 'COLLECTION':
                return {
                    wrapperClassName: styles.container,
                    left: <h1 className={styles.title}>{pathTitle}</h1>,
                    center: <span />,
                    right: renderIconList([ShareButton]),
                };
            case 'PRODUCT_LIST':
                return {
                    wrapperClassName: styles.container,
                    left: BackWithHome,
                    center: (
                        <h1 className={styles.title}>{depth2CategoryLabel}</h1>
                    ),
                    right: renderIconList(iconItemsByType[iconListType]),
                };
            default:
                return {
                    wrapperClassName: styles.container,
                    left: BackWithHome,
                    center: <h1 className={styles.title}>{pathTitle}</h1>,
                    right: renderIconList(iconItemsByType[iconListType]),
                };
        }
    };

    const preset = getPreset(headerType);

    return (
        <>
            <div className={styles.headerInner}>
                <div className={preset.wrapperClassName}>
                    {preset.left}
                    {preset.center}
                    {preset.right}
                </div>
            </div>

            <MobileBottomMenu />
        </>
    );
};
