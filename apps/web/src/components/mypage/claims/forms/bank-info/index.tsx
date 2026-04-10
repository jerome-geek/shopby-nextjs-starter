import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ErrorMessage from '@/components/ui/form/ErrorMessage';
import { InputCheckbox } from '@/components/ui/input/checkbox';
import { InputField } from '@/components/ui/input/field';
import { Select } from '@/components/ui/input/select';
import { BANK_MAP } from '@/const/label';
import { PayType } from '@/models';

export const ClaimBankInfo = ({ payType }: { payType?: Nullable<PayType> }) => {
    const { t } = useTranslation();
    const { register, watch, control, setValue } = useFormContext();
    const saveBankAccountInfo = watch('saveBankAccountInfo');

    const bankOptions = useMemo(() => {
        return Object.entries(BANK_MAP).map(([key, value]) => ({
            label: value,
            value: key,
        }));
    }, []);

    // NOTE: 무통장입금(ACCOUNT)이나 가상계좌(VIRTUAL_ACCOUNT)인 경우 환불 계좌가 필요합니다.
    const isBankInfoVisible = useMemo(() => {
        return (
            payType === 'ACCOUNT' ||
            payType === 'VIRTUAL_ACCOUNT' ||
            payType === 'ESCROW_VIRTUAL_ACCOUNT'
        );
    }, [payType]);

    if (!isBankInfoVisible) {
        return null;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
                {t('환불 정보')}
            </h3>

            <label
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}
            >
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

            {saveBankAccountInfo && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '16px',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <label style={{ fontSize: '14px', fontWeight: 500 }}>
                            {t('은행')}
                        </label>
                        <Controller
                            name='bankAccountInfo.bank'
                            control={control}
                            render={({
                                field: { value, onChange, ...rest },
                            }) => (
                                <Select
                                    {...rest}
                                    options={bankOptions}
                                    value={
                                        bankOptions.find(
                                            (o) => o.value === value,
                                        ) || null
                                    }
                                    onChange={(option) => {
                                        const selectedBank =
                                            option?.value || '';
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
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <label style={{ fontSize: '14px', fontWeight: 500 }}>
                            {t('계좌번호')}
                        </label>
                        <InputField
                            {...register('bankAccountInfo.bankAccount')}
                            placeholder={t('계좌번호를 입력해주세요')}
                        />
                        <ErrorMessage name='bankAccountInfo.bankAccount' />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <label style={{ fontSize: '14px', fontWeight: 500 }}>
                            {t('예금주')}
                        </label>
                        <InputField
                            {...register('bankAccountInfo.bankDepositorName')}
                            placeholder={t('예금주명을 입력해주세요')}
                        />
                        <ErrorMessage name='bankAccountInfo.bankDepositorName' />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClaimBankInfo;
