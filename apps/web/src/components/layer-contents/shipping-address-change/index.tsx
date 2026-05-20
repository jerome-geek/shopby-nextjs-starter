import { zodResolver } from '@hookform/resolvers/zod';
import { overlay } from 'overlay-kit';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import type { AddressRegister } from '@/components/layer-contents/address-search';
import * as styles from '@/components/layer-contents/shipping-address-change/index.css';
import { AddressSearchModal } from '@/components/modal/address-search';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { ADDRESS_MEMO_LIST, PHONE_PREFIX_NUMBER_LIST } from '@/const/form';
import { OVERLAY_ID } from '@/const/overlay';
import { CustomsIdNumberField } from '@/features/order/components/form/input-field';
import { useGuestOrderMutation, useMyOrderMutation } from '@/hooks/mutations';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import { useGlobal, useResponsive } from '@/hooks/utils';
import type { OrderDetailResponse } from '@/models/order';
import {
    getChangeShippingAddressSchema,
    type ChangeShippingAddressSchemaType,
} from '@/schema/shippingAddress.schema';
import { ErrorMessage } from '@/shared/components/form';

export const SHIPPING_ADDRESS_CHANGE_FORM_ID = 'shipping-address-change-form';

export type ShippingAddressChangeData =
    OrderDetailResponse['shippingAddress'] & {
        deliveryMemo?: string | null;
    };

interface ShippingAddressChangeContentProps {
    orderNo: string;
    data: ShippingAddressChangeData;
}

const getDefaultReceiverContact1 = (receiverContact1?: string | null) => {
    if (!receiverContact1) {
        return {
            prefix: '010',
            middle: '',
            suffix: '',
        };
    }

    const [prefix, middle, suffix] = receiverContact1.split('-');

    return {
        prefix: prefix || '010',
        middle: middle || '',
        suffix: suffix || '',
    };
};

