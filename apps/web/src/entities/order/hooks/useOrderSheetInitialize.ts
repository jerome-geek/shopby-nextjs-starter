import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { getInitialOrderFormValues } from '@/entities/order/utils/order-form';
import { useSb } from '@/hooks/libs/shopby';
import { useMyApp } from '@/hooks/myapp';
import { usePG } from '@/hooks/order';
import { useProfile } from '@/hooks/query/member/profile';
import { useOrderConfiguration } from '@/hooks/suspenseQuery/order/orderConfiguration';
import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { useAuth } from '@/hooks/useAuth';
import { useGlobal } from '@/hooks/utils';
import {
    getPaymentSchema,
    type PaymentReserveSchemaType,
} from '@/entities/order/schema/payment';

interface UseOrderSheetInitializeProps {
    orderSheetNo: string;
    isGift?: boolean;
}

/**
 * 주문서 초기화 훅 (Suspense 대응)
 *
 * 주문서에 필요한 모든 데이터를 사전에 fetch하고,
 * Transformer를 통해 폼 초기값을 계산하여 useForm을 셋업합니다.
 */
const useOrderSheetInitialize = ({
    orderSheetNo,
    isGift = false,
}: UseOrderSheetInitializeProps) => {
    const isLogin = useAuth();
    const { isMyApp } = useMyApp();
    const { isKorean } = useGlobal();

    const { data: profileData } = useProfile({
        options: { enabled: !!isLogin },
    });
    const { data: orderConfigurationData } = useOrderConfiguration();
    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    // NOTE: PG 스크립트 세팅 (네이버페이는 별도로 설정)
    usePG({ pgType: 'NAVER_EASY_PAY' });
    usePG({ pgType: orderConfigurationData?.pgType });

    // NOTE: shopby 라이브러리 전역 상태 동기화
    useSb({ orderSheet: orderSheetData });

    const paymentSchema = useMemo(
        () =>
            getPaymentSchema({
                isLogin: !!isLogin,
                isGlobalMall: !isKorean,
                requireCustomsIdNumber: orderSheetData.requireCustomsIdNumber,
            }),
        [isLogin, isKorean, orderSheetData.requireCustomsIdNumber],
    );

    const defaultValues = useMemo(
        () =>
            getInitialOrderFormValues({
                orderSheetData,
                profileData,
                isLogin: !!isLogin,
                isKorean,
                isMyApp,
                orderSheetNo,
                isGift,
            }),
        [
            orderSheetData,
            profileData,
            isLogin,
            isKorean,
            isMyApp,
            orderSheetNo,
            isGift,
        ],
    );

    const methods = useForm<PaymentReserveSchemaType>({
        resolver: zodResolver(paymentSchema),
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues,
    });

    return { methods, orderSheetData };
};

export default useOrderSheetInitialize;
