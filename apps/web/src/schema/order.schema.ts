import { z } from 'zod';

import {
    CountryCdType,
    payType,
    pgType,
    termsType,
} from '@/schema/common.schema';
import { regEx } from '@/utils/validation';
// import { checkLogin } from '@/utils/users';

const isGlobalMall = process.env.NEXT_PUBLIC_LANG !== 'ko';

// TODO: useAuth가 hooks가 되었으므로 다시 체크해볼것
const checkLogin = () => {
    return true;
};

const registerShippingAddressSchema_base = z.object({
    // NOTE: (해외배송 / 글로벌결제 시 필수) 수령인 LastName (nullable)
    receiverLastName: isGlobalMall
        ? z.string().nonempty('성을 입력해 주세요.')
        : z.string().optional(),
    receiverJibunAddress: z.string(),
    defaultYn: z.enum(['Y', 'N']),
    receiverName: isGlobalMall
        ? z.string().optional()
        : z.string().nonempty('받으시는 분을 입력해주세요.'),
    addressType: z.enum([
        'BOOK',
        'RECENT',
        'RECURRING_PAYMENT',
        'RECURRING_PAYMENT_PRESENT',
    ]),
    customsIdNumber: z.string().optional(),
    countryCd: z.enum(CountryCdType.options).nullable().optional(),
    receiverZipCd: z
        .string({
            error: '우편번호를 입력해주세요.',
        })
        .nonempty('우편번호를 입력해주세요.'),
    addressMemo: z.string().optional(),
    receiverDetailAddress: z.string().nonempty('상세 주소를 입력해주세요.'),
    receiverCity: z.string().optional(),
    city: z.string().optional(),
    receiverMobileCountryCd: isGlobalMall
        ? z.string().nonempty('연락처 국가코드를 선택해주세요.')
        : z.string().nullable().optional(),
    receiverAddress: z.string().nonempty('주소를 입력해주세요.'),
    receiverState: z.string().optional(),
    addressName: z.string().nonempty('배송지명을 입력해주세요.'),
    // NOTE: (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable)
    receiverFirstName: isGlobalMall
        ? z.string().nonempty('이름을 입력해주세요.')
        : z.string().optional(),
    receiverContact1: z.object({
        prefix: z.string().nonempty('연락처를 입력해주세요.'),
        middle: isGlobalMall
            ? z.string().optional()
            : z.string().nonempty('연락처를 입력해주세요.'),
        suffix: isGlobalMall
            ? z.string().optional()
            : z.string().nonempty('연락처를 입력해주세요.'),
    }),
    receiverContact2: z.string().optional(),
});

const registerShippingAddressSchema = registerShippingAddressSchema_base.refine(
    (data) => {
        if (data.countryCd === 'KR') {
            return true;
        }
        return !!data.receiverState;
    },
    {
        message: 'Receiver State is required',
        path: ['receiverState'],
    },
);

type RegisterShippingAddressSchemaType = z.infer<
    typeof registerShippingAddressSchema
>;

const baseShippingAddressSchema = z.object({
    receiverLastName: isGlobalMall
        ? z.string().nonempty('성을 입력해주세요.')
        : z.string().optional(),
    receiverJibunAddress: z.string().optional(),
    requestShippingDate: z.string().optional(),
    orderAdditionalInfo: z.string().optional(),
    usesShippingInfoLaterInput: z.boolean().optional(),
    receiverName: isGlobalMall
        ? z.string().optional()
        : z.string().nonempty('받으시는 분을 입력해주세요.'),
    customsIdNumber: z.string().optional(),
    countryCd: z.string().optional(),
    receiverZipCd: z.string().optional(),
    receiverDetailAddress: z.string().optional(),
    receiverCity: z.string().optional(),
    receiverMobileCountryCd: z.string().nullable().optional(),
    receiverAddress: z.string().optional(),
    addressNo: z.number(),
    // (해외) 주 (엑심베이 페이팔 해외결제의 경우 다음 state 코드로 요청하셔야 합니다. [
    //  미국,
    //  중국: https://developer.paypal.com/api/rest/reference/state-codes/
    //  일본(숫자 01~47만 입력) [개발중]: https://www.post.japanpost.jp/zipcode/dl/readme.html
    // ]) (nullable)
    receiverState: z.string().optional(),
    addressName: z.string().optional(),
    receiverFirstName: isGlobalMall
        ? z.string().nonempty('이름을 입력해주세요.')
        : z.string().optional(),
    shippingInfoLaterInputContact: z.string().optional(),
    receiverContact1: z.string().optional(),
    receiverContact2: z.string().optional(),
});

