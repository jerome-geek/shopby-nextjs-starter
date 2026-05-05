import type {
    ChannelType,
    DiscountedComparisonType,
    OrderByType,
    OrderDirectionType,
} from '@/models';
import { CURRENCY } from '@/utils/currency';

export type ProductSortOption = {
    id: string;
    name: string;
    by: OrderByType;
    direction: OrderDirectionType;
};

export const SORT_OPTIONS: ProductSortOption[] = [
    {
        id: 'recommend',
        name: '추천순',
        by: 'MD_RECOMMEND',
        direction: 'ASC',
    },
    {
        id: 'newest',
        name: '신상순',
        by: 'RECENT_PRODUCT',
        direction: 'DESC',
    },
    {
        id: 'price_low',
        name: '낮은 가격순',
        by: 'DISCOUNTED_PRICE',
        direction: 'ASC',
    },
    {
        id: 'price_high',
        name: '높은 가격순',
        by: 'DISCOUNTED_PRICE',
        direction: 'DESC',
    },
    {
        id: 'popular',
        name: '인기순',
        by: 'POPULAR',
        direction: 'DESC',
    },
    {
        id: 'review',
        name: '후기순',
        by: 'REVIEW',
        direction: 'DESC',
    },
];

interface PriceFilter {
    id: string;
    name: string;
    price?: string;
    discountedComparison?: DiscountedComparisonType;
    discountedPrices?: number[];
}

export const PRICE_FILTER_OPTIONS: PriceFilter[] = [
    {
        id: 'lte_20000',
        price: CURRENCY(20000).format(),
        name: '2만원 이하',
        discountedComparison: 'LTE',
        discountedPrices: [20000],
    },
    {
        id: 'between_20000_50000',
        name: '2만원~5만원',
        discountedComparison: 'BETWEEN',
        discountedPrices: [20000, 50000],
    },
    {
        id: 'between_50000_100000',
        name: '5만원~10만원',
        discountedComparison: 'BETWEEN',
        discountedPrices: [50000, 100000],
    },
    {
        id: 'between_100000_150000',
        name: '10만원~15만원',
        discountedComparison: 'BETWEEN',
        discountedPrices: [100000, 150000],
    },
    {
        id: 'between_150000_200000',
        name: '15만원~20만원',
        discountedComparison: 'BETWEEN',
        discountedPrices: [150000, 200000],
    },
    {
        id: 'gte_200000',
        price: CURRENCY(200000).format(),
        name: '20만원 이상',
        discountedComparison: 'GTE',
        discountedPrices: [200000],
    },
];

export const CHANNEL_TYPES: ChannelType[] = [
    'NAVER_EP',
    'DANAWA',
    'ENURI',
    'WONDER',
    'COOCHA',
    'FACEBOOK',
];

/** 상품 이미지 기본 크기 (단위: px) */
export const PRODUCT_IMAGE_BASE_SIZE = {
    MOBILE: 72,
    DESKTOP: 128,
} as const;

/** CSS 적용을 위한 px 문자열 */
export const PRODUCT_IMAGE_CSS_SIZE = {
    MOBILE: `${PRODUCT_IMAGE_BASE_SIZE.MOBILE}px`,
    DESKTOP: `${PRODUCT_IMAGE_BASE_SIZE.DESKTOP}px`,
} as const;

/** API 리사이즈 파라미터 (Retina 대응을 위해 2배수 사용) */
export const PRODUCT_IMAGE_RESIZE = {
    MOBILE: `${PRODUCT_IMAGE_BASE_SIZE.MOBILE * 2}x${PRODUCT_IMAGE_BASE_SIZE.MOBILE * 2}`,
    DESKTOP: `${PRODUCT_IMAGE_BASE_SIZE.DESKTOP * 2}x${PRODUCT_IMAGE_BASE_SIZE.DESKTOP * 2}`,
} as const;
