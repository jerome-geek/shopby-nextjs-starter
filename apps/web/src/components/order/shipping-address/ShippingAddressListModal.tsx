import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { overlay } from 'overlay-kit';
import * as styles from './ShippingAddressListModal.css';
import ShippingAddressCreateModal from './ShippingAddressCreateModal';
import ModalLayout from '@/components/layout/modal';

interface ShippingAddress {
    addressNo: number;
    addressName: string;
    receiverName: string;
    receiverZipCd: string;
    receiverAddress: string;
    receiverDetailAddress: string;
    receiverContact1: string;
    defaultYn: 'Y' | 'N';
}

interface ShippingAddressListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (address: ShippingAddress) => void;
    currentAddressNo?: number;
    unmount: () => void;
}

const dummyAddresses: ShippingAddress[] = [
    {
        addressNo: 1,
        addressName: '집',
        receiverName: '김졸리',
        receiverZipCd: '00000',
        receiverAddress: '서울시 강남구 테헤란로 123',
        receiverDetailAddress: '@@건물 201호',
        receiverContact1: '010-1234-5678',
        defaultYn: 'Y',
    },
    {
        addressNo: 2,
        addressName: '집',
        receiverName: '김졸리',
        receiverZipCd: '00000',
        receiverAddress: '경기도 안양시 동안구 시민대로 235',
        receiverDetailAddress: '3층 사무실',
        receiverContact1: '010-1234-5678',
        defaultYn: 'N',
    },
];

const ShippingAddressListModal = ({
    isOpen,
    onClose,
    onSelect,
    currentAddressNo,
    unmount,
}: ShippingAddressListModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            isOpen={isOpen}
            close={onClose}
            unmount={unmount}
            title={t('배송지 선택')}
            size="medium"
            footerButtonList={[
                <button
                    key="register-btn"
                    type="button"
                    className={styles.registerButton}
                    onClick={() => {
                        overlay.open(({ isOpen: isCreateOpen, close: closeCreate, unmount: unmountCreate }) => (
                            <ShippingAddressCreateModal
                                isOpen={isCreateOpen}
                                onClose={closeCreate}
                                unmount={unmountCreate}
                                onSubmit={(data) => {
                                    console.log('New Address:', data);
                                    closeCreate();
                                }}
                            />
                        ));
                    }}
                >
                    <Plus size={20} />
                    <span>{t('신규 배송지 등록하기')}</span>
                </button>
            ]}
        >
            <div className={styles.addressList}>
                {dummyAddresses.map((address) => {
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
                                {address.receiverAddress}, {address.receiverDetailAddress} ({address.receiverZipCd})
                            </p>
                            <p className={styles.recipientText}>
                                {address.receiverName} ({address.receiverContact1})
                            </p>
                        </div>
                    );
                })}
            </div>
        </ModalLayout>
    );
};

export default ShippingAddressListModal;
