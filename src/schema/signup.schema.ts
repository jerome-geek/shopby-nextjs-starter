import { z } from 'zod';

// import { countryCodeType, mobileCountryCodeType } from '@/schema/common.schema';
import { env } from '@/configs/env';
import { countryCodeType, mobileCountryCodeType } from '@/schema/common.schema';

// const isGlobalMall = import.meta.env.VITE_LANG !== 'ko';
const isGlobalMall = env.NEXT_PUBLIC_LOCALE !== 'ko';

const signupFormSchema = z
    .object({
        birthYear: isGlobalMall
            ? z.string().optional()
            : z
                  .string({
                      error: '연도를 입력해주세요.',
                  })
                  .length(4, '연도는 4자리여야 합니다.')
                  .refine((val) => {
                      const year = parseInt(val);
                      return year >= 1900 && year <= new Date().getFullYear();
                  }, '유효한 연도를 입력해주세요.'),
        birthMonth: isGlobalMall
            ? z.string().optional()
            : z
                  .string({
                      error: '월을 입력해주세요.',
                  })
                  .length(2, '월은 2자리여야 합니다.')
                  .refine((val) => {
                      const month = parseInt(val);
                      return month >= 1 && month <= 12;
                  }, '유효한 월을 입력해주세요.'),
        birthDay: isGlobalMall
            ? z.string().optional()
            : z
                  .string({
                      error: '일을 입력해주세요.',
                  })
                  .length(2, '일은 2자리여야 합니다')
                  .refine((val) => {
                      const day = parseInt(val);
                      return day >= 1 && day <= 31;
                  }, '유효한 일을 입력해주세요'),
        lastName: isGlobalMall
            ? z.string().nonempty('성을 입력해주세요.')
            : z.string().optional(),
        city: z.string().optional(),
        // TODO: 일반 / 사업자 회원인지 여부에 따른 체크 필요
        businessName: z.string().optional(),
        countryCd: countryCodeType.optional(),
        // NOTE: 글로벌에서 memberName은 폼 제출시 검사
        memberName: z.string().optional(),
        zipCd: z.string().optional(),
        pushNotificationAgreed: z.boolean().optional(),
        password: z
            .string()
            .regex(
                /^(?:(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*]))(?=.{10,})|(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,9}).*$/,
                '10자리 이상은 2종류 조합, 8~9자리는 3종류 모두 조합이 필요합니다.'
            )
            .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
            .max(20, '비밀번호는 최대 20자까지 가능합니다')
            .optional(),
        recommenderId: z.string().optional(),
        companyNo: z.number().optional(),
        directMailAgreed: z.boolean().optional(),
        additionalInfo: z.string().optional(),
        nickname: z.string().optional(),
        customTermsNos: z.array(z.string()).optional(),
        state: z.string().optional(),
        groupNo: z.string().optional(),
        // TODO: 이메일 정규식 추가
        // email: z.email({ message: '이메일 형식이 올바르지 않습니다.' }),
        email: z.string().optional(),
        memberId: z.string().optional(),
        jibunDetailAddress: z.string().optional(),
        address: z.string().optional(),
        mobileCountryCode: mobileCountryCodeType.optional().refine(
            (v) => {
                if (isGlobalMall) {
                    return !!v;
                }
                return true;
            },
            {
                message: '국가코드를 선택해 주세요.',
            }
        ),
        certificated: z.boolean().optional(),
        // TODO: 몰에서 본인인증을 사용하는지 여부에 따라서 달라짐
        ci: z.string().optional(),
        smsAgreed: z.boolean().optional(),
        sex: z.enum(['M', 'F']).optional(),
        jibunAddress: z.string().optional(),
        openIdAccessToken: z.string().optional(),
        mobileNo: z.string().min(1, '휴대폰번호를 입력해 주세요.'),
        firstName: isGlobalMall
            ? z.string().nonempty('이름을 입력해주세요.')
            : z.string().optional(),
        telephoneNo: z.string().optional(),
        registrationNo: z.string().optional(),
        isRegistrationNoChecked: z.boolean(),
        joinTermsAgreements: z.array(
            z.enum([
                'USE',
                'PI_COLLECTION_AND_USE_REQUIRED',
                'PI_COLLECTION_AND_USE_OPTIONAL',
                'PI_PROCESS_CONSIGNMENT',
                'PI_THIRD_PARTY_PROVISION',
                'PI_14_AGE',
            ])
        ),
        detailAddress: z.string().optional(),
        extraInfo: z
            .array(
                z.object({
                    extraInfoNo: z.number(),
                    extraInfoName: z.string(),
                    extraInfoOptionNos: z.array(
                        z.boolean().or(z.number()).or(z.string())
                    ),
                    extraInfoOptionTextContent: z.string(),
                })
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
    })
    .refine((data) => (isGlobalMall ? true : !!data?.memberName), {
        message: '이름을 입력해 주세요.',
        path: ['memberName'],
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
        (data) => data.type !== 'business' || !!data.isRegistrationNoChecked,
        {
            message: '사업자 번호 중복을 체크해주세요.',
            path: ['isRegistrationNoChecked'],
        }
    )
    .refine(
        (data) => {
            if (!data.providerType) {
                return !!data.memberId;
            }
            return true;
        },
        { message: '아이디를 입력해주세요.', path: ['memberId'] }
    )
    .refine(
        (data) => {
            if (!data.providerType) {
                return !!data.password;
            }
            return true;
        },
        {
            message: '비밀번호를 입력해주세요.',
            path: ['password'],
        }
    )
    .refine((data) => data.password === data.passwordConfirm, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['passwordConfirm'],
    });
