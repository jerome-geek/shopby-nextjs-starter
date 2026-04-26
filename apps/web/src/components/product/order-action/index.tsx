import { Gift } from 'lucide-react';
import { overlay, useOverlayData } from 'overlay-kit';
import { useTranslation } from 'react-i18next';

import { OptionSelectBottomSheet } from '@/components/bottom-sheet/option-select';
import * as styles from '@/components/product/order-action/index.css';
import ButtonV2 from '@/components/ui/button/v2';
import { OVERLAY_ID } from '@/const/overlay';
import { useProductOrderAction } from '@/hooks/product/useProductOrderAction';
import { CURRENCY } from '@/utils/currency';

interface ProductOrderActionProps {
    productNo: number;
}

export const ProductOrderAction = ({ productNo }: ProductOrderActionProps) => {
    const { t } = useTranslation();

    const overlayData = useOverlayData();
    const isOptionBottomSheetOpen =
        overlayData[OVERLAY_ID.OPTION_BOTTOM_SHEET]?.isOpen;

    const openOptionBottomSheet = () => {
        overlay.open(
            (props) => (
                <OptionSelectBottomSheet {...props} productNo={productNo} />
            ),
            { overlayId: OVERLAY_ID.OPTION_BOTTOM_SHEET },
        );
    };

    const {
        totalPrice,
        onGiftButtonClick,
        onCartButtonClick,
        onOrderButtonClick,
        isStopSale,
    } = useProductOrderAction(productNo, {
        openOptionBottomSheet,
        isOptionBottomSheetOpen,
    });

    return (
        <div className={styles.orderContainer}>
            <hr className={styles.buttonDivider} />

            <div className={styles.totalPriceContainer}>
                <p className={styles.totalPriceTitle}>{t('총 상품금액')}</p>
                <p className={styles.totalPrice}>
                    {CURRENCY(totalPrice).format()}
                </p>
            </div>

            <div className={styles.actionButtons}>
                {isStopSale ? (
                    <ButtonV2
                        frame='solid'
                        variant='secondary'
                        disabled
                        style={{ width: '100%', height: '63px' }}
                    >
                        {t('판매중지된 상품입니다')}
                    </ButtonV2>
                ) : (
                    <>
                        <button
                            className={styles.giftButtonDesktop}
                            onClick={onGiftButtonClick}
                            aria-label={t('선물하기')}
                        >
                            <Gift size={24} />
                        </button>
                        <ButtonV2
                            frame='outlined'
                            variant='secondary'
                            onClick={onCartButtonClick}
                            style={{ flex: 1, height: '63px' }}
                        >
                            {t('장바구니')}
                        </ButtonV2>
                        <ButtonV2
                            frame='solid'
                            variant='primary'
                            onClick={onOrderButtonClick}
                            style={{ flex: 1, height: '63px' }}
                        >
                            {t('구매하기')}
                        </ButtonV2>
                    </>
                )}
            </div>
        </div>
    );
};
