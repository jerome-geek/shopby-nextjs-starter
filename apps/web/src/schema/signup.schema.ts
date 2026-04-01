import { z } from 'zod';

// import { countryCodeType, mobileCountryCodeType } from '@/schema/common.schema';
import { env } from '@/configs/env';
import { countryCodeType, mobileCountryCodeType } from '@/schema/common.schema';
import { regEx } from '@/utils/validation';

// const isGlobalMall = import.meta.env.VITE_LANG !== 'ko';
const isGlobalMall = env.NEXT_PUBLIC_LOCALE !== 'ko';

/** 중복확인 버튼 등, 폼 전체 refine 없이 검증할 때 사용 */
const signupDuplicateCheckMemberIdSchema = z
    .string()
    .optional()
    .superRefine((val, ctx) => {
        if (!val) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '아이디를 입력해 주세요.',
            });
        }

        if (!regEx.memberIdNew.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '아이디는 5자 이상의 영문, 숫자만 사용 가능합니다.',
            });
        }
    });

const signupDuplicateCheckEmailSchema = z
    .string('이메일을 입력해 주세요.')
    .optional()
    .superRefine((val, ctx) => {
        if (!val) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '이메일을 입력해 주세요.',
            });
        }

        if (!regEx.email.test(val)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '이메일 형식이 올바르지 않습니다.',
            });
        }
    });

const signupPasswordSchema = z
    .string()
    .optional()
    .superRefine((val, ctx) => {
        if (!val) {
            return ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: '비밀번호를 입력해 주세요.',
            });
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

type SignupSchemaOptions = {
    isSocialLogin: boolean;
};

const createSignupFormSchema = ({ isSocialLogin }: SignupSchemaOptions) =>
    z
        .object({
            birthday: z
                .string()
                .optional()
                .superRefine((val, ctx) => {
                    if (!val) return;

                    if (val.includes('_')) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: '생년월일을 모두 입력해주세요.',
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
                }),
            memberId: isSocialLogin
                ? z.string().optional()
                : signupDuplicateCheckMemberIdSchema,
            password: isSocialLogin
                ? z.string().optional()
                : signupPasswordSchema,
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
            city: z.string().optional(),
            // TODO: 일반 / 사업자 회원인지 여부에 따른 체크 필요
            businessName: z.string().optional(),
            pushNotificationAgreed: z.boolean().optional(),
            recommenderId: z.string().optional(),
            companyNo: z.number().optional(),
            directMailAgreed: z.boolean().optional(),
            additionalInfo: z.string().optional(),
            nickname: z.string().optional(),
            customTermsNos: z.array(z.string()).optional(),
            countryCd: countryCodeType.optional(),
            zipCd: z.string().optional(),
            jibunAddress: z.string().optional(),
            jibunDetailAddress: z.string().optional(),
            detailAddress: z.string().optional(),
            address: z.string().optional(),
            state: z.string().optional(),
            groupNo: z.string().optional(),
            email: signupDuplicateCheckEmailSchema,
            mobileCountryCode: mobileCountryCodeType.optional().refine(
                (v) => {
                    if (isGlobalMall) {
                        return !!v;
                    }
                    return true;
                },
                {
                    message: '국가코드를 선택해 주세요.',
                },
            ),
            mobileNo: z.string().optional(),
            telephoneNo: z.string().optional(),
            certificated: z.boolean().optional(),
            // TODO: 몰에서 본인인증을 사용하는지 여부에 따라서 달라짐
            ci: z.string().optional(),
            smsAgreed: z.boolean().optional(),
            sex: z.enum(['M', 'F']).optional(),
            openIdAccessToken: z.string().optional(),
            registrationNo: z.string().optional(),
            isRegistrationNoChecked: z.boolean(),
            joinTermsAgreements: z.array(
                z.enum([
                    'USE',
                    'PI_PROCESS',
                    'PI_COLLECTION_AND_USE_REQUIRED',
                    'PI_COLLECTION_AND_USE_OPTIONAL',
                    'PI_PROCESS_CONSIGNMENT',
                    'PI_THIRD_PARTY_PROVISION',
                    'PI_14_AGE',
                ]),
            ),
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
            // 실제 회원가입에는 없는 항목
            passwordConfirm: z.string().optional(),
            providerType: z
                .enum([
                    'PAYCO',
                    'NAVER',
                    'KAKAO',
                    'FACEBOOK',
                    'IAMSCHOOL',
                    'LIIVMATE',
                    'NHNENT',
                    'UNIONE',
                    'LINE',
                    'NCPSTORE',
                    'KAKAO_SYNC',
                    'APPLE',
                    'GOOGLE',
                ])
                .optional(),
            type: z.enum(['personal', 'business']),
            // businessImage: z.instanceof(FileList).optional(),
            businessImage: z
                .custom<FileList>()
                .refine((file) => {
                    if (typeof window === 'undefined') return true; // 서버에서는 통과
                    return file instanceof FileList; // 브라우저에서만 체크
                }, '파일 형식이 올바르지 않습니다.')
                .optional(),
            isDuplicateMemberId: z.boolean(),
            isDuplicateNickname: z.boolean(),
            isDuplicateEmail: z.boolean(),
            isNicknameRequired: z.boolean(),
            isMobileNoRequired: z.boolean(),
            isTelephoneNoRequired: z.boolean(),
            isAddressRequired: z.boolean(),
            isBirthdayRequired: z.boolean(),
            isSexRequired: z.boolean(),
        })
        .refine((data) => data.type !== 'business' || !!data.businessName, {
            message: '사업자명을 입력해주세요.',
            path: ['businessName'],
        })
        .refine((data) => data.type !== 'business' || !!data.registrationNo, {
            message: '사업자 번호를 입력해주세요.',
            path: ['registrationNo'],
        })
        .refine(
            (data) =>
                data.type !== 'business' || !!data.isRegistrationNoChecked,
            {
                message: '사업자 번호 중복을 체크해주세요.',
                path: ['isRegistrationNoChecked'],
            },
        )
        .refine(
            (data) => {
                if (data.isDuplicateMemberId) {
                    return false;
                }

                return true;
            },
            {
                message: '아이디 중복을 체크해주세요.',
                path: ['isDuplicateMemberId'],
            },
        )
        .refine(
            (data) => {
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
        .refine((data) => data.password === data.passwordConfirm, {
            message: '비밀번호가 일치하지 않습니다.',
            path: ['passwordConfirm'],
        })
        .refine((data) => (data.isNicknameRequired ? !!data.nickname : true), {
            message: '닉네임을 입력해 주세요.',
            path: ['nickname'],
        })
        .refine(
            (data) => {
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
        .refine((data) => (data.isMobileNoRequired ? !!data.mobileNo : true), {
            message: '휴대폰번호를 입력해 주세요.',
            path: ['mobileNo'],
        })
        .refine(
            (data) => (data.isTelephoneNoRequired ? !!data.telephoneNo : true),
            {
                message: '전화번호를 입력해 주세요.',
                path: ['telephoneNo'],
            },
        )
        .refine((data) => (data.isAddressRequired ? !!data.address : true), {
            message: '주소를 입력해 주세요.',
            path: ['address'],
        })
        .refine((data) => (data.isSexRequired ? !!data.sex : true), {
            message: '성별을 선택해 주세요.',
            path: ['sex'],
        });
type SignupFormSchemaType = z.infer<ReturnType<typeof createSignupFormSchema>>;

export {
    signupDuplicateCheckMemberIdSchema,
    signupDuplicateCheckEmailSchema,
    createSignupFormSchema,
    type SignupFormSchemaType,
};
