import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { PaymentReserveSchemaType } from '@/schema';
import * as styles from '@/components/order/accumulation/index.css';
import { CURRENCY } from '@/utils/currency';

const Accumulation = () => {
    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const { register, setValue } = useFormContext<PaymentReserveSchemaType>();

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    // 사용 가능한 전체 적립금
    const availablePoints =
        orderSheetData?.orderSheetPromotionSummary?.myAccumulationAmt ?? 0;

    const handleAllUse = () => {
        setValue('subPayAmt', availablePoints, { shouldValidate: true });
    };

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>적립금</h3>

            <div className={styles.subContainer}>
                <div className={styles.inputWrapper}>
                    <input
                        {...register('subPayAmt', { valueAsNumber: true })}
                        type='number'
                        className={styles.input}
                        placeholder='0'
                    />
                    <button
                        type='button'
                        className={styles.allUseButton}
                        onClick={handleAllUse}
                    >
                        전액사용
                    </button>
                </div>

                <p className={styles.helperText}>
                    {`사용 가능한 적립금: ${CURRENCY(availablePoints).format()}`}
                </p>
            </div>
        </section>
    );
};

export default Accumulation;
