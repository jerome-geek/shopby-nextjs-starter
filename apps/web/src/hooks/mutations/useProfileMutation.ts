import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { profile } from '@/api/member';
import { useDialog } from '@/hooks/utils';
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
    const { t } = useTranslation();

    const { openDialog } = useDialog();

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
        }),

        passwordDelete: useMutation({
            mutationFn: async ({ data }: { data: WithDrawByPasswordData }) =>
                await profile.withDrawByPassword(data),
        }),

        checkPassword: useMutation({
            mutationFn: async ({ data }: { data: CheckPasswordData }) =>
                await profile.checkPassword(data),
        }),

        nonMaskingProfile: useMutation({
            mutationFn: async ({ data }: { data: GetNonMaskingMemberData }) =>
                await profile.getNonMaskingMember(data),
        }),

        findId: useMutation({
            mutationFn: async ({ data }: { data: FindIdData }) =>
                await profile.findId(data),
        }),
    };
};

export default useProfileMutation;
