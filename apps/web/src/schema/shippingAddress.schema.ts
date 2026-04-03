import { z } from 'zod';

import { CountryCdType } from '@/schema/common.schema';

const isGlobalMall = process.env.NEXT_PUBLIC_LOCALE !== 'ko';

export const shippingAddressSchema = z.object({
    addressType: z.enum([
        'BOOK',
        'RECENT',
        'RECURRING_PAYMENT',
        'RECURRING_PAYMENT_PRESENT',
    ]),
    countryCd: CountryCdType,
    receiverMobileCountryCd: isGlobalMall
        ? z.string().nonempty('연락처 국가코드를 선택해주세요.')
        : z.string().nullish(),
    customsIdNumber: z.string().nullish(),
    defaultYn: z.enum(['Y', 'N']),
    addressName: z.string().nonempty('배송지명을 입력해주세요.'),
    receiverLastName: isGlobalMall
        ? z.string('성을 입력해주세요.')
        : z.string().nullish(),
    receiverFirstName: isGlobalMall
        ? z.string('이름을 입력해주세요.')
        : z.string().nullish(),
    receiverName: isGlobalMall
        ? z.string().nullish()
        : z.string().nonempty('받으시는 분 이름을 입력해주세요.'),
    receiverZipCd: z
        .string({
            error: '우편번호를 입력해주세요.',
        })
        .nonempty('우편번호를 입력해주세요.'),
    receiverJibunAddress: z.string().nonempty('지번을 입력해주세요.'),
    receiverAddress: z.string().nonempty('주소를 입력해주세요.'),
    receiverDetailAddress: z.string().nonempty('상세 주소를 입력해주세요.'),
    receiverState: z.string().nullish(),
    receiverCity: z.string().nullish(),
    receiverContact1: z.object({
        prefix: z.string().nonempty('연락처를 입력해주세요.'),
        middle: isGlobalMall
            ? z.string().nullish()
            : z.string().nonempty('연락처를 입력해주세요.'),
        suffix: isGlobalMall
            ? z.string().nullish()
            : z.string().nonempty('연락처를 입력해주세요.'),
    }),
    receiverContact2: z.string().nullish(),
    addressMemo: z.string().nullish(),
});

export type ShippingAddressSchemaType = z.infer<typeof shippingAddressSchema>;
