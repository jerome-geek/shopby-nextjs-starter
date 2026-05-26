import { useQuery } from '@tanstack/react-query';

import {
    inquiryDetailOptions,
    type UseInquiryParams,
} from '@/entities/manage/inquiry/queries';
import type { GetInquiryResponse } from '@/models/manage/inquiry';

const useInquiry = <T = GetInquiryResponse>(params: UseInquiryParams<T>) =>
    useQuery(inquiryDetailOptions(params));

export default useInquiry;
