import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { shippingAddress } from '@/entities/order/api';
import { addressKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import type { RegisterShippingAddressData } from '@/entities/order/model/shippingAddress';

const useShippingAddressMutation = () => {
    const { t } = useTranslation();

    const { addToast } = useToast();

    const queryClient = useQueryClient();
    const invalidate = () => {
        return queryClient.invalidateQueries({
            queryKey: addressKeys.all,
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

    return {
        setDefault: useMutation({
            mutationFn: async ({ addressNo }: { addressNo: number }) =>
                await shippingAddress.updateDefaultShippingAddress(addressNo),
            onSuccess: () => {
                return invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
        register: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: RegisterShippingAddressData;
            }) => await shippingAddress.registerShippingAddress(data),
            onSuccess: () => {
                return invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
        update: useMutation({
            mutationFn: async ({
                addressNo,
                data,
            }: {
                addressNo: number;
                data: RegisterShippingAddressData;
            }) => await shippingAddress.updateShippingAddress(addressNo, data),
            onSuccess: () => {
                return invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
        delete: useMutation({
            mutationFn: async ({ addressNo }: { addressNo: number }) =>
                await shippingAddress.deleteShippingAddress(addressNo),
            onSuccess: () => {
                return invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
    };
};

export default useShippingAddressMutation;
