import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import GuestOrderPage from '@/pages/guest/order/[orderNo]';

const useRouterMock = vi.fn();
const useGuestOrderDetailMock = vi.fn();
const useOrderConfigurationMock = vi.fn();

vi.mock('next/router', () => ({
    useRouter: () => useRouterMock(),
}));

vi.mock('@/shared/components/layout', () => ({
    GuestLayout: ({ children }: { children: React.ReactNode }) => (
        <div data-testid='guest-layout'>{children}</div>
    ),
}));

vi.mock('@/hooks/suspenseQuery/order/guestOrder/useGuestOrderDetail', () => ({
    default: (params: unknown) => useGuestOrderDetailMock(params),
}));

vi.mock('@/hooks/suspenseQuery/order/orderConfiguration/useOrderConfiguration', () => ({
    default: () => useOrderConfigurationMock(),
}));

vi.mock('@/features/order/components/order-detail-view', () => ({
    OrderDetailView: () => <div data-testid='order-detail-view' />,
}));

vi.mock('@/shared/components/common/seo', () => ({
    default: ({ title }: { title: string }) => <div data-testid='seo'>{title}</div>,
}));

describe('GuestOrderPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useOrderConfigurationMock.mockReturnValue({ data: {} });
        useGuestOrderDetailMock.mockReturnValue({ data: {} });
    });

    it('orderNo가 없으면 비회원 주문 상세 조회를 실행하지 않는다', () => {
        useRouterMock.mockReturnValue({
            isReady: false,
            query: {},
        });

        render(<GuestOrderPage />);

        expect(useGuestOrderDetailMock).not.toHaveBeenCalled();
        expect(screen.queryByTestId('order-detail-view')).toBeNull();
    });
});
