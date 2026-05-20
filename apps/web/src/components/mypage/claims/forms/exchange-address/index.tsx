import { isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import address from '@/api/manage/address';
import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import { AddressRegister } from '@/components/layer-contents/address-search';
import { AddressSearchModal } from '@/components/modal';
import { Button } from '@/components/ui';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import {
    COUNTRY_CODE_LIST,
    MOBILE_COUNTRY_CODE_LIST,
    STATE_LIST,
} from '@/const/form';
import { CustomsIdNumberField } from '@/features/order/components/form/input-field';
import useGuestOrderOptionDetailForClaim from '@/hooks/query/claim/guest/useGuestOrderOptionDetailForClaim';
import useOrderOptionDetailForClaim from '@/hooks/query/claim/member/useOrderOptionDetailForClaim';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useGlobal, useResponsive } from '@/hooks/utils';
import type { ClaimType } from '@/models';
import { ErrorMessage } from '@/shared/components/form';

interface ClaimExchangeAddressProps {
    orderOptionNo: number;
    claimType: ClaimType;
}

export const ClaimExchangeAddress = ({
    orderOptionNo,
    claimType,
}: ClaimExchangeAddressProps) => {
    const { t } = useTranslation();
    const isLogin = useAuth();
    const { isKorean, countryCd, defaultMobileCountryCode } = useGlobal();

    const { isMobile } = useResponsive();

    const { openDialog } = useDialog();

    const { control, register, setValue, getValues, watch, reset } =
        useFormContext();

    const { data: orderOptionDetailForClaimData } =
        useOrderOptionDetailForClaim({
            orderOptionNo,
            searchParams: {
                claimType,
            },
        });

    const { data: guestOrderOptionDetailForClaimData } =
        useGuestOrderOptionDetailForClaim({
            orderOptionNo,
            searchParams: {
                claimType,
            },
        });

    const orderOptionDetailData = isLogin
        ? orderOptionDetailForClaimData
        : guestOrderOptionDetailForClaimData;

    const addressRegister = (address: AddressRegister) => {
        setValue(
            'exchangeAddress.receiverJibunAddress',
            address.receiverJibunAddress,
        );
        setValue('exchangeAddress.receiverAddress', address.receiverAddress);
        setValue('exchangeAddress.receiverZipCd', address.receiverZipCd);
    };

    const onOpenAddressSearchModal = () => {
        if (isMobile) {
            overlay.open((props) => {
                return (
                    <AddressSearchBottomSheet
                        {...props}
                        onSelect={addressRegister}
                    />
                );
            });
        } else {
            overlay.open((props) => {
                return (
                    <AddressSearchModal {...props} onSelect={addressRegister} />
                );
            });
        }
    };

    const onCountryClick = (value: string) => {
        setValue('exchangeAddress.receiverMobileCountryCd', value);
        reset((prev) => ({
            ...prev,
            countryCd: value,
            receiverAddress: '',
            receiverDetailAddress: '',
            receiverJibunAddress: '',
            receiverState: '',
            receiverCity: '',
            receiverZipCd: '',
        }));
    };

    const searchJapanAddress = async () => {
        const zipCode = getValues('exchangeAddress.receiverZipCd');

        if (!zipCode) {
            openDialog({
                message: t('우편번호를 입력해주세요.'),
            });
            return;
        }

        try {
            const { data } = await address.searchJpAddress({ zipCode });
            setValue('exchangeAddress.receiverJibunAddress', data.address);
            setValue('exchangeAddress.receiverAddress', data.address);
            setValue('exchangeAddress.receiverCity', data.city);
            setValue('exchangeAddress.receiverState', data.prefCode);
        } catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data.message
                : t('배송지를 등록할 수 없습니다.');
            openDialog({ message });
        }
    };

    const countryCdWatch = watch('exchangeAddress.countryCd');
    const receiverStateWatch = watch('exchangeAddress.receiverState');
    const receiverAddress = watch('exchangeAddress.receiverAddress');

    const effectiveCountryCd =
        countryCdWatch ??
        orderOptionDetailData?.exchangeAddress?.countryCd ??
        countryCd;

    useEffect(() => {
        const initCountryCd =
            orderOptionDetailData?.exchangeAddress?.countryCd ?? countryCd;
        if (!countryCdWatch && initCountryCd) {
            setValue('exchangeAddress.countryCd', initCountryCd);
        }
    }, [
        orderOptionDetailData?.exchangeAddress?.countryCd,
        countryCd,
        countryCdWatch,
        setValue,
    ]);

    useEffect(() => {
        if (receiverAddress) {
            setValue('exchangeAddress.receiverJibunAddress', receiverAddress);
        }
    }, [receiverAddress, setValue]);

    const receiverName = watch('exchangeAddress.receiverName');
    const receiverLastName = watch('exchangeAddress.receiverLastName');
    const receiverFirstName = watch('exchangeAddress.receiverFirstName');

    useEffect(() => {
        if (!receiverName && (receiverLastName || receiverFirstName)) {
            setValue(
                'exchangeAddress.receiverName',
                `${receiverLastName ?? ''}${receiverFirstName ?? ''}`,
                {
                    shouldValidate: true,
                },
            );
        }
    }, [receiverLastName, receiverLastName, receiverName]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                {t('교환 출고 정보')}
            </h3>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                {/* 수령자명 */}
                <InputFieldContainer>
                    <InputLabel isRequired>{t('수령자명')}</InputLabel>
                    {isKorean ? (
                        <>
                            <InputField
                                placeholder={t('수령자명을 입력해 주세요')}
                                {...register('exchangeAddress.receiverName')}
                            />
                            <ErrorMessage name='exchangeAddress.receiverName' />
                        </>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <InputField
                                    placeholder='First Name'
                                    {...register(
                                        'exchangeAddress.receiverFirstName',
                                    )}
                                    style={{ flex: 1 }}
                                />
                                <InputField
                                    placeholder='Last Name'
                                    {...register(
                                        'exchangeAddress.receiverLastName',
                                    )}
                                    style={{ flex: 1 }}
                                />
                            </div>
                            <ErrorMessage name='exchangeAddress.receiverFirstName' />
                            <ErrorMessage name='exchangeAddress.receiverLastName' />
                        </div>
                    )}
                </InputFieldContainer>

                {/* 배송지 주소 */}
                <InputFieldContainer>
                    <InputLabel isRequired>{t('배송지 주소')}</InputLabel>

                    {!isKorean && (
                        <Controller
                            name='exchangeAddress.countryCd'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Select
                                    isSearchable
                                    options={COUNTRY_CODE_LIST}
                                    value={
                                        COUNTRY_CODE_LIST.find(
                                            (o) => o.value === value,
                                        ) || null
                                    }
                                    onChange={(selectedOption) => {
                                        if (selectedOption) {
                                            onChange(
                                                selectedOption.value,
                                                setValue(
                                                    'exchangeAddress.receiverState',
                                                    '',
                                                ),
                                            );
                                            onCountryClick(
                                                selectedOption.value,
                                            );
                                        }
                                    }}
                                    placeholder={t('국가 선택')}
                                    menuPortalTarget={
                                        isMobile ? document.body : null
                                    }
                                    menuShouldBlockScroll={isMobile}
                                />
                            )}
                        />
                    )}

                    {effectiveCountryCd === 'KR' && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <InputField
                                    placeholder={t('우편번호')}
                                    {...register(
                                        'exchangeAddress.receiverZipCd',
                                    )}
                                    readOnly
                                    style={{
                                        flex: 2,
                                        backgroundColor: '#f8f8f8',
                                    }}
                                />
                                <Button
                                    frame='solid'
                                    variant='apple'
                                    type='button'
                                    onClick={onOpenAddressSearchModal}
                                    style={{
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        width: '120px',
                                        height: isMobile ? '44px' : '52px',
                                    }}
                                >
                                    {t('우편번호 찾기')}
                                </Button>
                            </div>
                            <InputField
                                placeholder={t('주소')}
                                {...register('exchangeAddress.receiverAddress')}
                                readOnly
                                style={{ backgroundColor: '#f8f8f8' }}
                            />
                            <InputField
                                placeholder={t('상세 주소')}
                                {...register(
                                    'exchangeAddress.receiverDetailAddress',
                                )}
                            />
                            <ErrorMessage name='exchangeAddress.receiverAddress' />
                            <ErrorMessage name='exchangeAddress.receiverDetailAddress' />
                        </div>
                    )}

                    {effectiveCountryCd === 'JP' && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <InputField
                                    placeholder={t('우편번호')}
                                    {...register(
                                        'exchangeAddress.receiverZipCd',
                                    )}
                                    style={{ flex: 2 }}
                                />
                                <Button
                                    frame='solid'
                                    variant='apple'
                                    type='button'
                                    onClick={searchJapanAddress}
                                    style={{
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        width: '120px',
                                        height: isMobile ? '44px' : '52px',
                                    }}
                                >
                                    {t('우편번호 찾기')}
                                </Button>
                            </div>
                            <InputField
                                placeholder='Address'
                                {...register('exchangeAddress.receiverAddress')}
                                readOnly
                                style={{ backgroundColor: '#f8f8f8' }}
                            />
                            <InputField
                                placeholder='Detail Address'
                                {...register(
                                    'exchangeAddress.receiverDetailAddress',
                                )}
                            />
                            <ErrorMessage name='exchangeAddress.receiverAddress' />
                            <ErrorMessage name='exchangeAddress.receiverDetailAddress' />
                        </div>
                    )}

                    {effectiveCountryCd !== 'KR' &&
                        effectiveCountryCd !== 'JP' && (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <InputField
                                    placeholder='Address'
                                    {...register(
                                        'exchangeAddress.receiverAddress',
                                    )}
                                />
                                <InputField
                                    placeholder='Detail Address'
                                    {...register(
                                        'exchangeAddress.receiverDetailAddress',
                                    )}
                                />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {effectiveCountryCd === 'US' ? (
                                        <div style={{ flex: 1 }}>
                                            <Controller
                                                name='exchangeAddress.receiverState'
                                                control={control}
                                                render={({
                                                    field: { value, onChange },
                                                }) => (
                                                    <Select
                                                        isSearchable
                                                        options={STATE_LIST}
                                                        value={
                                                            STATE_LIST.find(
                                                                (o) =>
                                                                    o.value ===
                                                                    value,
                                                            ) || null
                                                        }
                                                        onChange={(opt) =>
                                                            onChange(opt?.value)
                                                        }
                                                        placeholder='State'
                                                        menuPortalTarget={
                                                            isMobile
                                                                ? document.body
                                                                : null
                                                        }
                                                        menuShouldBlockScroll={
                                                            isMobile
                                                        }
                                                    />
                                                )}
                                            />
                                        </div>
                                    ) : (
                                        <InputField
                                            placeholder='State'
                                            {...register(
                                                'exchangeAddress.receiverState',
                                            )}
                                            style={{ flex: 1 }}
                                        />
                                    )}
                                    <InputField
                                        placeholder='City'
                                        {...register(
                                            'exchangeAddress.receiverCity',
                                        )}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <InputField
                                    placeholder='Zip/Postal Code'
                                    {...register(
                                        'exchangeAddress.receiverZipCd',
                                    )}
                                />
                                <ErrorMessage name='exchangeAddress.receiverAddress' />
                            </div>
                        )}
                </InputFieldContainer>

                {/* 휴대폰 번호 */}
                <InputFieldContainer>
                    <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {!isKorean && (
                            <div style={{ width: '120px' }}>
                                <Controller
                                    name='exchangeAddress.receiverMobileCountryCd'
                                    control={control}
                                    defaultValue={defaultMobileCountryCode}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <Select
                                            isSearchable
                                            options={MOBILE_COUNTRY_CODE_LIST}
                                            value={
                                                MOBILE_COUNTRY_CODE_LIST.find(
                                                    (o) => o.value === value,
                                                ) || null
                                            }
                                            onChange={(opt) =>
                                                onChange(opt?.value)
                                            }
                                            placeholder='Code'
                                            menuPortalTarget={
                                                isMobile ? document.body : null
                                            }
                                            menuShouldBlockScroll={isMobile}
                                        />
                                    )}
                                />
                            </div>
                        )}
                        <InputField
                            {...register('exchangeAddress.receiverContact1')}
                            style={{ flex: 1 }}
                        />
                    </div>
                    <ErrorMessage name='exchangeAddress.receiverContact1' />
                </InputFieldContainer>

                {/* 전화번호 */}
                {!isKorean && (
                    <InputFieldContainer>
                        <InputLabel>{t('전화번호')}</InputLabel>
                        <InputField
                            {...register('exchangeAddress.receiverContact2')}
                        />
                    </InputFieldContainer>
                )}

                {/* 개인통관고유부호 */}
                <CustomsIdNumberField
                    register={register}
                    name='exchangeAddress.customsIdNumber'
                />

                {/* 배송메모 */}
                <InputFieldContainer>
                    <InputLabel>{t('배송메모')}</InputLabel>
                    <InputField {...register('exchangeAddress.deliveryMemo')} />
                    <ErrorMessage name='exchangeAddress.deliveryMemo' />
                </InputFieldContainer>
            </div>
        </div>
    );
};

export default ClaimExchangeAddress;
