import * as RadioGroup from '@radix-ui/react-radio-group';
import { useRouter } from 'next/router';
import { useFormContext, useWatch } from 'react-hook-form';

import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { PayType } from '@/models';
import { PaymentReserveSchemaType } from '@/schema';
import * as styles from './index.css';

const PAY_TYPE_ICONS: Partial<Record<PayType, string>> = {
    NAVER_PAY:
        'https://static.cdn-nhncommerce.com/shopby-standard/common/pay_icons/naverpay.png',
    KAKAO_PAY:
        'https://static.cdn-nhncommerce.com/shopby-standard/common/pay_icons/kakaopay.png',
};

export const PaymentMethod = () => {
    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    const { setValue, control } = useFormContext<PaymentReserveSchemaType>();
    const selectedPayType = useWatch({ control, name: 'payType' });

    const availablePayTypes = orderSheetData?.availablePayTypes ?? [];

    const handleValueChange = (value: string) => {
        const found = availablePayTypes.find((a) => a.payType === value);
        setValue('payType', value as PaymentReserveSchemaType['payType']);

        if (found?.pgTypes?.[0]) {
            setValue(
                'pgType',
                found.pgTypes[0] as PaymentReserveSchemaType['pgType'],
            );
        }
    };

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>결제 수단</h3>

            <RadioGroup.Root
                className={styles.radioGroupRoot}
                value={selectedPayType}
                onValueChange={handleValueChange}
                aria-label='결제 수단 선택'
            >
                {availablePayTypes.map(({ payType, payTypeLabel }) => (
                    <div key={payType} style={{ display: 'flex', alignItems: 'center' }}>
                        <RadioGroup.Item
                            id={payType}
                            className={styles.radioGroupItem}
                            value={payType}
                        >
                            <div className={styles.radioCircle}>
                                <RadioGroup.Indicator className={styles.radioIndicator} />
                            </div>

                            <label className={styles.methodLabel} htmlFor={payType}>
                                {PAY_TYPE_ICONS[payType] && (
                                    <img
                                        src={PAY_TYPE_ICONS[payType]}
                                        alt={payTypeLabel}
                                        style={{ height: '18px', marginRight: '4px' }}
                                    />
                                )}
                                {payTypeLabel}
                            </label>
                        </RadioGroup.Item>
                    </div>
                ))}
            </RadioGroup.Root>
        </section>
    );
};

export default PaymentMethod;
