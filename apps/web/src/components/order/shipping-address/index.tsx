import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from 'lucide-react';
import { overlay } from 'overlay-kit';

import * as styles from '@/components/order/shipping-address/index.css';
import ShippingAddressListModal from './ShippingAddressListModal';
import GuestShippingAddressForm from './GuestShippingAddressForm';
import { useAuth } from '@/hooks/useAuth';
import { Address } from '@/models/order/shippingAddress';

// NOTE: 현재는 더미 데이터를 사용 (나중엔 API 쿼리로 교체)
const dummyAddresses: Address[] = [
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

const ShippingAddress = () => {
    const { t } = useTranslation();
    const isLogin = useAuth();

    const [selectedAddress, setSelectedAddress] = useState<Address>(
        dummyAddresses[0],
    );

    const handleSelectAddress = () => {
        overlay.open(({ isOpen, close, unmount }) => (
            <ShippingAddressListModal
                isOpen={isOpen}
                onClose={close}
                unmount={unmount}
                currentAddressNo={selectedAddress.addressNo}
                onSelect={(address) => {
                    setSelectedAddress(address);
                }}
                addresses={dummyAddresses}
            />
        ));
    };

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
                        <span>배송지 선택하기</span>
                        <ChevronRightIcon width='16px' />
                    </button>
                )}
            </div>

            {isLogin === null && null}

            {isLogin === false && <GuestShippingAddressForm />}

            {isLogin === true && (
                <div
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '16px',
                        marginTop: '12px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                            marginBottom: '8px',
                        }}
                    >
                        <span style={{ fontWeight: 600 }}>
                            {selectedAddress.addressName}
                        </span>
                        {selectedAddress.defaultYn === 'Y' && (
                            <span
                                style={{
                                    fontSize: '11px',
                                    background: '#333',
                                    color: '#fff',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                }}
                            >
                                {t('기본배송지')}
                            </span>
                        )}
                    </div>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#333',
                            marginBottom: '4px',
                        }}
                    >
                        {selectedAddress.receiverAddress},{' '}
                        {selectedAddress.receiverDetailAddress} (
                        {selectedAddress.receiverZipCd})
                    </p>
                    <p style={{ fontSize: '13px', color: '#666' }}>
                        {selectedAddress.receiverName} (
                        {selectedAddress.receiverContact1})
                    </p>
                </div>
            )}
        </section>
    );
};

export default ShippingAddress;
