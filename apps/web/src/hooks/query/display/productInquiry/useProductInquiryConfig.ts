import { useQuery } from '@tanstack/react-query';

import {
    productInquiryConfigOptions,
    type ProductInquiryConfigParams,
} from '@/entities/productInquiry/queries';
import type { GetProductInquiryConfigResponse } from '@/models/display/productInquiry';

const useProductInquiryConfig = <T = GetProductInquiryConfigResponse>(
    params: ProductInquiryConfigParams<T> = {},
) => {
    return useQuery(productInquiryConfigOptions(params));
};

export default useProductInquiryConfig;
