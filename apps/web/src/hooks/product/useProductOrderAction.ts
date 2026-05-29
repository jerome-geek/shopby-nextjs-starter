import { filter, includes, map, pipe, sum, toArray } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useTranslation } from 'react-i18next';

import { CHANNEL_TYPES } from '@/const/product';
import {
    useOrderActionValidation,
    useProductInfo,
} from '@/entities/product/hooks';
import { useCustomDialog } from '@/features/dialog';
import { toOrderSheetOption } from '@/helpers/product';
import { useCartMutation, useOrderSheetMutation } from '@/hooks/mutations';
import { useProductOption } from '@/hooks/product';
import { cartKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import { useCartStore } from '@/store/useCartStore';
import { useProductOptionStore } from '@/store/useProductOptionStore';

const productSearchParamsSchema = {
    channelType: parseAsStringLiteral(CHANNEL_TYPES),
};

interface UseProductOrderActionOptions {
    openOptionBottomSheet?: () => void;
    closeOptionBottomSheet?: () => void;
    isOptionBottomSheetOpen: boolean;
}

export const useProductOrderAction = (
    productNo: number,
    {
        openOptionBottomSheet,
        closeOptionBottomSheet,
        isOptionBottomSheetOpen,
    }: UseProductOrderActionOptions,
) => {
    const { isTablet } = useResponsive();
    const { t } = useTranslation();
    const [{ channelType }] = useQueryStates(productSearchParamsSchema);
    const isLogin = useAuth();
    const { openAddCartDialog } = useCustomDialog();
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    const { saleStatusType } = useProductInfo(productNo);

    const { isDefaultOptionUsed, isFlatOptionUsed, isMultiLevelOptionUsed } =
        useProductOption({ productNo });

    const { ensureAddToCart, ensureOrder } = useOrderActionValidation({
        productNo,
    });

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

    const needsBottomSheet = isTablet && !isOptionBottomSheetOpen;

    const onGiftButtonClick = () => {
        if (needsBottomSheet) {
            openOptionBottomSheet?.();
            return;
        }

        if (!ensureOrder()) {
            return;
        }

        writeOrderSheetMutate(
            {
                data: {
                    products: pipe(
                        filteredOptions,
                        map((a) => toOrderSheetOption(a, channelType)),
                        toArray,
                    ),
                    productCoupons: [],
                },
                type: 'gift',
            },
            {
                onSuccess: () => {
                    closeOptionBottomSheet?.();
                },
            },
        );
    };

    const onCartButtonClick = () => {
        if (needsBottomSheet) {
            openOptionBottomSheet?.();
            return;
        }

        if (!ensureAddToCart()) {
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
                        closeOptionBottomSheet?.();
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
                    baseProductNo: option?.baseProductNo,
                    productNo: option.productNo,
                    optionNo: option.optionNo,
                    orderCnt: option.orderCnt,
                    optionInputs: option?.optionInputs ?? [],
                });
            });

            closeOptionBottomSheet?.();
            openAddCartDialog();

            if (!isDefaultOptionUsed) {
                clearOptions();
            }
        }
    };

    const onOrderButtonClick = () => {
        if (needsBottomSheet) {
            openOptionBottomSheet?.();
            return;
        }

        if (!ensureOrder()) {
            return;
        }

        writeOrderSheetMutate(
            {
                data: {
                    products: pipe(
                        filteredOptions,
                        map((a) => toOrderSheetOption(a, channelType)),
                        toArray,
                    ),
                    productCoupons: [],
                },
            },
            {
                onSuccess: () => {
                    closeOptionBottomSheet?.();
                },
            },
        );
    };

    return {
        totalPrice,
        saleStatusType,
        onGiftButtonClick,
        onCartButtonClick,
        onOrderButtonClick,
    };
};
