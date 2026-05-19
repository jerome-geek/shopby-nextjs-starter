import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import { ordersStatusTabSpec } from '@/entities/mypage/utils/tabs';
import { useOrderStatusSummary } from '@/hooks/suspenseQuery/order/myOrder';

export type OrderStatusFilterValue = Parameters<
    typeof ordersStatusTabSpec.resolveRequestTypes
>[0];

interface OrderStatusFilterProps {
    value: OrderStatusFilterValue;
    onChange: (value: OrderStatusFilterValue) => void;
}

export const OrderStatusFilter = ({
    value,
    onChange,
}: OrderStatusFilterProps) => {
    const { t } = useTranslation();
    const { data: orderStatusSummaryData } = useOrderStatusSummary();

    const orderStatusOptions = useMemo(() => {
        const rawOptions = ordersStatusTabSpec.options(orderStatusSummaryData);
        return rawOptions.map((option) => ({
            value: option.value,
            label:
                option.count !== undefined
                    ? `${t(option.label)} ${option.count}`
                    : t(option.label),
        }));
    }, [orderStatusSummaryData, t]);

    return (
        <SegmentedToggle
            className={card.toggleGroup}
            buttonClassName={card.toggleButton}
            value={value}
            defaultValue={ordersStatusTabSpec.defaultValue}
            options={orderStatusOptions}
            onChange={onChange}
        />
    );
};

export const OrderStatusFilterFallback = ({
    value,
    onChange,
}: OrderStatusFilterProps) => {
    const { t } = useTranslation();

    const orderStatusOptions = useMemo(() => {
        const rawOptions = ordersStatusTabSpec.options();
        return rawOptions.map((option) => ({
            value: option.value,
            label:
                option.count !== undefined
                    ? `${t(option.label)} ${option.count}`
                    : t(option.label),
        }));
    }, [t]);

    return (
        <SegmentedToggle
            className={card.toggleGroup}
            buttonClassName={card.toggleButton}
            value={value}
            defaultValue={ordersStatusTabSpec.defaultValue}
            options={orderStatusOptions}
            onChange={onChange}
        />
    );
};
