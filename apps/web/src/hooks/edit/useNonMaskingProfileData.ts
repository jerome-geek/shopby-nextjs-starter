import { useSuspenseQuery } from '@tanstack/react-query';

import { profileKeys } from '@/hooks/queryKeys';
import type { GetProfileResponse } from '@/models/member/profile';

type NonMaskingProfileError = Error & { status?: number; code?: string };

const useNonMaskingProfileData = () => {
    return useSuspenseQuery<GetProfileResponse, NonMaskingProfileError>({
        queryKey: profileKeys.getNonMaskingProfile(),
        queryFn: async () => {
            const response = await fetch('/api/mypage/edit/profile');

            if (!response.ok) {
                const body = (await response.json().catch(() => null)) as {
                    message?: string;
                } | null;

                const error: NonMaskingProfileError = new Error(
                    'Failed to load non-masking profile',
                );

                error.status = response.status;
                error.code = body?.message;
                throw error;
            }

            const data = await response.json();

            return data;
        },
        retry: false,
    });
};

export default useNonMaskingProfileData;
