import z from 'zod';

import { CountryCdType } from '@/schema/common.schema';

const isGlobalMall = process.env.NEXT_PUBLIC_LOCALE !== 'ko';

const requiredAddressField = (message: string) =>
    z
        .string()
        .trim()
        .min(1, message)
        .refine((value) => value !== '-', message);

export const laterShippingInputSchema = z.object({
    receiverLastName: isGlobalMall
        ? z.string().nonempty('성을 입력해주세요.')
        : z.string().optional(),
    receiverJibunAddress: z.string().optional(),
    receiverName: isGlobalMall
        ? z.string().optional()
        : z.string().nonempty('받으시는 분을 입력해주세요.'),
    countryCd: CountryCdType.optional(),
    receiverZipCd: requiredAddressField('우편번호를 입력해주세요.'),
    receiverDetailAddress: requiredAddressField('상세주소를 입력해주세요.'),
    deliveryMemo: z.string().optional(),
    receiverCity: z.string().optional(),
    receiverMobileCountryCd: z.string().nullable().optional(),
    receiverAddress: requiredAddressField('주소를 입력해주세요.'),
    receiverState: z.string().optional(),
    receiverFirstName: isGlobalMall
        ? z.string().nonempty('이름을 입력해주세요.')
        : z.string().optional(),
    receiverContact1: z.string().nonempty('연락처를 입력해주세요.'),
});

export type LaterShippingInputSchemaType = z.infer<
    typeof laterShippingInputSchema
>;
