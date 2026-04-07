import z from 'zod';

import {
    CountryCdType,
    payType,
    pgType,
    phonePrefixType,
    termsType,
} from '@/schema/common.schema';
import { regEx } from '@/utils/validation';

const createOrderShippingAddressSchema = (isGlobalMall?: boolean) => {
    return z.object({
        receiverLastName: isGlobalMall
            ? z.string().nonempty('이름을 입력해주세요.')
            : z.string().nullish(),
        receiverJibunAddress: z.string(),
        requestShippingDate: z.date().nullish(),
        orderAdditionalInfo: z.string().nullish(),
        usesShippingInfoLaterInput: z.boolean().nullish(),
        receiverName: z.string(),
        customsIdNumber: z.string().nullish(),
        countryCd: CountryCdType,
        receiverZipCd: z.string().nonempty('우편번호를 입력해주세요.'),
        receiverDetailAddress: z.string().nonempty('상세주소를 입력해주세요.'),
        receiverCity: isGlobalMall
            ? z.string().nonempty('도시를 입력해주세요.')
            : z.string().nullish(),
        receiverMobileCountryCd: isGlobalMall
            ? z.string()
            : z.string().nullish(),
        receiverAddress: z.string().nonempty('배송지 주소를 입력해주세요.'),
        addressNo: z.number(),
        receiverState: z.string(),
        addressName: z.string().nullish(),
        receiverFirstName: isGlobalMall
            ? z.string().nonempty('성을 입력해주세요.')
            : z.string().nullish(),
        shippingInfoLaterInputContact: z.string().nullish(),
        receiverContact1: z.object({
            prefix: phonePrefixType,
            middle: isGlobalMall
                ? z.string().nullish()
                : z.string().nonempty('연락처를 입력해주세요.'),
            suffix: isGlobalMall
                ? z.string().nullish()
                : z.string().nonempty('연락처를 입력해주세요.'),
        }),
        receiverContact2: z.string().nullish(),
    });
};

