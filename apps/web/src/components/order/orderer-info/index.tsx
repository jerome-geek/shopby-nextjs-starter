import { useFormContext } from 'react-hook-form';

import * as styles from '@/components/order/orderer-info/index.css';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import InputField from '@/components/ui/input/field';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import { InputLabel } from '@/components/ui/input/label';
import { PaymentReserveSchemaType } from '@/schema';

const isGlobalMall = process.env.NEXT_PUBLIC_LOCALE !== 'ko';

const OrdererInfo = () => {
    const { register } = useFormContext<PaymentReserveSchemaType>();

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>주문자 정보</h3>

            <div className={styles.ordererForm}>
                {isGlobalMall ? (
                    <>
                        <InputFieldContainer>
                            <InputLabel isRequired>성</InputLabel>
                            <InputField
                                placeholder='Last Name'
                                {...register('orderer.ordererLastName')}
                            />
                            <ErrorMessage name='orderer.ordererLastName' />
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputLabel isRequired>이름</InputLabel>
                            <InputField
                                placeholder='First Name'
                                {...register('orderer.ordererFirstName')}
                            />
                            <ErrorMessage name='orderer.ordererFirstName' />
                        </InputFieldContainer>
                    </>
                ) : (
                    <InputFieldContainer>
                        <InputLabel isRequired>이름</InputLabel>
                        <InputField
                            placeholder='주문자 성함'
                            {...register('orderer.ordererName')}
                        />
                        <ErrorMessage name='orderer.ordererName' />
                    </InputFieldContainer>
                )}

                <InputFieldContainer>
                    <InputLabel isRequired>이메일</InputLabel>
                    <InputField
                        placeholder='example@email.com'
                        {...register('orderer.ordererEmail')}
                    />
                    <ErrorMessage name='orderer.ordererEmail' />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>전화번호</InputLabel>
                    <InputField
                        placeholder='010-1234-5678'
                        {...register('orderer.ordererContact1')}
                    />
                    <ErrorMessage name='orderer.ordererContact1' />
                </InputFieldContainer>
            </div>
        </section>
    );
};

export default OrdererInfo;
