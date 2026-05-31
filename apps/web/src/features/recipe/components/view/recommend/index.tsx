import { filter, pipe, slice, toArray } from '@fxts/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipeCard } from '@/features/recipe/components/view/card';
import { useProfile } from '@/hooks/query/member/profile';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';

import * as styles from '@/features/recipe/components/view/recommend/index.css';

export const RecipeRecommend = () => {
    const { t } = useTranslation();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const { data: publicRecipeSearchData } = usePublicRecipeSearch({
        searchParams: {
            page: 1,
            take: 20,
            order: 'DESC',
            sortBy: 'LATEST',
        },
    });

    const recipeList = useMemo(() => {
        const list = publicRecipeSearchData?.data ?? [];

        return pipe(
            list,
            filter((recipe) => recipe.memberNo !== memberNo),
            slice(0, 4),
            toArray,
        );
    }, [publicRecipeSearchData, memberNo]);

    return (
        <section className={styles.container}>
            <h2 className={styles.sectionTitle}>
                {t('이런 레시피는 어때요?')}
            </h2>

            <ul className={styles.recommendedGrid}>
                {recipeList.map((recipe) => {
                    return (
                        <li key={recipe.sno}>
                            <RecipeCard recipe={recipe} />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
