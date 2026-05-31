import { map, pipe, sum } from '@fxts/core';
import { Gift } from 'lucide-react';

import * as styles from '@/features/product/overlay/option-select/bottom-sheet/index.css';
import {
    BottomSheetLayout,
    type DefaultModalLayoutProps,
} from '@/shared/components/layout';
import {
    FlatProductOption,
    MultiProductOption,
    SelectedProductOption,
} from '@/features/product/option';
import { RequiredProductOption } from '@/features/product/option/required';
import { ExtraProductList } from '@/features/product/components/extra-product-list';
import { Button } from '@/shared/ui/button';
import { useProductOption, useProductOptionChange } from '@/hooks/product';
import { useProductOrderAction } from '@/hooks/product/useProductOrderAction';
import { useResponsive } from '@/hooks/utils';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { useProductOptionStore } from '@/store/useProductOptionStore';
import { CURRENCY } from '@/utils/currency';

export interface OptionSelectBottomSheetProps extends DefaultModalLayoutProps {
    productNo: number;
}

export const OptionSelectBottomSheet = ({
    productNo,
    isOpen,
    close,
    unmount,
}: OptionSelectBottomSheetProps) => {
    const { isDesktop } = useResponsive();

    const {
        isDefaultOptionUsed,
        isFlatOptionUsed,
        isMultiLevelOptionUsed,
        isRequiredOptionUsed,
    } = useProductOption({
        productNo,
    });

    const { onGiftButtonClick, onCartButtonClick, onOrderButtonClick } =
        useProductOrderAction(productNo, {
            isOptionBottomSheetOpen: isOpen,
            closeOptionBottomSheet: close,
        });

    const { onFlatOptionChange, onMultiOptionChange } = useProductOptionChange({
        productNo,
    });

    const { selectedOptionList } = useProductOptionStore();

    const totalPrice = pipe(
        selectedOptionList,
        map((option) => option.buyPrice * option.orderCnt),
        sum,
    );

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
                            variant='brick'
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
                    {isRequiredOptionUsed && (
                        <RequiredProductOption
                            productNo={productNo}
                            onChange={onMultiOptionChange}
                            menuPortalTarget={null}
                        />
                    )}

                    {isFlatOptionUsed && (
                        <FlatProductOption
                            productNo={productNo}
                            onChange={onFlatOptionChange}
                            menuPortalTarget={null}
                        />
                    )}

                    {isMultiLevelOptionUsed && (
                        <MultiProductOption
                            productNo={productNo}
                            onChange={onMultiOptionChange}
                            menuPortalTarget={null}
                        />
                    )}

                    <SelectedProductOption
                        productNo={productNo}
                        isRemovable={!isDefaultOptionUsed}
                    />

                    <ShopbyAsyncBoundary>
                        <ExtraProductList productNo={productNo} />
                    </ShopbyAsyncBoundary>
                </div>
            </div>
        </BottomSheetLayout>
    );
};
