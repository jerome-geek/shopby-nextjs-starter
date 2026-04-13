import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { shopby } from '@/api/shopby';

interface UseServerApiByPassProps<T> {
    url: string;
    param: object;
    version?: string;
    errorCallback?: () => void;
    options?: Omit<
        UseQueryOptions<
            T,
            AxiosError,
            T,
            ['serverApiByPass', string, object, string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useServerApiByPass = <T>({
    url,
    param,
    version = '1.0',
    options,
}: UseServerApiByPassProps<T>) => {
    return useQuery({
        queryKey: ['serverApiByPass', url, param, version],
        queryFn: async () => {
            const { data } = await shopby.serverApiByPass<T>({
                url,
                param,
                version,
            });

            return data;
        },
        ...options,
    });
};

export default useServerApiByPass;
