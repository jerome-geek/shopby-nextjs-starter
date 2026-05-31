import { z } from 'zod';

import { UploadFileBlob } from '@/hooks/utils/useFileUpload';
import type { ClaimType } from '@/models';
import {
    CountryCdType,
    bankType,
    claimReasonType,
    deliveryCompanyType,
    orderStatusType,
} from '@/schema/common.schema';

const isGlobalMall = process.env.NEXT_PUBLIC_LOCALE !== 'ko';

/** 취소 클레임 스키마 팩토리 — payType은 form 데이터에 포함하지 않고 클로저로 검증에만 사용 */
const createClaimCancelSchema = (payType?: string) =>
    z
        .object({
            claimReasonDetail: z
                .string({ error: '상세 사유를 입력해주세요.' })
                .nonempty({ message: '상세 사유를 입력해주세요.' }),
            responsibleObjectType: z.enum(['BUYER', 'SELLER']).optional(),
            claimType: z.enum(['CANCEL']),
            claimedProductOptions: z
                .array(
                    z.object({
                        isChecked: z.boolean(),
                        productCnt: z.number(),
                        orderProductOptionNo: z.number(),
                    }),
                )
                .min(1, '상품을 선택해주세요.')
                .refine((data) => data.filter((a) => a.isChecked).length > 0, {
                    message: '상품을 선택해주세요.',
                }),
            /** 환불 계좌 정보 서버 저장 여부 (유저가 선택하는 값) */
            saveBankAccountInfo: z.boolean(),
            bankAccountInfo: z
                .object({
                    bankAccount: z.string().nullish(),
                    bankDepositorName: z.string().nullish(),
                    bank: bankType.nullish(),
                    bankName: z.string().nullish(),
                })
                .nullish(),
            claimReasonType,
            refundsImmediately: z.boolean(),
        })
        .superRefine((data, ctx) => {
            const isCashPayment =
                payType === 'ACCOUNT' ||
                payType === 'VIRTUAL_ACCOUNT' ||
                payType === 'ESCROW_VIRTUAL_ACCOUNT' ||
                payType === 'ESCROW_REALTIME_ACCOUNT_TRANSFER';

            if (isCashPayment) {
                if (!data.bankAccountInfo?.bankAccount)
                    ctx.addIssue({
                        path: ['bankAccountInfo', 'bankAccount'],
                        code: 'custom',
                        message: '계좌번호를 입력해주세요.',
                    });
                if (!data.bankAccountInfo?.bankDepositorName)
                    ctx.addIssue({
                        path: ['bankAccountInfo', 'bankDepositorName'],
                        code: 'custom',
                        message: '예금주를 입력해주세요.',
                    });
                if (!data.bankAccountInfo?.bank)
                    ctx.addIssue({
                        path: ['bankAccountInfo', 'bank'],
                        code: 'custom',
                        message: '은행을 선택해주세요.',
                    });
            }
        });

/** 하위 호환용 — payType 없이 사용할 때 */
const claimCancelSchema = createClaimCancelSchema();

