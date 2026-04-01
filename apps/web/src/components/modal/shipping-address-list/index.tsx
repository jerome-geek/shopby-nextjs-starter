import { includes } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ModalLayout from '@/components/layout/modal';
import { useShippingAddressMutation } from '@/hooks/mutations';
import { useProfile } from '@/hooks/query/member/profile';
import { useShippingAddressList } from '@/hooks/query/order/shippingAddress';
import { addressKeys } from '@/hooks/queryKeys';
import { useDialog } from '@/hooks/utils';
import { Address } from '@/models/order/shippingAddress';
import { PaymentReserveSchemaType } from '@/schema';
import ShippingAddressCreateModal from '@/components/order/shipping-address/ShippingAddressCreateModal';
import * as styles from '@/components/modal/shipping-address-list/index.css';

interface ShippingAddressListModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentAddressNo?: number;
    unmount: () => void;
}

const addresses: Address[] = [
    {
        addressNo: 1,
        addressName: '집',
        receiverName: '김졸리',
        receiverZipCd: '00000',
        receiverAddress: '서울시 강남구 테헤란로 123',
        receiverDetailAddress: '@@건물 201호',
        receiverJibunAddress: '',
        receiverContact1: '010-1234-5678',
        defaultYn: 'Y',
        addressType: 'BOOK',
        memberNo: 0,
        mallNo: 0,
    },
    {
        addressNo: 2,
        addressName: '회사',
        receiverName: '김졸리',
        receiverZipCd: '00000',
        receiverAddress: '경기도 안양시 동안구 시민대로 235',
        receiverDetailAddress: '3층 사무실',
        receiverJibunAddress: '',
        receiverContact1: '010-1234-5678',
        defaultYn: 'N',
        addressType: 'BOOK',
        memberNo: 0,
        mallNo: 0,
    },
];

const ShippingAddressListModal = ({
    isOpen,
    onClose,
    currentAddressNo,
    unmount,
}: ShippingAddressListModalProps) => {
    const { t } = useTranslation();

    const { setValue } = useFormContext<PaymentReserveSchemaType>();

    const queryClient = useQueryClient();

    const { openAsyncDialog } = useDialog();

    const {
        delete: { mutate: deleteMutate },
    } = useShippingAddressMutation();

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
    const onDeleteButtonClick = async (addressNo: number) => {
        const isAgree = await openAsyncDialog({
            message: t('배송지를 삭제하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        deleteMutate(
            { addressNo },
            {
                onSuccess: async () => {
                    await openAsyncDialog({
                        message: t('배송지가 삭제되었습니다.'),
                    });

                    queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...addressKeys.all]),
                    });

                    onClose();
                },
            },
        );
    };

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;
    const { data: shippingAddressListData } = useShippingAddressList({
        memberNo,
        options: {
            enabled: memberNo !== 0,
        },
    });
    console.log(
        '🚀 ~ ShippingAddressListModal ~ shippingAddressListData:',
        shippingAddressListData,
    );

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
        console.log('🚀 ~ onSelectAddress ~ address:', address);
        const contact = address.receiverContact1 || '';
        const numbers = contact.replace(/[^0-9]/g, '');

        let prefix = '010';
        let middle = '';
        let last = '';

        if (numbers.length === 11) {
            prefix = numbers.slice(0, 3);
            middle = numbers.slice(3, 7);
            last = numbers.slice(7);
        } else if (numbers.length === 10) {
            prefix = numbers.slice(0, 3);
            middle = numbers.slice(3, 6);
            last = numbers.slice(6);
        } else {
            const parts = contact.split('-');
            if (parts.length === 3) {
                [prefix, middle, last] = parts;
            }
        }

        setValue(
            'shippingAddress',
            {
                ...address,
                customsIdNumber: address.customsIdNumber,
                receiverJibunAddress: address.receiverAddress || '',
                receiverContact1: {
                    prefix: prefix as any,
                    middle: middle || '',
                    last: last || '',
                },
            },
            { shouldValidate: true },
        );
        onClose();
    };
    console.log('🚀 ~ ShippingAddressListModal ~ addressList:', addressList);

    // const activeAddress = useMemo(() => {
    //     return addressList.find((item) => item.addressNo === activeAddressNo);
    // }, [addressList, activeAddressNo]);

    return (
        <ModalLayout
            isOpen={isOpen}
            close={onClose}
            unmount={unmount}
            title={t('배송지 선택')}
            size='medium'
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
            <div className={styles.addressList} data-lenis-prevent>
                {addresses.map((address) => {
                    const isActive = currentAddressNo === address.addressNo;
                    return (
                        <div
                            key={address.addressNo}
                            className={`${styles.addressCard} ${isActive ? styles.activeCard : ''}`}
                            onClick={() => {
                                onSelectAddress(address);
                            }}
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
                            <p className={styles.addressText}>
                                {address.receiverAddress},{' '}
                                {address.receiverDetailAddress} (
                                {address.receiverZipCd})
                            </p>
                            <p className={styles.recipientText}>
                                {address.receiverName} (
                                {address.receiverContact1})
                            </p>
                            <div
                                className={styles.cardActions}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    type='button'
                                    className={styles.editButton}
                                    onClick={() => openCreateModal(address)}
                                >
                                    {t('수정')}
                                </button>
                            </div>
                        </div>
                    );
                })}

                {addressList.map((address) => {
                    const isActive = currentAddressNo === address.addressNo;
                    return (
                        <div
                            key={address.addressNo}
                            className={`${styles.addressCard} ${isActive ? styles.activeCard : ''}`}
                            onClick={() => {
                                onSelectAddress(address);
                            }}
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
                            <p className={styles.addressText}>
                                {address.receiverAddress},{' '}
                                {address.receiverDetailAddress} (
                                {address.receiverZipCd})
                            </p>
                            <p className={styles.recipientText}>
                                {address.receiverName} (
                                {address.receiverContact1})
                            </p>
                            <div
                                className={styles.cardActions}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    type='button'
                                    className={styles.editButton}
                                    onClick={() => openCreateModal(address)}
                                >
                                    {t('수정')}
                                </button>
                                <button
                                    type='button'
                                    className={styles.editButton}
                                    onClick={() =>
                                        onDeleteButtonClick(address.addressNo)
                                    }
                                >
                                    {t('삭제')}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ModalLayout>
    );
};

export default ShippingAddressListModal;
