import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { mall } from '@/api/admin';
import { GetMallPartnersResponse } from '@/models/admin/mall';

interface useMallPartnerParams<T = GetMallPartnersResponse> {
    options?: Omit<
        UseQueryOptions<
            GetMallPartnersResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            [string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMallPartner = ({ options }: useMallPartnerParams = {}) => {
    return useQuery({
        queryKey: ['mallPartnerInfo'],
        queryFn: async () => {
            const data = await mall.getMallPartners().json();

            return data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useMallPartner;
