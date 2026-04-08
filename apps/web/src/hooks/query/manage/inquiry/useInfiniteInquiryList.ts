import {
    InfiniteData,
    useInfiniteQuery,
    type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import type {
    GetInquiriesItem,
    GetInquiriesParams,
} from '@/models/manage/inquiry';

export type InfiniteInquiryPage = {
    items: GetInquiriesItem[];
    totalCount: number;
};

interface UseInfiniteInquiryListParams {
    searchParams: GetInquiriesParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteInquiryPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteInquiryPage>
        >,
        'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
    >;
}

const useInfiniteInquiryList = ({
    searchParams,
    options,
}: UseInfiniteInquiryListParams) => {
    const listKeyParams: GetInquiriesParams = {
        ...searchParams,
        pageNumber: 1,
    };

    return useInfiniteQuery<
        InfiniteInquiryPage,
        AxiosError<ShopByErrorResponse>,
        InfiniteData<InfiniteInquiryPage>
    >({
        queryKey: inquiryKeys.infiniteList(listKeyParams),
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const { data } = await inquiry.getInquiries({
                ...searchParams,
                pageNumber: Number(pageParam) || 1,
            });

            return {
                items: data.items,
                totalCount: data.totalCount,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.reduce(
                (acc, page) => acc + page.items.length,
                0,
            );
            if (loaded >= lastPage.totalCount) {
                return undefined;
            }
            return allPages.length + 1;
        },
        ...options,
    });
};

export default useInfiniteInquiryList;