type SignupFormType = z.infer<typeof signupFormSchema>;

const signupSubmitSchema = z.object({
    birthday: z.string().optional(),
    joinTermsAgreements: z.array(
        z.enum([
            'USE',
            'PI_COLLECTION_AND_USE_REQUIRED',
            'PI_COLLECTION_AND_USE_OPTIONAL',
            'PI_PROCESS_CONSIGNMENT',
            'PI_THIRD_PARTY_PROVISION',
            'PI_14_AGE',
        ])
    ),
    memberId: z.string().min(1, '아이디를 입력해 주세요.'),
    password: z
        .string()
        .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
        .max(20, '비밀번호는 최대 20자까지 가능합니다.')
        .regex(
            /^(?:(?=.*[a-zA-Z])(?=.*[0-9])|(?=.*[a-zA-Z])(?=.*[!@#$%^&*])|(?=.*[0-9])(?=.*[!@#$%^&*]))(?=.{10,})|(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,9}).*$/,
            '10자리 이상은 2종류 조합, 8~9자리는 3종류 모두 조합이 필요합니다.'
        ),
    memberName: z.string({ error: '이름을 입력해 주세요.' }),
    pushNotificationAgreed: z.boolean().optional(),
    recommenderId: z.string().optional(),
    companyNo: z.number().optional(),
    directMailAgreed: z.boolean().optional(),
    additionalInfo: z.string().optional(),
    email: z.string().email(),
    mobileNo: z.string(),
    ci: z.string().optional(),
    smsAgreed: z.boolean().optional(),
    sex: z.enum(['M', 'F']).optional(),
    jibunAddress: z.string().optional(),
    openIdAccessToken: z.string().optional(),
    telephoneNo: z.string().optional(),
    businessName: z.string().optional(),
    registrationNo: z.string().optional(),
    extraInfo: z
        .array(
            z.object({
                extraInfoNo: z.number(),
                extraInfoOptionNos: z.array(
                    z.boolean().or(z.number()).or(z.string())
                ),
                extraInfoOptionTextContent: z.string(),
            })
        )
        .optional(),
    // NOTE: 해외 회원인 경우 필수값
    firstName: z.string().optional(),
    lastName: isGlobalMall
        ? z.string().nonempty('성을 입력해주세요.')
        : z.string().optional(),
    mobileCountryCode: mobileCountryCodeType.optional(),
    countryCd: countryCodeType.optional(),
    address: z.string().optional(),
    detailAddress: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zipCd: z.string().optional(),
});
type SignupSubmitType = z.infer<typeof signupSubmitSchema>;

const openIdSignupSubmitSchema = z.object({
    birthday: z.string().optional(),
    address: z.string().optional(),
    certificated: z.boolean().optional(),
    city: z.string().optional(),
    smsAgreed: z.boolean().optional(),
    sex: z.enum(['M', 'F']).optional(),
    jibunAddress: z.string().optional(),
    memberName: z.string().optional(),
    zipCd: z.string().optional(),
    mobileNo: z.string().optional(),
    pushNotificationAgreed: z.boolean().optional(),
    telephoneNo: z.string().optional(),
    joinTermsAgreements: z.array(
        z.enum([
            'USE',
            'PI_COLLECTION_AND_USE_REQUIRED',
            'PI_COLLECTION_AND_USE_OPTIONAL',
            'PI_PROCESS_CONSIGNMENT',
            'PI_THIRD_PARTY_PROVISION',
            'PI_14_AGE',
        ])
    ),
    directMailAgreed: z.boolean().optional(),
    nickname: z.string().optional(),
    detailAddress: z.string().optional(),
    customTermsNos: z
        .array(z.boolean().or(z.number()).or(z.string()))
        .optional(),
    state: z.string().optional(),
    email: z.string().email(),
    jibunDetailAddress: z.string().optional(),
    // NOTE: 해외 회원인 경우 필수값
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    mobileCountryCode: mobileCountryCodeType.optional(),
    countryCd: countryCodeType.optional(),
    extraInfo: z
        .array(
            z.object({
                extraInfoNo: z.number(),
                extraInfoName: z.string(),
                extraInfoOptionNos: z.array(
                    z.boolean().or(z.number()).or(z.string())
                ),
                extraInfoOptionTextContent: z.string(),
            })
        )
        .optional(),
});
type OpenIdSignupSubmitType = z.infer<typeof openIdSignupSubmitSchema>;

export {
    openIdSignupSubmitSchema,
    signupFormSchema,
    signupSubmitSchema,
    type OpenIdSignupSubmitType,
    type SignupFormType,
    type SignupSubmitType,
};
