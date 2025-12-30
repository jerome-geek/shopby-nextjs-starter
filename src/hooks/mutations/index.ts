import type { Options } from 'ky';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { profile } from '@/api/member';
// import { useDialog } from '@/hooks/utils';
import {
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

    // const { openDialog } = useDialog();

    return {
        register: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: CreateProfileData;
                options?: Options;
            }) => await profile.createProfile(data, options),
        }),

        openIdRegister: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: SignUpByOpenIdData;
                options?: Options;
            }) => await profile.signUpByOpenId(data, options),
        }),

        update: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: UpdateProfileData;
                options?: Options;
            }) => await profile.updateProfile(data, options),
        }),

        delete: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: DeleteProfileParams;
                options?: Options;
            }) => await profile.deleteProfile(data, options),
        }),

        passwordDelete: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: WithDrawByPasswordData;
                options?: Options;
            }) => await profile.withDrawByPassword(data, options),
        }),

        checkPassword: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: CheckPasswordData;
                options?: Options;
            }) => await profile.checkPassword(data, options),
        }),

        nonMaskingProfile: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: GetNonMaskingMemberData;
                options?: Options;
            }) => await profile.getNonMaskingMember(data, options),
        }),

        findId: useMutation({
            mutationFn: async ({
                data,
                options,
            }: {
                data: FindIdData;
                options?: Options;
            }) => await profile.findId(data, options),
        }),
    };
};

export default useProfileMutation;
