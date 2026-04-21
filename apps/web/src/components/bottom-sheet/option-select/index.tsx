import { includes, map, pipe, sum, toArray } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { Gift } from 'lucide-react';

import * as styles from '@/components/bottom-sheet/option-select/index.css';
import {
    BottomSheetLayout,
    type DefaultModalLayoutProps,
} from '@/components/layout';
import {
    FlatProductOption,
    MultiProductOption,
    SelectedProductOption,
} from '@/components/product-option';
import { Button } from '@/components/ui/button';
import { toOrderSheetOption } from '@/helpers/product';
import { useCartMutation, useOrderSheetMutation } from '@/hooks/mutations';
import { useProductOption, useProductOptionChange } from '@/hooks/product';
import { cartKeys } from '@/hooks/queryKeys';
import { useCustomDialog, useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import type { ChannelType } from '@/models';
import { useProductOptionStore } from '@/store/useProductOptionStore';
import { CURRENCY } from '@/utils/currency';

export interface OptionSelectBottomSheetProps extends DefaultModalLayoutProps {
    productNo: number;
    channelType?: ChannelType;
}

export const OptionSelectBottomSheet = ({
    productNo,
    channelType,
    isOpen,
    close,
    unmount,
}: OptionSelectBottomSheetProps) => {
    const isLogin = useAuth();
    const queryClient = useQueryClient();
    const { openAddCartDialog } = useCustomDialog();

    const { isDesktop } = useResponsive();

    const { isDefaultOptionUsed, isFlatOptionUsed, isMultiLevelOptionUsed } =
        useProductOption({
            productNo,
        });

    const { onFlatOptionChange, onMultiOptionChange } = useProductOptionChange({
        productNo,
    });

    const { selectedOptionList, clearOptions } = useProductOptionStore();

    const totalPrice = pipe(
        selectedOptionList,
        map((option) => option.buyPrice * option.orderCnt),
        sum,
    );

    const {
        register: { mutate: registerCartMutate },
    } = useCartMutation();

    const onCartButtonClick = () => {
        if (isLogin) {
            registerCartMutate(
                {
                    data: pipe(
                        selectedOptionList,
                        map((a) => toOrderSheetOption(a, channelType)),
                        toArray,
                    ),
                },
                {
                    onSuccess: () => {
                        close();
                        openAddCartDialog();

                        queryClient.invalidateQueries({
                            predicate: (query) => {
                                return includes(query.queryKey[0], [
                                    ...cartKeys.all,
                                ]);
                            },
                        });

                        if (!isDefaultOptionUsed) {
                            clearOptions();
                        }
                    },
                },
            );
        } else {
            // NOTE: 비회원 장바구니 로직 추후 구현
            close();
        }
    };

    const {
        write: { mutate: writeOrderSheetMutate },
    } = useOrderSheetMutation();

    const { addToast } = useToast();
    const onOrderButtonClick = () => {
        if (selectedOptionList.length === 0) {
            addToast({ message: '옵션을 선택해 주세요.' });
            return;
        }

        writeOrderSheetMutate(
            {
                data: {
                    products: pipe(
                        selectedOptionList,
                        map((a) => toOrderSheetOption(a, channelType)),
                        toArray,
                    ),
                    productCoupons: [],
                },
            },
            {
                onSuccess: () => {
                    close();
                },
            },
        );
    };

    const onGiftButtonClick = () => {
        if (selectedOptionList.length === 0) {
            addToast({ message: '옵션을 선택해 주세요.' });
            return;
        }

        writeOrderSheetMutate(
            {
                data: {
                    products: pipe(
                        selectedOptionList,
                        map((a) => toOrderSheetOption(a, channelType)),
                        toArray,
                    ),
                    productCoupons: [],
                },
                type: 'gift',
            },
            {
                onSuccess: () => {
                    close();
                },
            },
        );
    };

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            isUnmountCondition={isDesktop}
            title='옵션 선택'
            footerButtonList={
                <div className={styles.footerStickyWrapper}>
                    <div className={styles.totalPriceContainer}>
                        <p className={styles.priceLabel}>총 상품금액</p>
                        <p className={styles.priceValue}>
                            {CURRENCY(totalPrice).format()}
                        </p>
                    </div>
                    <div className={styles.footerButtonsContainer}>
                        <button
                            className={styles.giftButton}
                            onClick={onGiftButtonClick}
                        >
                            <Gift size={24} color='#333' />
                        </button>
                        <Button
                            key='cart'
                            className={styles.cartButton}
                            frame='outlined'
                            onClick={onCartButtonClick}
                        >
                            장바구니
                        </Button>
                        <Button
                            key='buy'
                            className={styles.buyButton}
                            frame='solid'
                            variant='primary'
                            onClick={onOrderButtonClick}
                        >
                            구매하기
                        </Button>
                    </div>
                </div>
            }
        >
            <div className={styles.container}>
                <div className={styles.optionContainer} data-lenis-prevent>
                    {isFlatOptionUsed && (
                        <FlatProductOption
                            productNo={productNo}
                            onChange={onFlatOptionChange}
                            classNames={{
                                menu: () => styles.relativeMenu,
                            }}
                        />
                    )}

                    {isMultiLevelOptionUsed && (
                        <MultiProductOption
                            productNo={productNo}
                            onChange={onMultiOptionChange}
                            classNames={{
                                menu: () => styles.relativeMenu,
                            }}
                        />
                    )}

                    <SelectedProductOption isRemovable={!isDefaultOptionUsed} />
                </div>
            </div>
        </BottomSheetLayout>
    );
};
