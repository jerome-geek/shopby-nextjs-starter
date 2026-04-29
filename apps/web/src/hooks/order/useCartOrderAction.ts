import { useTranslation } from 'react-i18next';

import { useOrderSheetMutation } from '@/hooks/mutations';
import { useDialog } from '@/hooks/utils';
import type { WriteOrderSheetData } from '@/models/order/orderSheet';

export const useCartOrderAction = () => {
    const { t } = useTranslation();
    const { openDialog } = useDialog();

    const {
        write: { mutate: writeOrderSheetMutate, isPending: isOrderSheetPending },
    } = useOrderSheetMutation();

    const onOrderButtonClick = (data: WriteOrderSheetData) => {
        if (!data.cartNos || data.cartNos.length === 0) {
            openDialog({ message: t('상품을 선택해주세요.') });
            return;
        }

        writeOrderSheetMutate({ data });
    };

    return {
        onOrderButtonClick,
        isOrderSheetPending,
    };
};
