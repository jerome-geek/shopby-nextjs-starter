import currency from 'currency.js';

const CURRENCY = (value: currency.Any, options?: currency.Options) => {
    if (process.env.NEXT_PUBLIC_LOCALE === 'en') {
        return currency(value, {
            pattern: '!#',
            negativePattern: value === 0 ? '!#' : '-!#',
            ...options,
        });
    }

    if (process.env.NEXT_PUBLIC_LOCALE === 'ja') {
        return currency(value, {
            symbol: '¥',
            precision: 0,
            pattern: '!#',
            negativePattern: value === 0 ? '!#' : '-!#',
            ...options,
        });
    }

    return currency(value, {
        symbol: '원',
        precision: 0,
        pattern: '#!',
        negativePattern: value === 0 ? '#!' : '-#!',
        ...options,
    });
};

const KRW = (
    value: currency.Any,
    options: currency.Options = {
        symbol: '원',
        precision: 0,
        pattern: `#!`,
        negativePattern: `- # !`,
    }
) => currency(value, { ...options });

const USD = (value: currency.Any) => currency(value);

const JPY = (value: currency.Any) =>
    currency(value, { precision: 0, symbol: '¥' });

const EURO = (value: currency.Any) =>
    currency(value, { symbol: '€', decimal: ',', separator: '.' });

const POINT = (value: currency.Any) =>
    currency(value, {
        symbol: 'P',
        precision: 0,
        pattern: `# !`,
    });

/**
 * 할인율
 * - 반올림하여 정수로 표현
 */
const RATE = (value: currency.Any) => {
    return currency(value, {
        symbol: '%',
        precision: 0,
        pattern: value === 0 ? '' : `#!`,
    });
};

/**
 * 판매가 대비 실제 판매가(판매가 - 즉시할인 - 추가할인) 할인율
 * TODO: NaN처리 필요
 *
 * @param salePrice 상품판매가
 * @param immediateDiscountAmt  즉시할인가(즉시할인은 기간에 따라 계산해주어야한다)
 * @param additionDiscountAmt  추가상품할인가
 * @returns
 */
const discountRate = (
    salePrice: number = 0,
    immediateDiscountAmt: number = 0,
    additionDiscountAmt: number = 0
) => {
    // const result = currency(salePrice, { precision: 0, pattern: `#%` })
    //     .subtract(salePrice - immediateDiscountAmt - additionDiscountAmt)
    //     .multiply(100)
    //     .divide(salePrice);

    // TODO: 위시리스트 확인
    // return !isFinite(result.intValue) ||
    //     isNaN(result.intValue) ||
    //     result.intValue === 0
    //     ? ''
    //     : result.format();
    return currency(salePrice, { precision: 0, pattern: `# %` })
        .subtract(salePrice - immediateDiscountAmt - additionDiscountAmt)
        .multiply(100)
        .divide(salePrice);
};

const myDiscountRate = ({
    salePrice = 0,
    immediateDiscountAmt = 0,
    additionDiscountAmt = 0,
    couponDiscountAmt = 0,
}: {
    salePrice: number;
    immediateDiscountAmt: number;
    additionDiscountAmt: number;
    couponDiscountAmt: number;
}) => {
    return currency(salePrice, { precision: 0, pattern: `# %` })
        .subtract(
            salePrice -
                immediateDiscountAmt -
                additionDiscountAmt -
                couponDiscountAmt
        )
        .multiply(100)
        .divide(salePrice);
};

const isZeroPercent = ({
    immediateDiscountAmt = 0,
    additionDiscountAmt = 0,
    couponDiscountAmt = 0,
}: {
    immediateDiscountAmt: number;
    additionDiscountAmt: number;
    couponDiscountAmt?: number;
}) => {
    return immediateDiscountAmt + additionDiscountAmt + couponDiscountAmt <= 0;
};

const addPriceString = (addPrice: number) => {
    return KRW(addPrice).multiply(-1).format({
        pattern: '',
        negativePattern: '(+#!)',
    });
};

export {
    CURRENCY,
    KRW,
    USD,
    JPY,
    EURO,
    POINT,
    RATE,
    discountRate,
    myDiscountRate,
    isZeroPercent,
    addPriceString,
};
