import { useSuspenseQuery } from '@tanstack/react-query';

import {
    myProductInquiryListOptions,
    type MyProductInquiryListParams,
} from '@/entities/productInquiry/queries';
import type { GetMyProductInquiriesResponse } from '@/entities/display/model/productInquiry';

const useMyProductInquiryList = <T = GetMyProductInquiriesResponse>(
    params: MyProductInquiryListParams<T>,
) => {
    return useSuspenseQuery(myProductInquiryListOptions(params));
};

export default useMyProductInquiryList;
