import { PATHS } from '@/const/paths';
import { flatMap, pipe, toArray, values } from '@fxts/core';

export type MobileHeaderType = 'LOGO' | 'TITLE' | 'SCRAP' | 'SEARCH';
export type MobileIconListType =
    | 'EMPTY'
    | 'SEARCH'
    | 'SEARCH_CART'
    | 'SEARCH_CART_SHARE';

export const getHeaderType = (pathname: string) => {
    const isLogoTypePaths = [
        PATHS.MAIN,
        PATHS.SHOP.DISCOVERY,
        PATHS.SHOP.DETAIL,
    ];

    const isScrapTypePaths = [PATHS.RECIPES.SCRAP];
    const isSearchTypePaths = [PATHS.SEARCH];

    const includesPath = (paths: string[]) => paths.includes(pathname);

    if (includesPath(isLogoTypePaths)) {
        return 'LOGO';
    }
    if (includesPath(isScrapTypePaths)) {
        return 'SCRAP';
    }
    if (includesPath(isSearchTypePaths)) {
        return 'SEARCH';
    }

    return 'TITLE';
};

const parsePathValues = (value: unknown): string[] => {
    if (typeof value === 'string') {
        return [value];
    }
    if (typeof value === 'function' || value == null) {
        return [];
    }
    if (typeof value !== 'object') {
        return [];
    }

    return pipe(
        values(value as Record<string, unknown>),
        flatMap(parsePathValues),
        toArray,
    );
};

const MYPAGE_PATHS = parsePathValues(PATHS.MYPAGE);

export const getIconListType = (pathname: string) => {
    const isSearchCartSharePaths = [
        PATHS.PRODUCTS.DETAIL,
        PATHS.TIME_SALE.MAIN,
        PATHS.PRODUCTS.BEST,
        PATHS.PRODUCTS.NEW,
        PATHS.EVENTS.DETAIL,
        PATHS.BOARDS.DETAIL,
    ];

    const isSearchCartTypePaths = [
        ...MYPAGE_PATHS,
        PATHS.BOARDS.MAIN,
        PATHS.EVENTS.MAIN,
    ];

    const isSearchTypePaths = [
        PATHS.CART,
        PATHS.RECIPES.MAIN,
        PATHS.RECIPES.DETAIL,
        PATHS.RECIPES.COLLECTIONS,
    ];

    const includesPath = (paths: string[]) => paths.includes(pathname);

    if (includesPath(isSearchCartSharePaths)) {
        return 'SEARCH_CART_SHARE';
    }
    if (includesPath(isSearchCartTypePaths)) {
        return 'SEARCH_CART';
    }
    if (includesPath(isSearchTypePaths)) {
        return 'SEARCH';
    }

    return 'EMPTY';
};
