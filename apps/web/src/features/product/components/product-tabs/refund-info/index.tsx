import { isEmpty } from '@fxts/core';
import { memo } from 'react';

import * as styles from '@/features/product/components/product-tabs/refund-info/index.css';
import { CustomAccordion } from '@/shared/ui/accordion';

const ACCORDION_VALUE = 'refund-info';

interface RefundInfoProps {
    exchangeGuide?: string | null;
    refundGuide?: string | null;
}

const RefundInfo = ({ exchangeGuide, refundGuide }: RefundInfoProps) => {
    const hasExchange = exchangeGuide && !isEmpty(exchangeGuide);
    const hasRefund = refundGuide && !isEmpty(refundGuide);

    if (!hasExchange && !hasRefund) {
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
                                교환/반품 안내
                            </span>
                        ),
                        content: (
                            <div className={styles.content}>
                                {hasExchange && (
                                    <div className={styles.section}>
                                        <h4 className={styles.subTitle}>교환 안내</h4>
                                        <div dangerouslySetInnerHTML={{ __html: exchangeGuide }} />
                                    </div>
                                )}
                                {hasRefund && (
                                    <div className={styles.section}>
                                        <h4 className={styles.subTitle}>반품 안내</h4>
                                        <div dangerouslySetInnerHTML={{ __html: refundGuide }} />
                                    </div>
                                )}
                            </div>
                        ),
                    },
                ]}
                type='single'
            />
        </div>
    );
};

export default memo(RefundInfo);
