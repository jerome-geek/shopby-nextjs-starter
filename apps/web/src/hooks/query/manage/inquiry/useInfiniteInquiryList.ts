import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteInquiryListOptions,
    type UseInfiniteInquiryListParams,
} from '@/entities/manage/inquiry/queries';

const useInfiniteInquiryList = (params: UseInfiniteInquiryListParams) =>
    useInfiniteQuery(infiniteInquiryListOptions(params));

export default useInfiniteInquiryList;
