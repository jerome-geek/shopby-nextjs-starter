import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
    InputField,
    InputFieldContainer,
    InputLabel,
} from '@/shared/ui/input';
import * as styles from '@/features/order/components/gift-receiver-info/index.css';
import type { PaymentReserveSchemaType } from '@/schema/payment.schema';
import { ErrorMessage } from '@/shared/components/form';

export const GiftReceiverInfo = () => {
    const { t } = useTranslation();
    const { register } = useFormContext<PaymentReserveSchemaType>();

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>{t('받으시는 분 정보')}</h3>

            <div className={styles.form}>
                <InputFieldContainer>
                    <InputLabel isRequired>{t('받으시는 분')}</InputLabel>
                    <InputField
                        placeholder={t('수령자명을 입력해 주세요.')}
                        {...register('shippingAddress.receiverName')}
                    />
                    <ErrorMessage name='shippingAddress.receiverName' />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('휴대폰번호')}</InputLabel>
                    <InputField
                        type='tel'
                        placeholder={t('‘-’없이 입력해 주세요.')}
                        {...register(
                            'shippingAddress.shippingInfoLaterInputContact',
                        )}
                    />
                    <ErrorMessage name='shippingAddress.shippingInfoLaterInputContact' />
                </InputFieldContainer>
            </div>
        </section>
    );
};
