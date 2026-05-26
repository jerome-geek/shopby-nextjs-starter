import { useQuery } from '@tanstack/react-query';

import {
    boardInquiriesListOptions,
    type UseBoardInquiriesParams,
} from '@/entities/manage/board/queries';
import type { GetInquiriesResponse } from '@/models/manage/inquiry';

const useInquiries = <T = GetInquiriesResponse>(
    params: UseBoardInquiriesParams<T>,
) => useQuery(boardInquiriesListOptions(params));

export default useInquiries;
