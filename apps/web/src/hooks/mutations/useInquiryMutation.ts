import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import type {
    PartialUpdateInquiryData,
    WriteInquiryData,
} from '@/models/manage/inquiry';

const useInquiryMutation = () => {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const queryClient = useQueryClient();

    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({
            predicate: (query) => {
                return includes(query.queryKey[0], [...inquiryKeys.all]);
            },
        });
    };

    const onMutationError = (error: Error) => {
        addToast({
            message: t(
                isAxiosError(error)
                    ? error.response?.data.message
                    : '알 수 없는 오류가 발생했습니다.',
            ),
            variant: 'error',
        });
    };

    return {
        register: useMutation({
            mutationFn: async ({ data }: { data: WriteInquiryData }) =>
                await inquiry.writeInquiry(data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        update: useMutation({
            mutationFn: async ({
                inquiryNo,
                data,
            }: {
                inquiryNo: number;
                data: PartialUpdateInquiryData;
            }) => await inquiry.partialUpdateInquiry(inquiryNo, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
        delete: useMutation({
            mutationFn: async ({ inquiryNo }: { inquiryNo: number }) =>
                await inquiry.deleteInquiry(inquiryNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
    };
};

export default useInquiryMutation;
