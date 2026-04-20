import { z } from 'zod';

export const recipeCreateSchema = z.object({
    title: z.string().min(1, '제목을 입력해주세요'),
    description: z.string().min(1, '설명을 입력해주세요'),
    cookTimeMinutes: z.number().optional().nullable(),
    servings: z.number().optional().nullable(),
    caloriesPerServingKcal: z.number().optional().nullable(),
    thumbnailTempImageSno: z.number().min(1, '대표 이미지를 등록해주세요'),
    ingredients: z
        .array(
            z.object({
                name: z.string().min(1, '재료명을 입력해주세요'),
                amount: z.string().min(1, '용량을 입력해주세요'),
            }),
        )
        .min(1, '최소 한 개 이상의 재료가 필요합니다'),
    steps: z
        .array(
            z.object({
                stepNumber: z.number().int(),
                description: z.string().min(1, '상세 내용을 입력해주세요'),
                tempImageSno: z.number().optional().nullable(),
                imageUrl: z.string().optional().nullable(),
            }),
        )
        .min(1, '최소 한 개 이상의 조리 순서가 필요합니다'),
});

export type RecipeCreateInput = z.infer<typeof recipeCreateSchema>;