const claimExchangeSchema = z
    .object({
        claimType: z.enum(['EXCHANGE']),
        claimReasonDetail: z
            .string({ error: '상세 사유를 입력해주세요.' })
            .nonempty({ message: '상세 사유를 입력해주세요.' }),
        responsibleObjectType: z.enum(['BUYER', 'SELLER']).optional(),
        additionalPayRemitter: z.string().optional(),
        bankAccountInfo: z
            .object({
                bankAccount: z.string().nonempty({
                    message: '계좌번호를 입력해주세요.',
                }),
                bankDepositorName: z.string().optional(),
                bank: bankType.optional(),
                bankName: z.string().optional(),
            })
            .optional(),
        productCnt: z.number(),
        orderStatusType: orderStatusType.optional(),
        claimReasonType,
        // TODO: 반품수거방법(SELLER_COLLECT 일 경우 returnAddress(반품수거주소지) 입력 필요
        returnWayType: z
            .enum(['SELLER_COLLECT', 'BUYER_DIRECT_RETURN'])
            .optional(),
        deliveryCompanyType: deliveryCompanyType.optional(),
        // TODO: 첨부파일 url 리스트 (5개까지 가능, 취소교환은 무시되며, 반품교환만 저장합니다.) (nullable)^|url1,url2
        claimImageUrls: z.array(z.string()).optional(),
        uploadImageFiles: z.array(z.custom<UploadFileBlob>()).optional(),
        returnAddress: z
            .object({
                receiverLastName: isGlobalMall
                    ? z.string({ error: '성을 입력해주세요.' }).nonempty({
                          message: '성을 입력해주세요.',
                      })
                    : z.string().optional(),
                receiverFirstName: isGlobalMall
                    ? z.string({ error: '이름을 입력해주세요.' }).nonempty({
                          message: '이름을 입력해주세요.',
                      })
                    : z.string().optional(),
                receiverName: isGlobalMall
                    ? z.string().optional()
                    : z.string({ error: '반품자명 입력해주세요.' }).nonempty({
                          message: '반품자명 입력해주세요.',
                      }),
                receiverJibunAddress: z.string().optional(),
                customsIdNumber: z.string().optional(),
                countryCd: CountryCdType.optional(),
                receiverZipCd: z
                    .string({ error: '우편번호를 입력해주세요.' })
                    .nonempty({
                        message: '우편번호를 입력해주세요.',
                    }),
                receiverDetailAddress: z.string().optional(),
                deliveryMemo: z.string().optional(),
                receiverCity: z.string().optional(),
                receiverMobileCountryCd: z.string().optional(),
                receiverAddress: z
                    .string({ error: '주소를 입력해주세요.' })
                    .nonempty({
                        message: '주소를 입력해주세요.',
                    }),
                receiverState: z.string().optional(),
                receiverContact1: z
                    .string({ error: '연락처를 입력해주세요.' })
                    .nonempty({
                        message: '연락처를 입력해주세요.',
                    }),
                receiverContact2: z.string().optional(),
            })
            .optional()
            .nullable(),
        additionalPayBankAccount: z
            .object({
                depositorName: z.string().optional(),
                bank: bankType.optional(),
                bankName: z.string(),
                account: z.string().optional(),
            })
            .optional(),
        // TODO: 환불계좌정보 저장 여부(true일 경우 bankAccountInfo 필수
        saveBankAccountInfo: z.boolean(),
        additionalPayType: z
            .enum(['CASH', 'ACCUMULATION', 'NAVER_PAY'])
            .optional(),
        exchangeAddress: z
            .object({
                receiverLastName: isGlobalMall
                    ? z.string({ error: '성을 입력해주세요.' }).nonempty({
                          message: '성을 입력해주세요.',
                      })
                    : z.string().optional(),
                receiverFirstName: isGlobalMall
                    ? z.string({ error: '이름을 입력해주세요.' }).nonempty({
                          message: '이름을 입력해주세요.',
                      })
                    : z.string().optional(),
                receiverName: isGlobalMall
                    ? z.string().optional()
                    : z.string({ error: '수령자명을 입력해주세요.' }).nonempty({
                          message: '수령자명을 입력해주세요.',
                      }),
                receiverJibunAddress: z.string().optional(),
                customsIdNumber: z.string().optional(),
                countryCd: CountryCdType.optional(),
                receiverZipCd: z
                    .string({ error: '우편번호를 입력해주세요.' })
                    .nonempty({
                        message: '우편번호를 입력해주세요.',
                    }),
                receiverDetailAddress: z.string().optional(),
                deliveryMemo: z.string().optional(),
                receiverCity: z.string().optional(),
                receiverMobileCountryCd: z.string().optional(),
                receiverAddress: z
                    .string({ error: '주소를 입력해주세요.' })
                    .nonempty({
                        message: '주소를 입력해주세요.',
                    }),
                receiverState: z.string().optional(),
                receiverContact1: z
                    .string({ error: '연락처를 입력해주세요.' })
                    .nonempty({
                        message: '연락처를 입력해주세요.',
                    }),
                receiverContact2: z.string().optional(),
            })
            .optional()
            .nullable(),
        exchangeOption: z.object({
            inputTexts: z.array(
                z.object({
                    inputValue: z.string().nullable().optional(),
                    inputLabel: z.string().nullable().optional(),
                }),
            ),
            orderCnt: z.number(),
            optionNo: z.number(),
            productNo: z.number(),
            additionalProductNo: z.number(),
        }),
        claimedProductOptions: z
            .array(
                z.object({
                    isChecked: z.boolean(),
                    productCnt: z.number(),
                    orderProductOptionNo: z.number(),
                }),
            )
            .min(1, '상품을 선택해주세요.')
            .refine((data) => data.filter((a) => a.isChecked).length > 0, {
                message: '상품을 선택해주세요.',
            }),
        invoiceNo: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.returnWayType === 'BUYER_DIRECT_RETURN') {
            if (!data.deliveryCompanyType) {
                ctx.addIssue({
                    path: ['deliveryCompanyType'],
                    code: 'custom',
                    message: '택배사를 선택해주세요.',
                });
            }
            if (!data.invoiceNo) {
                ctx.addIssue({
                    path: ['invoiceNo'],
                    code: 'custom',
                    message: '송장번호를 입력해주세요.',
                });
            }
        }
    });

