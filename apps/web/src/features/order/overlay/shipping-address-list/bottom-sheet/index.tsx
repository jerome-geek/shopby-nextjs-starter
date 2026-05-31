import { Plus } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BottomSheetLayout } from '@/shared/components/layout';
import * as styles from '@/features/order/overlay/shipping-address-list/bottom-sheet/index.css';
import ShippingAddressCreateModal from '@/features/order/components/shipping-address/ShippingAddressCreateModal';
import { useProfile } from '@/hooks/query/member/profile';
import { useShippingAddressList } from '@/hooks/query/order/shippingAddress';
import type { Address } from '@/models/order/shippingAddress';
import { PaymentReserveSchemaType } from '@/schema';


interface ShippingAddressListBottomSheetProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    currentAddressNo?: number;
}

export const ShippingAddressListBottomSheet = ({
    isOpen,
    close,
    unmount,
    currentAddressNo,
}: ShippingAddressListBottomSheetProps) => {
    const { t } = useTranslation();
    const { setValue } = useFormContext<PaymentReserveSchemaType>();

    const openCreateModal = (initialData?: Address) => {
        overlay.open(
            ({
                isOpen: isCreateOpen,
                close: closeCreate,
                unmount: unmountCreate,
            }) => (
                <ShippingAddressCreateModal
                    isOpen={isCreateOpen}
                    onClose={closeCreate}
                    unmount={unmountCreate}
                    initialData={initialData}
                />
            ),
        );
    };

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;
    const { data: shippingAddressListData } = useShippingAddressList({
        options: { enabled: memberNo !== 0 },
    });

    const addressList = useMemo(() => {
        const defaultAddress = shippingAddressListData?.defaultAddress;
        return defaultAddress
            ? [
                  shippingAddressListData?.defaultAddress,
                  ...((shippingAddressListData?.bookedAddresses ?? []).filter(
                      (item) => item.defaultYn === 'N',
                  ) ?? []),
              ]
            : (shippingAddressListData?.bookedAddresses ?? []);
    }, [shippingAddressListData]);

    const onSelectAddress = (address: Address) => {
        const contact = address.receiverContact1 || '';
        const numbers = contact.replace(/[^0-9]/g, '');

        let prefix = '010';
        let middle = '';
        let suffix = '';

        if (numbers.length === 11) {
            prefix = numbers.slice(0, 3);
            middle = numbers.slice(3, 7);
            suffix = numbers.slice(7);
        } else if (numbers.length === 10) {
            prefix = numbers.slice(0, 3);
            middle = numbers.slice(3, 6);
            suffix = numbers.slice(6);
        } else {
            const parts = contact.split('-');
            if (parts.length === 3) {
                [prefix, middle, suffix] = parts;
            }
        }

        setValue(
            'shippingAddress',
            {
                addressNo: address.addressNo,
                addressName: address.addressName,
                receiverName: address.receiverName,
                receiverZipCd: address.receiverZipCd,
                receiverAddress: address.receiverAddress,
                receiverDetailAddress: address.receiverDetailAddress || '',
                receiverJibunAddress:
                    address.receiverJibunAddress || address.receiverAddress,
                countryCd: address.countryCd ?? 'KR',
                receiverCity: address.city || '',
                receiverState: address.state || '',
                customsIdNumber: address.customsIdNumber || '',
                receiverMobileCountryCd:
                    address.receiverMobileCountryCd || '',
                receiverLastName:
                    address.shippingEtcInfo?.receiverLastName || '',
                receiverFirstName:
                    address.shippingEtcInfo?.receiverFirstName || '',
                receiverContact1: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    prefix: prefix as any,
                    middle: middle || '',
                    suffix: suffix || '',
                },
            },
            { shouldValidate: true },
        );
        close();
    };

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('배송지 선택')}
            type='partial'
            footerButtonList={[
                <button
                    key='register-btn'
                    type='button'
                    className={styles.registerButton}
                    onClick={() => openCreateModal()}
                >
                    <Plus size={20} />
                    <span>{t('신규 배송지 등록하기')}</span>
                </button>,
            ]}
        >
            <ul className={styles.addressList}>
                {addressList.map((address) => {
                    const isActive =
                        currentAddressNo === address.addressNo;
                    return (
                        <li
                            key={address.addressNo}
                            className={`${styles.addressCard} ${isActive ? styles.activeCard : ''}`}
                            onClick={() => onSelectAddress(address)}
                        >
                            <div className={styles.cardHeader}>
                                <span className={styles.addressAlias}>
                                    {address.addressName}
                                </span>
                                {address.defaultYn === 'Y' && (
                                    <span className={styles.defaultBadge}>
                                        {t('기본배송지')}
                                    </span>
                                )}
                            </div>
                            <div className={styles.addressTextBlock}>
                                <p className={styles.addressText}>
                                    {address.receiverAddress},{' '}
                                    {address.receiverDetailAddress} (
                                    {address.receiverZipCd})
                                </p>
                                <p className={styles.recipientText}>
                                    {address.receiverName} (
                                    {address.receiverContact1})
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </BottomSheetLayout>
    );
};
