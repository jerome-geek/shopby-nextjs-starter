import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ClaimReason } from '@/features/mypage/claims/forms/reason';
import type { ClaimableOption } from '@/models/claim';
import type { GetOrderOptionDetailForClaimResponse } from '@/models/claim/member';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (value: string) => value,
    }),
}));

vi.mock('@/shared/ui/file-upload', () => ({
    default: () => null,
}));

vi.mock('@/shared/ui/input', () => ({
    InputFieldContainer: ({ children }: { children: ReactNode }) => (
        <div>{children}</div>
    ),
    InputLabel: ({ children }: { children: ReactNode }) => (
        <label>{children}</label>
    ),
    Select: ({
        options = [],
        value,
        onChange,
        placeholder,
    }: {
        options?: Array<{ label: string; value: string }>;
        value?: { label: string; value: string } | null;
        onChange?: (
            option: { label: string; value: string } | null,
        ) => void;
        placeholder?: string;
    }) => (
        <select
            aria-label={placeholder ?? 'select'}
            value={value?.value ?? ''}
            onChange={(event) => {
                const selectedOption =
                    options.find(
                        (option) => option.value === event.target.value,
                    ) ?? null;

                onChange?.(selectedOption);
            }}
        >
            <option value=''>{placeholder ?? 'select'}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    ),
}));

vi.mock('@/shared/components/form', () => ({
    ErrorMessage: () => null,
    TextArea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
        <textarea {...props} />
    ),
}));

const claimReasonTypes: GetOrderOptionDetailForClaimResponse['claimReasonTypes'] =
    [
        {
            responsibleObjectType: 'BUYER',
            claimReasonType: 'CHANGE_MIND',
            label: '단순 변심',
        },
        {
            responsibleObjectType: 'SELLER',
            claimReasonType: 'WRONG_DELIVERY',
            label: '오배송',
        },
    ];

const originalOptionStub: ClaimableOption = {
    isFreeGift: false,
    inputs: [],
    deliverable: false,
    optionUsed: false,
    productName: '',
    additionalProductNo: 0,
    optionType: 'PRODUCT_ONLY',
    payType: 'CREDIT_CARD',
    price: {
        buyPrice: 0,
        buyAmt: 0,
        immediateDiscountedAmt: 0,
        immediateDiscountAmt: 0,
        additionalDiscountAmt: 0,
        salePrice: 0,
        standardAmt: 0,
        immediateDiscountedPrice: 0,
        standardPrice: 0,
        addPrice: 0,
        accumulationRate: 0,
    },
    reservation: false,
    imageUrlInfo: [],
    pgType: 'NONE',
    orderNo: '',
    orderStatusType: 'PAY_DONE',
    shippingAreaType: 'MALL_SHIPPING_AREA',
    orderCnt: 0,
    returnable: false,
    orderStatusDate: { registerYmdt: '' },
    exchangeable: false,
    cancelable: false,
    isExtraProduct: false,
    isRecurringPayment: false,
    isQuantityDiscount: false,
    deliveryInternationalYn: false,
    imageUrl: '',
    member: false,
    nextActions: [],
    refundable: false,
    optionNo: 0,
    orderOptionNo: 0,
    productNo: 0,
    optionTitle: '',
    delivery: { receiverInputLater: false },
    optionValue: '',
    optionName: '',
};

const buildOrderOptionData = (
    reasons: GetOrderOptionDetailForClaimResponse['claimReasonTypes'],
): GetOrderOptionDetailForClaimResponse => ({
    deliveryCompanyTypes: [],
    originalOption: originalOptionStub,
    claimReasonTypes: reasons,
    claimType: 'CANCEL',
    claimableOptions: [],
    responsibleObjectTypes: 'BUYER',
    availableBanks: [],
    deliveryCompanyTypeWithLabels: [],
});

const FormValueSpy = () => {
    const responsibleObjectType = useWatch({ name: 'responsibleObjectType' });
    const claimReasonType = useWatch({ name: 'claimReasonType' });

    return (
        <>
            <div data-testid='responsibleObjectType'>
                {responsibleObjectType ?? ''}
            </div>
            <div data-testid='claimReasonType'>{claimReasonType ?? ''}</div>
        </>
    );
};

const renderClaimReason = () => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
        const methods = useForm({
            defaultValues: {
                responsibleObjectType: undefined,
                claimReasonType: null,
                claimReasonDetail: '',
            },
        });

        return <FormProvider {...methods}>{children}</FormProvider>;
    };

    return render(
        <Wrapper>
            <ClaimReason
                claimType='CANCEL'
                orderOptionData={buildOrderOptionData(claimReasonTypes)}
            />
            <FormValueSpy />
        </Wrapper>,
    );
};

describe('ClaimReason', () => {
    it('hides responsible object for cancel and auto-maps it from the selected reason', () => {
        renderClaimReason();

        expect(screen.queryByText('귀책대상')).toBeNull();
        expect(screen.getByRole('option', { name: '단순 변심' })).toBeTruthy();
        expect(screen.getByRole('option', { name: '오배송' })).toBeTruthy();

        fireEvent.change(screen.getByLabelText('사유를 선택해주세요.'), {
            target: { value: 'WRONG_DELIVERY' },
        });

        expect(screen.getByTestId('claimReasonType').textContent).toBe(
            'WRONG_DELIVERY',
        );
        expect(screen.getByTestId('responsibleObjectType').textContent).toBe(
            'SELLER',
        );
    });
});
