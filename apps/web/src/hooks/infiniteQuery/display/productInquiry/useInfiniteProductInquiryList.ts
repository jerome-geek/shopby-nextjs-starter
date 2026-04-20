import {
    UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import type {
    GetProductInquiriesParams,
    GetProductInquiriesResponse,
} from '@/models/display/productInquiry';

interface UseInfiniteProductInquiryListParams {
    productNo: number;
    searchParams: GetProductInquiriesParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetProductInquiriesResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetProductInquiriesResponse>,
            ReturnType<(typeof productInquiryKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

const useInfiniteProductInquiryList = ({
    productNo,
    searchParams,
    options,
}: UseInfiniteProductInquiryListParams) => {
    return useInfiniteQuery({
        queryKey: productInquiryKeys.infiniteList(productNo, searchParams),
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
            const { data } = await productInquiry.getProductInquiries(
                productNo,
                {
                    ...searchParams,
                    pageNumber: Number(pageParam) || 1,
                },
            );

            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const pageSize = searchParams.pageSize || 10;
            const totalCount = lastPage.totalCount || 0;
            const hasNextPage = pageSize * allPages.length < totalCount;

            return hasNextPage ? allPages.length + 1 : undefined;
        },
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        ...options,
    });
};

export default useInfiniteProductInquiryList;
