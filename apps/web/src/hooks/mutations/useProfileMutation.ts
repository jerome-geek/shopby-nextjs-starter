import { useMutation } from '@tanstack/react-query';

import { profile } from '@/api/member';
import useApiError from '@/hooks/useApiError';
import type {
    CheckPasswordData,
    CreateProfileData,
    DeleteProfileParams,
    FindIdData,
    GetNonMaskingMemberData,
    SignUpByOpenIdData,
    UpdateProfileData,
    WithDrawByPasswordData,
} from '@/models/member/profile';

const useProfileMutation = () => {
    const { handleErrorToast } = useApiError();

    const onMutationError = (error: Error) => {
        handleErrorToast(error);
    };

    return {
        register: useMutation({
            mutationFn: async ({ data }: { data: CreateProfileData }) =>
                await profile.createProfile(data),
        }),

        openIdRegister: useMutation({
            mutationFn: async ({
                data,
                accessToken,
            }: {
                data: SignUpByOpenIdData;
                accessToken: string;
            }) =>
                await profile.signUpByOpenId(data, {
                    headers: {
                        'Shop-By-Authorization': `Bearer ${accessToken}`,
                    },
                }),
        }),

        update: useMutation({
            mutationFn: async ({
                data,
                accessToken,
            }: {
                data: UpdateProfileData;
                accessToken?: string;
            }) =>
                await profile.updateProfile(data, {
                    headers: {
                        'Shop-By-Authorization': `Bearer ${accessToken}`,
                    },
                }),
        }),

        delete: useMutation({
            mutationFn: async ({ data }: { data: DeleteProfileParams }) =>
                await profile.deleteProfile(data),
            onError: onMutationError,
        }),

        passwordDelete: useMutation({
            mutationFn: async ({ data }: { data: WithDrawByPasswordData }) =>
                await profile.withDrawByPassword(data),
            onError: onMutationError,
        }),

        checkPassword: useMutation({
            mutationFn: async ({ data }: { data: CheckPasswordData }) =>
                await profile.checkPassword(data),
            onError: onMutationError,
        }),

        nonMaskingProfile: useMutation({
            mutationFn: async ({ data }: { data: GetNonMaskingMemberData }) =>
                await profile.getNonMaskingMember(data),
            onError: onMutationError,
        }),

        findId: useMutation({
            mutationFn: async ({ data }: { data: FindIdData }) =>
                await profile.findId(data),
            onError: onMutationError,
        }),
    };
};

export default useProfileMutation;
