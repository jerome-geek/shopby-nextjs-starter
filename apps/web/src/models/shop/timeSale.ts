import type {
    GetProductSectionProductsParams,
    ProductSectionProduct,
} from '@/entities/display/model/productSection';
import type { GetAdditionalDiscountResponse } from '@/entities/product/model/additionalDiscount';

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
