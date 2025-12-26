import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import { GetBoardConfigResponse } from '@/models/manage/board';

interface UseBoardConfigParams<T = GetBoardConfigResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetBoardConfigResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardConfig = <T = GetBoardConfigResponse>({
    options,
}: UseBoardConfigParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: boardKeys.config(),
        queryFn: async () => {
            const data = await board.getConfig().json();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });
};

export default useBoardConfig;
