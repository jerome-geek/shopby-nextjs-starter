import { RecipeCard } from '@/components/recipe/card';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/recipe/recommend/index.css';

export const RecipeRecommend = () => {
    const { t } = useTranslation();

    const { data: publicRecipeSearchData } = usePublicRecipeSearch({
        searchParams: {
            page: 1,
            take: 4,
            order: 'DESC',
            sortBy: 'LATEST',
        },
    });

    const recipeList = publicRecipeSearchData?.data ?? [];

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
