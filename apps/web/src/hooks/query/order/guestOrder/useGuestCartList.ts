import { useQuery } from '@tanstack/react-query';

import {
    guestCartListOptions,
    type UseGuestCartListParams,
} from '@/entities/order/queries';
import type { GetCartResponse } from '@/entities/order/model/guestOrder';

// TODO: 비회원 장바구니 오류 수정
const useGuestCartList = <T = GetCartResponse>(
    params: UseGuestCartListParams<T>,
) => useQuery(guestCartListOptions(params));

export default useGuestCartList;
