import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { overlay } from 'overlay-kit';
import * as styles from './ShippingAddressListModal.css';
import ShippingAddressCreateModal from './ShippingAddressCreateModal';
import ModalLayout from '@/components/layout/modal';
import { Address } from '@/models/order/shippingAddress';

interface ShippingAddressListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (address: Address) => void;
    currentAddressNo?: number;
    unmount: () => void;
    addresses: Address[];
}

const ShippingAddressListModal = ({
    isOpen,
    onClose,
    onSelect,
    currentAddressNo,
    unmount,
    addresses,
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
                    const isActive =
                        currentAddressNo === address.addressNo;
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
