import { entries, flatMap, map, pipe, prop, toArray } from '@fxts/core';

/**
 * 품절여부 확인
 *  - 품절처리를 하거나 재고가 0인 경우 품절로 간주한다
 *
 * @param soldout
 * @param stockCnt
 * @returns
 */
export const checkSoldout = (
    isSoldout: boolean,
    stockCnt: number,
    reservationStockCnt: number,
) => {
    return isSoldout || (stockCnt === 0 && reservationStockCnt === 0);
};

/**

/**
 * 상품고시정보 string -> json 변환
 *
 * @param dutyInfo
 * @returns
 */
export const getDutyInfo = (dutyInfo: string) => {
    try {
        return pipe(
            dutyInfo,
            JSON.parse,
            prop('contents'),
            flatMap((a) => entries(a as Record<string, any>)),
            map(([key, value]) => ({ key, value })),
            toArray,
        );
    } catch {
        return [];
    }
};
