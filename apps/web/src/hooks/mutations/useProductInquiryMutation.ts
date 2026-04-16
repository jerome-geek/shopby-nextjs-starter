import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import type {
    WriteProductInquiryData,
    UpdateProductInquiryData,
} from '@/models/display/productInquiry';
import { useToast } from '@/hooks/ui';

const useProductInquiryMutation = () => {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const queryClient = useQueryClient();

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: productInquiryKeys.all,
            refetchType: 'all',
        });
    };

    const onErrorHandler = (error: Error) => {
        addToast({
            message: t(
                isAxiosError(error)
                    ? error.response?.data.message
                    : '알 수 없는 오류가 발생했습니다.',
            ),
            variant: 'error',
        });
    };

    const register = useMutation({
        mutationFn: ({
            productNo,
            data,
        }: {
            productNo: number;
            data: WriteProductInquiryData;
        }) => productInquiry.writeProductInquiry(productNo, data),
        onSuccess: () => {
            invalidate();
        },
        onError: onErrorHandler,
    });

    const update = useMutation({
        mutationFn: ({
            inquiryNo,
            data,
        }: {
            inquiryNo: number;
            data: UpdateProductInquiryData;
        }) => productInquiry.updateProductInquiry(inquiryNo, data),
        onSuccess: () => {
            invalidate();
        },
        onError: onErrorHandler,
    });

    const remove = useMutation({
        mutationFn: (inquiryNo: number) =>
            productInquiry.deleteProductInquiry(inquiryNo),
        onSuccess: () => {
            invalidate();
        },
        onError: onErrorHandler,
    });

    return {
        register,
        update,
        remove,
    };
};

export default useProductInquiryMutation;
