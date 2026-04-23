import { PATHS } from '@/const/paths';

export type MobileHeaderType = 'LOGO' | 'DETAIL' | 'TITLE' | 'SCRAP' | 'SEARCH';

export const getHeaderType = (pathname: string) => {
    const isLogoTypePaths = [
        PATHS.MAIN,
        PATHS.SHOP.DISCOVERY,
        PATHS.SHOP.DETAIL,
    ];
    const isDetailTypePaths = [
        PATHS.PRODUCTS.DETAIL,
        PATHS.TIME_SALE.MAIN,
        PATHS.PRODUCTS.BEST,
        PATHS.PRODUCTS.NEW,
        PATHS.EVENTS.DETAIL,
    ];
    const isScrapTypePaths = [PATHS.RECIPES.SCRAP];
    const isSearchTypePaths = [PATHS.SEARCH];

    const includesPath = (paths: string[]) => paths.includes(pathname);

    if (includesPath(isLogoTypePaths)) {
        return 'LOGO';
    }
    if (includesPath(isDetailTypePaths)) {
        return 'DETAIL';
    }
    if (includesPath(isScrapTypePaths)) {
        return 'SCRAP';
    }
    if (includesPath(isSearchTypePaths)) {
        return 'SEARCH';
    }

    return 'TITLE';
};
