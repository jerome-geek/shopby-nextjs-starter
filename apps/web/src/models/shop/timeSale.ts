import type {
    GetProductSectionProductsParams,
    ProductSectionProduct,
} from '@/models/display/productSection';
import type { GetAdditionalDiscountResponse } from '@/models/product/additionalDiscount';

export interface GetTimeSaleSectionProductsParams
    extends Omit<
        GetProductSectionProductsParams,
        'saleStatus' | 'hasOptionValues'
    > {
    sortingType: 'BEST' | 'TODAY' | 'CLOSING';
}

export type TimeSaleSectionProduct = Omit<
    ProductSectionProduct,
    'enableCoupons'
> & {
    additionalDiscounts: GetAdditionalDiscountResponse & { productNo: number };
};

export interface TimeSaleSectionProductsResponse {
    productTotalCount: number;
    totalCount: number;
    products: TimeSaleSectionProduct[];
}
