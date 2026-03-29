import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as styles from './ShippingAddressCreateModal.css';
import InputField from '@/components/ui/input/field';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import { InputLabel } from '@/components/ui/input/label';
import InputCheckbox from '@/components/ui/input/Checkbox';
import Select from '@/components/ui/select';
import ModalLayout from '@/components/layout/modal';
import { overlay } from 'overlay-kit';
import AddressSearchModal from '@/components/modal/AddressSearch';

interface ShippingAddressForm {
    addressName?: string;
    receiverName?: string;
    receiverZipCd?: string;
    receiverAddress?: string;
    receiverDetailAddress?: string;
    receiverContact1?: string;
    defaultYn?: 'Y' | 'N';
}

interface ShippingAddressCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    unmount: () => void;
    onSubmit: (data: ShippingAddressForm) => void;
}

const ShippingAddressCreateModal = ({
    isOpen,
    onClose,
    unmount,
    onSubmit,
}: ShippingAddressCreateModalProps) => {
    const { t } = useTranslation();
    const [isDefault, setIsDefault] = useState(false);
    const [sameAsOrderer, setSameAsOrderer] = useState(false);

    // 주소 상태 관리
    const [addressInfo, setAddressInfo] = useState({
        zipCode: '',
        address: '',
    });

    const handleAddressSearch = () => {
        overlay.open(({ isOpen: isSearchOpen, close: closeSearch, unmount: unmountSearch }) => (
            <AddressSearchModal
                isOpen={isSearchOpen}
                close={closeSearch}
                unmount={unmountSearch}
                onSelect={(data) => {
                    setAddressInfo({
                        zipCode: data.receiverZipCd,
                        address: data.receiverAddress,
                    });
                }}
            />
        ));
    };

    const phonePrefixOptions = [
        { value: '010', label: '010' },
        { value: '011', label: '011' },
        { value: '016', label: '016' },
        { value: '017', label: '017' },
        { value: '019', label: '019' },
    ];

    const deliveryRequestOptions = [
        { value: 'DIRECT', label: t('직접 입력') },
        { value: 'DOOR', label: t('문 앞에 놓아주세요') },
        { value: 'SECURITY', label: t('경비실에 맡겨주세요') },
        { value: 'BOX', label: t('택배함에 넣어주세요') },
    ];

    return (
        <ModalLayout
            isOpen={isOpen}
            close={onClose}
            unmount={unmount}
            title={t('신규 배송지 등록')}
            size="medium"
            footerButtonList={[
                <button 
                  key="cancel-btn"
                  type="button" 
                  className={styles.cancelButton} 
                  onClick={onClose}
                >
                    {t('취소하기')}
                </button>,
                <button 
                    key="submit-btn"
                    type="button" 
                    className={styles.submitButton}
                    onClick={() => onSubmit({})}
                >
                    {t('등록하기')}
                </button>
            ]}
        >
            <div className={styles.formContent}>
                <div className={styles.checkboxGroup}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <InputCheckbox 
                            id="sameAsOrderer"
                            checked={sameAsOrderer}
                            onCheckedChange={setSameAsOrderer}
                        />
                        <label htmlFor="sameAsOrderer" style={{ fontSize: '14px', cursor: 'pointer' }}>
                            {t('회원정보와 동일')}
                        </label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <InputCheckbox 
                            id="isDefault"
                            checked={isDefault}
                            onCheckedChange={setIsDefault}
                        />
                        <label htmlFor="isDefault" style={{ fontSize: '14px', cursor: 'pointer' }}>
                            {t('기본 배송지로 설정')}
                        </label>
                    </div>
                </div>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('배송지명')}</InputLabel>
                    <InputField placeholder={t('예: 집, 회사')} />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('받으시는 분')}</InputLabel>
                    <InputField placeholder={t('이름을 입력해주세요')} />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                    <div className={styles.phoneInputGroup}>
                        <div style={{ width: '120px' }}>
                            <Select 
                                options={phonePrefixOptions} 
                                defaultValue={phonePrefixOptions[0]}
                            />
                        </div>
                        <InputField placeholder="0000" maxLength={4} inputMode="numeric" />
                        <InputField placeholder="0000" maxLength={4} inputMode="numeric" />
                    </div>
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('배송지')}</InputLabel>
                    <div className={styles.fieldRow}>
                        <InputField 
                            placeholder={t('우편번호')} 
                            style={{ flex: 1 }} 
                            readOnly 
                            value={addressInfo.zipCode}
                        />
                        <button 
                            type="button" 
                            className={styles.postcodeButton}
                            onClick={handleAddressSearch}
                        >
                            {t('우편번호 찾기')}
                        </button>
                    </div>
                    <InputField 
                        placeholder={t('기본 주소')} 
                        style={{ marginTop: '8px' }} 
                        readOnly 
                        value={addressInfo.address}
                    />
                    <InputField placeholder={t('상세 주소를 입력해주세요')} style={{ marginTop: '8px' }} />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel>{t('배송 요청사항')}</InputLabel>
                    <Select 
                        options={deliveryRequestOptions} 
                        defaultValue={deliveryRequestOptions[0]}
                    />
                    <InputField 
                        placeholder={t('배송지 메모를 입력해주세요')} 
                        style={{ marginTop: '8px' }} 
                    />
                </InputFieldContainer>
            </div>
        </ModalLayout>
    );
};

export default ShippingAddressCreateModal;
