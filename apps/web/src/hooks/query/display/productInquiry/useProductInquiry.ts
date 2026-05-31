import { useQuery } from '@tanstack/react-query';

import {
    productInquiryDetailOptions,
    type ProductInquiryDetailParams,
} from '@/entities/productInquiry/queries';
import type { GetProductInquiryResponse } from '@/models/display/productInquiry';

const useProductInquiry = <T = GetProductInquiryResponse>({
    productNo,
    inquiryNo,
    options,
}: ProductInquiryDetailParams<T>) => {
    return useQuery(
        productInquiryDetailOptions({
            productNo,
            inquiryNo,
            options: {
                enabled: inquiryNo !== 0 && productNo !== 0,
                ...options,
            },
        }),
    );
};

export default useProductInquiry;
