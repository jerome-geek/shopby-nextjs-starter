import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productInquiryDetailOptions,
    type ProductInquiryDetailParams,
} from '@/entities/productInquiry/queries';
import type { GetProductInquiryResponse } from '@/models/display/productInquiry';

const useProductInquiry = <T = GetProductInquiryResponse>(
    params: ProductInquiryDetailParams<T>,
) => {
    return useSuspenseQuery(productInquiryDetailOptions(params));
};

export default useProductInquiry;