export const ShippingAddressChangeContent = ({
    orderNo,
    data,
}: ShippingAddressChangeContentProps) => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const { addToast } = useToast();

    const { isMobile } = useResponsive();

    const { isKorean } = useGlobal();

    const schema = getChangeShippingAddressSchema({
        isGlobalMall: !isKorean,
    });

    const methods = useForm<ChangeShippingAddressSchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            countryCd: data.countryCd || 'KR',
            receiverName: data?.receiverName ?? '',
            receiverZipCd: data?.receiverZipCd ?? '',
            receiverAddress: data?.receiverAddress ?? '',
            receiverJibunAddress: data?.receiverJibunAddress ?? '',
            receiverDetailAddress: data?.receiverDetailAddress ?? '',
            deliveryMemo: data?.deliveryMemo ?? '',
            customsIdNumber: data?.customsIdNumber ?? '',
            receiverContact1: getDefaultReceiverContact1(
                data?.receiverContact1,
            ),
        },
    });

    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { isDirty },
    } = methods;

    const [receiverZipCd, receiverAddress, deliveryMemoWatch] = useWatch({
        control,
        name: ['receiverZipCd', 'receiverAddress', 'deliveryMemo'],
    });

    const findDeliveryMemoOption = (memo: string) =>
        ADDRESS_MEMO_LIST.find((item) => item.value === memo) ||
        ADDRESS_MEMO_LIST.find((item) => item.value === '직접 입력');

    const handleAddressSelect = (addressData: AddressRegister) => {
        setValue('receiverZipCd', addressData.receiverZipCd, {
            shouldDirty: true,
            shouldValidate: true,
        });
        setValue('receiverAddress', addressData.receiverAddress, {
            shouldDirty: true,
            shouldValidate: true,
        });
        setValue('receiverJibunAddress', addressData.receiverJibunAddress, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    // TODO: useCustomDialog에 추가하고 가져와서 사용하기
    const handleAddressSearch = () => {
        overlay.open((props) =>
            isMobile ? (
                <AddressSearchBottomSheet
                    {...props}
                    onSelect={handleAddressSelect}
                />
            ) : (
                <AddressSearchModal {...props} onSelect={handleAddressSelect} />
            ),
        );
    };

    const {
        updateDeliveryInfo: { mutate: updateDeliveryInfoMutate },
    } = useMyOrderMutation();

    const {
        updateDeliveryInfo: { mutate: updateGuestDeliveryInfoMutate },
    } = useGuestOrderMutation();

    const onSubmit = handleSubmit((values) => {
        if (!isDirty) {
            overlay.close(OVERLAY_ID.SHIPPING_ADDRESS_CHANGE);
            return;
        }

        const updateData = {
            orderNo,
            searchParams: { add: false },
            data: {
                receiverName: values.receiverName,
                receiverZipCd: values.receiverZipCd,
                receiverAddress: values.receiverAddress,
                receiverJibunAddress: values.receiverJibunAddress,
                receiverDetailAddress: values.receiverDetailAddress,
                deliveryMemo: values.deliveryMemo ?? '',
                receiverContact1: `${values.receiverContact1.prefix}-${values.receiverContact1.middle}-${values.receiverContact1.suffix}`,
                receiverContact2: data.receiverContact2 ?? '',
                customsIdNumber: values.customsIdNumber ?? '',
            },
        };

        const onSuccess = () => {
            addToast({
                message: t('배송지 정보가 변경되었습니다.'),
                variant: 'success',
            });
            overlay.close(OVERLAY_ID.SHIPPING_ADDRESS_CHANGE);
        };

        // TODO: 추가배송비 붙는 경우에는 업데이트되면 안되는데 따로 에러가 떨어지지 않음
        if (isLogin) {
            updateDeliveryInfoMutate(updateData, {
                onSuccess,
            });
            return;
        }

        updateGuestDeliveryInfoMutate(updateData, {
            onSuccess,
        });
    });

    return (
        <FormProvider {...methods}>
            <form
                id={SHIPPING_ADDRESS_CHANGE_FORM_ID}
                className={styles.formContent}
                onSubmit={onSubmit}
            >
                <InputFieldContainer>
                    <InputLabel isRequired>{t('받는 사람')}</InputLabel>
                    <InputField
                        placeholder={t('이름을 입력해주세요')}
                        {...register('receiverName')}
                    />
                    <ErrorMessage name='receiverName' />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('주소')}</InputLabel>
                    <div className={styles.fieldRow}>
                        <InputField
                            placeholder={t('우편번호')}
                            style={{ flex: 1 }}
                            readOnly
                            value={receiverZipCd}
                        />
                        <button
                            type='button'
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
                        value={receiverAddress}
                    />
                    <InputField
                        placeholder={t('상세 주소를 입력해주세요')}
                        style={{ marginTop: '8px' }}
                        {...register('receiverDetailAddress')}
                    />
                    <ErrorMessage name='receiverZipCd' />
                    <ErrorMessage name='receiverAddress' />
                    <ErrorMessage name='receiverDetailAddress' />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('휴대전화')}</InputLabel>
                    <div className={styles.phoneInputGroup}>
                        <div style={{ width: '100px', flexShrink: 0 }}>
                            <Controller
                                name='receiverContact1.prefix'
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <Select
                                        options={PHONE_PREFIX_NUMBER_LIST}
                                        value={PHONE_PREFIX_NUMBER_LIST.find(
                                            (o) => o.value === value,
                                        )}
                                        onChange={(opt) => onChange(opt?.value)}
                                    />
                                )}
                            />
                        </div>
                        <span className={styles.separator}>-</span>
                        <InputField
                            maxLength={4}
                            inputMode='numeric'
                            {...register('receiverContact1.middle')}
                        />
                        <span className={styles.separator}>-</span>
                        <InputField
                            maxLength={4}
                            inputMode='numeric'
                            {...register('receiverContact1.suffix')}
                        />
                    </div>
                    <ErrorMessage name='receiverContact1.prefix' />
                    <ErrorMessage name='receiverContact1.middle' />
                    <ErrorMessage name='receiverContact1.suffix' />
                </InputFieldContainer>

                <CustomsIdNumberField
                    register={register}
                    name='customsIdNumber'
                />

                <InputFieldContainer>
                    <InputLabel>{t('배송메모')}</InputLabel>
                    <Select
                        placeholder={t('선택해주세요')}
                        options={ADDRESS_MEMO_LIST}
                        menuPlacement='top'
                        menuPosition='fixed'
                        menuPortalTarget={document.body}
                        getOptionLabel={(option) => t(option.label)}
                        getOptionValue={(option) => option.value}
                        value={findDeliveryMemoOption(deliveryMemoWatch ?? '')}
                        onChange={(opt) => {
                            const deliveryMemo =
                                opt?.value === '직접 입력'
                                    ? ''
                                    : (opt?.value ?? '');

                            setValue('deliveryMemo', deliveryMemo, {
                                shouldDirty: true,
                                shouldValidate: true,
                            });
                        }}
                    />
                    {(!deliveryMemoWatch ||
                        !ADDRESS_MEMO_LIST.find(
                            (item) => item.value === deliveryMemoWatch,
                        )) && (
                        <InputField
                            placeholder={t('배송지 메모')}
                            style={{ marginTop: '8px' }}
                            {...register('deliveryMemo')}
                        />
                    )}
                    <ErrorMessage name='deliveryMemo' />
                </InputFieldContainer>
            </form>
        </FormProvider>
    );
};