const shippingAddressSchema = baseShippingAddressSchema.superRefine(
    (value, context) => {
        if (value.usesShippingInfoLaterInput) {
            if (!value.shippingInfoLaterInputContact) {
                context.addIssue({
                    path: ['shippingInfoLaterInputContact'],
                    message: '연락처를 입력해주세요.',
                    code: 'custom',
                });
            }

            if (isGlobalMall) {
                if (!value.receiverLastName) {
                    context.addIssue({
                        path: ['receiverLastName'],
                        message: '성을 입력해주세요.',
                        code: 'custom',
                    });
                }
                if (!value.receiverFirstName) {
                    context.addIssue({
                        path: ['receiverFirstName'],
                        message: '이름을 입력해주세요.',
                        code: 'custom',
                    });
                }
            } else {
                if (!value.receiverName) {
                    context.addIssue({
                        path: ['receiverName'],
                        message: '수령자명을 입력해주세요.',
                        code: 'custom',
                    });
                }
            }

            return;
        }

        if (!value.receiverContact1) {
            context.addIssue({
                path: ['receiverContact1'],
                message: '연락처를 입력해주세요.',
                code: 'custom',
            });
        }
        if (!value.receiverZipCd) {
            context.addIssue({
                path: ['receiverZipCd'],
                message: '우편번호를 입력해주세요.',
                code: 'custom',
            });
        }
        if (!value.receiverAddress) {
            context.addIssue({
                path: ['receiverAddress'],
                message: '주소를 입력해주세요.',
                code: 'custom',
            });
        }
        if (!value.receiverDetailAddress) {
            context.addIssue({
                path: ['receiverDetailAddress'],
                message: '상세주소를 입력해주세요.',
                code: 'custom',
            });
        }
    },
);

