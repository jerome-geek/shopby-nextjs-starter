import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import {
    WriteProductInquiryData,
    UpdateProductInquiryData,
} from '@/models/display/productInquiry';

export const useProductInquiryMutation = () => {
    const queryClient = useQueryClient();

    const register = useMutation({
        mutationFn: ({
            productNo,
            data,
        }: {
            productNo: number;
            data: WriteProductInquiryData;
        }) => productInquiry.writeProductInquiry(productNo, data).json(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productInquiryKeys.all });
        },
    });

    const update = useMutation({
        mutationFn: ({
            inquiryNo,
            data,
        }: {
            inquiryNo: number;
            data: UpdateProductInquiryData;
        }) => productInquiry.updateProductInquiry(inquiryNo, data).json(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productInquiryKeys.all });
        },
    });

    const remove = useMutation({
        mutationFn: (inquiryNo: number) =>
            productInquiry.deleteProductInquiry(inquiryNo).json(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productInquiryKeys.all });
        },
    });

    return {
        register,
        update,
        remove,
    };
};
