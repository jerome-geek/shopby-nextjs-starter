import { zodResolver } from '@hookform/resolvers/zod';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    getPaymentSchema,
    type PaymentReserveSchemaType,
} from '@/schema/payment.schema';

vi.mock('@/components/order/shipping-address/GuestShippingAddressForm/index.css', () => ({
    formContent: 'formContent',
    ordererInfoRow: 'ordererInfoRow',
    phoneInputGroup: 'phoneInputGroup',
    fieldRow: 'fieldRow',
    postcodeButton: 'postcodeButton',
}));

vi.mock('@/shared/components/form/error-message/index.css', () => ({
    errorMessage: 'errorMessage',
}));

vi.mock('@/components/order/payment-method/index.css', () => ({
    container: 'container',
    title: 'title',
    radioGroupRoot: 'radioGroupRoot',
    radioGroupItem: 'radioGroupItem',
    radioCircle: 'radioCircle',
    radioIndicator: 'radioIndicator',
    methodLabel: 'methodLabel',
    bankTransferContainer: 'bankTransferContainer',
    fieldRow: 'fieldRow',
    fieldLabel: 'fieldLabel',
    requiredDot: 'requiredDot',
    divider: 'divider',
    cashReceiptSection: 'cashReceiptSection',
    cashReceiptTitle: 'cashReceiptTitle',
    cashReceiptDescription: 'cashReceiptDescription',
    cashReceiptRadioGroup: 'cashReceiptRadioGroup',
    cashReceiptRadioItem: 'cashReceiptRadioItem',
    phoneNumberRow: 'phoneNumberRow',
    inputGroup: 'inputGroup',
}));

vi.mock('@/components/order/payment-summary/index.css', () => ({
    container: 'container',
    title: 'title',
    priceContent: 'priceContent',
    priceList: 'priceList',
    priceRow: 'priceRow',
    divider: 'divider',
    totalPriceTitle: 'totalPriceTitle',
    totalPrice: 'totalPrice',
    termsList: 'termsList',
    termListItemTitle: 'termListItemTitle',
    termListItem: 'termListItem',
    termCheckboxContainer: 'termCheckboxContainer',
    termDetailButton: 'termDetailButton',
    buttonWrapper: 'buttonWrapper',
}));

vi.mock('@/components/modal', () => ({
    AddressSearchModal: () => null,
}));

vi.mock('@/components/bottom-sheet/address-search', () => ({
    AddressSearchBottomSheet: () => null,
}));

vi.mock('@/shared/ui/input', () => ({
    InputField: ({
        value,
        onChange,
        ...props
    }: InputHTMLAttributes<HTMLInputElement>) => (
        <input
            value={value ?? ''}
            onChange={onChange}
            {...props}
        />
    ),
    InputFieldContainer: ({ children }: { children: ReactNode }) => (
        <div>{children}</div>
    ),
    InputLabel: ({
        children,
        htmlFor,
    }: {
        children: ReactNode;
        htmlFor?: string;
    }) => <label htmlFor={htmlFor}>{children}</label>,
    Select: ({
        options = [],
        value,
        onChange,
        getOptionLabel,
        getOptionValue,
        placeholder,
    }: {
        options?: Array<Record<string, unknown>>;
        value?: Record<string, unknown> | null;
        onChange?: (option: Record<string, unknown> | null) => void;
        getOptionLabel?: (option: Record<string, unknown>) => string;
        getOptionValue?: (option: Record<string, unknown>) => string;
        placeholder?: string;
    }) => (
        <select
            aria-label={placeholder ?? 'select'}
            value={
                value
                    ? (getOptionValue?.(value) ??
                      String(value.value ?? value.bankAccount ?? ''))
                    : ''
            }
            onChange={(event) => {
                const option =
                    options.find((item) => {
                        const optionValue =
                            getOptionValue?.(item) ??
                            String(item.value ?? item.bankAccount ?? '');

                        return optionValue === event.target.value;
                    }) ?? null;

                onChange?.(option);
            }}
        >
            <option value=''>{placeholder ?? 'select'}</option>
            {options.map((option) => {
                const optionValue =
                    getOptionValue?.(option) ??
                    String(option.value ?? option.bankAccount ?? '');
                const optionLabel =
                    getOptionLabel?.(option) ??
                    String(option.label ?? option.bankName ?? optionValue);

                return (
                    <option key={optionValue} value={optionValue}>
                        {optionLabel}
                    </option>
                );
            })}
        </select>
    ),
    InputCheckbox: ({
        checked,
        onCheckedChange,
        id,
    }: {
        checked?: boolean;
        onCheckedChange: (checked: boolean) => void;
        id?: string;
    }) => (
        <input
            id={id}
            type='checkbox'
            checked={!!checked}
            onChange={(event) => onCheckedChange(event.target.checked)}
        />
    ),
}));

