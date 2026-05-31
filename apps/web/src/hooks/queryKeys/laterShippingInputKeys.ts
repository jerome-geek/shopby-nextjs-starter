import type { GetLaterOrderDetailParams } from '@/models/order/laterShippingInput';

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
