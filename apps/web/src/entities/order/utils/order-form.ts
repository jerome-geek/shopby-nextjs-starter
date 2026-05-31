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

import { parsePhoneStringByHyphen } from '@/entities/order/utils/phone';
import type { GetProfileResponse } from '@/models/member/profile';
import type { GetOrderSheetResponse } from '@/entities/order/model/orderSheet';
import type { PhonePrefixType } from '@/schema/common.schema';
import type { PaymentReserveSchemaType } from '@/entities/order/schema/payment';

interface TransformProps {
    orderSheetData: GetOrderSheetResponse;
    profileData: GetProfileResponse | null | undefined;
    isLogin: boolean;
    isKorean: boolean;
    isMyApp: boolean;
    orderSheetNo: string;
    isGift?: boolean;
}

type OrdererType = PaymentReserveSchemaType['orderer'];
type ShippingAddressType = PaymentReserveSchemaType['shippingAddress'];

export const getInitialOrderFormValues = ({
    orderSheetData,
    profileData,
    isLogin,
    isKorean,
    isMyApp,
    orderSheetNo,
    isGift = false,
}: TransformProps): Partial<PaymentReserveSchemaType> => {
    const mainAddress = orderSheetData?.orderSheetAddress?.mainAddress;
    const tradeBankAccountInfos = orderSheetData?.tradeBankAccountInfos ?? [];
    const availablePayTypes = orderSheetData?.availablePayTypes ?? [];
    const lastPayType = orderSheetData?.lastPayType;

    // NOTE: 마지막 결제수단이 유효하지 않으면 첫 번째 결제수단을 기본값으로 사용
    const firstPayTypeInfo = availablePayTypes[0];
    const payType =
        lastPayType &&
        includes(lastPayType, pipe(availablePayTypes, map(prop('payType'))))
            ? lastPayType
            : firstPayTypeInfo?.payType;

    const pgType = payType
        ? pipe(
              availablePayTypes,
              filter((a) => a.payType === payType),
              flatMap((b) => b.pgTypes),
              head,
          )
        : undefined;

    // NOTE: shippingAddress 스키마는 단일 flat 객체 타입 (Union 아님)
    // isKorean에 따라 값만 달라지므로 단언 없이 직접 할당 가능
    const orderer: OrdererType = {
        ordererEmail: profileData?.email ?? '',
        ordererName: isKorean ? (profileData?.memberName ?? '') : '',
        ordererLastName: !isKorean ? (profileData?.lastName ?? '') : '',
        ordererFirstName: !isKorean ? (profileData?.firstName ?? '') : '',
        ordererMobileCountryCd: '',
        ordererContact1: {
            prefix: (profileData?.mobileNo?.slice(0, 3) ??
                '010') as PhonePrefixType,
            middle: isKorean ? (profileData?.mobileNo?.slice(3, 7) ?? '') : '',
            suffix: isKorean ? (profileData?.mobileNo?.slice(7) ?? '') : '',
        },
    };

    const shippingAddress: ShippingAddressType = {
        countryCd: mainAddress?.countryCd || (isKorean ? 'KR' : 'US'),
        addressNo: mainAddress?.addressNo || 0,
        addressName: mainAddress?.addressName || '',
        receiverName: isKorean ? mainAddress?.receiverName || '' : '',
        receiverContact1: parsePhoneStringByHyphen(
            mainAddress?.receiverContact1,
        ),
        receiverAddress: mainAddress?.receiverAddress || '',
        receiverJibunAddress: isKorean
            ? mainAddress?.receiverJibunAddress || ''
            : '',
        receiverDetailAddress: mainAddress?.receiverDetailAddress || '',
        receiverZipCd: mainAddress?.receiverZipCd || '',
        receiverCity: !isKorean ? mainAddress?.receiverCity || '' : '',
        receiverState: !isKorean ? mainAddress?.receiverState || '' : '',
        receiverFirstName: '',
        receiverLastName: '',
        receiverMobileCountryCd: '',
        usesShippingInfoLaterInput: isGift,
        shippingInfoLaterInputContact: '',
    };

    // NOTE: 현금성 결제(무통장 입금 등)인 경우에만 현금영수증(cashReceipt) 초기값 설정
    const isAccountPayment = payType === 'ACCOUNT';
    const applyCashReceipt = isAccountPayment
        ? (orderSheetData?.applyCashReceiptForAccount ?? true)
        : false;
    const cashReceipt = isAccountPayment
        ? {
              cashReceiptIssuePurposeType: 'INCOME_TAX_DEDUCTION' as const,
              cashReceiptKeyType: 'MOBILE_NO' as const,
          }
        : undefined;

    return {
        orderSheetNo,
        inAppYn: isMyApp ? 'Y' : 'N',
        member: isLogin,
        orderMemo: '',
        updateMember: false,
        useDefaultAddress: false,
        subPayAmt: 0,
        savesLastPayType: true,
        customTermsAgrees: [],
        saveAddressBook: false,
        applyCashReceipt,
        cashReceipt,
        orderer,
        shippingAddress,
        // 약관 동의
        agreementTermsAgrees: pipe(
            orderSheetData?.termsInfos ?? [],
            map((a) => ({ isAgree: false, termsType: a.termsType })),
            toArray,
        ),
        // 무통장 입금 계좌
        bankAccountToDeposit: tradeBankAccountInfos[0]
            ? {
                  bankAccount: tradeBankAccountInfos[0].bankAccount,
                  bankCode: tradeBankAccountInfos[0].bankCode,
                  bankDepositorName: tradeBankAccountInfos[0].bankDepositorName,
              }
            : undefined,
        payType,
        pgType,
    };
};
