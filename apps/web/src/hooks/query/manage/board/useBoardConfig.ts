import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { board } from '@/api/manage';
import { boardKeys } from '@/hooks/queryKeys';
import { GetBoardConfigResponse } from '@/models/manage/board';

interface UseBoardConfigParams<T = GetBoardConfigResponse> {
    options?: Omit<
        UseQueryOptions<
            GetBoardConfigResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof boardKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBoardConfig = <T = GetBoardConfigResponse>({
    options,
}: UseBoardConfigParams<T> = {}) => {
    return useQuery({
        queryKey: boardKeys.config(),
        queryFn: async () => {
            const { data } = await board.getConfig();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });
};

export default useBoardConfig;
