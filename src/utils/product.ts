import {
    entries,
    filter,
    find,
    flatMap,
    head,
    isEmpty,
    map,
    pipe,
    prop,
    some,
    split,
    toArray,
    when,
} from '@fxts/core';

// import { SelectedOption } from '@/reducers/useOptionSelect';
import { ExtraProduct } from '@/models/product/product';
import { env } from '@/configs/env';

/**
 * 품절여부 확인
 *  - 품절처리를 하거나 재고가 0인 경우 품절로 간주한다
 *  - 재고 미노출 상품의 경우 재고가 -999이므로 stockCnt가 0일때 체크
 *
 * @param isSoldout
 * @param stockCnt
 * @param reservationStockCnt
 * @returns
 */
const checkSoldout = (
    isSoldout: boolean,
    stockCnt: number,
    reservationStockCnt: number,
) => {
    return isSoldout || (stockCnt === 0 && reservationStockCnt === 0);
};

/**
 * 상품고시정보 string -> json 변환
 *
 * @param dutyInfo
 * @returns
 */
const getDutyInfo = (dutyInfo: string) => {
    return pipe(
        dutyInfo,
        JSON.parse,
        prop('contents'),
        flatMap((a) => entries(a as Record<string, any>)),
        map(([key, value]) => ({ key, value })),
        toArray,
    );
};

const makeProductName = (productName: string, brandName: string = '') => {
    const brands = pipe(
        brandName,
        when(isEmpty, () => ''),
        split('/'),
        map((a) => a.trim()),
        toArray,
    );

    const matchedBrand = find((b) => productName.startsWith(b), brands);

    const name = (
        matchedBrand
            ? productName.replace(new RegExp(`^${matchedBrand}\\s*`), '')
            : productName
    )
        .replace(/\[.*?\]/g, '')
        .trim();

    return name;
};

const parseLikeCount = (likeCount: number) => {
    const isKorean = env.NEXT_PUBLIC_LOCALE === 'ko';

    if (isKorean) {
        if (likeCount > 999999) {
            return `99만+`;
        }

        if (likeCount > 99999) {
            const parseNumber = Math.floor(likeCount / 10000);
            return `${parseNumber}만`;
        }

        if (likeCount > 9999) {
            const parseNumber = Math.floor((likeCount / 10000) * 10) / 10;
            return `${parseNumber}만`;
        }

        if (likeCount > 999) {
            const parseNumber = Math.floor((likeCount / 1000) * 10) / 10;
            return `${parseNumber}천`;
        }

        return likeCount;
    }

    if (likeCount > 999999) {
        return `999K+`;
    }

    if (likeCount > 99999) {
        const parseNumber = Math.floor(likeCount / 1000);
        return `${parseNumber}K`;
    }

    if (likeCount > 999) {
        const parseNumber = Math.floor((likeCount / 1000) * 10) / 10;
        return `${parseNumber}K`;
    }

    return likeCount;
};

// NOTE : 추가상품 옵션은 다중옵션이 아닌 상품만 노출
const oneDepthOptionDisplay = (extraProducts: ExtraProduct[]) => {
    return pipe(
        extraProducts,
        filter(
            (a) =>
                a.optionInfo.optionSelectType === 'FLAT' ||
                isEmpty(head(a.optionInfo.multiOptions)?.children),
        ),
        toArray,
    );
};

export {
    checkSoldout,
    getDutyInfo,
    makeProductName,
    parseLikeCount,
    oneDepthOptionDisplay,
};
