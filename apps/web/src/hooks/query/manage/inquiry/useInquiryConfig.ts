import { useQuery } from '@tanstack/react-query';

import {
    inquiryConfigOptions,
    type UseInquiryConfigParams,
} from '@/entities/manage/inquiry/queries';
import type { GetInquiryConfigResponse } from '@/models/manage/inquiry';

const useInquiryConfig = <T = GetInquiryConfigResponse>(
    params: UseInquiryConfigParams<T> = {},
) => useQuery(inquiryConfigOptions(params));

export default useInquiryConfig;
