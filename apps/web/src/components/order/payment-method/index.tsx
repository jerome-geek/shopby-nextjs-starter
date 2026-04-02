import * as RadioGroup from '@radix-ui/react-radio-group';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import InputField from '@/components/ui/input/field';
import Select from '@/components/ui/select';
import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { PayType, PgType } from '@/models';
import { PaymentReserveSchemaType } from '@/schema';

import * as styles from '@/components/order/payment-method/index.css';

const CASH_RECEIPT_TYPES = [
    { label: '소득공제용', value: 'INCOME_TAX_DEDUCTION' },
    { label: '지출증빙용', value: 'PROOF_EXPENDITURE' },
    { label: '미발행', value: 'VOLUNTARY' },
] as const;

export const PaymentMethod = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    const { setValue, control, register, clearErrors, getValues } =
        useFormContext<PaymentReserveSchemaType>();
    const selectedPayType = useWatch({ control, name: 'payType' });
    const cashReceipt = useWatch({
        control,
        name: 'cashReceipt',
    });

    const isCashReceiptEnabled =
        cashReceipt?.cashReceiptIssuePurposeType &&
        cashReceipt?.cashReceiptIssuePurposeType !== 'VOLUNTARY';

    const availablePayTypes = orderSheetData?.availablePayTypes ?? [];
    const tradeBankAccountInfos = useMemo(
        () => orderSheetData?.tradeBankAccountInfos ?? [],
        [orderSheetData?.tradeBankAccountInfos],
    );

    useEffect(() => {
        if (selectedPayType === 'ACCOUNT' && tradeBankAccountInfos.length > 0) {
            const currentBankAccount = getValues(
                'bankAccountToDeposit.bankAccount',
            );
            if (!currentBankAccount) {
                const firstBank = tradeBankAccountInfos[0];
                setValue('bankAccountToDeposit', {
                    bankAccount: firstBank.bankAccount,
                    bankCode: firstBank.bankCode,
                    bankDepositorName: firstBank.bankDepositorName,
                });
            }
        }
    }, [selectedPayType, tradeBankAccountInfos, setValue, getValues]);

    const handleValueChange = (payType: PayType, pgType: PgType) => {
        setValue('payType', payType);
        if (pgType) {
            setValue('pgType', pgType);
        }

        if (payType !== 'ACCOUNT') {
            clearErrors([
                'remitter',
                'bankAccountToDeposit.bankAccount',
                'cashReceipt.cashReceiptKey',
            ]);
            setValue('remitter', '');
            setValue('applyCashReceipt', false);
            setValue('cashReceipt', undefined);
        }
    };

    const handleCashReceiptTypeChange = (
        value: (typeof CASH_RECEIPT_TYPES)[number]['value'],
    ) => {
        if (value === 'VOLUNTARY') {
            setValue('applyCashReceipt', false);
            setValue('cashReceipt', undefined);
        } else {
            setValue('applyCashReceipt', true);
            const purpose = value;
            const keyType =
                purpose === 'INCOME_TAX_DEDUCTION'
                    ? 'MOBILE_NO'
                    : 'BUSINESS_NO';

            setValue('cashReceipt', {
                cashReceiptIssuePurposeType: purpose,
                cashReceiptKeyType: keyType as any,
                cashReceiptKey: '',
            });
        }
    };

    const handleKeyTypeChange = (value: string) => {
        if (cashReceipt) {
            setValue('cashReceipt', {
                ...cashReceipt,
                cashReceiptKeyType: value as any,
                cashReceiptKey: '',
            });
        }
    };

    const cashReceiptPurpose = cashReceipt?.cashReceiptIssuePurposeType;
    const cashReceiptKeyType = cashReceipt?.cashReceiptKeyType;

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>{t('결제 수단')}</h3>

            <div className={styles.radioGroupRoot} aria-label='결제 수단 선택'>
                {availablePayTypes.map(({ payType, pgTypes, payTypeLabel }) => {
                    const firstPgType = pgTypes?.[0] || '';
                    const isSelected = selectedPayType === payType;

                    return (
                        <div key={payType}>
                            <button
                                type='button'
                                className={styles.radioGroupItem}
                                onClick={() =>
                                    handleValueChange(payType, firstPgType)
                                }
                            >
                                <div className={styles.radioCircle}>
                                    {isSelected && (
                                        <div
                                            className={styles.radioIndicator}
                                        />
                                    )}
                                </div>

                                <span className={styles.methodLabel}>
                                    {payTypeLabel}
                                </span>
                            </button>

                            <AnimatePresence mode='wait'>
                                {payType === 'ACCOUNT' &&
                                    selectedPayType === 'ACCOUNT' && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                                marginTop: 0,
                                            }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                                marginTop: 12,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                                marginTop: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: 'easeInOut',
                                            }}
                                            className={
                                                styles.bankTransferContainer
                                            }
                                        >
                                            <div className={styles.fieldRow}>
                                                <div
                                                    className={
                                                        styles.fieldLabel
                                                    }
                                                >
                                                    {t('입금자명')}
                                                    <span
                                                        className={
                                                            styles.requiredDot
                                                        }
                                                    />
                                                </div>
                                                <InputField
                                                    placeholder={t(
                                                        '입금자명을 입력해주세요',
                                                    )}
                                                    {...register('remitter')}
                                                />
                                            </div>

                                            <div className={styles.divider} />

                                            <div className={styles.fieldRow}>
                                                <div
                                                    className={
                                                        styles.fieldLabel
                                                    }
                                                >
                                                    {t('입금은행')}
                                                    <span
                                                        className={
                                                            styles.requiredDot
                                                        }
                                                    />
                                                </div>
                                                <Controller
                                                    control={control}
                                                    name='bankAccountToDeposit.bankAccount'
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            value,
                                                        },
                                                    }) => (
                                                        <Select
                                                            options={
                                                                tradeBankAccountInfos
                                                            }
                                                            getOptionLabel={(
                                                                opt,
                                                            ) =>
                                                                `${opt.bankName} ${opt.bankAccount} (예금주명: ${opt.bankDepositorName})`
                                                            }
                                                            getOptionValue={(
                                                                opt,
                                                            ) =>
                                                                opt.bankAccount
                                                            }
                                                            menuPortalTarget={
                                                                typeof document !==
                                                                'undefined'
                                                                    ? document.body
                                                                    : undefined
                                                            }
                                                            value={tradeBankAccountInfos.find(
                                                                (opt) =>
                                                                    opt.bankAccount ===
                                                                    value,
                                                            )}
                                                            onChange={(opt) => {
                                                                if (opt) {
                                                                    onChange(
                                                                        opt.bankAccount,
                                                                    );
                                                                    setValue(
                                                                        'bankAccountToDeposit.bankCode',
                                                                        opt.bankCode,
                                                                    );
                                                                    setValue(
                                                                        'bankAccountToDeposit.bankDepositorName',
                                                                        opt.bankDepositorName,
                                                                    );
                                                                }
                                                            }}
                                                            placeholder={t(
                                                                '선택사항을 확인해주세요',
                                                            )}
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div
                                                className={
                                                    styles.cashReceiptSection
                                                }
                                            >
                                                <h4
                                                    className={
                                                        styles.cashReceiptTitle
                                                    }
                                                >
                                                    {t('현금영수증')}
                                                </h4>
                                                <p
                                                    className={
                                                        styles.cashReceiptDescription
                                                    }
                                                >
                                                    {t(
                                                        '선택한 결제수단의 현금결제(머니,계좌 등)시 현금영수증이 발급됩니다.',
                                                    )}
                                                </p>

                                                <RadioGroup.Root
                                                    className={
                                                        styles.cashReceiptRadioGroup
                                                    }
                                                    value={
                                                        cashReceiptPurpose ||
                                                        'VOLUNTARY'
                                                    }
                                                    onValueChange={
                                                        handleCashReceiptTypeChange
                                                    }
                                                >
                                                    {CASH_RECEIPT_TYPES.map(
                                                        (type) => (
                                                            <div
                                                                key={type.value}
                                                                className={
                                                                    styles.cashReceiptRadioItem
                                                                }
                                                            >
                                                                <RadioGroup.Item
                                                                    id={
                                                                        type.value
                                                                    }
                                                                    className={
                                                                        styles.radioCircle
                                                                    }
                                                                    value={
                                                                        type.value
                                                                    }
                                                                >
                                                                    <RadioGroup.Indicator
                                                                        className={
                                                                            styles.radioIndicator
                                                                        }
                                                                    />
                                                                </RadioGroup.Item>
                                                                <label
                                                                    htmlFor={
                                                                        type.value
                                                                    }
                                                                >
                                                                    {t(
                                                                        type.label,
                                                                    )}
                                                                </label>
                                                            </div>
                                                        ),
                                                    )}
                                                </RadioGroup.Root>

                                                {isCashReceiptEnabled && (
                                                    <div
                                                        className={
                                                            styles.phoneNumberRow
                                                        }
                                                    >
                                                        {cashReceiptPurpose ===
                                                        'INCOME_TAX_DEDUCTION' ? (
                                                            <>
                                                                <RadioGroup.Root
                                                                    className={
                                                                        styles.cashReceiptRadioGroup
                                                                    }
                                                                    value={
                                                                        cashReceiptKeyType ||
                                                                        'MOBILE_NO'
                                                                    }
                                                                    onValueChange={
                                                                        handleKeyTypeChange
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.cashReceiptRadioItem
                                                                        }
                                                                    >
                                                                        <RadioGroup.Item
                                                                            id='MOBILE_NO'
                                                                            className={
                                                                                styles.radioCircle
                                                                            }
                                                                            value='MOBILE_NO'
                                                                        >
                                                                            <RadioGroup.Indicator
                                                                                className={
                                                                                    styles.radioIndicator
                                                                                }
                                                                            />
                                                                        </RadioGroup.Item>
                                                                        <label htmlFor='MOBILE_NO'>
                                                                            {t(
                                                                                '휴대폰번호',
                                                                            )}
                                                                        </label>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            styles.cashReceiptRadioItem
                                                                        }
                                                                    >
                                                                        <RadioGroup.Item
                                                                            id='CARD_NO'
                                                                            className={
                                                                                styles.radioCircle
                                                                            }
                                                                            value='CARD_NO'
                                                                        >
                                                                            <RadioGroup.Indicator
                                                                                className={
                                                                                    styles.radioIndicator
                                                                                }
                                                                            />
                                                                        </RadioGroup.Item>
                                                                        <label htmlFor='CARD_NO'>
                                                                            {t(
                                                                                '현금영수증카드',
                                                                            )}
                                                                        </label>
                                                                    </div>
                                                                </RadioGroup.Root>

                                                                <div
                                                                    className={
                                                                        styles.inputGroup
                                                                    }
                                                                >
                                                                    <div
                                                                        style={{
                                                                            gridColumn:
                                                                                'span 2',
                                                                        }}
                                                                    >
                                                                        <InputField
                                                                            placeholder={
                                                                                cashReceiptKeyType ===
                                                                                'MOBILE_NO'
                                                                                    ? t(
                                                                                          '휴대폰 번호를 숫자만 입력해 주세요.',
                                                                                      )
                                                                                    : t(
                                                                                          '현금영수증 카드번호를 입력해주세요.',
                                                                                      )
                                                                            }
                                                                            {...register(
                                                                                'cashReceipt.cashReceiptKey',
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div
                                                                className={
                                                                    styles.inputGroup
                                                                }
                                                            >
                                                                <div
                                                                    style={{
                                                                        gridColumn:
                                                                            'span 2',
                                                                    }}
                                                                >
                                                                    <InputField
                                                                        placeholder={t(
                                                                            '사업자 번호를 입력해주세요.',
                                                                        )}
                                                                        {...register(
                                                                            'cashReceipt.cashReceiptKey',
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PaymentMethod;
