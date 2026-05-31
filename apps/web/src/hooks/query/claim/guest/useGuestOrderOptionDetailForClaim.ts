import { useQuery } from '@tanstack/react-query';

import {
    guestOrderOptionDetailForClaimOptions,
    type GuestOrderOptionDetailForClaimOptionsParams,
} from '@/entities/claim/queries';
import { useAuth } from '@/hooks/useAuth';
import type { GetOrderOptionDetailForClaimResponse } from '@/models/claim/member';

const useGuestOrderOptionDetailForClaim = <
    T = GetOrderOptionDetailForClaimResponse,
>({
    orderOptionNo,
    searchParams,
    options,
}: GuestOrderOptionDetailForClaimOptionsParams<T>) => {
    const isLogin = useAuth();

    return useQuery({
        ...guestOrderOptionDetailForClaimOptions({
            orderOptionNo,
            searchParams,
            options,
        }),
        enabled: !!orderOptionNo && !isLogin,
    });
};

export default useGuestOrderOptionDetailForClaim;
