import { cleanup, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { PaymentReserveSchemaType } from '@/entities/order/schema/payment';

const mockUseOrderSheet = vi.fn();
const mockUseAuth = vi.fn();

afterEach(() => {
    cleanup();
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (value: string) => value,
    }),
}));

vi.mock('@/hooks/suspenseQuery/order/orderSheet', () => ({
    useOrderSheet: (...args: unknown[]) => mockUseOrderSheet(...args),
}));

vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => mockUseAuth(),
}));

vi.mock('@/hooks/utils', () => ({
    useResponsive: () => ({
        isMobile: false,
    }),
}));

vi.mock('@/features/order/components/shipping-address/index.css', () => ({
    container: 'container',
    titleContainer: 'titleContainer',
    title: 'title',
    selectAddressButton: 'selectAddressButton',
    shippingAddressContainer: 'shippingAddressContainer',
    addressNameContainer: 'addressNameContainer',
    addressName: 'addressName',
    defaultAddressBadge: 'defaultAddressBadge',
    addressContainer: 'addressContainer',
    address: 'address',
    addressContact: 'addressContact',
}));

vi.mock('@/features/order/components/shipping-address/GuestShippingAddressForm', () => ({
    default: () => <div>guest-form</div>,
}));

vi.mock('@/features/order/components/shipping-address/MemberShippingAddressForm', () => ({
    default: () => <div>member-inline-form</div>,
}));

vi.mock('@/features/order/components/shipping-address/DeliveryRequestForm', () => ({
    DeliveryRequestForm: () => <div>delivery-request-form</div>,
}));

vi.mock('@/features/order/components/form/input-field', () => ({
    CustomsIdNumberField: () => <div>customs-id-field</div>,
}));

vi.mock('@/features/order/overlay/shipping-address-list/modal', () => ({
    ShippingAddressListModal: () => null,
}));

vi.mock('@/features/order/overlay/shipping-address-list/bottom-sheet', () => ({
    ShippingAddressListBottomSheet: () => null,
}));

const renderWithForm = async (shippingAddress: PaymentReserveSchemaType['shippingAddress']) => {
    const { default: ShippingAddress } = await import(
        '@/features/order/components/shipping-address'
    );

    const Wrapper = ({ children }: { children: ReactNode }) => {
        const methods = useForm<PaymentReserveSchemaType>({
            defaultValues: {
                shippingAddress,
            } as Partial<PaymentReserveSchemaType>,
        });

        return <FormProvider {...methods}>{children}</FormProvider>;
    };

    return render(
        <Wrapper>
            <ShippingAddress orderSheetNo='ORDER-SHEET-NO' />
        </Wrapper>,
    );
};

describe('ShippingAddress', () => {
    it('keeps inline member form layout when initial mainAddress is missing even after address fields are filled', async () => {
        mockUseAuth.mockReturnValue(true);
        mockUseOrderSheet.mockReturnValue({
            data: {
                requireCustomsIdNumber: false,
                orderSheetAddress: {
                    mainAddress: null,
                },
            },
        });

        await renderWithForm({
            addressNo: 123,
            addressName: '우리집',
            countryCd: 'KR',
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
        });

        expect(screen.getByText('member-inline-form')).toBeTruthy();
        expect(screen.queryByText('기본배송지')).toBeNull();
    });

    it('keeps inline member form layout when initial mainAddress object exists but receiverAddress is empty', async () => {
        mockUseAuth.mockReturnValue(true);
        mockUseOrderSheet.mockReturnValue({
            data: {
                requireCustomsIdNumber: false,
                orderSheetAddress: {
                    mainAddress: {
                        addressNo: 0,
                        addressName: '',
                        receiverAddress: '',
                    },
                },
            },
        });

        await renderWithForm({
            addressNo: 123,
            addressName: '회사',
            countryCd: 'KR',
            receiverName: '홍길동',
            receiverContact1: {
                prefix: '010',
                middle: '1234',
                suffix: '5678',
            },
            receiverAddress: '서울시 강남구 테헤란로 2',
            receiverJibunAddress: '서울시 강남구 역삼동 2',
            receiverDetailAddress: '202호',
            receiverZipCd: '54321',
            receiverCity: '',
            receiverState: '',
            receiverFirstName: '',
            receiverLastName: '',
            receiverMobileCountryCd: '',
        });

        expect(screen.getByText('member-inline-form')).toBeTruthy();
        expect(screen.queryByText('기본배송지')).toBeNull();
    });
});