vi.mock('@/shared/ui/button', () => ({
    Button: ({
        children,
        ...props
    }: ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button {...props}>{children}</button>
    ),
}));

vi.mock('@/shared/ui/dialog/term', () => ({
    default: () => null,
}));

vi.mock('@/shared/components/form', async () => {
    const actual = await vi.importActual<
        typeof import('@/shared/components/form/error-message')
    >('@/shared/components/form/error-message');

    return {
        ErrorMessage: actual.ErrorMessage,
    };
});

vi.mock('motion/react', () => ({
    AnimatePresence: ({ children }: { children: ReactNode }) => children,
    motion: {
        div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => (
            <div {...props}>{children}</div>
        ),
    },
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (value: string) => value,
    }),
}));

vi.mock('next/router', () => ({
    useRouter: () => ({
        query: {
            orderSheetNo: 'ORDER-SHEET-NO',
        },
    }),
}));

vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => false,
}));

vi.mock('@/hooks/utils', () => {
    return {
        useResponsive: () => ({
            isMobile: false,
        }),
    };
});

vi.mock('@/hooks/suspenseQuery/order/orderSheet', () => ({
    useOrderSheet: () => ({
        data: {
            availablePayTypes: [
                {
                    payType: 'ACCOUNT',
                    payTypeLabel: '무통장입금',
                    pgTypes: ['DUMMY'],
                },
            ],
            tradeBankAccountInfos: [],
            requireCustomsIdNumber: false,
        },
    }),
}));

vi.mock('@/hooks/order', () => ({
    useOrderSheetCalculate: () => ({
        orderSheetData: {
            termsInfos: [
                {
                    termsNo: 1,
                    termsType: 'ORDER_DEFAULT',
                    termsName: '주문 확인',
                    required: true,
                    contents: '약관 내용',
                },
            ],
        },
        calculateOrderSheetData: {
            paymentInfo: {
                paymentAmt: 10000,
                totalStandardAmt: 10000,
                deliveryAmt: 0,
                remoteDeliveryAmt: 0,
                totalImmediateDiscountAmt: 0,
                totalAdditionalDiscountAmt: 0,
                cartCouponAmt: 0,
                productCouponAmt: 0,
                usedAccumulationAmt: 0,
                accumulationAmtWhenBuyConfirm: 0,
            },
        },
    }),
}));

vi.mock('overlay-kit', () => ({
    overlay: {
        open: vi.fn(),
    },
}));

afterEach(() => {
    cleanup();
});

globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
} as typeof ResizeObserver;

const createDefaultValues = (): PaymentReserveSchemaType => ({
    orderSheetNo: 'ORDER-SHEET-NO',
    member: false,
    useDefaultAddress: false,
    saveAddressBook: false,
    updateMember: false,
    savesLastPayType: true,
    subPayAmt: 0,
    agreementTermsAgrees: [{ isAgree: false, termsType: 'ORDER_DEFAULT' }],
    payType: 'ACCOUNT',
    pgType: 'DUMMY',
    orderer: {
        ordererEmail: 'buyer@example.com',
        ordererName: '',
        ordererLastName: '',
        ordererFirstName: '',
        ordererMobileCountryCd: '',
        ordererContact1: {
            prefix: '010',
            middle: '',
            suffix: '',
        },
    },
    shippingAddress: {
        countryCd: 'KR',
        addressNo: 0,
        addressName: '',
        receiverName: '',
        receiverContact1: {
            prefix: '010',
            middle: '',
            suffix: '',
        },
        receiverAddress: '',
        receiverJibunAddress: '',
        receiverDetailAddress: '',
        receiverZipCd: '',
        receiverCity: '',
        receiverState: '',
        receiverFirstName: '',
        receiverLastName: '',
        receiverMobileCountryCd: '',
        customsIdNumber: '',
    },
    remitter: '',
    bankAccountToDeposit: undefined,
    applyCashReceipt: true,
    cashReceipt: {
        cashReceiptIssuePurposeType: 'INCOME_TAX_DEDUCTION',
        cashReceiptKeyType: 'MOBILE_NO',
        cashReceiptKey: '',
    },
    orderMemo: '',
    tempPassword: 'Abcd1234!',
    tempPasswordCheck: 'Abcd1234!',
    inAppYn: 'N',
    customTermsAgrees: [],
  });

