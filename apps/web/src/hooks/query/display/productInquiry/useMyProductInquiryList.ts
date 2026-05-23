import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    myProductInquiryListOptions,
    type MyProductInquiryListParams,
} from '@/entities/productInquiry/queries';
import type { GetMyProductInquiriesResponse } from '@/models/display/productInquiry';

const useMyProductInquiryList = <T = GetMyProductInquiriesResponse>({
    searchParams,
    memberNo,
    options,
}: MyProductInquiryListParams<T>) => {
    return useQuery(
        myProductInquiryListOptions({
            searchParams,
            memberNo,
            options: {
                placeholderData: keepPreviousData,
                enabled: memberNo !== 0,
                ...options,
            },
        }),
    );
};

export default useMyProductInquiryList;
