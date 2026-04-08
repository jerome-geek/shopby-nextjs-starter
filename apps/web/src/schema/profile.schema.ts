import { z } from 'zod';

import { env } from '@/configs/env';
import { countryCodeType, mobileCountryCodeType } from '@/schema/common.schema';
import { regEx } from '@/utils/validation';

const isGlobalMall = env.NEXT_PUBLIC_LOCALE !== 'ko';

type ProfileSchemaOptions = {
    /** 글로벌몰/국내몰에 따라 필수값이 달라질 때 사용 */
    isGlobalMall?: boolean;
    /** 화면/설정에 따라 특정 필드가 필수일 수 있음 */
    isNicknameRequired?: boolean;
    isMobileNoRequired?: boolean;
    isTelephoneNoRequired?: boolean;
    isAddressRequired?: boolean;
    isBirthdayRequired?: boolean;
    isSexRequired?: boolean;
};

const yyyyMMddSchema = z
    .string()
    .optional()
    .superRefine((val, ctx) => {
        if (!val) {
            return;
        }

        if (val.includes('_')) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '생년월일을 모두 입력해주세요.',
            });
            return;
        }

        if (!/^\d{8}$/.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '생년월일 형식이 올바르지 않습니다.',
            });
            return;
        }

        const y = parseInt(val.substring(0, 4), 10);
        const m = parseInt(val.substring(4, 6), 10);
        const d = parseInt(val.substring(6, 8), 10);

        const date = new Date(y, m - 1, d);
        if (
            date.getFullYear() !== y ||
            date.getMonth() !== m - 1 ||
            date.getDate() !== d
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '존재하지 않는 날짜입니다.',
            });
        }
    });

const emailSchema = z
    .string()
    .optional()
    .superRefine((val, ctx) => {
        if (!val) {
            return;
        }

        if (!regEx.email.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '이메일 형식이 올바르지 않습니다.',
            });
        }
    });

const passwordSchema = z
    .string()
    .optional()
    .superRefine((val, ctx) => {
        if (!val) {
            return;
        }

        if (val.length < 8) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '비밀번호는 최소 8자 이상이어야 합니다.',
            });
        }

        if (val.length > 20) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '비밀번호는 최대 20자까지 가능합니다.',
            });
        }

        if (!regEx.password.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '비밀번호 형식이 올바르지 않습니다.',
            });
        }
    });

