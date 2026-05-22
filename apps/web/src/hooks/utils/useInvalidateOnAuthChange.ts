import { useEffect, useRef } from 'react';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';
import { useProfile } from '@/hooks/query/member/profile';

/**
 * 로그인 상태(memberNo)가 최초로 확정되거나 변경되었을 때,
 * 전달된 Query Key들을 화면 깜빡임 없이 백그라운드에서 무효화(Refetch)해주는 훅
 */
export const useInvalidateOnAuthChange = (queryKeys: QueryKey[]) => {
    const queryClient = useQueryClient();
    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    // queryKeys는 매 렌더마다 새 참조이므로 ref에 저장해서 의존성 배열에서 제거
    const queryKeysRef = useRef(queryKeys);
    queryKeysRef.current = queryKeys;

    useEffect(() => {
        if (!memberNo) return;

        queryKeysRef.current.forEach((queryKey) => {
            queryClient.invalidateQueries({ queryKey });
        });
    }, [memberNo, queryClient]);
};
