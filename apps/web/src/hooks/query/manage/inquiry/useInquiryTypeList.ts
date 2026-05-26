import { useSuspenseQuery } from '@tanstack/react-query';

import {
    inquiryTypeListSuspenseOptions,
    type UseInquiryTypeListParams,
} from '@/entities/manage/inquiry/queries';
import type { GetInquiryTypesResponse } from '@/models/manage/inquiry';

const useInquiryTypeList = <T = GetInquiryTypesResponse>(
    params: UseInquiryTypeListParams<T> = {},
) => useSuspenseQuery(inquiryTypeListSuspenseOptions(params));

export default useInquiryTypeList;
