import { useMutation } from '@tanstack/react-query';

import { recipe } from '@/api/shop';
import {
    CreateManualRecipeData,
    CreateRecipeData,
    RegisterManualTempImagesData,
} from '@/models/shop/recipe';

const useRecipeMutation = () => {
    return {
        /**
         * SNS URL로 레시피 생성
         */
        createRecipe: useMutation({
            mutationFn: async ({ data }: { data: CreateRecipeData }) =>
                await recipe.createRecipe(data),
        }),

        /**
         * 공용 이미지 업로드 (Geek 백엔드)
         */
        upload: useMutation({
            mutationFn: async (formData: FormData) =>
                await recipe.upload(formData),
        }),

        /**
         * 수동 레시피용 임시 이미지 등록
         */
        registerManualTempImages: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: RegisterManualTempImagesData;
            }) => await recipe.registerManualTempImages(data),
        }),

        /**
         * 수동 레시피 생성
         */
        createManualRecipe: useMutation({
            mutationFn: async ({ data }: { data: CreateManualRecipeData }) =>
                await recipe.createManualRecipe(data),
        }),

        /**
         * 레시피 좋아요
         */
        likeRecipe: useMutation({
            mutationFn: async ({ sno }: { sno: number }) =>
                await recipe.likeRecipe(sno),
        }),

        /**
         * 레시피 좋아요 취소
         */
        unlikeRecipe: useMutation({
            mutationFn: async ({ sno }: { sno: number }) =>
                await recipe.unlikeRecipe(sno),
        }),
    };
};

export default useRecipeMutation;
