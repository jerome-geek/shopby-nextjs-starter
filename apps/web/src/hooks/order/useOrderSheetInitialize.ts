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
import { useFormContext } from 'react-hook-form';

import { type PhonePrefixType } from '@/schema/common.schema';
import { useProfile } from '@/hooks/query/member/profile';
import { useOrderConfiguration } from '@/hooks/query/order/orderConfiguration';
import { useOrderSheet } from '@/hooks/query/order/orderSheet';
import { usePG } from '@/hooks/order';
import { useGlobal } from '@/hooks/utils';
import type { PaymentReserveSchemaType } from '@/schema/payment.schema';

const parsePhoneString = (phone: string) => {
    return {
        prefix: phone.slice(0, 3) as PhonePrefixType,
        middle: phone.slice(3, -4),
        suffix: phone.slice(-4),
    };
};

const parsePhoneStringByHyphen = (phone: string | null | undefined) => {
    if (!phone)
        return { prefix: '010' as PhonePrefixType, middle: '', suffix: '' };

    // 하이픈이 포함된 경우 split 처리
    if (phone.includes('-')) {
        const [prefix, middle, suffix] = phone.split('-');
        return {
            prefix: (prefix || '010') as PhonePrefixType,
            middle: middle || '',
            suffix: suffix || '',
        };
    }

    // 하이픈이 없는 경우 기존 slice 방식 활용
    return parsePhoneString(phone);
};

interface UseOrderSheetInitializeProps {
    orderSheetNo: string;
    isLogin: boolean | null;
}

const useOrderSheetInitialize = ({
    orderSheetNo,
    isLogin,
}: UseOrderSheetInitializeProps) => {
    const { isKorean, defaultMobileCountryCode } = useGlobal();

    const { setValue, reset } = useFormContext<PaymentReserveSchemaType>();

    const { data: profileData } = useProfile({
        options: { enabled: isLogin !== null },
    });
    const { data: orderConfigurationData } = useOrderConfiguration();
    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: {
            includeMemberAddress: true,
        },
        options: { enabled: isLogin !== null },
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
        const availablePayTypes = orderSheetData.availablePayTypes;
        const mainAddress = orderSheetData.orderSheetAddress?.mainAddress;
        const tradeBankAccountInfos = orderSheetData.tradeBankAccountInfos;

        const pgType = pipe(
            orderSheetData,
            prop('availablePayTypes'),
            filter((a) => a.payType === orderSheetData.lastPayType),
            flatMap((b) => b.pgTypes),
            head,
        );

        if (
            lastPayType &&
            includes(lastPayType, pipe(availablePayTypes, map(prop('payType'))))
        ) {
            setValue('payType', lastPayType);
        }
        if (pgType) {
            setValue('pgType', pgType);
        }

        reset(
            (prev) => ({
                ...prev,
                // TODO: 기존에 등록된 주소가 있다면 세팅 필요
                shippingAddress: {
                    receiverCity: '',
                    receiverMobileCountryCd: '',
                    receiverState: '',
                    receiverFirstName: '',
                    receiverLastName: '',

                    countryCd: mainAddress?.countryCd || 'KR',
                    addressNo: mainAddress?.addressNo || 0,
                    addressName: mainAddress?.addressName || '',
                    receiverName: mainAddress?.receiverName || '',
                    receiverContact1: parsePhoneStringByHyphen(
                        mainAddress?.receiverContact1,
                    ),
                    receiverAddress: mainAddress?.receiverAddress || '',
                    receiverJibunAddress:
                        mainAddress?.receiverJibunAddress || '',
                    receiverDetailAddress:
                        mainAddress?.receiverDetailAddress || '',
                    receiverZipCd: mainAddress?.receiverZipCd || '',
                },
                agreementTermsAgrees: pipe(
                    orderSheetData,
                    prop('termsInfos'),
                    map((a) => ({ isAgree: false, termsType: a.termsType })),
                    toArray,
                ),
                bankAccountToDeposit: tradeBankAccountInfos[0]
                    ? {
                          bankAccount: tradeBankAccountInfos[0].bankAccount,
                          bankCode: tradeBankAccountInfos[0].bankCode,
                          bankDepositorName:
                              tradeBankAccountInfos[0].bankDepositorName,
                      }
                    : undefined,
                applyCashReceipt: orderSheetData.applyCashReceiptForAccount,
            }),
            { keepFieldsRef: true },
        );
    }, [orderSheetData, setValue, orderConfigurationData, reset]);

    // NOTE: 주문자 정보 세팅
    useEffect(() => {
        if (!profileData) {
            return;
        }

        setValue('orderer.ordererEmail', profileData.email ?? '');
        // setValue('orderer.ordererContact2', profileData.telephoneNo);
        // setValue(
        //     'orderer.ordererMobileCountryCd',
        //     profileData.mobileCountryCode ?? defaultMobileCountryCode,
        // );

        if (isKorean) {
            setValue('orderer.ordererName', profileData.memberName ?? '');
            setValue('orderer.ordererContact1', {
                prefix: (profileData.mobileNo?.slice(0, 3) ??
                    '010') as PhonePrefixType,
                middle: profileData.mobileNo?.slice(3, 7) ?? '',
                suffix: profileData.mobileNo?.slice(7) ?? '',
            });
        } else {
            setValue('orderer.ordererLastName', profileData.lastName ?? '');
            setValue('orderer.ordererFirstName', profileData.firstName ?? '');
            // setValue('orderer.ordererContact1', {
            //     prefix: profileData.mobileNo ?? '',
            // });
        }
    }, [profileData, setValue, isKorean, defaultMobileCountryCode]);
};

export default useOrderSheetInitialize;
