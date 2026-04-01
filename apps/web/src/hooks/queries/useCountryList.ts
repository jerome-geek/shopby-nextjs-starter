import { useQuery } from '@tanstack/react-query';
import { fetchCountryCodeList } from '@/const/country';

/**
 * 전 세계 국가 코드 리스트를 가져오는 React Query 훅입니다.
 */
export const useCountryList = () => {
    return useQuery({
        queryKey: ['countryList'],
        queryFn: fetchCountryCodeList,
        /**
         * 국가 코드는 정적인 데이터이므로 staleTime을 Infinity로 설정하여
         * 앱 세션 동안 한 번만 로드하고 계속 재사용합니다.
         */
        staleTime: Infinity,
        /**
         * NEXT_PUBLIC_LOCALE이 'ko'인 경우에는 실행하지 않습니다.
         */
        enabled: process.env.NEXT_PUBLIC_LOCALE !== 'ko',
    });
};
