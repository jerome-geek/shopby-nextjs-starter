import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/order/orderer-info/index.css';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { PHONE_PREFIX_NUMBER_LIST } from '@/const/form';
import { useAuth } from '@/hooks/useAuth';
import { PaymentReserveSchemaType } from '@/schema';
import { PhonePrefixType } from '@/schema/common.schema';
import { ErrorMessage } from '@/shared/components/form';
import * as errorMessageStyles from '@/shared/components/form/error-message/index.css';

const isGlobalMall = process.env.NEXT_PUBLIC_LOCALE !== 'ko';

const OrdererInfo = () => {
    const { t } = useTranslation();
    const isLogin = useAuth();

    const { register, control, setValue } =
        useFormContext<PaymentReserveSchemaType>();

    const { errors } = useFormState({ control });

    const ordererContact1Prefix =
        useWatch({
            control,
            name: 'orderer.ordererContact1.prefix',
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
                                (o) => o.value === ordererContact1Prefix,
                            )}
                            onChange={(option) => {
                                if (option) {
                                    setValue(
                                        'orderer.ordererContact1.prefix',
                                        option.value as PhonePrefixType,
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
                            {...register('orderer.ordererContact1.suffix')}
                        />
                    </div>
                    {!!(
                        errors.orderer?.ordererContact1?.prefix?.message ||
                        errors.orderer?.ordererContact1?.middle?.message ||
                        errors.orderer?.ordererContact1?.suffix?.message
                    ) && (
                        <p className={errorMessageStyles.errorMessage}>
                            {t('휴대폰 번호를 입력해주세요.')}
                        </p>
                    )}
                </InputFieldContainer>

                {!isLogin && (
                    <>
                        <InputFieldContainer>
                            <InputLabel isRequired>{t('비밀번호')}</InputLabel>
                            <InputField
                                type='password'
                                placeholder={t(
                                    '8~12자 이내(영문/숫자/특수문자 조합)',
                                )}
                                {...register('tempPassword')}
                            />
                            <ErrorMessage name='tempPassword' />
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputLabel isRequired>
                                {t('비밀번호 확인')}
                            </InputLabel>
                            <InputField
                                type='password'
                                placeholder={t('비밀번호 다시 입력')}
                                {...register('tempPasswordCheck')}
                            />
                            <ErrorMessage name='tempPasswordCheck' />
                        </InputFieldContainer>
                    </>
                )}
            </div>
        </section>
    );
};

export default OrdererInfo;
