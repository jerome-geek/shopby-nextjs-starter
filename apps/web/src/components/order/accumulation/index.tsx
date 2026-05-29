import { useRouter } from 'next/router';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/order/accumulation/index.css';
import { InputField } from '@/shared/ui/input';
import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { PaymentReserveSchemaType } from '@/schema';
import { CURRENCY } from '@/utils/currency';

const Accumulation = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const { control, setValue } = useFormContext<PaymentReserveSchemaType>();

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    const availableMaxAccumulationAmt =
        orderSheetData?.paymentInfo.availableMaxAccumulationAmt ?? 0;

    const onApplyMaxAccumulationClick = () => {
        setValue('subPayAmt', availableMaxAccumulationAmt, {
            shouldValidate: true,
        });
    };

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>{t('적립금')}</h3>

            <div className={styles.subContainer}>
                <div className={styles.inputWrapper}>
                    <Controller
                        name='subPayAmt'
                        control={control}
                        render={({ field: { value, onChange, ...rest } }) => (
                            <InputField
                                inputMode='numeric'
                                className={styles.input}
                                placeholder='0'
                                {...rest}
                                value={CURRENCY(value ?? 0).format({
                                    pattern: '#',
                                })}
                                onChange={(e) => {
                                    const inputValue = e.target.value.replace(
                                        /[^0-9]/g,
                                        '',
                                    );
                                    if (inputValue === '') {
                                        onChange(0);
                                        return;
                                    }
                                    const num = Number(inputValue);
                                    onChange(
                                        Math.min(
                                            num,
                                            availableMaxAccumulationAmt,
                                        ),
                                    );
                                }}
                            />
                        )}
                    />
                    <button
                        type='button'
                        className={styles.allUseButton}
                        onClick={onApplyMaxAccumulationClick}
                    >
                        {t('전액사용')}
                    </button>
                </div>

                <p className={styles.helperText}>
                    {`사용 가능한 적립금: ${CURRENCY(availableMaxAccumulationAmt).format()}`}
                </p>
            </div>
        </section>
    );
};

export default Accumulation;
