import { useTranslation } from 'react-i18next';
import { useFormContext, useWatch } from 'react-hook-form';

import * as styles from '@/components/order/orderer-info/index.css';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import InputField from '@/components/ui/input/field';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import { InputLabel } from '@/components/ui/input/label';
import Select from '@/components/ui/select';
import { PHONE_PREFIX_NUMBER_LIST } from '@/const/form';
import { PaymentReserveSchemaType } from '@/schema';

const isGlobalMall = process.env.NEXT_PUBLIC_LOCALE !== 'ko';

const OrdererInfo = () => {
    const { t } = useTranslation();

    const { register, control, setValue } =
        useFormContext<PaymentReserveSchemaType>();

    const receiverContact1Prefix =
        useWatch({
            control,
            name: 'shippingAddress.receiverContact1.prefix',
        }) || '010';

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>{t('주문자 정보')}</h3>

            <div className={styles.ordererForm}>
                {isGlobalMall ? (
                    <>
                        {/* <InputFieldContainer>
                            <InputLabel isRequired>{t('성')}</InputLabel>
                            <InputField
                                placeholder='Last Name'
                                {...register('orderer.ordererLastName')}
                            />
                            <ErrorMessage name='orderer.ordererLastName' />
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputLabel isRequired>{t('이름')}</InputLabel>
                            <InputField
                                placeholder='First Name'
                                {...register('orderer.ordererFirstName')}
                            />
                            <ErrorMessage name='orderer.ordererFirstName' />
                        </InputFieldContainer> */}
                    </>
                ) : (
                    <InputFieldContainer>
                        <InputLabel isRequired>{t('이름')}</InputLabel>
                        <InputField
                            placeholder={t('주문자 성함')}
                            {...register('orderer.ordererName')}
                        />
                        <ErrorMessage name='orderer.ordererName' />
                    </InputFieldContainer>
                )}

                <InputFieldContainer>
                    <InputLabel isRequired>{t('이메일')}</InputLabel>
                    <InputField
                        placeholder='example@email.com'
                        {...register('orderer.ordererEmail')}
                    />
                    <ErrorMessage name='orderer.ordererEmail' />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                    <div className={styles.phoneInputGroup}>
                        <Select
                            options={PHONE_PREFIX_NUMBER_LIST}
                            value={PHONE_PREFIX_NUMBER_LIST.find(
                                (o) => o.value === receiverContact1Prefix,
                            )}
                            onChange={(option) => {
                                if (option) {
                                    setValue(
                                        'orderer.ordererContact1.prefix',
                                        option.value,
                                        { shouldDirty: true },
                                    );
                                }
                            }}
                        />
                        <InputField
                            placeholder='0000'
                            maxLength={4}
                            inputMode='numeric'
                            {...register('orderer.ordererContact1.middle')}
                        />
                        <InputField
                            placeholder='0000'
                            maxLength={4}
                            inputMode='numeric'
                            {...register('orderer.ordererContact1.last')}
                        />
                    </div>
                </InputFieldContainer>
            </div>
        </section>
    );
};

export default OrdererInfo;
