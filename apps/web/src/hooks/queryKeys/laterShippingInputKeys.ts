import type { GetLaterOrderDetailParams } from '@/entities/order/model/laterShippingInput';

const laterShippingInputKeys = {
    all: ['laterShippingInput'] as const,
    orderDetail: (
        encryptedShippingNo: string,
        params?: GetLaterOrderDetailParams,
    ) =>
        [
            ...laterShippingInputKeys.all,
            'order',
            encryptedShippingNo,
            params,
        ] as const,
};

export default laterShippingInputKeys;
