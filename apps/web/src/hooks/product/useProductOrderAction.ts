import { filter, includes, map, pipe, sum, toArray } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useTranslation } from 'react-i18next';

import { CHANNEL_TYPES } from '@/const/product';
import { useProductInfo } from '@/entities/product/hooks';
import { useCustomDialog } from '@/features/dialog';
import { toOrderSheetOption } from '@/helpers/product';
import { useCartMutation, useOrderSheetMutation } from '@/hooks/mutations';
import { useProductOption } from '@/hooks/product';
import { cartKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/store/useCartStore';
import { useProductOptionStore } from '@/store/useProductOptionStore';

const productSearchParamsSchema = {
    channelType: parseAsStringLiteral(CHANNEL_TYPES),
};

interface UseProductOrderActionOptions {
    openOptionBottomSheet: () => void;
    isOptionBottomSheetOpen: boolean;
}

export const useProductOrderAction = (
    productNo: number,
    {
        openOptionBottomSheet,
        isOptionBottomSheetOpen,
    }: UseProductOrderActionOptions,
) => {
    const { t } = useTranslation();
    const [{ channelType }] = useQueryStates(productSearchParamsSchema);
    const isLogin = useAuth();
    const { openAddCartDialog } = useCustomDialog();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    const { saleStatusType } = useProductInfo(productNo);

    const { isDefaultOptionUsed, isFlatOptionUsed, isMultiLevelOptionUsed } =
        useProductOption({ productNo });

    const { selectedOptionList, clearOptions } = useProductOptionStore();

    const addGuestCartItem = useCartStore((state) => state.addItem);

    const {
        register: { mutate: registerCartMutate },
    } = useCartMutation();
    const {
        write: { mutate: writeOrderSheetMutate },
    } = useOrderSheetMutation();

    const filteredOptions = pipe(
        selectedOptionList,
        filter(
            (a) => a.productNo === productNo || a.baseProductNo === productNo,
        ),
        toArray,
    );

    const totalPrice = pipe(
        filteredOptions,
        map((option) => option.buyPrice * option.orderCnt),
        sum,
    );

    const hasOptions = isMultiLevelOptionUsed || isFlatOptionUsed;

    const needsBottomSheet =
        !isOptionBottomSheetOpen && hasOptions && filteredOptions.length === 0;

    const onGiftButtonClick = () => {
        if (needsBottomSheet) {
            openOptionBottomSheet();
            return;
        }

        if (filteredOptions.length === 0) {
            addToast({ message: t('옵션을 선택해 주세요.') });
            return;
        }

        writeOrderSheetMutate({
            data: {
                products: pipe(
                    filteredOptions,
                    map((a) => toOrderSheetOption(a, channelType)),
                    toArray,
                ),
                productCoupons: [],
            },
            type: 'gift',
        });
    };

    const onCartButtonClick = () => {
        if (needsBottomSheet) {
            openOptionBottomSheet();
            return;
        }

        if (filteredOptions.length === 0) {
            addToast({ message: t('옵션을 선택해 주세요.') });
            return;
        }

        if (isLogin) {
            registerCartMutate(
                {
                    data: pipe(
                        filteredOptions,
                        map((a) => toOrderSheetOption(a, channelType)),
                        toArray,
                    ),
                },
                {
                    onSuccess: () => {
                        openAddCartDialog();
                        queryClient.invalidateQueries({
                            predicate: (query) =>
                                includes(query.queryKey[0] as string, [
                                    ...cartKeys.all,
                                ]),
                        });
                        if (!isDefaultOptionUsed) {
                            clearOptions();
                        }
                    },
                },
            );
        } else {
            filteredOptions.forEach((option) => {
                addGuestCartItem({
                    productNo: option.productNo,
                    optionNo: option.optionNo,
                    orderCnt: option.orderCnt,
                });
            });
            openAddCartDialog();
            if (!isDefaultOptionUsed) {
                clearOptions();
            }
        }
    };

    const onOrderButtonClick = () => {
        if (needsBottomSheet) {
            openOptionBottomSheet();
            return;
        }

        if (filteredOptions.length === 0) {
            addToast({ message: t('옵션을 선택해 주세요.') });
            return;
        }

        writeOrderSheetMutate({
            data: {
                products: pipe(
                    filteredOptions,
                    map((a) => toOrderSheetOption(a, channelType)),
                    toArray,
                ),
                productCoupons: [],
            },
        });
    };

    return {
        totalPrice,
        saleStatusType,
        onGiftButtonClick,
        onCartButtonClick,
        onOrderButtonClick,
    };
};