// NOTE: 필수값이 아니라면 .nullish를 사용하여 null, undefined 모두 허용할 수 있도록
export const getPaymentSchema = ({
    isLogin,
    isGlobalMall,
}: {
    isLogin?: boolean;
    isGlobalMall?: boolean;
}) => {
    const shippingAddressSchema =
        createOrderShippingAddressSchema(isGlobalMall);

    return z
        .object({
            extraData: z.record(z.string(), z.unknown()).optional(),
            customTermsAgrees: z
                .array(
                    z.object({
                        isAgree: z.boolean(),
                        customTermsNo: z.number(),
                    }),
                )
                .optional(),
            orderMemo: z.string().optional(),
            appCardInfo: z
                .object({
                    instType: z.enum([
                        'STANDARD',
                        'NO_INTEREST',
                        'STANDARD_5',
                        'NO_INTEREST_5',
                        'STANDARD_7',
                        'NO_INTEREST_7',
                        'STANDARD_10',
                        'NO_INTEREST_10',
                    ]),
                    userNo: z.string().nullable().optional(),
                    cardCode: z.string().optional(),
                    installment: z.string().optional(),
                    oneClickYn: z.enum(['Y', 'N']).optional(),
                    acntId: z.string().optional(),
                })
                .optional(),
            bankAccountToDeposit: z
                .object({
                    bankAccount: z.string().optional(),
                    bankCode: z.string().optional(),
                    bankDepositorName: z.string().optional(),
                })
                .optional(),
            payType,
            clientReturnUrl: z.string().optional(),
            coupons: z
                .object({
                    productCoupons: z
                        .array(
                            z.object({
                                couponIssueNo: z.number(),
                                promotionCode: z.string().optional(),
                                productNo: z.number(),
                            }),
                        )
                        .optional(),
                    cartCouponIssueNo: z.number().optional(),
                    promotionCode: z.string().optional(),
                    // TODO: 테스트몰에 있는 항목이므로 확인 필요
                    channelType: z.string().optional(),
                })
                .optional(),
            useDefaultAddress: z.boolean(),
            member: z.boolean(),
            // TODO: 앱내 결제 여부, Y인 경우 extraData.appUrl에 결제완료 후 돌아갈 app scheme을 넣어야 함 (nullable)
            inAppYn: z.enum(['Y', 'N']).optional(),
            applyCashReceipt: z.boolean().optional(),
            orderTitle: z.string().optional(),
            tempPassword: isLogin
                ? z.string().nullable().optional()
                : z
                      .string()
                      .nonempty('임시 비밀번호를 입력해주세요.')
                      .regex(regEx.guestPassword, {
                          message:
                              '비회원 주문 조회시, 사용할 비밀번호를 영문/숫자/특수문자 조합하여 8-12자 이내로 입력해 주세요.',
                      }),
            saveAddressBook: z.boolean(),
            updateMember: z.boolean(),
            orderSheetNo: z.string(),
            pgType: z.enum(pgType.options, {
                error: 'PG사를 선택해주세요.',
            }),
            remitter: z.string().optional(),
            freeGiftInfos: z
                .array(
                    z.object({
                        freeGifts: z.array(
                            z.object({
                                mallOptionNo: z.number(),
                                mallProductNo: z.number(),
                            }),
                        ),
                        freeGiftConditionNo: z.number(),
                    }),
                )
                .optional(),
            availableAccumulationByOptions: z
                .array(
                    z.object({
                        mallOptionNo: z.number(),
                        availableAccumulationRate: z.number().optional(),
                        availableAccumulationAmt: z.number().optional(),
                    }),
                )
                .optional(),
            deliveryMemo: z.string().optional(),
            agreementTermsAgrees: z
                .array(
                    z.object({
                        isAgree: z.boolean(),
                        termsType,
                    }),
                )
                .refine((terms) => terms.every((term) => term.isAgree), {
                    message: '모든 약관에 동의해주세요.',
                }),
            orderer: z.object({
                ordererEmail: z.email({
                    error: (issue) => {
                        if (!issue.input) {
                            return '이메일을 입력해주세요.';
                        }

                        if (issue.code === 'invalid_format') {
                            return '이메일 형식으로 입력해주세요.';
                        }

                        return '이메일을 입력해주세요.';
                    },
                }),
                ordererContact1: z.object({
                    prefix: phonePrefixType,
                    middle: isGlobalMall
                        ? z.string().nullish()
                        : z.string().nonempty('연락처를 입력해주세요.'),
                    suffix: isGlobalMall
                        ? z.string().nullish()
                        : z.string().nonempty('연락처를 입력해주세요.'),
                }),
                ordererContact2: z.string().optional().nullable(),
                ordererName: isGlobalMall
                    ? z.string().optional()
                    : z.string().nonempty('주문자명을 입력해주세요.'),
                ordererLastName: isGlobalMall
                    ? z.string().nonempty('성을 입력해주세요.')
                    : z.string().optional(),
                ordererFirstName: isGlobalMall
                    ? z.string().nonempty('이름을 입력해주세요.')
                    : z.string().optional(),
                ordererMobileCountryCd: isGlobalMall
                    ? z.string().nonempty('연락처 국가코드를 선택해주세요.')
                    : z.string().optional(),
            }),
            paymentAmtForVerification: z.number().optional(),
            shippingAddress: shippingAddressSchema,
            shippingAddresses: z.array(shippingAddressSchema).optional(),
            savesLastPayType: z.boolean(),
            subPayAmt: z.number(),
            cashReceipt: z
                .object({
                    cashReceiptKeyType: z.enum(
                        ['CARD_NO', 'MOBILE_NO', 'BUSINESS_NO', 'VOLUNTARY_NO'],
                        {
                            error: (issue) => {
                                if (issue.input) {
                                    return;
                                }
                                return '현금영수증 발급 키 타입을 선택해주세요.';
                            },
                        },
                    ),
                    cashReceiptKey: z.string().optional(),
                    cashReceiptIssuePurposeType: z.enum(
                        [
                            'INCOME_TAX_DEDUCTION',
                            'PROOF_EXPENDITURE',
                            'VOLUNTARY',
                        ],
                        {
                            error: (issue) => {
                                if (issue.input) {
                                    return;
                                }
                                return '현금영수증 발급 목적을 선택해주세요.';
                            },
                        },
                    ),
                })
                .optional(),
            tempPasswordCheck: isLogin
                ? z.string().nullable().optional()
                : z.string().nonempty('임시 비밀번호 확인을 입력해주세요.'),
        })
        .refine(
            (data) => {
                if (data.payType === 'ACCOUNT') {
                    return !!data.remitter;
                }
                return true;
            },
            {
                message: '입금자명을 입력해주세요.',
                path: ['remitter'],
            },
        )
        .refine(
            (data) => {
                if (data.payType === 'ACCOUNT') {
                    return !!data.bankAccountToDeposit;
                }
                return true;
            },
            {
                message: '입금은행을 선택해주세요.',
                path: ['bankAccountToDeposit.bankAccount'],
            },
        )
        .refine(
            (data) => {
                if (data.shippingAddress.countryCd === 'KR') {
                    return true;
                }
                return !!data.shippingAddress.receiverState;
            },
            {
                message: 'Receiver State is required',
                path: ['shippingAddress.receiverState'],
            },
        )
        .refine(
            ({ tempPassword, tempPasswordCheck }) => {
                if (isLogin) {
                    return true;
                }
                return tempPassword === tempPasswordCheck;
            },
            {
                message: '임시 비밀번호가 일치하지 않습니다.',
                path: ['tempPasswordCheck'],
            },
        )
        .refine(
            ({ payType, bankAccountToDeposit }) => {
                if (payType !== 'ACCOUNT') return true;
                return !!bankAccountToDeposit?.bankAccount;
            },
            {
                message: '계좌번호를 입력해주세요.',
                path: ['bankAccountToDeposit', 'bankAccount'],
            },
        )
        .refine(
            ({ payType, applyCashReceipt, cashReceipt }) => {
                if (
                    payType === 'ACCOUNT' &&
                    applyCashReceipt &&
                    !cashReceipt?.cashReceiptKey
                ) {
                    return false;
                }
                return true;
            },
            {
                message: '발급 번호를 입력해주세요.',
                path: ['cashReceipt', 'cashReceiptKey'],
            },
        );
};

export type PaymentReserveSchemaType = z.infer<
    ReturnType<typeof getPaymentSchema>
>;
