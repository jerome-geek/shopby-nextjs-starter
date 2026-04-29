import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { type AxiosError } from 'axios';

// import { request } from '@/api/core';
import { guestOrder } from '@/api/order';
import type {
    GetCartData,
    GetCartParams,
    GetCartResponse,
} from '@/models/order/guestOrder';
// import { resetCart } from '@/state/slices/cart';
// import { useAppDispatch } from '@/state/store';
// import { checkLogin } from '@/utils/users';

interface UseGuestCartListParams<T = GetCartResponse> {
    data: GetCartData;
    searchParams?: GetCartParams;
    options?: Omit<
        UseQueryOptions<
            GetCartResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [
                string,
                {
                    data: GetCartData;
                    searchParams?: GetCartParams;
                },
            ]
        >,
        'queryKey' | 'queryFn'
    >;
}

// TODO: 비회원 장바구니 오류 수정
const useGuestCartList = <T = GetCartResponse>({
    data,
    searchParams,
    options,
}: UseGuestCartListParams<T>) => {
    // const dispatch = useAppDispatch();

    return useQuery({
        queryKey: ['guestCartList', { data, searchParams }],
        queryFn: async () => {
            const response = await guestOrder.getCart(data, searchParams);

            return response.data;
        },
        staleTime: 10 * 1000,
        placeholderData: keepPreviousData,
        // // NOTE : 비회원 장바구니 에러 시 장바구니 초기화 처리
        // throwOnError: (error) => {
        //     if (isAxiosError(error)) {
        //         if (
        //             includes(error.config?.url, ['/guest/cart']) &&
        //             error.response?.data?.code === 'O0020'
        //         ) {
        //             dispatch(resetCart());
        //             request(error.config);
        //             return false;
        //         }
        //     }
        //     return true;
        // },
        ...options,
        // enabled: (options?.enabled ?? true) && !checkLogin(),
    });
};

export default useGuestCartList;
