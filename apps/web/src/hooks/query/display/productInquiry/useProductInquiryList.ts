import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    productInquiryListOptions,
    type ProductInquiryListParams,
} from '@/entities/productInquiry/queries';
import type { GetProductInquiriesResponse } from '@/models/display/productInquiry';

const useProductInquiryList = <T = GetProductInquiriesResponse>({
    productNo,
    searchParams,
    options,
}: ProductInquiryListParams<T>) => {
    return useQuery(
        productInquiryListOptions({
            productNo,
            searchParams,
            options: {
                placeholderData: keepPreviousData,
                ...options,
            },
        }),
    );
};

export default useProductInquiryList;
