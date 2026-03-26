import { Control, useFormContext, useWatch } from 'react-hook-form';
import { useMemo } from 'react';
import { filter, includes, pipe, toArray } from '@fxts/core';

import { COUNTRY_CODE_LIST } from '@/const/form';
import {
    useCalculateOrderSheet,
    useOrderSheet,
} from '@/hooks/query/order/orderSheet';
import { PaymentReserveSchemaType } from '@/schema';

const useOrderSheetCalculate = ({
    orderSheetNo,
    controlProp,
}: {
    orderSheetNo: string;
    controlProp?: Control<PaymentReserveSchemaType>;
}) => {
    const method = useFormContext<PaymentReserveSchemaType>();

    const control = controlProp ?? method?.control;

    // const { isKorean } = useGlobal();
    const isKorean = true;

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
    const subPayAmtWatch = useWatch({ control, name: 'subPayAmt' });

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
        },
        options: {
            enabled: isOrderSheetFetched,
        },
    });
    console.log(
        '🚀 ~ useOrderSheetCalculate ~ calculateOrderSheetData:',
        calculateOrderSheetData,
    );

    const countryCodeList = useMemo(() => {
        if (isKorean || !orderSheetData) {
            return [];
        }

        return pipe(
            COUNTRY_CODE_LIST,
            filter(
                (a) =>
                    !includes(a.value, orderSheetData.undeliverableCountries),
            ),
            toArray,
        );
    }, [orderSheetData, isKorean]);

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
