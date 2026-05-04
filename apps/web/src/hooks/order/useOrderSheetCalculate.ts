import { filter, includes, pipe, toArray } from '@fxts/core';
import { useMemo } from 'react';
import { Control, useFormContext, useWatch } from 'react-hook-form';

import { useCountryList } from '@/hooks/queries/useCountryList';
import {
    useCalculateOrderSheet,
    useOrderSheet,
} from '@/hooks/query/order/orderSheet';
import { PaymentReserveSchemaType } from '@/schema';

interface UseOrderSheetCalculateProps {
    orderSheetNo: string;
    controlProp?: Control<PaymentReserveSchemaType>;
}

const useOrderSheetCalculate = ({
    orderSheetNo,
    controlProp,
}: UseOrderSheetCalculateProps) => {
    const method = useFormContext<PaymentReserveSchemaType>();

    const control = controlProp ?? method?.control;

    const { data: countryList = [] } = useCountryList();

    const countryCdWatch = useWatch({
        control,
        name: 'shippingAddress.countryCd',
    });
    const receiverStateWatch = useWatch({
        control,
        name: 'shippingAddress.receiverState',
    });
    const receiverCityWatch = useWatch({
        control,
        name: 'shippingAddress.receiverCity',
    });
    const receiverJibunAddressWatch = useWatch({
        control,
        name: 'shippingAddress.receiverJibunAddress',
    });
    const receiverAddressWatch = useWatch({
        control,
        name: 'shippingAddress.receiverAddress',
    });
    const couponsWatch = useWatch({ control, name: 'coupons' });
    const cartCouponWatch = useWatch({
        control,
        name: 'coupons.cartCouponIssueNo',
    });
    const productCouponWatch = useWatch({
        control,
        name: 'coupons.productCoupons',
    });
    const subPayAmtWatch = useWatch({
        control,
        name: 'subPayAmt',
    });

    const { data: orderSheetData, isFetched: isOrderSheetFetched } =
        useOrderSheet({
            orderSheetNo,
            searchParams: {
                includeMemberAddress: true,
            },
        });
    const {
        data: calculateOrderSheetData,
        isFetched: isCalculateOrderSheetFetched,
        isLoading: isCalculateOrderSheetLoading,
    } = useCalculateOrderSheet({
        orderSheetNo,
        searchParams: {
            addressRequest: {
                receiverJibunAddress: receiverJibunAddressWatch,
                receiverAddress: receiverAddressWatch,
                countryCd: countryCdWatch,
                receiverState: receiverStateWatch,
                receiverCity: receiverCityWatch,
            },
            couponRequest: {
                cartCouponIssueNo: cartCouponWatch,
                productCoupons: productCouponWatch,
            },
            accumulationUseAmt: subPayAmtWatch,
            shippingAddresses: [],
        },
        options: {
            enabled: isOrderSheetFetched,
        },
    });

    const countryCodeList = useMemo(() => {
        if (!orderSheetData) {
            return [];
        }

        return pipe(
            countryList,
            filter(
                (a) =>
                    !includes(a.value, orderSheetData.undeliverableCountries),
            ),
            toArray,
        );
    }, [orderSheetData, countryList]);

    return {
        orderSheetNo,
        receiverJibunAddressWatch,
        couponsWatch,
        cartCouponWatch,
        productCouponWatch,
        subPayAmtWatch,
        orderSheetData,
        calculateOrderSheetData,
        isOrderSheetFetched,
        isCalculateOrderSheetFetched,
        isCalculateOrderSheetLoading,
        countryCodeList,
    };
};

export default useOrderSheetCalculate;
