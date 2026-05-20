import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/mypage/claims/forms/bank-info/index.css';
import { ErrorMessage } from '@/components/ui/input';
import {
    InputCheckbox,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { BANK_MAP } from '@/const/label';
import { useAuth } from '@/hooks/useAuth';
import type { GetOrderOptionDetailForClaimResponse } from '@/models/claim/member';

type ClaimBankInfoProps = Pick<
    GetOrderOptionDetailForClaimResponse,
    'payType' | 'availableBanks' | 'refundAccount'
>;

export const ClaimBankInfo = ({
    payType,
    availableBanks,
    refundAccount,
}: ClaimBankInfoProps) => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const { register, control, setValue } = useFormContext();

    const isBankInfoVisible = useMemo(() => {
        return (
            payType === 'ACCOUNT' ||
            payType === 'VIRTUAL_ACCOUNT' ||
            payType === 'ESCROW_VIRTUAL_ACCOUNT' ||
            payType === 'ESCROW_REALTIME_ACCOUNT_TRANSFER'
        );
    }, [payType]);

    useEffect(() => {
        if (refundAccount && isBankInfoVisible) {
            setValue('bankAccountInfo.bank', refundAccount.bank);
            setValue('bankAccountInfo.bankName', refundAccount.bankName);
            setValue('bankAccountInfo.bankAccount', refundAccount.bankAccount);
            setValue(
                'bankAccountInfo.bankDepositorName',
                refundAccount.bankDepositorName,
            );
        }
    }, [refundAccount, setValue, isBankInfoVisible]);

    const availableBanksOptions = useMemo(() => {
        return availableBanks.map((bank) => {
            return {
                label: bank.label,
                value: bank.bank,
            };
        });
    }, [availableBanks]);

    if (!isBankInfoVisible) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{t('환불 정보')}</h3>

            {isLogin && (
                <label className={styles.checkboxLabel}>
                    <Controller
                        name='saveBankAccountInfo'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputCheckbox
                                checked={value}
                                onCheckedChange={onChange}
                            />
                        )}
                    />
                    {t('환불 계좌 정보 저장')}
                </label>
            )}

            <div className={styles.fieldGroup}>
                <InputFieldContainer>
                    <InputLabel isRequired>{t('은행')}</InputLabel>
                    <Controller
                        name='bankAccountInfo.bank'
                        control={control}
                        render={({ field: { onChange, value, ...rest } }) => (
                            <Select
                                {...rest}
                                options={availableBanksOptions}
                                value={
                                    availableBanksOptions.find(
                                        (option) => option.value === value,
                                    ) || null
                                }
                                onChange={(option) => {
                                    const selectedBank = option?.value || '';
                                    onChange(selectedBank);
                                    setValue(
                                        'bankAccountInfo.bankName',
                                        BANK_MAP[
                                            selectedBank as keyof typeof BANK_MAP
                                        ],
                                    );
                                }}
                                placeholder={t('은행을 선택해주세요')}
                            />
                        )}
                    />
                    <ErrorMessage name='bankAccountInfo.bank' />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('계좌번호')}</InputLabel>
                    <InputField
                        {...register('bankAccountInfo.bankAccount')}
                        placeholder={t('계좌번호를 입력해주세요')}
                    />
                    <ErrorMessage name='bankAccountInfo.bankAccount' />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('예금주')}</InputLabel>
                    <InputField
                        {...register('bankAccountInfo.bankDepositorName')}
                        placeholder={t('예금주명을 입력해주세요')}
                    />
                    <ErrorMessage name='bankAccountInfo.bankDepositorName' />
                </InputFieldContainer>
            </div>
        </div>
    );
};

export default ClaimBankInfo;
