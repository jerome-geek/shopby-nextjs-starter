import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Menu } from '@/components/layout/header/menu';
import MobileBottomMenu from '@/components/layout/header/mobile/bottom-menu';
import * as styles from '@/components/layout/header/mobile/index.css';
import { PATHS } from '@/const/paths';
import useCart from '@/hooks/cart/useCart';
import { useToast } from '@/hooks/ui';
import { vars } from '@/styles/theme.css';

import logoImage from '@/assets/logo.png';
import {
    ArrowIcon,
    BigCartIcon,
    SearchIcon,
    ShareIcon,
} from '@/components/icons';
import { getHeaderType, MobileHeaderType } from '@/utils/header';
import { getPathTitle } from '@/utils/path';
import { useRouter } from 'next/router';

const MobileHeader = ({
    handleSearchClick,
}: {
    handleSearchClick: () => void;
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { totalCount } = useCart();

    const { addToast } = useToast();

    const headerType = getHeaderType(router.pathname);
    const pathTitle = getPathTitle(router.pathname);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: document.title, url });
        } else {
            await navigator.clipboard.writeText(url);
            addToast({
                message: t('링크가 복사되었습니다.'),
                variant: 'success',
            });
        }
    };

    const BackButton = () => {
        return (
            <button
                className={styles.iconWrapper}
                onClick={() => router.back()}
            >
                <ArrowIcon direction='left' currentColor={vars.color.black} />
            </button>
        );
    };

    const SearchButton = () => {
        return (
            <button className={styles.iconWrapper} onClick={handleSearchClick}>
                <SearchIcon />
            </button>
        );
    };

    const CartLink = () => {
        return (
            <Link href={PATHS.CART} className={styles.iconWrapper}>
                <BigCartIcon />
                {totalCount > 0 && (
                    <span className={styles.cartBadge}>
                        {totalCount > 99 ? '99+' : totalCount}
                    </span>
                )}
            </Link>
        );
    };

    const ShareButton = () => {
        return (
            <button className={styles.iconWrapper} onClick={handleShare}>
                <ShareIcon />
            </button>
        );
    };

    const RenderHeaderType = (headerType: MobileHeaderType) => {
        switch (headerType) {
            case 'LOGO':
                return (
                    <>
                        <Menu />

                        <Link href={PATHS.MAIN} className={styles.logo}>
                            <Image
                                src={logoImage}
                                alt='Jolly pot'
                                fill
                                priority
                            />
                        </Link>

                        <ul className={styles.iconList}>
                            <li key='search-icon'>
                                <SearchButton />
                            </li>
                            <li key='cart-icon'>
                                <CartLink />
                            </li>
                        </ul>
                    </>
                );
            case 'DETAIL':
                return (
                    <>
                        <BackButton />

                        <h1 className={styles.title}>{pathTitle}</h1>

                        <ul className={styles.iconList}>
                            <li key='search-icon'>
                                <SearchButton />
                            </li>
                            <li key='cart-icon'>
                                <CartLink />
                            </li>
                            <li key='share-icon'>
                                <ShareButton />
                            </li>
                        </ul>
                    </>
                );
            case 'TITLE':
                return (
                    <>
                        <BackButton />

                        <h1 className={styles.title}>{pathTitle}</h1>

                        <span />
                    </>
                );
            case 'SCRAP':
                return (
                    <>
                        <h1 className={styles.title}>{pathTitle}</h1>

                        <span />

                        <ul className={styles.iconList}>
                            <li key='search-icon'>
                                <SearchButton />
                            </li>
                            <li key='cart-icon'>
                                <CartLink />
                            </li>
                            <li key='share-icon'>
                                <ShareButton />
                            </li>
                        </ul>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className={styles.headerInner}>
                {RenderHeaderType(headerType)}
            </div>

            <MobileBottomMenu />
        </>
    );
};

export default MobileHeader;
