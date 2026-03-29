import {
    filter,
    flatMap,
    head,
    includes,
    map,
    pipe,
    prop,
    toArray,
} from '@fxts/core';
import { useEffect } from 'react';
import { UseFormReset, UseFormSetValue } from 'react-hook-form';

// import { PHONE_FIRST_NUMBER_LIST } from '@/const/form';
import { useProfile } from '@/hooks/query/member/profile';
import { useOrderConfiguration } from '@/hooks/query/order/orderConfiguration';
import { useOrderSheet } from '@/hooks/query/order/orderSheet';
// import { useGlobal } from '@/hooks/utils';
import { PaymentReserveSchemaType } from '@/schema';
import { usePG } from '@/hooks/order';

const useOrderSheetInitialize = ({
    orderSheetNo,
    setValue,
    reset,
}: {
    orderSheetNo: string;
    setValue: UseFormSetValue<PaymentReserveSchemaType>;
    reset: UseFormReset<PaymentReserveSchemaType>;
}) => {
    const isKorean = process.env.NEXT_PUBLIC_LANG === 'ko';
    const defaultMobileCountryCode = 'US';
    // const { isKorean, defaultMobileCountryCode } = useGlobal();

    const { data: profileData } = useProfile();
    const { data: orderConfigurationData } = useOrderConfiguration();
    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: {
            includeMemberAddress: true,
        },
    });

    // NOTE: PG 스크립트 세팅 (네이버페이는 별도로 설정)
    usePG({ pgType: 'NAVER_EASY_PAY' });
    usePG({
        pgType: orderConfigurationData?.pgType,
    });

    // NOTE: 주문서 기본 정보 세팅
    useEffect(() => {
        if (!orderSheetData) {
            return;
        }

        const lastPayType = orderSheetData.lastPayType;
        const pgType = pipe(
            orderSheetData,
            prop('availablePayTypes'),
            filter((a) => a.payType === orderSheetData.lastPayType),
            flatMap((b) => b.pgTypes),
            head,
        );

        if (includes(lastPayType, pipe(orderSheetData.availablePayTypes, map(prop('payType'))))) {
            setValue('payType', lastPayType);
        }
        if (pgType) {
            setValue('pgType', pgType);
        }

        reset((prev) => ({
            ...prev,
            agreementTermsAgrees: pipe(
                orderSheetData,
                prop('termsInfos'),
                map((a) => ({ isAgree: false, termsType: a.termsType })),
                toArray,
            ),
            bankAccountToDeposit: {
                bankAccount:
                    orderSheetData.tradeBankAccountInfos[0].bankAccount,
                bankCode: orderSheetData.tradeBankAccountInfos[0].bankCode,
                bankDepositorName:
                    orderSheetData.tradeBankAccountInfos[0].bankDepositorName,
            },
            applyCashReceipt: orderSheetData.applyCashReceiptForAccount,
        }));
    }, [orderSheetData, setValue, orderConfigurationData, reset]);

    // NOTE: 주문자 정보 세팅
    useEffect(() => {
        if (profileData) {
            setValue('orderer.ordererEmail', profileData.email ?? '');
            setValue('orderer.ordererContact2', profileData.telephoneNo);
            setValue(
                'orderer.ordererMobileCountryCd',
                profileData.mobileCountryCode ?? defaultMobileCountryCode,
            );

            // if (isKorean) {
            //     setValue('orderer.ordererName', profileData.memberName);
            //     setValue('orderer.ordererContact1', {
            //         prefix:
            //             profileData.mobileNo?.slice(0, 3) ??
            //             PHONE_FIRST_NUMBER_LIST[0].value,
            //         middle: profileData.mobileNo?.slice(3, 7) ?? '',
            //         suffix: profileData.mobileNo?.slice(7) ?? '',
            //     });
            // } else {
            //     setValue('orderer.ordererLastName', profileData.lastName);
            //     setValue('orderer.ordererFirstName', profileData.firstName);
            //     setValue('orderer.ordererContact1', {
            //         prefix: profileData.mobileNo ?? '',
            //     });
            // }
        }
    }, [profileData, setValue, isKorean, defaultMobileCountryCode]);
};

export default useOrderSheetInitialize;
