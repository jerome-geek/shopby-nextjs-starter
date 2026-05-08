import { useMutation } from '@tanstack/react-query';

import { authentication } from '@/api/auth';
import useApiError from '@/hooks/useApiError';
import { useDialog } from '@/hooks/utils';
import {
    IssueOpenIdAccessTokenData,
    SendCertificatedNumberData,
    SendCertificatedNumberViaEmailData,
    SendCertificatedNumberViaSMSData,
} from '@/models/auth/authentication';

const useAuthenticationMutation = () => {
    const { openDialog } = useDialog();

    const { handleErrorToast } = useApiError();

    const onMutationError = (error: Error) => {
        handleErrorToast(error);
    };

    return {
        /** 인증번호 발송 */
        sendCertificatedNumber: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: SendCertificatedNumberData;
            }) => await authentication.sendCertificatedNumber(data),
            onSuccess: () => {
                openDialog({
                    message: '인증번호가 발송되었습니다.',
                });
            },
            onError: onMutationError,
        }),

        /** 휴대폰 인증번호 발송 */
        sendSmsForAuth: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: SendCertificatedNumberViaSMSData;
            }) => await authentication.sendCertificatedNumberViaSMS(data),
            onSuccess: () => {
                openDialog({
                    message: '인증번호가 발송되었습니다.',
                });
            },
            onError: onMutationError,
        }),

        sendEmailForAuth: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: SendCertificatedNumberViaEmailData;
            }) => await authentication.sendCertificatedNumberViaEmail(data),
            onError: onMutationError,
        }),

        issueAccessToken: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: IssueOpenIdAccessTokenData;
            }) => await authentication.issueOpenIdAccessToken(data),
            onError: onMutationError,
        }),

        issueOpenIdAccessToken: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: IssueOpenIdAccessTokenData;
            }) => await authentication.issueOpenIdAccessToken(data),
            onError: onMutationError,
        }),
    };
};

export default useAuthenticationMutation;
