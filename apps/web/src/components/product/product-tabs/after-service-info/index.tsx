import { isEmpty } from '@fxts/core';
import { memo } from 'react';

import * as styles from '@/components/product/product-tabs/after-service-info/index.css';
import { CustomAccordion } from '@/shared/ui/accordion';

const ACCORDION_VALUE = 'after-service-info';

const AfterServiceInfo = ({ afterServiceGuide }: { afterServiceGuide?: string | null }) => {
    if (!afterServiceGuide || isEmpty(afterServiceGuide)) {
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
                                A/S 안내
                            </span>
                        ),
                        content: (
                            <div className={styles.content} dangerouslySetInnerHTML={{ __html: afterServiceGuide }} />
                        ),
                    },
                ]}
                type='single'
            />
        </div>
    );
};

export default memo(AfterServiceInfo);