const createValidDefaultValues = (): PaymentReserveSchemaType => ({
    ...createDefaultValues(),
    agreementTermsAgrees: [{ isAgree: true, termsType: 'ORDER_DEFAULT' }],
    orderer: {
        ordererEmail: 'buyer@example.com',
        ordererName: '홍길동',
        ordererLastName: '',
        ordererFirstName: '',
        ordererMobileCountryCd: '',
        ordererContact1: {
            prefix: '010',
            middle: '1234',
            suffix: '5678',
        },
    },
    shippingAddress: {
        countryCd: 'KR',
        addressNo: 0,
        addressName: '',
        receiverName: '홍길동',
        receiverContact1: {
            prefix: '010',
            middle: '1234',
            suffix: '5678',
        },
        receiverAddress: '서울시 강남구 테헤란로 1',
        receiverJibunAddress: '서울시 강남구 역삼동 1',
        receiverDetailAddress: '101호',
        receiverZipCd: '12345',
        receiverCity: '',
        receiverState: '',
        receiverFirstName: '',
        receiverLastName: '',
        receiverMobileCountryCd: '',
        customsIdNumber: '',
    },
    remitter: '홍길동',
    bankAccountToDeposit: {
        bankAccount: '123-456',
        bankCode: '001',
        bankDepositorName: '상점',
    },
    cashReceipt: {
        cashReceiptIssuePurposeType: 'INCOME_TAX_DEDUCTION',
        cashReceiptKeyType: 'MOBILE_NO',
        cashReceiptKey: '01012345678',
    },
});

const FormHarness = ({
    children,
    defaultValues = createDefaultValues(),
}: {
    children: ReactNode;
    defaultValues?: PaymentReserveSchemaType;
}) => {
    const methods = useForm<PaymentReserveSchemaType>({
        resolver: zodResolver(
            getPaymentSchema({
                isLogin: false,
                isGlobalMall: false,
                requireCustomsIdNumber: false,
            }),
        ),
        mode: 'all',
        defaultValues,
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => undefined)}>
                {children}
                <button type='submit'>validate</button>
            </form>
        </FormProvider>
    );
};

describe('order form error visibility', () => {
    it.each([
        [
            'guest shipping form',
            () =>
                import(
                    '@/components/order/shipping-address/GuestShippingAddressForm'
                ),
        ],
        [
            'member shipping form',
            () =>
                import(
                    '@/components/order/shipping-address/MemberShippingAddressForm'
                ),
        ],
    ])('shows shipping address validation messages in %s', async (_, loadComponent) => {
        const { default: Component } = await loadComponent();

        render(
            <FormHarness>
                <Component />
            </FormHarness>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'validate' }));

        await waitFor(() => {
            expect(screen.getByText('받으시는 분을 입력해주세요.')).toBeTruthy();
            expect(screen.getAllByText('연락처를 입력해주세요.').length).toBe(1);
            expect(screen.getByText('우편번호를 입력해주세요.')).toBeTruthy();
            expect(screen.getByText('상세주소를 입력해주세요.')).toBeTruthy();
        });
    });

    it('shows account payment validation messages', async () => {
        const { PaymentMethod } = await import(
            '@/components/order/payment-method'
        );
        const accountDefaults = createValidDefaultValues();
        accountDefaults.remitter = '';
        accountDefaults.bankAccountToDeposit = undefined;
        accountDefaults.cashReceipt = {
            cashReceiptIssuePurposeType: 'INCOME_TAX_DEDUCTION',
            cashReceiptKeyType: 'MOBILE_NO',
            cashReceiptKey: '',
        };

        render(
            <FormHarness defaultValues={accountDefaults}>
                <PaymentMethod />
            </FormHarness>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'validate' }));

        await waitFor(() => {
            expect(screen.getByText('입금자명을 입력해주세요.')).toBeTruthy();
            expect(screen.getByText('계좌번호를 입력해주세요.')).toBeTruthy();
            expect(screen.getByText('발급 번호를 입력해주세요.')).toBeTruthy();
        });
    });

    it('shows agreement validation message', async () => {
        const { default: OrderPaymentSummary } = await import(
            '@/components/order/payment-summary'
        );
        const agreementDefaults = createValidDefaultValues();
        agreementDefaults.agreementTermsAgrees = [
            { isAgree: false, termsType: 'ORDER_DEFAULT' },
        ];

        render(
            <FormHarness defaultValues={agreementDefaults}>
                <OrderPaymentSummary orderSheetNo='ORDER-SHEET-NO' />
            </FormHarness>,
        );

        fireEvent.click(screen.getByRole('button', { name: 'validate' }));

        await waitFor(() => {
            expect(screen.getByText('모든 약관에 동의해주세요.')).toBeTruthy();
        });
    });
});
