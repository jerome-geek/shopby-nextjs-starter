import currency from 'currency.js';

const getLocale = () => process.env.NEXT_PUBLIC_LOCALE || 'ko';

const getIntlLocale = () => {
    const locale = getLocale();
    if (locale === 'ja') return 'ja-JP';
    if (locale === 'en') return 'en-US';
    return 'ko-KR';
};

/**
 * 설정된 로케일에 따른 기본 통화 코드 반환
 */
const getDefaultCurrencyCode = () => {
    const locale = getLocale();
    if (locale === 'ja') return 'JPY';
    if (locale === 'en') return 'USD';
    return 'KRW';
};

/**
 * Intl 기반 금액 포맷팅 유틸리티
 */
const formatIntl = (
    value: currency.Any,
    type: 'KRW' | 'USD' | 'JPY' | 'EURO' | 'POINT' | 'RATE' = 'KRW',
    options?: Intl.NumberFormatOptions,
) => {
    const amount = currency(value).value;
    const locale = getIntlLocale();

    switch (type) {
        case 'KRW':
            return (
                new Intl.NumberFormat(locale, options).format(amount) + '원'
            );
        case 'USD':
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'USD',
                ...options,
            }).format(amount);
        case 'JPY':
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'JPY',
                ...options,
            }).format(amount);
        case 'EURO':
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'EUR',
                ...options,
            }).format(amount);
        case 'POINT':
            return (
                new Intl.NumberFormat(locale, options).format(amount) + ' P'
            );
        case 'RATE':
            return (
                new Intl.NumberFormat(locale, options).format(amount) + '%'
            );
        default:
            return new Intl.NumberFormat(locale, options).format(amount);
    }
};

/**
 * 🚀 로케일 설정을 기반으로 자동 통화 포맷팅 (권장 사용)
 * 사용 예: formatPrice(1000) -> ko라면 '1,000원', en이라면 '$1.00'
 */
const formatPrice = (
    value: currency.Any,
    options?: Intl.NumberFormatOptions,
) => {
    const type = getDefaultCurrencyCode() as any;
    return formatIntl(value, type, options);
};

const format = {
    krw: (value: currency.Any) => formatIntl(value, 'KRW'),
    usd: (value: currency.Any) => formatIntl(value, 'USD'),
    jpy: (value: currency.Any) => formatIntl(value, 'JPY'),
    euro: (value: currency.Any) => formatIntl(value, 'EURO'),
    point: (value: currency.Any) => formatIntl(value, 'POINT'),
    rate: (value: currency.Any) => formatIntl(value, 'RATE'),
};

const CURRENCY = (value: currency.Any, options?: currency.Options) =>
    currency(value, options);
const KRW = (value: currency.Any, options?: currency.Options) =>
    currency(value, { precision: 0, ...options });
const USD = (value: currency.Any) => currency(value);
const JPY = (value: currency.Any) => currency(value, { precision: 0 });
const EURO = (value: currency.Any) =>
    currency(value, { decimal: ',', separator: '.' });
const POINT = (value: currency.Any) => currency(value, { precision: 0 });
const RATE = (value: currency.Any) => currency(value, { precision: 0 });

const discountRate = (
    salePrice: number = 0,
    immediateDiscountAmt: number = 0,
    additionDiscountAmt: number = 0,
) => {
    return currency(salePrice)
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
    return currency(salePrice)
        .subtract(
            salePrice -
                immediateDiscountAmt -
                additionDiscountAmt -
                couponDiscountAmt,
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
    const amount = currency(addPrice).multiply(-1).value;
    const formatted = new Intl.NumberFormat(getIntlLocale()).format(
        Math.abs(amount),
    );
    return amount >= 0 ? `(${formatted}원)` : `(+${formatted}원)`;
};

export {
    CURRENCY,
    KRW,
    USD,
    JPY,
    EURO,
    POINT,
    RATE,
    format,
    formatPrice,
    discountRate,
    myDiscountRate,
    isZeroPercent,
    addPriceString,
};
