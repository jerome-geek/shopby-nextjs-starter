import { useQuery } from '@tanstack/react-query';

import {
    memberOrderOptionDetailForClaimOptions,
    type MemberOrderOptionDetailForClaimOptionsParams,
} from '@/entities/claim/queries';
import type { GetOrderOptionDetailForClaimResponse } from '@/models/claim/member';
import { useAuth } from '@/hooks/useAuth';

const useOrderOptionDetailForClaim = <
    T = GetOrderOptionDetailForClaimResponse,
>({
    orderOptionNo,
    searchParams,
    options,
}: MemberOrderOptionDetailForClaimOptionsParams<T>) => {
    const isLogin = useAuth();

    return useQuery({
        ...memberOrderOptionDetailForClaimOptions({
            orderOptionNo,
            searchParams,
            options,
        }),
        enabled: !!orderOptionNo && !!isLogin,
    });
};

export default useOrderOptionDetailForClaim;
