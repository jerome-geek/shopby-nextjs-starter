import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { overlay } from 'overlay-kit';
import * as styles from './ShippingAddressListModal.css';
import ShippingAddressCreateModal from './ShippingAddressCreateModal';
import ModalLayout from '@/components/layout/modal';
import { Address } from '@/models/order/shippingAddress';
import { useShippingAddressList } from '@/hooks/query/order/shippingAddress';
import { useProfile } from '@/hooks/query/member/profile';

interface ShippingAddressListModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onSelect: (address: Address) => void;
    currentAddressNo?: number;
    unmount: () => void;
    // addresses: Address[];
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
    // onSelect,
    currentAddressNo,
    unmount,
    // addresses,
}: ShippingAddressListModalProps) => {
    const { t } = useTranslation();

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
            <div className={styles.addressList}>
                {addresses.map((address) => {
                    const isActive = currentAddressNo === address.addressNo;
                    return (
                        <div
                            key={address.addressNo}
                            className={`${styles.addressCard} ${isActive ? styles.activeCard : ''}`}
                            onClick={() => {
                                onSelect(address);
                                onClose();
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
                                onSelect(address);
                                onClose();
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
            </div>
        </ModalLayout>
    );
};

export default ShippingAddressListModal;
