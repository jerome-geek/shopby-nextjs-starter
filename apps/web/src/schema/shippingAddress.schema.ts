import { z } from 'zod';

import { PHONE_PREFIX_VALUES } from '@/const/form';
import { CountryCdType } from '@/schema/common.schema';
// import { checkLogin } from '@/utils/users';

const isGlobalMall = false;

export const getBaseRegisterShippingAddressSchema = ({
    isGlobalMall,
}: {
    isGlobalMall?: boolean;
} = {}) => {
    return z.object({
        // NOTE: (해외배송 / 글로벌결제 시 필수) 수령인 LastName (nullable)
        receiverLastName: isGlobalMall ? z.string() : z.string().nullish(),
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
        customsIdNumber: z.string().nullish(),
        countryCd: CountryCdType,
        receiverZipCd: z
            .string({
                error: '우편번호를 입력해주세요.',
            })
            .nonempty('우편번호를 입력해주세요.'),
        addressMemo: z.string().nullish(),
        receiverDetailAddress: z.string().min(1, '상세 주소를 입력해주세요.'),
        receiverCity: z.string().nullish(),
        city: z.string().optional(),
        receiverMobileCountryCd: isGlobalMall
            ? z.string().nonempty('연락처 국가코드를 선택해주세요.')
            : z.string().nullish(),
        receiverAddress: z.string().nonempty('주소를 입력해주세요.'),
        receiverState: z.string().optional(),
        addressName: z.string().nonempty('배송지명을 입력해주세요.'),
        // NOTE: (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable)
        receiverFirstName: z.string().nullish(),
        receiverContact1: z.object({
            prefix: z.string().nonempty('연락처를 입력해주세요.'),
            middle: isGlobalMall
                ? z.string().optional()
                : z.string().nonempty('연락처를 입력해주세요.'),
            suffix: isGlobalMall
                ? z.string().optional()
                : z.string().nonempty('연락처를 입력해주세요.'),
        }),
        receiverContact2: z
            .object({
                prefix: z.string().nonempty('연락처를 입력해주세요.'),
                middle: isGlobalMall
                    ? z.string().optional()
                    : z.string().nonempty('연락처를 입력해주세요.'),
                suffix: isGlobalMall
                    ? z.string().optional()
                    : z.string().nonempty('연락처를 입력해주세요.'),
            })
            .optional()
            .nullable(),
    });
};

export type BaseRegisterShippingAddressSchemaType = z.infer<
    ReturnType<typeof getBaseRegisterShippingAddressSchema>
>;

export const baseRegisterShippingAddressSchema = z.object({
    // NOTE: (해외배송 / 글로벌결제 시 필수) 수령인 LastName (nullable)
    receiverLastName: z.string().nullish(),
    receiverJibunAddress: z.string(),
    defaultYn: z.enum(['Y', 'N']),
    receiverName: z.string().optional(),
    // receiverName: isGlobalMall
    //     ? z.string().optional()
    //     : z.string().nonempty('받으시는 분을 입력해주세요.'),
    addressType: z.enum([
        'BOOK',
        'RECENT',
        'RECURRING_PAYMENT',
        'RECURRING_PAYMENT_PRESENT',
    ]),
    customsIdNumber: z.string().nullish(),
    countryCd: CountryCdType,
    receiverZipCd: z
        .string({
            error: '우편번호를 입력해주세요.',
        })
        .nonempty('우편번호를 입력해주세요.'),
    addressMemo: z.string().nullish(),
    receiverDetailAddress: z.string().nonempty('상세 주소를 입력해주세요.'),
    receiverCity: z.string().optional(),
    city: z.string().optional(),
    receiverMobileCountryCd: isGlobalMall
        ? z.string().nonempty('연락처 국가코드를 선택해주세요.')
        : z.string().nullish(),
    receiverAddress: z.string().nonempty('주소를 입력해주세요.'),
    receiverState: z.string().nullish(),
    addressName: z.string().nonempty('배송지명을 입력해주세요.'),
    // NOTE: (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable)
    receiverFirstName: isGlobalMall ? z.string() : z.string().nullish(),
    receiverContact1: z.object({
        prefix: z.string().nonempty('연락처를 입력해주세요.'),
        middle: isGlobalMall
            ? z.string().optional()
            : z.string().nonempty('연락처를 입력해주세요.'),
        suffix: isGlobalMall
            ? z.string().optional()
            : z.string().nonempty('연락처를 입력해주세요.'),
    }),
    receiverContact2: z
        .object({
            prefix: z.string().nonempty('연락처를 입력해주세요.'),
            middle: isGlobalMall
                ? z.string().optional()
                : z.string().nonempty('연락처를 입력해주세요.'),
            suffix: isGlobalMall
                ? z.string().optional()
                : z.string().nonempty('연락처를 입력해주세요.'),
        })
        .optional()
        .nullable(),
});