export const createUpdateProfileSchema = ({
    isSocialLogin,
    nickname,
    email,
}: {
    isSocialLogin: boolean;
    nickname: string;
    email: string;
}) => {
    return z
        .object({
            /** 생년월일. yyyyMMdd (nullable) */
            birthday: yyyyMMddSchema,
            memberName: isGlobalMall
                ? z.string().optional()
                : z
                      .string('이름을 입력해주세요.')
                      .nonempty('이름을 입력해주세요.'),
            lastName: isGlobalMall
                ? z
                      .string('성을 입력해 주세요.')
                      .nonempty('성을 입력해 주세요.')
                : z.string().optional(),
            firstName: isGlobalMall
                ? z
                      .string('이름을 입력해 주세요.')
                      .nonempty('이름을 입력해 주세요.')
                : z.string().optional(),

            /** (국내, 해외 겸용) 도시 (nullable) */
            city: z.string().optional(),
            /** 회사명 (nullable) */
            businessName: z.string().optional(),
            /** 거주 국가 (nullable) */
            countryCd: countryCodeType.optional(),
            /** SMS 인증번호 (nullable) */
            smsAuthKey: z.string().optional(),
            /** 우편번호 (nullable) */
            zipCd: z.string().optional(),
            /** 푸쉬앱 알람 동의 여부 (nullable) */
            pushNotificationAgreed: z.boolean().optional(),
            /** 비밀번호 (nullable) */
            password: isSocialLogin ? z.string().optional() : passwordSchema,
            /** 이메일 알람 동의 여부 (nullable) */
            directMailAgreed: z.boolean().optional(),
            /** 추가 정보(jsonString) (nullable) */
            additionalInfo: z.string().optional(),
            /** 회원 닉네임 (nullable) */
            nickname: z.string().optional(),
            /** 가입시 동의한 추가 선택 동의 항목 (nullable) */
            customTermsNos: z
                .array(z.boolean().or(z.number()).or(z.string()))
                .optional(),
            /** (국내, 해외 겸용) 국내: 군/구, 해외: 주 (nullable) */
            state: z.string().optional(),
            /** 이메일 주소 (nullable) */
            email: emailSchema,
            /** 지번 주소 상세 (nullable) */
            jibunDetailAddress: z.string().optional(),
            /** 도로명 주소 (nullable) */
            address: z.string().optional(),
            /** 도로명 주소 상세 (nullable) */
            detailAddress: z.string().optional(),
            /** 지번 주소 (nullable) */
            jibunAddress: z.string().optional(),
            /** 국제전화번호 코드 (nullable) */
            mobileCountryCode: z.string().optional(),
            /** 인증확인 여부 (nullable) */
            certificated: z.boolean().optional(),
            /** SMS 알림 동의 여부 (nullable) */
            smsAgreed: z.boolean().optional(),
            /** 성별 (nullable) */
            sex: z.enum(['M', 'F']).optional(),
            /** 핸드폰 번호 (nullable) */
            mobileNo: z.string().optional(),
            /** 전화번호 (nullable) */
            telephoneNo: z.string().optional(),
            /** 환불 계좌 은행 (nullable) */
            refundBank: z.string().optional(),
            /** 환불 계좌 예금주명 (nullable) */
            refundBankDepositorName: z.string().optional(),
            /** 환불 계좌번호 (nullable) */
            refundBankAccount: z.string().optional(),
            /** 현재 비밀번호 (nullable) */
            currentPassword: isSocialLogin
                ? z.string().optional()
                : z
                      .string('현재 비밀번호를 입력해주세요.')
                      .nonempty('현재 비밀번호를 입력해주세요.'),
            /** 가입시 동의한 선택 동의 항목 (nullable) */
            joinTermsAgreements: z
                .array(
                    z.enum([
                        'MALL_INTRODUCTION',
                        'USE',
                        'E_COMMERCE',
                        'PI_PROCESS',
                        'PI_COLLECTION_AND_USE_REQUIRED',
                        'PI_COLLECTION_AND_USE_OPTIONAL',
                        'PI_PROCESS_CONSIGNMENT',
                        'PI_THIRD_PARTY_PROVISION',
                        'PI_COLLECTION_AND_USE_FOR_GUEST_ON_ARTICLE',
                        'ACCESS_GUIDE',
                        'WITHDRAWAL_GUIDE',
                        'PI_SELLER_PROVISION',
                        'PI_COLLECTION_AND_USE_ON_ORDER',
                        'ORDER_INFO_AGREE',
                        'CLEARANCE_INFO_COLLECTION_AND_USE',
                        'TRANSFER_AGREE',
                        'REGULAR_PAYMENT_USE',
                        'AUTO_APPROVAL_USE',
                        'PI_LIQUOR_PURCHASE_PROVISION',
                        'PI_RESTOCK_NOTICE',
                        'PI_14_AGE',
                    ]),
                )
                .optional(),
            isDuplicateNickname: z.boolean(),
            isDuplicateEmail: z.boolean(),
            isModifyEmail: z.boolean(),
            isModifyPassword: z.boolean(),
            isNicknameRequired: z.boolean(),
            isMobileNoRequired: z.boolean(),
            isTelephoneNoRequired: z.boolean(),
            isAddressRequired: z.boolean(),
            isBirthdayRequired: z.boolean(),
            isSexRequired: z.boolean(),
            passwordConfirm: z.string().optional(),

            /** 회원 추가항목 정보 */
            extraInfo: z
                .record(
                    z.string(),
                    z.object({
                        extraInfoNo: z.number(),
                        extraInfoName: z.string(),
                        extraInfoOptionNos: z.array(
                            z.boolean().or(z.number()).or(z.string()),
                        ),
                        extraInfoOptionTextContent: z.string(),
                        extraFileInfo: z.file().optional(),
                    }),
                )
                .optional(),
        })
        .refine(
            (data) => {
                if (data.email && data.email === email) {
                    return true;
                }

                if (data.isDuplicateEmail) {
                    return false;
                }
                return true;
            },
            {
                message: '이메일 중복을 체크해주세요.',
                path: ['isDuplicateEmail'],
            },
        )
        .refine((data) => (data.isNicknameRequired ? !!data.nickname : true), {
            message: '닉네임을 입력해 주세요.',
            path: ['nickname'],
        })
        .refine(
            (data) => {
                if (data.nickname && data.nickname === nickname) {
                    return true;
                }

                if (data.nickname && data.isDuplicateNickname) {
                    return false;
                }

                return true;
            },
            {
                message: '닉네임 중복을 체크해주세요.',
                path: ['isDuplicateNickname'],
            },
        )
        .refine(
            (data) => (data.isMobileNoRequired ? Boolean(data.mobileNo) : true),
            {
                message: '휴대폰번호를 입력해 주세요.',
                path: ['mobileNo'],
            },
        )
        .refine(
            (data) =>
                data.isTelephoneNoRequired ? Boolean(data.telephoneNo) : true,
            {
                message: '전화번호를 입력해 주세요.',
                path: ['telephoneNo'],
            },
        )
        .refine(
            (data) => (data.isAddressRequired ? Boolean(data.address) : true),
            {
                message: '주소를 입력해 주세요.',
                path: ['address'],
            },
        )
        .refine(
            (data) => (data.isBirthdayRequired ? Boolean(data.birthday) : true),
            {
                message: '생년월일을 입력해 주세요.',
                path: ['birthday'],
            },
        )
        .refine((data) => (data.isSexRequired ? Boolean(data.sex) : true), {
            message: '성별을 선택해 주세요.',
            path: ['sex'],
        })
        .refine((data) => (data.isModifyPassword ? !!data.password : true), {
            message: '비밀번호를 입력해 주세요.',
            path: ['password'],
        })
        .refine((data) => data.password === data.passwordConfirm, {
            message: '비밀번호가 일치하지 않습니다.',
            path: ['passwordConfirm'],
        });
};

export type UpdateProfileSchemaType = z.infer<
    ReturnType<typeof createUpdateProfileSchema>
>;
