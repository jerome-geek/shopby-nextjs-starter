import { ChevronRightIcon } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ShippingAddressListBottomSheet } from '@/components/bottom-sheet/shipping-address-list';
import { ShippingAddressListModal } from '@/components/modal';
import GuestShippingAddressForm from '@/components/order/shipping-address/GuestShippingAddressForm';
import * as styles from '@/components/order/shipping-address/index.css';
import { ErrorMessage } from '@/components/ui/form';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
} from '@/components/ui/input';
import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import { PaymentReserveSchemaType } from '@/schema';

interface ShippingAddressProps {
    orderSheetNo: string;
}

const ShippingAddress = ({ orderSheetNo }: ShippingAddressProps) => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const { isMobile } = useResponsive();

    const methods = useFormContext<PaymentReserveSchemaType>();
    const { control, register } = methods;
    const shippingAddress = useWatch({ control, name: 'shippingAddress' });

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    const handleSelectAddress = () => {
        if (isMobile) {
            overlay.open(({ isOpen, close, unmount }) => (
                <FormProvider {...methods}>
                    <ShippingAddressListBottomSheet
                        isOpen={isOpen}
                        close={close}
                        unmount={unmount}
                        currentAddressNo={shippingAddress.addressNo}
                    />
                </FormProvider>
            ));
        } else {
            overlay.open(({ isOpen, close, unmount }) => (
                <FormProvider {...methods}>
                    <ShippingAddressListModal
                        isOpen={isOpen}
                        onClose={close}
                        unmount={unmount}
                        currentAddressNo={shippingAddress.addressNo}
                    />
                </FormProvider>
            ));
        }
    };

    if (isLogin === null) {
        return null;
    }

    return (
        <section className={styles.container}>
            <div className={styles.titleContainer}>
                <h3 className={styles.title}>{t('배송지 정보')}</h3>
                {isLogin && (
                    <button
                        type='button'
                        className={styles.selectAddressButton}
                        onClick={handleSelectAddress}
                    >
                        <span>{t('배송지 선택하기')}</span>
                        <ChevronRightIcon width='16px' />
                    </button>
                )}
            </div>

            {isLogin === false && <GuestShippingAddressForm />}

            {isLogin === true &&
                shippingAddress &&
                shippingAddress.receiverAddress && (
                    <div className={styles.shippingAddressContainer}>
                        <div className={styles.addressNameContainer}>
                            <span className={styles.addressName}>
                                {shippingAddress.addressName || '배송지'}
                            </span>
                            {/* TODO: 조건에 맞게 배송지 뱃지 노출 필요 */}
                            <span className={styles.defaultAddressBadge}>
                                {t('기본배송지')}
                            </span>
                        </div>

                        <div className={styles.addressContainer}>
                            <p className={styles.address}>
                                {`${shippingAddress.receiverAddress}, ${shippingAddress.receiverDetailAddress} (${shippingAddress.receiverZipCd})`}
                            </p>
                            <p className={styles.addressContact}>
                                {shippingAddress.receiverName} (
                                {shippingAddress.receiverContact1 &&
                                typeof shippingAddress.receiverContact1 ===
                                    'object'
                                    ? `${shippingAddress.receiverContact1.prefix}-${shippingAddress.receiverContact1.middle}-${shippingAddress.receiverContact1.suffix}`
                                    : shippingAddress.receiverContact1}
                                )
                            </p>
                        </div>
                    </div>
                )}

            {orderSheetData.requireCustomsIdNumber && (
                <>
                    <InputFieldContainer>
                        <InputLabel isRequired htmlFor='customsIdNumber'>
                            {t('개인통관고유부호')}
                        </InputLabel>
                        <InputField
                            id='customsIdNumber'
                            placeholder={t('P로 시작하는 13자리')}
                            {...register('shippingAddress.customsIdNumber')}
                        />
                        <a
                            href='https://unipass.customs.go.kr/csp/persIndex.do'
                            target='_blank'
                            rel='noopener noreferrer'
                            className={styles.selectAddressButton}
                        >
                            <span>{t('개인통관고유부호 발급 바로가기')}</span>
                            <ChevronRightIcon width='16px' />
                        </a>
                    </InputFieldContainer>
                    <ErrorMessage name='shippingAddress.customsIdNumber' />
                </>
            )}
        </section>
    );
};

export default ShippingAddress;
