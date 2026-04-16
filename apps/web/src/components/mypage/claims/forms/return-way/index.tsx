import { isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import { useEffect, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import addressApi from '@/api/manage/address';
import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import { AddressSearchModal } from '@/components/modal';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
    InputRadio,
    Select,
} from '@/components/ui/input';
import {
    COUNTRY_CODE_LIST,
    MOBILE_COUNTRY_CODE_LIST,
    STATE_LIST,
} from '@/const/form';
import { RETURN_WAY_MAP } from '@/const/label';
import useMall from '@/hooks/query/admin/mall/useMall';
import useGuestOrderOptionDetailForClaim from '@/hooks/query/claim/guest/useGuestOrderOptionDetailForClaim';
import useOrderOptionDetailForClaim from '@/hooks/query/claim/member/useOrderOptionDetailForClaim';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useGlobal, useResponsive } from '@/hooks/utils';
import type { ClaimType } from '@/models';
import type { ClaimSchemaMapType } from '@/schema/claim.schema';

interface ClaimReturnWayProps {
    orderOptionNo: number;
    claimType: ClaimType;
}

export const ClaimReturnWay = ({
    orderOptionNo,
    claimType,
}: ClaimReturnWayProps) => {
    const { t } = useTranslation();
    const isLogin = useAuth();
    const { openDialog } = useDialog();
    const {
        isKorean,
        countryCd: defaultCountryCd,
        defaultMobileCountryCode,
    } = useGlobal();
    const { isMobile } = useResponsive();

    const {
        control,
        register,
        setValue,
        watch,
        resetField,
        getValues,
        formState: { errors },
    } = useFormContext<ClaimSchemaMapType['RETURN']>();

    const { data: mallData } = useMall();

    const { data: memberData } = useOrderOptionDetailForClaim({
        orderOptionNo,
        searchParams: { claimType },
        options: { enabled: !!orderOptionNo && !!isLogin },
    });

    const { data: guestData } = useGuestOrderOptionDetailForClaim({
        orderOptionNo,
        searchParams: { claimType },
        options: { enabled: !!orderOptionNo && !isLogin },
    });

    const data = isLogin ? memberData : guestData;

    const returnAddressCountryCd = useWatch({
        control,
        name: 'returnAddress.countryCd',
    });

    const returnAddressReceiverLastName = watch(
        'returnAddress.receiverLastName',
    );
    const returnAddressReceiverFirstName = watch(
        'returnAddress.receiverFirstName',
    );
    const returnAddressReceiverAddress = watch('returnAddress.receiverAddress');

    // 1. 초기 국가 코드 및 휴대폰 국가 코드 설정
    useEffect(() => {
        const initialCountryCd =
            data?.returnAddress?.countryCd || defaultCountryCd;

        if (!returnAddressCountryCd && initialCountryCd) {
            setValue('returnAddress.countryCd', initialCountryCd);
            setValue('returnAddress.receiverMobileCountryCd', initialCountryCd);
        }
    }, [
        data?.returnAddress?.countryCd,
        defaultCountryCd,
        returnAddressCountryCd,
        setValue,
    ]);

    // 2. 수령인 이름 조합 (글로벌)
    useEffect(() => {
        if (
            !isKorean &&
            (returnAddressReceiverLastName || returnAddressReceiverFirstName)
        ) {
            setValue(
                'returnAddress.receiverName',
                `${returnAddressReceiverLastName ?? ''}${returnAddressReceiverFirstName ?? ''}`,
                { shouldValidate: true },
            );
        }
    }, [
        returnAddressReceiverLastName,
        returnAddressReceiverFirstName,
        isKorean,
        setValue,
    ]);

    // 3. 지번 주소 동기화
    useEffect(() => {
        if (returnAddressReceiverAddress) {
            setValue(
                'returnAddress.receiverJibunAddress',
                returnAddressReceiverAddress,
            );
        }
    }, [returnAddressReceiverAddress, setValue]);

    const handleAddressSearch = () => {
        overlay.open((props) =>
            isMobile ? (
                <AddressSearchBottomSheet
                    {...props}
                    onSelect={(data) => {
                        setValue(
                            'returnAddress.receiverZipCd',
                            data.receiverZipCd,
                        );
                        setValue(
                            'returnAddress.receiverAddress',
                            data.receiverAddress,
                        );
                        setValue('returnAddress.receiverDetailAddress', '');
                    }}
                />
            ) : (
                <AddressSearchModal
                    {...props}
                    onSelect={(data) => {
                        setValue(
                            'returnAddress.receiverZipCd',
                            data.receiverZipCd,
                        );
                        setValue(
                            'returnAddress.receiverAddress',
                            data.receiverAddress,
                        );
                        setValue('returnAddress.receiverDetailAddress', '');
                    }}
                />
            ),
        );
    };

    const handleJpAddressSearch = async () => {
        const zipCode = getValues('returnAddress.receiverZipCd');
        if (!zipCode) {
            openDialog({ message: t('우편번호를 입력해주세요.') });
            return;
        }

        try {
            const { data } = await addressApi.searchJpAddress({ zipCode });
            setValue('returnAddress.receiverJibunAddress', data.address);
            setValue('returnAddress.receiverAddress', data.address);
            setValue('returnAddress.receiverCity', data.city);
            setValue('returnAddress.receiverState', data.prefCode);
        } catch (error) {
            const message = isAxiosError(error)
                ? error.response?.data.message
                : t('배송지를 등록할 수 없습니다.');
            openDialog({ message });
        }
    };

    const onReturnAddressCountryChange = (value: string) => {
        setValue('returnAddress.countryCd', value);
        setValue('returnAddress.receiverMobileCountryCd', value);
        resetField('returnAddress.receiverAddress');
        resetField('returnAddress.receiverDetailAddress');
        resetField('returnAddress.receiverJibunAddress');
        resetField('returnAddress.receiverState');
        resetField('returnAddress.receiverCity');
        resetField('returnAddress.receiverZipCd');
    };

    const returnWayTypeList = useMemo(() => {
        return Object.entries(RETURN_WAY_MAP) as [
            keyof typeof RETURN_WAY_MAP,
            string,
        ][];
    }, []);

    const returnWayType = useWatch({ control, name: 'returnWayType' });

    const deliveryCompanyTypeList = useMemo(() => {
        if (!data) return [];
        return (data.deliveryCompanyTypeWithLabels ?? []).map((item) => ({
            label: item.label,
            value: item.deliveryCompanyType,
        }));
    }, [data]);

    const returnWarehouse = useMemo(() => {
        const isMallShippingArea =
            data?.originalOption.shippingAreaType === 'MALL_SHIPPING_AREA';

        const {
            receiverName = '',
            contact = '',
            summary = '',
        } = data?.returnWarehouse ?? {};

        return [
            {
                label: t('이름'),
                value: isMallShippingArea
                    ? mallData?.mall.mallName
                    : receiverName,
            },
            { label: t('주소'), value: summary },
            { label: t('전화번호'), value: contact || '-' },
        ];
    }, [t, data, mallData]);

    const effectiveReturnCountryCd =
        returnAddressCountryCd ||
        data?.returnAddress?.countryCd ||
        defaultCountryCd ||
        'KR';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                {t('반품 수거 정보')}
            </h3>

            {/* 반품 수거 방법 */}
            <InputFieldContainer>
                <InputLabel>{t('반품 수거 방법')}</InputLabel>
                <Controller
                    name='returnWayType'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <InputRadio
                            options={returnWayTypeList.map(
                                ([value, label]) => ({
                                    value,
                                    label: t(label),
                                }),
                            )}
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </InputFieldContainer>

            {/* 판매자 수거 - 반품자 정보 입력 */}
            {returnWayType === 'SELLER_COLLECT' && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                    }}
                >
                    <InputFieldContainer>
                        <InputLabel isRequired>{t('반품자명')}</InputLabel>
                        {isKorean ? (
                            <>
                                <InputField
                                    placeholder={t('반품자명을 입력해 주세요.')}
                                    {...register('returnAddress.receiverName')}
                                />
                                <ErrorMessage name='returnAddress.receiverName' />
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
                                            'returnAddress.receiverFirstName',
                                        )}
                                        style={{ flex: 1 }}
                                    />
                                    <InputField
                                        placeholder='Last Name'
                                        {...register(
                                            'returnAddress.receiverLastName',
                                        )}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <ErrorMessage name='returnAddress.receiverFirstName' />
                                <ErrorMessage name='returnAddress.receiverLastName' />
                            </div>
                        )}
                    </InputFieldContainer>

                    <InputFieldContainer>
                        <InputLabel isRequired>{t('수거지 주소')}</InputLabel>

                        {!isKorean && (
                            <div style={{ marginBottom: '8px' }}>
                                <Controller
                                    name='returnAddress.countryCd'
                                    control={control}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <Select
                                            isSearchable
                                            options={COUNTRY_CODE_LIST}
                                            value={
                                                COUNTRY_CODE_LIST.find(
                                                    (o) => o.value === value,
                                                ) || null
                                            }
                                            onChange={(opt) => {
                                                onChange(opt?.value);
                                                if (opt)
                                                    onReturnAddressCountryChange(
                                                        opt.value,
                                                    );
                                            }}
                                            placeholder={t('국가 선택')}
                                            menuPortalTarget={
                                                isMobile ? document.body : null
                                            }
                                            menuShouldBlockScroll={isMobile}
                                        />
                                    )}
                                />
                            </div>
                        )}

                        {effectiveReturnCountryCd === 'KR' && (
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
                                            'returnAddress.receiverZipCd',
                                        )}
                                        readOnly
                                        style={{
                                            flex: 1,
                                            backgroundColor: '#f5f5f5',
                                        }}
                                    />
                                    <button
                                        type='button'
                                        onClick={handleAddressSearch}
                                        style={{
                                            padding: '0 16px',
                                            border: '1px solid #333',
                                            borderRadius: '6px',
                                            backgroundColor: '#fff',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {t('우편번호 찾기')}
                                    </button>
                                </div>
                                <InputField
                                    placeholder={t('주소')}
                                    {...register(
                                        'returnAddress.receiverAddress',
                                    )}
                                    readOnly
                                    style={{ backgroundColor: '#f5f5f5' }}
                                />
                                <InputField
                                    placeholder={t('상세 주소')}
                                    {...register(
                                        'returnAddress.receiverDetailAddress',
                                    )}
                                />
                                <ErrorMessage name='returnAddress.receiverAddress' />
                                <ErrorMessage name='returnAddress.receiverDetailAddress' />
                            </div>
                        )}

                        {effectiveReturnCountryCd === 'JP' && (
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
                                            'returnAddress.receiverZipCd',
                                        )}
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type='button'
                                        onClick={handleJpAddressSearch}
                                        style={{
                                            padding: '0 16px',
                                            border: '1px solid #333',
                                            borderRadius: '6px',
                                            backgroundColor: '#fff',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {t('우편번호 찾기')}
                                    </button>
                                </div>
                                <InputField
                                    placeholder='Address'
                                    {...register(
                                        'returnAddress.receiverAddress',
                                    )}
                                    readOnly
                                    style={{ backgroundColor: '#f5f5f5' }}
                                />
                                <InputField
                                    placeholder='Detail Address'
                                    {...register(
                                        'returnAddress.receiverDetailAddress',
                                    )}
                                />
                                <ErrorMessage name='returnAddress.receiverAddress' />
                                <ErrorMessage name='returnAddress.receiverDetailAddress' />
                            </div>
                        )}

                        {effectiveReturnCountryCd !== 'KR' &&
                            effectiveReturnCountryCd !== 'JP' && (
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
                                            'returnAddress.receiverAddress',
                                        )}
                                    />
                                    <InputField
                                        placeholder='Detail Address'
                                        {...register(
                                            'returnAddress.receiverDetailAddress',
                                        )}
                                    />
                                    <div
                                        style={{ display: 'flex', gap: '8px' }}
                                    >
                                        {effectiveReturnCountryCd === 'US' ? (
                                            <div style={{ flex: 1 }}>
                                                <Controller
                                                    name='returnAddress.receiverState'
                                                    control={control}
                                                    render={({
                                                        field: {
                                                            value,
                                                            onChange,
                                                        },
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
                                                                onChange(
                                                                    opt?.value,
                                                                )
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
                                                    'returnAddress.receiverState',
                                                )}
                                                style={{ flex: 1 }}
                                            />
                                        )}
                                        <InputField
                                            placeholder='City'
                                            {...register(
                                                'returnAddress.receiverCity',
                                            )}
                                            style={{ flex: 1 }}
                                        />
                                    </div>
                                    <InputField
                                        placeholder='Zip/Postal Code'
                                        {...register(
                                            'returnAddress.receiverZipCd',
                                        )}
                                    />
                                    <ErrorMessage name='returnAddress.receiverAddress' />
                                </div>
                            )}
                    </InputFieldContainer>

                    <InputFieldContainer>
                        <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {!isKorean && (
                                <div style={{ width: '120px' }}>
                                    <Controller
                                        name='returnAddress.receiverMobileCountryCd'
                                        control={control}
                                        render={({
                                            field: { value, onChange },
                                        }) => (
                                            <Select
                                                isSearchable
                                                options={
                                                    MOBILE_COUNTRY_CODE_LIST
                                                }
                                                value={
                                                    MOBILE_COUNTRY_CODE_LIST.find(
                                                        (o) =>
                                                            o.value === value,
                                                    ) || null
                                                }
                                                onChange={(opt) =>
                                                    onChange(opt?.value)
                                                }
                                                placeholder='Code'
                                                menuPortalTarget={
                                                    isMobile
                                                        ? document.body
                                                        : null
                                                }
                                                menuShouldBlockScroll={isMobile}
                                            />
                                        )}
                                    />
                                </div>
                            )}
                            <InputField
                                {...register('returnAddress.receiverContact1')}
                                style={{ flex: 1 }}
                            />
                        </div>
                        <ErrorMessage name='returnAddress.receiverContact1' />
                    </InputFieldContainer>

                    {!isKorean && (
                        <InputFieldContainer>
                            <InputLabel>{t('전화번호')}</InputLabel>
                            <InputField
                                {...register('returnAddress.receiverContact2')}
                            />
                        </InputFieldContainer>
                    )}

                    <InputFieldContainer>
                        <InputLabel>{t('수거시 참고사항')}</InputLabel>
                        <InputField
                            placeholder={t('수거시 요청사항을 입력해 주세요.')}
                            {...register('returnAddress.deliveryMemo')}
                        />
                    </InputFieldContainer>
                </div>
            )}

            {/* 구매자 직접 반품 - 반품 주소지 및 접수 정보 */}
            {returnWayType === 'BUYER_DIRECT_RETURN' && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                    }}
                >
                    <InputFieldContainer>
                        <InputLabel>{t('반품 주소지')}</InputLabel>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                padding: '16px',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                backgroundColor: '#fafafa',
                            }}
                        >
                            {returnWarehouse.map(({ label, value }, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                        fontSize: '14px',
                                    }}
                                >
                                    <span
                                        style={{
                                            color: '#666',
                                            minWidth: '70px',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {label}
                                    </span>
                                    <span style={{ color: '#333' }}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </InputFieldContainer>

                    <InputFieldContainer>
                        <InputLabel isRequired>
                            {t('반품 접수 정보')}
                        </InputLabel>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Controller
                                name='deliveryCompanyType'
                                control={control}
                                render={({
                                    field: { onChange, value, ...rest },
                                }) => (
                                    <div style={{ flex: 1 }}>
                                        <Select
                                            {...rest}
                                            options={deliveryCompanyTypeList}
                                            value={
                                                deliveryCompanyTypeList.find(
                                                    (o) => o.value === value,
                                                ) || null
                                            }
                                            onChange={(option) =>
                                                onChange(option?.value || null)
                                            }
                                            placeholder={t('택배사 선택')}
                                            menuPortalTarget={
                                                isMobile ? document.body : null
                                            }
                                            menuShouldBlockScroll={isMobile}
                                        />
                                    </div>
                                )}
                            />
                            <InputField
                                placeholder={t('송장번호를 입력하세요.')}
                                {...register('invoiceNo', {
                                    onChange: (e) => {
                                        const value = e.target.value;
                                        setValue(
                                            'invoiceNo',
                                            value.replace(/[^a-zA-Z0-9]/g, ''),
                                        );
                                    },
                                })}
                                style={{ flex: 2 }}
                            />
                        </div>
                        <ErrorMessage name='deliveryCompanyType' />
                        <ErrorMessage name='invoiceNo' />
                    </InputFieldContainer>
                </div>
            )}
        </div>
    );
};

export default ClaimReturnWay;
