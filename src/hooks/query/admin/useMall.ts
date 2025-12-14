import { useQuery } from '@tanstack/react-query';
import type { Options } from 'ky';
import { mall } from '@/api/admin';
import { GetMallResponse } from '@/models/admin/mall';

/**
 * 몰 정보 조회 Hook (Client Component용)
 * - React Query로 감싸서 자동 캐싱, 리프레시 등 제공
 *
 * @param options - ky 옵션 (헤더, 쿼리 파라미터, 타임아웃 등)
 */
export const useMall = (options?: Options) => {
    return useQuery<GetMallResponse>({
        queryKey: ['mall', options], // options가 다르면 다른 캐시
        queryFn: () => mall.getMall(options),
        staleTime: 1000 * 60 * 60, // 1시간
        gcTime: 1000 * 60 * 60 * 2, // 2시간
    });
};