const registerShippingAddressSchema = baseRegisterShippingAddressSchema.refine(
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
    receiverLastName: z.string().nullish(),
    receiverJibunAddress: z.string().optional(),
    requestShippingDate: z.string().optional(),
    orderAdditionalInfo: z.string().optional(),
    usesShippingInfoLaterInput: z.boolean().optional(),
    receiverName: isGlobalMall
        ? z.string().optional()
        : z.string().nonempty('받으시는 분을 입력해주세요.'),
    customsIdNumber: z.string().optional(),
    countryCd: z.string().nullish(),
    receiverZipCd: z.string().optional(),
    receiverDetailAddress: z.string().optional(),
    receiverCity: z.string().optional(),
    receiverMobileCountryCd: z.string().nullish(),
    receiverAddress: z.string().optional(),
    addressNo: z.number(),
    // (해외) 주 (엑심베이 페이팔 해외결제의 경우 다음 state 코드로 요청하셔야 합니다. [
    //  미국,
    //  중국: https://developer.paypal.com/api/rest/reference/state-codes/
    //  일본(숫자 01~47만 입력) [개발중]: https://www.post.japanpost.jp/zipcode/dl/readme.html
    // ]) (nullable)
    receiverState: z.string().optional(),
    addressName: z.string().optional(),
    receiverFirstName: z.string().nullish(),
    shippingInfoLaterInputContact: z.string().optional(),
    receiverContact1: z
        .object({
            prefix: z.enum(PHONE_PREFIX_VALUES),
            middle: z
                .string()
                .min(3, '올바른 번호를 입력해주세요')
                .max(4, '올바른 번호를 입력해주세요'),
            last: z.string().length(4, '번호는 4자리여야 합니다'),
        })
        .nullable()
        .optional(),
    receiverContact2: z
        .object({
            prefix: z.enum(PHONE_PREFIX_VALUES),
            middle: z
                .string()
                .min(3, '올바른 번호를 입력해주세요')
                .max(4, '올바른 번호를 입력해주세요'),
            last: z.string().length(4, '번호는 4자리여야 합니다'),
        })
        .nullable()
        .optional(),
});

export const shippingAddressSchema = baseShippingAddressSchema.superRefine(
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
                // NOTE: 글로벌 몰이어도 성/이름 필수 해제
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

// 배송지 등록/수정 API 요청 스키마 (POST/PUT /profile/shipping-addresses)
// receiverContact1은 API에서 string으로 받음 (prefix+middle+suffix 조합)
export const registerShippingAddressRequestSchema = z.object({
    /** (해외배송 / 글로벌결제 시 필수) 수령인 LastName */
    receiverLastName: z.string().nullish(),
    /** 배송지 지번 */
    receiverJibunAddress: z.string(),
    /** 기본배송지 여부 */
    defaultYn: z.enum(['Y', 'N']),
    /** 수령자 명 */
    receiverName: z.string().nonempty('받으시는 분을 입력해주세요.'),
    /** 배송지타입 */
    addressType: z.enum([
        'BOOK',
        'RECENT',
        'RECURRING_PAYMENT',
        'RECURRING_PAYMENT_PRESENT',
    ]),
    /** 개인고유통관부호 */
    customsIdNumber: z.string().nullish(),
    /** 국가코드 */
    countryCd: CountryCdType.nullish(),
    /** 배송지 우편 번호 */
    receiverZipCd: z.string().nonempty('우편번호를 입력해주세요.'),
    /** 배송지 메모 */
    addressMemo: z.string().nullish(),
    /** 배송지 상세 주소 */
    receiverDetailAddress: z.string().nonempty('상세 주소를 입력해주세요.'),
    /** (해외) 도시 */
    receiverCity: z.string().nullish(),
    /** 연락처 국가코드 */
    receiverMobileCountryCd: z.string().nullish(),
    /** 배송지 주소 */
    receiverAddress: z.string().nonempty('주소를 입력해주세요.'),
    /** (해외) 주 */
    receiverState: z.string().nullish(),
    /** 주소록명 */
    addressName: z.string().nullish(),
    /** (해외배송 / 글로벌결제 시 필수) 수령인 FirstName */
    receiverFirstName: z.string().nullish(),
    /** 연락처1 (하이픈 없이 숫자만, e.g. "01012345678") */
    receiverContact1: z.string().nonempty('연락처를 입력해주세요.'),
    /** 연락처2 */
    receiverContact2: z.string().nullish(),
});

export type RegisterShippingAddressRequestSchemaType = z.infer<
    typeof registerShippingAddressRequestSchema
>;

// 수정 스키마는 등록과 동일한 구조
export const updateShippingAddressRequestSchema =
    registerShippingAddressRequestSchema;
export type UpdateShippingAddressRequestSchemaType =
    RegisterShippingAddressRequestSchemaType;

export {
    registerShippingAddressSchema,
    type RegisterShippingAddressSchemaType,
};
