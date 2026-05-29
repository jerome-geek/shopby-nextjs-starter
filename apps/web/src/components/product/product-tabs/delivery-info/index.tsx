import { isEmpty } from '@fxts/core';
import { memo } from 'react';

import * as styles from '@/components/product/product-tabs/delivery-info/index.css';
import { CustomAccordion } from '@/shared/ui/accordion';

const ACCORDION_VALUE = 'delivery-info';

const DeliveryInfo = ({ deliveryGuide }: { deliveryGuide?: string | null }) => {
    if (!deliveryGuide || isEmpty(deliveryGuide)) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <CustomAccordion
                className={styles.accordionRoot}
                itemClassName={styles.accordionItem}
                headerClassName={styles.trigger}
                items={[
                    {
                        value: ACCORDION_VALUE,
                        header: (
                            <span className={styles.title}>
                                배송 정보
                            </span>
                        ),
                        content: (
                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: deliveryGuide }} />
                        ),
                    },
                ]}
                type='single'
            />
        </div>
    );
};

export default memo(DeliveryInfo);
