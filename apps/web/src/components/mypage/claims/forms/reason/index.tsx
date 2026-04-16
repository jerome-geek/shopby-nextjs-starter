import { filter, map, pipe, prop, toArray } from '@fxts/core';
import { useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FileUpload from '@/components/ui/file-upload';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import {
    InputFieldContainer,
    InputLabel,
    Select,
    TextArea,
} from '@/components/ui/input';
import { CLAIM_TYPE_MAP } from '@/const/label';
import useGuestOrderOptionDetailForClaim from '@/hooks/query/claim/guest/useGuestOrderOptionDetailForClaim';
import useOrderOptionDetailForClaim from '@/hooks/query/claim/member/useOrderOptionDetailForClaim';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimType } from '@/models';

interface ClaimReasonProps {
    orderOptionNo: number;
    claimType: ClaimType;
    isFileUploadEnabled?: boolean;
}

export const ClaimReason = ({
    orderOptionNo,
    claimType,
    isFileUploadEnabled = false,
}: ClaimReasonProps) => {
    const { t } = useTranslation();
    const isLogin = useAuth();

    const { control, register, setValue } = useFormContext();

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

    const orderOptionData = isLogin ? memberData : guestData;

    const responsibleObjectTypeList = [
        { value: 'BUYER' as const, label: t('구매자') },
        { value: 'SELLER' as const, label: t('판매자') },
    ];

    const responsibleObjectType = useWatch({
        control,
        name: 'responsibleObjectType',
    });

    const claimReasonType = useWatch({ control, name: 'claimReasonType' });

    const claimReasonTypeList = useMemo(() => {
        if (!orderOptionData || !responsibleObjectType) {
            return [];
        }

        return pipe(
            orderOptionData,
            prop('claimReasonTypes'),
            filter((a) => a.responsibleObjectType === responsibleObjectType),
            map(({ label, claimReasonType: value }) => ({
                label,
                value,
            })),
            toArray,
        );
    }, [orderOptionData, responsibleObjectType]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                {CLAIM_TYPE_MAP[claimType]} {t('사유')}
            </h3>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                {/* 귀책대상 */}
                <InputFieldContainer>
                    <InputLabel isRequired>{t('귀책대상')}</InputLabel>
                    <Controller
                        control={control}
                        name='responsibleObjectType'
                        render={({ field: { onChange, value, ref } }) => (
                            <Select
                                ref={(el) => {
                                    ref(el);
                                }}
                                placeholder={t('귀책대상을 선택해주세요.')}
                                options={responsibleObjectTypeList}
                                value={
                                    responsibleObjectTypeList.find(
                                        (o) => o.value === value,
                                    ) || null
                                }
                                onChange={(selectedOption) => {
                                    if (selectedOption !== null) {
                                        onChange(selectedOption.value);
                                        setValue('claimReasonType', null);
                                    }
                                }}
                            />
                        )}
                    />
                    <ErrorMessage name='responsibleObjectType' />
                    <p
                        style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#666',
                            lineHeight: '1.5',
                        }}
                    >
                        {t(
                            claimType === 'CANCEL'
                                ? '고객님의 귀책 사유로 취소처리 시 비용이 발생될 수 있습니다.'
                                : '고객님의 귀책 사유로 상품 등이 훼손 또는 멸실 된 경우 반품/교환 제한(불가) 및 비용이 발생될 수 있습니다.',
                        )}
                    </p>
                </InputFieldContainer>

                {/* 사유 */}
                <InputFieldContainer>
                    <InputLabel isRequired>{t('사유')}</InputLabel>
                    <Controller
                        control={control}
                        name='claimReasonType'
                        render={({ field: { onChange, ref } }) => (
                            <Select
                                ref={(el) => {
                                    ref(el);
                                }}
                                key={claimReasonType}
                                placeholder={t('사유를 선택해주세요.')}
                                noOptionsMessage={() =>
                                    t('귀책대상을 먼저 선택해주세요.')
                                }
                                value={
                                    claimReasonTypeList.find(
                                        (option) =>
                                            option.value === claimReasonType,
                                    ) || null
                                }
                                options={claimReasonTypeList}
                                onChange={(selectedOption) => {
                                    onChange(selectedOption?.value || null);
                                }}
                            />
                        )}
                    />
                    <ErrorMessage name='claimReasonType' />
                </InputFieldContainer>

                {/* 상세 사유 */}
                <InputFieldContainer>
                    <InputLabel isRequired>
                        {claimType === 'EXCHANGE'
                            ? t('교환 내용')
                            : t('상세 사유')}
                    </InputLabel>
                    <Controller
                        control={control}
                        name='claimReasonDetail'
                        render={({ field: { onChange } }) => (
                            <TextArea
                                onInput={onChange}
                                placeholder={
                                    claimType === 'EXCHANGE'
                                        ? t('교환 내용을 입력해주세요.')
                                        : t('상세 사유를 입력해주세요.')
                                }
                                rows={5}
                                {...register('claimReasonDetail')}
                            />
                        )}
                    />
                    <ErrorMessage name='claimReasonDetail' />
                </InputFieldContainer>

                {/* 사진 첨부 */}
                {isFileUploadEnabled && (
                    <InputFieldContainer>
                        <InputLabel>{t('사진 첨부')}</InputLabel>
                        <FileUpload
                            initialFileList={[]}
                            setFileList={(fileList) => {
                                setValue('uploadImageFiles', fileList);
                            }}
                            maxLength={4}
                        />
                    </InputFieldContainer>
                )}
            </div>
        </div>
    );
};

export default ClaimReason;
