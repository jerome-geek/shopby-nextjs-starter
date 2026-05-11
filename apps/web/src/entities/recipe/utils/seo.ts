import { filter, pipe, toArray, uniq } from '@fxts/core';

import { PATHS } from '@/const/paths';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';

interface CreateRecipeSeoDataParams {
    recipeDetail: GetRecipeDetailResponse;
    sno: number;
}

export const createRecipeSeoData = ({
    recipeDetail,
    sno,
}: CreateRecipeSeoDataParams) => {
    const author =
        recipeDetail.authorName ??
        recipeDetail.memberName ??
        recipeDetail.memberId;
    const description =
        recipeDetail.description ||
        `${recipeDetail.title} 레시피를 확인해보세요.`;
    const url = process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${PATHS.RECIPES.DETAIL.replace(
              '[sno]',
              String(sno),
          )}`
        : undefined;
    const ingredients = recipeDetail.ingredients ?? [];
    const keywords = pipe(
        ingredients.map((ingredient) => ingredient.name),
        filter((name): name is string => !!name),
        uniq,
        toArray,
    ).join(', ');
    const images = pipe(
        [
            recipeDetail.thumbnailUrl,
            ...(recipeDetail.steps?.map((step) => step.stepImageUrl) ?? []),
        ],
        filter((image): image is string => !!image),
        uniq,
        toArray,
    );

    return {
        title: recipeDetail.title,
        description,
        image: recipeDetail.thumbnailUrl,
        keywords,
        author,
        ...(url && { url }),
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            name: recipeDetail.title,
            description,
            image: images,
            author: {
                '@type': 'Person',
                name: author,
            },
            datePublished: recipeDetail.regDt,
            dateModified: recipeDetail.updateDt,
            ...(url && { mainEntityOfPage: url }),
            ...(recipeDetail.servings && {
                recipeYield: `${recipeDetail.servings}인분`,
            }),
            ...(recipeDetail.durationSeconds && {
                cookTime: `PT${recipeDetail.durationSeconds}S`,
            }),
            ...(recipeDetail.caloriesPerServingKcal && {
                nutrition: {
                    '@type': 'NutritionInformation',
                    calories: `${recipeDetail.caloriesPerServingKcal} kcal`,
                },
            }),
            recipeIngredient: ingredients.map((ingredient) =>
                [ingredient.name, ingredient.amount].filter(Boolean).join(' '),
            ),
            recipeInstructions: recipeDetail.steps?.map((step) => ({
                '@type': 'HowToStep',
                position: step.stepNumber,
                text: step.description,
                ...(step.stepImageUrl && { image: step.stepImageUrl }),
            })),
            keywords,
            ...(recipeDetail.sourceUrl && { sameAs: recipeDetail.sourceUrl }),
        },
    };
};
