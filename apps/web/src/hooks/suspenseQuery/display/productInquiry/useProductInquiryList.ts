import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productInquiryListOptions,
    type ProductInquiryListParams,
} from '@/entities/productInquiry/queries';
import type { GetProductInquiriesResponse } from '@/entities/display/model/productInquiry';

const useProductInquiryList = <T = GetProductInquiriesResponse>(
    params: ProductInquiryListParams<T>,
) => {
    return useSuspenseQuery(productInquiryListOptions(params));
};

export default useProductInquiryList;
