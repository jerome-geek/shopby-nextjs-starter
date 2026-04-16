import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { includes } from '@fxts/core';

import { recipe } from '@/api/shop';
import type {
    CreateManualRecipeData,
    CreateRecipeData,
    RegisterManualTempImagesData,
    BookmarkRecipeData,
} from '@/models/shop/recipe';
import { useToast } from '@/hooks/ui';
import { recipeKeys, collectionKeys } from '@/hooks/queryKeys';

const useRecipeMutation = () => {
    const { t } = useTranslation();

    const { addToast } = useToast();
    const queryClient = useQueryClient();

    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({
            predicate: (query) => {
                return includes(query.queryKey[0], [
                    ...recipeKeys.all,
                    ...collectionKeys.all,
                ]);
            },
        });
    };

    const onMutationError = (error: Error) => {
        const errorMessage = isAxiosError(error)
            ? error.response?.data?.message || error.message
            : t('저장 중 오류가 발생했습니다.');
        addToast({ variant: 'error', message: errorMessage });
    };

    return {
        /**
         * SNS URL로 레시피 생성
         */
        createRecipe: useMutation({
            mutationFn: async ({ data }: { data: CreateRecipeData }) =>
                await recipe.createRecipe(data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
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
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        /**
         * 수동 레시피 임시 이미지 전체 삭제
         */
        deleteManualTempImages: useMutation({
            mutationFn: async () => await recipe.deleteManualTempImages(),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        /**
         * 수동 레시피 생성
         */
        createManualRecipe: useMutation({
            mutationFn: async ({ data }: { data: CreateManualRecipeData }) =>
                await recipe.createManualRecipe(data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        /**
         * 레시피 좋아요
         */
        likeRecipe: useMutation({
            mutationFn: async ({ sno }: { sno: number }) =>
                await recipe.likeRecipe(sno),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        /**
         * 레시피 좋아요 취소
         */
        unlikeRecipe: useMutation({
            mutationFn: async ({ sno }: { sno: number }) =>
                await recipe.unlikeRecipe(sno),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        /**
         * 레시피 북마크 (컬렉션 저장)
         */
        bookmarkRecipe: useMutation({
            mutationFn: async ({
                sno,
                data,
            }: {
                sno: number;
                data: BookmarkRecipeData;
            }) => await recipe.bookmarkRecipe(sno, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        /**
         * 레시피 북마크 취소
         */
        unBookmarkRecipe: useMutation({
            mutationFn: async ({ sno }: { sno: number }) =>
                await recipe.unBookmarkRecipe(sno),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
    };
};

export default useRecipeMutation;
