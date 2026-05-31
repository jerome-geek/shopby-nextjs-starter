import { isEmpty } from '@fxts/core';
import { memo, useMemo } from 'react';

import * as styles from '@/features/product/components/product-tabs/duty-info/index.css';
import { CustomAccordion } from '@/shared/ui/accordion';
import { getDutyInfo } from '@/utils/product';

const ACCORDION_VALUE = 'duty-info';

const DutyInfo = ({ dutyInfo }: { dutyInfo: string }) => {
    const parsedDutyInfo = useMemo(
        () => (dutyInfo ? getDutyInfo(dutyInfo) : []),
        [dutyInfo],
    );

    if (isEmpty(parsedDutyInfo)) {
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
                                상품정보 제공고시
                            </span>
                        ),
                        content: (
                            <div>
                                {parsedDutyInfo.map((item, index) => (
                                    <div
                                        key={`${item.key}-${index}`}
                                        className={styles.row}
                                    >
                                        <span className={styles.keyCell}>
                                            {item.key}
                                        </span>
                                        <span className={styles.valueCell}>
                                            {String(item.value ?? '')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ),
                    },
                ]}
                type='single'
            />
        </div>
    );
};

export default memo(DutyInfo);
