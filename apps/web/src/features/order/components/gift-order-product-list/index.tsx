import { useTranslation } from 'react-i18next';

import { OrderProductItem } from '@/features/order/components/order-product-item';
import * as styles from '@/features/order/components/gift-order-product-list/index.css';
import type { OrderOptionsGroupByPartner } from '@/models/order';

interface GiftOrderProductListProps {
    orderOptionsGroupByPartner: OrderOptionsGroupByPartner[];
}

export const GiftOrderProductList = ({
    orderOptionsGroupByPartner,
}: GiftOrderProductListProps) => {
    const { t } = useTranslation();

    return (
        <>
            {orderOptionsGroupByPartner.map((partner) => (
                <div key={partner.partnerNo}>
                    <p className={styles.partnerName}>{partner.partnerName}</p>
                    <ul className={styles.productList}>
                        {partner.orderOptionsGroupByDelivery.flatMap(
                            (delivery) =>
                                delivery.orderOptions.map((option) => (
                                    <OrderProductItem
                                        key={option.orderOptionNo}
                                        imageUrl={option.imageUrl}
                                        productName={
                                            option.isFreeGift
                                                ? `[${t('사은품')}] ${
                                                      option.productName
                                                  }`
                                                : option.productName
                                        }
                                        brandName={option.brandName ?? '-'}
                                        optionLabels={
                                            option.optionTitle
                                                ?.split(',')
                                                .map((value) => ({
                                                    label: t('옵션'),
                                                    value: value.trim(),
                                                })) ?? [
                                                {
                                                    label: t('옵션'),
                                                    value: '-',
                                                },
                                            ]
                                        }
                                        orderCnt={option.orderCnt}
                                        buyAmt={option.price.buyAmt}
                                    />
                                )),
                        )}
                    </ul>
                </div>
            ))}
        </>
    );
};