/** 반품 클레임 스키마 팩토리 — payType은 form 데이터에 포함하지 않고 클로저로 검증에만 사용 */
const createClaimReturnSchema = (payType?: string) =>
    z
        .object({
            claimType: z.enum(['RETURN']),
            claimReasonDetail: z
                .string({ error: '상세 사유를 입력해주세요.' })
                .nonempty({ message: '상세 사유를 입력해주세요.' }),
            responsibleObjectType: z.enum(['BUYER', 'SELLER']).optional(),
            claimedProductOptions: z
                .array(
                    z.object({
                        isChecked: z.boolean(),
                        productCnt: z.number(),
                        orderProductOptionNo: z.number(),
                    }),
                )
                .min(1, '상품을 선택해주세요.')
                .refine((data) => data.filter((a) => a.isChecked).length > 0, {
                    message: '상품을 선택해주세요.',
                }),
            /** 환불 계좌 정보 서버 저장 여부 (유저가 선택하는 값) */
            saveBankAccountInfo: z.boolean(),
            bankAccountInfo: z
                .object({
                    bankAccount: z.string().nullish(),
                    bankDepositorName: z.string().nullish(),
                    bank: bankType.nullish(),
                    bankName: z.string().nullish(),
                })
                .nullish(),
            claimReasonType,
            returnWayType: z
                .enum(['SELLER_COLLECT', 'BUYER_DIRECT_RETURN'])
                .optional(),
            deliveryCompanyType: deliveryCompanyType.optional(),
            claimImageUrls: z.array(z.string()).optional(),
            uploadImageFiles: z.array(z.custom<UploadFileBlob>()).optional(),
            invoiceNo: z.string().optional(),
            returnAddress: z.object({
                receiverLastName: isGlobalMall
                    ? z.string({ error: '성을 입력해주세요.' }).nonempty({
                          message: '성을 입력해주세요.',
                      })
                    : z.string().optional(),
                receiverFirstName: isGlobalMall
                    ? z.string({ error: '이름을 입력해주세요.' }).nonempty({
                          message: '이름을 입력해주세요.',
                      })
                    : z.string().optional(),
                receiverName: isGlobalMall
                    ? z.string().optional()
                    : z.string({ error: '반품자명 입력해주세요.' }).nonempty({
                          message: '반품자명 입력해주세요.',
                      }),
                receiverJibunAddress: z.string().optional(),
                customsIdNumber: z.string().optional(),
                countryCd: CountryCdType.optional(),
                receiverZipCd: z
                    .string({ error: '우편번호를 입력해주세요.' })
                    .nonempty({
                        message: '우편번호를 입력해주세요.',
                    }),
                receiverDetailAddress: z.string().optional(),
                deliveryMemo: z.string().optional(),
                receiverCity: z.string().optional(),
                receiverMobileCountryCd: z.string().optional(),
                receiverAddress: z
                    .string({ error: '주소를 입력해주세요.' })
                    .nonempty({
                        message: '주소를 입력해주세요.',
                    }),
                receiverState: z.string().optional(),
                receiverContact1: z
                    .string({ error: '연락체를 입력해주세요.' })
                    .nonempty({
                        message: '연락체를 입력해주세요.',
                    }),
                receiverContact2: z.string().optional(),
            }),
        })
        .superRefine((data, ctx) => {
            const isCashPayment =
                payType === 'ACCOUNT' ||
                payType === 'VIRTUAL_ACCOUNT' ||
                payType === 'ESCROW_VIRTUAL_ACCOUNT' ||
                payType === 'ESCROW_REALTIME_ACCOUNT_TRANSFER';

            if (isCashPayment) {
                if (!data.bankAccountInfo?.bankAccount)
                    ctx.addIssue({
                        path: ['bankAccountInfo', 'bankAccount'],
                        code: 'custom',
                        message: '계좌번호를 입력해 주세요.',
                    });
                if (!data.bankAccountInfo?.bankDepositorName)
                    ctx.addIssue({
                        path: ['bankAccountInfo', 'bankDepositorName'],
                        code: 'custom',
                        message: '예금주를 입력해 주세요.',
                    });
                if (!data.bankAccountInfo?.bank)
                    ctx.addIssue({
                        path: ['bankAccountInfo', 'bank'],
                        code: 'custom',
                        message: '은행을 선택해 주세요.',
                    });
            }

            if (data.returnWayType === 'BUYER_DIRECT_RETURN') {
                if (!data.deliveryCompanyType) {
                    ctx.addIssue({
                        path: ['deliveryCompanyType'],
                        code: 'custom',
                        message: '택배사를 선택해주세요.',
                    });
                }
                if (!data.invoiceNo) {
                    ctx.addIssue({
                        path: ['invoiceNo'],
                        code: 'custom',
                        message: '송장번호를 입력해주세요.',
                    });
                }
            }
        });

/** 하위 호환용 — payType 없이 사용할 때 */
const claimReturnSchema = createClaimReturnSchema();

type ClaimCancelSchemaType = z.infer<
    ReturnType<typeof createClaimCancelSchema>
>;
type ClaimExchangeSchemaType = z.infer<typeof claimExchangeSchema>;
type ClaimReturnSchemaType = z.infer<
    ReturnType<typeof createClaimReturnSchema>
>;

type ClaimSchemaMapType = {
    CANCEL: ClaimCancelSchemaType;
    RETURN: ClaimReturnSchemaType;
    EXCHANGE: ClaimExchangeSchemaType;
};
type ClaimFormData<T extends ClaimType> = ClaimSchemaMapType[T];

export {
    claimCancelSchema,
    claimExchangeSchema,
    claimReturnSchema,
    createClaimCancelSchema,
    createClaimReturnSchema,
    type ClaimCancelSchemaType,
    type ClaimExchangeSchemaType,
    type ClaimFormData,
    type ClaimReturnSchemaType,
    type ClaimSchemaMapType,
};
