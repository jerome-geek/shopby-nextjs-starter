import { useQuery } from '@tanstack/react-query';

import {
    inquiryListOptions,
    type UseInquiryListParams,
} from '@/entities/manage/inquiry/queries';
import type { GetInquiriesResponse } from '@/models/manage/inquiry';

const useInquiryList = <T = GetInquiriesResponse>(
    params: UseInquiryListParams<T>,
) => useQuery(inquiryListOptions(params));

export default useInquiryList;
