import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productInquiry } from '@/entities/display/api';
import { productInquiryKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import type {
    UpdateProductInquiryData,
    WriteProductInquiryData,
} from '@/entities/display/model/productInquiry';

const useProductInquiryMutation = () => {
    const { handleErrorToast } = useApiError();
    const queryClient = useQueryClient();

    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({
            queryKey: productInquiryKeys.all,
        });
    };

    const onErrorHandler = (error: Error) => {
        handleErrorToast(error);
    };

    const register = useMutation({
        mutationFn: ({
            productNo,
            data,
        }: {
            productNo: number;
            data: WriteProductInquiryData;
        }) => productInquiry.writeProductInquiry(productNo, data),
        onSuccess: onMutationSuccess,
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
        onSuccess: onMutationSuccess,
        onError: onErrorHandler,
    });

    const remove = useMutation({
        mutationFn: (inquiryNo: number) =>
            productInquiry.deleteProductInquiry(inquiryNo),
        onSuccess: onMutationSuccess,
        onError: onErrorHandler,
    });

    return {
        register,
        update,
        remove,
    };
};

export default useProductInquiryMutation;