const paymentReserveSchema = z
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
        tempPassword: checkLogin()
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
            ordererContact1: z
                .string()
                .nonempty('휴대폰번호를 입력해 주세요.')
                .regex(regEx.phoneNumberIncludeSafeNumber, {
                    message: '형식에 맞게 입력해 주세요.',
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
                    ['INCOME_TAX_DEDUCTION', 'PROOF_EXPENDITURE', 'VOLUNTARY'],
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
        shippingAddresses: z
            .array(
                z.object({
                    payProductParams: z.array(
                        z.object({
                            rentalInfos: z
                                .array(
                                    z.object({
                                        monthlyRentalAmount: z.number(),
                                        rentalPeriod: z.number(),
                                    }),
                                )
                                .optional(),
                            recurringPaymentDelivery: z.object({
                                date: z.number().optional(),
                                cycleType: z.enum(['MONTH', 'WEEK']).optional(),
                                dayOfWeek: z
                                    .enum([
                                        'MONDAY',
                                        'TUESDAY',
                                        'WEDNESDAY',
                                        'THURSDAY',
                                        'FRIDAY',
                                        'SATURDAY',
                                        'SUNDAY',
                                    ])
                                    .optional(),
                                cycle: z.number().optional(),
                            }),
                            baseProductNo: z.number().optional(),
                            recurringPaymentLastRound: z.number().optional(),
                            orderCnt: z.number(),
                            optionInputs: z.array(
                                z.object({
                                    optionNo: z.number(),
                                    optionName: z.string(),
                                    optionPrice: z.number(),
                                }),
                            ),
                            productNo: z.number(),
                            optionNo: z.number(),
                        }),
                    ),
                    requestShippingDate: z.string().optional(),
                    addressNo: z.number().optional(),
                    usesShippingInfoLaterInput: z.boolean().optional(),
                    useDefaultAddress: z.boolean().optional(),
                    shippingAddress: registerShippingAddressSchema_base
                        // .omit({ receiverContact1: true })
                        .safeExtend({
                            receiverContact1: z.string(),
                        }),
                    addressName: z.string().optional(),
                    shippingInfoLaterInputContact: z.string().optional(),
                }),
            )
            .optional(),
        tempPasswordCheck: checkLogin()
            ? z.string().nullable().optional()
            : z.string().nonempty('임시 비밀번호 확인을 입력해주세요.'),
        selectAddress: checkLogin()
            ? z
                  .boolean({
                      error: (issue) => {
                          if (issue.input) {
                              return;
                          }
                          return '배송지를 선택해주세요.';
                      },
                  })
                  .refine((val) => val, {
                      message: '배송지를 선택해주세요.',
                  })
            : z.boolean().optional(),
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
            if (checkLogin()) {
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
// .refine(
//     ({ shippingAddress }) => {
//         if (shippingAddress.usesShippingInfoLaterInput) {
//             return !!shippingAddress.shippingInfoLaterInputContact;
//         }
//         return true;
//     },
//     {
//         message: '연락처를 입력해주세요.',
//         path: ['shippingAddress.shippingInfoLaterInputContact'],
//     },
// )
// .refine(
//     ({ shippingAddress }) => {
//         if (shippingAddress.usesShippingInfoLaterInput) {
//             return true;
//         }
//         return false;
//     },
//     {
//         message: '연락처를 입력해주세요.',
//         path: ['shippingAddress.receiverContact1'],
//     },
// )
// .refine(
//     ({ shippingAddress }) => {
//         if (shippingAddress.usesShippingInfoLaterInput) {
//             return true;
//         }
//         return false;
//     },
//     {
//         message: '우편번호를 입력해주세요.',
//         path: ['shippingAddress.receiverZipCd'],
//     },
// )
// .refine(
//     ({ shippingAddress }) => {
//         if (shippingAddress.usesShippingInfoLaterInput) {
//             return true;
//         }
//         return false;
//     },
//     {
//         message: '주소를 입력해주세요.',
//         path: ['shippingAddress.receiverAddress'],
//     },
// )
// .refine(
//     ({ shippingAddress }) => {
//         if (shippingAddress.usesShippingInfoLaterInput) {
//             return true;
//         }
//         return false;
//     },
//     {
//         message: '상세주소를 입력해주세요.',
//         path: ['shippingAddress.receiverDetailAddress'],
//     },
// );

type PaymentReserveSchemaType = z.infer<typeof paymentReserveSchema>;

const registerCashReceiptSchema = z.object({
    orderNo: z.string({
        error: (issue) => {
            if (issue.input) {
                return;
            }
            return '주문번호를 입력해주세요.';
        },
    }),
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
    cashReceiptKey: z
        .string({
            error: (issue) => {
                if (issue.input) {
                    return;
                }
                return '발급 번호를 입력해주세요.';
            },
        })
        .trim()
        .min(1, '발급 번호를 입력해주세요.'),
    cashReceiptIssuePurposeType: z.enum(
        ['INCOME_TAX_DEDUCTION', 'PROOF_EXPENDITURE', 'VOLUNTARY'],
        {
            error: (issue) => {
                if (issue.input) {
                    return;
                }
                return '현금영수증 발급 목적을 선택해주세요.';
            },
        },
    ),
});
type RegisterCashReceiptSchemaType = z.infer<typeof registerCashReceiptSchema>;

const paymentReserveSchemaV2 = z
    .object({
        clientParams: z
            .object({
                mallNo: z.string(),
                orderName: z.string(),
            })
            .nullable()
            .optional(),
        extraData: z.record(z.string(), z.unknown()).nullable().optional(),
        useMemberInfo: z.boolean().nullable().optional(),
        customTermsAgrees: z
            .array(
                z.object({
                    isAgree: z.boolean().nullable().optional(),
                    customTermsNo: z.number().nullable().optional(),
                }),
            )
            .optional(),
        orderMemo: z.string().nullable().optional(),
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
                cardCode: z.string(),
                installment: z.string(),
                oneClickYn: z.enum(['Y', 'N']),
                acntId: z.string().nullable().optional(),
            })
            .optional(),
        bankAccountToDeposit: z
            .object({
                bankAccount: z.string(),
                bankCode: z.string(),
                bankDepositorName: z.string(),
            })
            .optional(),
        rentalInfo: z
            .object({
                monthlyRentalAmount: z.number(),
                rentalPeriod: z.number(),
            })
            .optional(),
        payType,
        clientReturnUrl: z
            .string()
            .nonempty('결제 완료 후 리턴 URL을 입력해주세요.'),
        coupons: z
            .object({
                productCoupons: z
                    .array(
                        z.object({
                            couponIssueNo: z.number(),
                            promotionCode: z.string().nullable().optional(),
                            productNo: z.number(),
                        }),
                    )
                    .optional(),
                cartCouponIssueNo: z.number().nullable().optional(),
                promotionCode: z.string().nullable().optional(),
                channelType: z.string().nullable().optional(),
            })
            .optional(),
        useDefaultAddress: z.boolean().nullable().optional(),
        member: z.boolean(),
        inAppYn: z.enum(['Y', 'N']).nullable().optional(),
        applyCashReceipt: z.boolean().nullable().optional(),
        orderTitle: z.string().nullable().optional(),
        tempPassword: checkLogin()
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
        remitter: z.string().nullable().optional(),
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
                    mallOptionNo: z.number().nullable().optional(),
                    availableAccumulationRate: z.number().nullable().optional(),
                    availableAccumulationAmt: z.number().nullable().optional(),
                }),
            )
            .optional(),
        deliveryMemo: z.string().nullable().optional(),
        agreementTermsAgrees: z
            .array(
                z.object({
                    isAgree: z.boolean().nullable().optional(),
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
            ordererContact1: z
                .string()
                .nonempty('휴대폰번호를 입력해 주세요.')
                .regex(regEx.phoneNumberIncludeSafeNumber, {
                    message: '형식에 맞게 입력해 주세요.',
                }),
            ordererContact2: z.string().nullable().optional(),
            ordererMobileCountryCd: isGlobalMall
                ? z.string().nonempty('연락처 국가코드를 선택해주세요.')
                : z.string().nullable().optional(),
            ordererName: isGlobalMall
                ? z.string().optional()
                : z.string().nonempty('주문자명을 입력해주세요.'),
            ordererLastName: isGlobalMall
                ? z.string().nonempty('성을 입력해주세요.')
                : z.string().optional(),
            ordererFirstName: isGlobalMall
                ? z.string().nonempty('이름을 입력해주세요.')
                : z.string().optional(),
        }),
        paymentAmtForVerification: z.number().nullable().optional(),
        shippingAddress: shippingAddressSchema.optional(),
        savesLastPayType: z.boolean().nullable().optional(),
        myPayInfo: z
            .object({
                mobileInfo: z
                    .object({
                        flagPin: z.enum(['Y', 'N']).nullable().optional(),
                        hppType: z.enum(['1', '2']).nullable().optional(),
                    })
                    .optional(),
                accountInfo: z
                    .object({
                        cshRecpSave: z.enum(['Y', 'N']).nullable().optional(),
                        cshRecpInfo: z.string().nullable().optional(),
                        cshRecpCode: z.enum(['1', '2']).nullable().optional(),
                        bankCardCode: z.string().nullable().optional(),
                    })
                    .optional(),
                cardInfo: z
                    .object({
                        flagPin: z.enum(['Y', 'N']).nullable().optional(),
                        flagCardPoint: z.enum(['Y', 'N']).nullable().optional(),
                        cardQuota: z.string().nullable().optional(),
                        couponCode: z.string().nullable().optional(),
                        cardInterest: z.enum(['Y', 'N']).nullable().optional(),
                        bankCardCode: z.string().nullable().optional(),
                    })
                    .optional(),
                wpayToken: z.string().nullable().optional(),
                payMethod: z.enum(['01', '16']).nullable().optional(),
                ci: z.string().nullable().optional(),
            })
            .optional(),
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
                    ['INCOME_TAX_DEDUCTION', 'PROOF_EXPENDITURE', 'VOLUNTARY'],
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
        shippingAddresses: z.array(
            z.object({
                payProductParams: z.array(
                    z.object({
                        rentalInfos: z
                            .array(
                                z.object({
                                    monthlyRentalAmount: z.number(),
                                    rentalPeriod: z.number(),
                                }),
                            )
                            .optional(),
                        recurringPaymentDelivery: z
                            .object({
                                date: z.number().optional(),
                                cycleType: z.enum(['MONTH', 'WEEK']).optional(),
                                dayOfWeek: z
                                    .enum([
                                        'MONDAY',
                                        'TUESDAY',
                                        'WEDNESDAY',
                                        'THURSDAY',
                                        'FRIDAY',
                                        'SATURDAY',
                                        'SUNDAY',
                                    ])
                                    .optional(),
                                cycle: z.number().optional(),
                            })
                            .optional(),
                        baseProductNo: z.number().optional(),
                        recurringPaymentLastRound: z.number().optional(),
                        orderCnt: z.number(),
                        optionInputs: z
                            .array(
                                z.object({
                                    optionNo: z.number(),
                                    optionName: z.string(),
                                    optionPrice: z.number(),
                                }),
                            )
                            .optional(),
                        productNo: z.number(),
                        optionNo: z.number(),
                    }),
                ),
                requestShippingDate: z.string().optional(),
                addressNo: z.number(),
                usesShippingInfoLaterInput: z.boolean().nullable().optional(),
                useDefaultAddress: z.boolean().nullable(),
                shippingAddress: registerShippingAddressSchema_base
                    .omit({ receiverContact1: true })
                    .safeExtend({
                        receiverContact1: z.string(),
                        deliveryMemo: z.string().nullable().optional(),
                    }),
                addressName: z.string().nullable().optional(),
                shippingInfoLaterInputContact: z.string().nullable().optional(),
                saveAddressBook: z.boolean().nullable().optional(),
            }),
        ),
        tempPasswordCheck: checkLogin()
            ? z.string().nullable().optional()
            : z.string().nonempty('임시 비밀번호 확인을 입력해주세요.'),
        selectAddress: checkLogin()
            ? z
                  .boolean({
                      error: (issue) => {
                          if (issue.input) {
                              return;
                          }
                          return '배송지를 선택해주세요.';
                      },
                  })
                  .refine((val) => val, {
                      message: '배송지를 선택해주세요.',
                  })
            : z.boolean().optional(),
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
        ({ tempPassword, tempPasswordCheck }) => {
            if (checkLogin()) {
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

type PaymentReserveSchemaV2Type = z.infer<typeof paymentReserveSchemaV2>;

export {
    paymentReserveSchema,
    paymentReserveSchemaV2,
    registerCashReceiptSchema,
    registerShippingAddressSchema,
    type PaymentReserveSchemaType,
    type PaymentReserveSchemaV2Type,
    type RegisterCashReceiptSchemaType,
    type RegisterShippingAddressSchemaType,
};
