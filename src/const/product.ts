import { OrderByType, OrderDirectionType } from '@/models';

export const SORT_OPTIONS: {
    id: string;
    name: string;
    by: OrderByType;
    direction: OrderDirectionType;
}[] = [
    {
        id: 'recommend',
        name: '추천순',
        by: 'MD_RECOMMEND',
        direction: 'DESC',
    },
    {
        id: 'newest',
        name: '신상품순',
        by: 'RECENT_PRODUCT',
        direction: 'DESC',
    },
    {
        id: 'sale_count',
        name: '판매많은순',
        by: 'SALE_CNT',
        direction: 'DESC',
    },
    {
        id: 'price_low',
        name: '낮은가격순',
        by: 'DISCOUNTED_PRICE',
        direction: 'ASC',
    },
    {
        id: 'price_high',
        name: '높은가격순',
        by: 'DISCOUNTED_PRICE',
        direction: 'DESC',
    },
    {
        id: 'review',
        name: '리뷰순',
        by: 'REVIEW',
        direction: 'DESC',
    },
    {
        id: 'like_count',
        name: '좋아요순',
        by: 'LIKE_CNT',
        direction: 'DESC',
    },
    {
        id: 'popular',
        name: '판매인기순',
        by: 'POPULAR',
        direction: 'DESC',
    },
];

export const PRODUCT_COLOR_CUSTOM_PROPERTY_NO = 1314;
