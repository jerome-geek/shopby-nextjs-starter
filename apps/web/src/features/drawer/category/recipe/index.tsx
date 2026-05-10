import * as styles from '@/features/drawer/category/recipe/index.css';
import { RecipeCard } from '@/components/recipe/card';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';

const Recipe = () => {
    const { data: publicRecipeSearchData } = usePublicRecipeSearch({
        searchParams: {
            order: 'DESC',
            sortBy: 'LATEST',
            page: 1,
            take: 12,
        },
    });

    const recipeList = publicRecipeSearchData?.data ?? [];

    return (
        <div className={styles.container}>
            <h2 className={styles.sectionTitle}>최근 등록 레시피</h2>

            <ul className={styles.recipeList}>
                {recipeList.map((recipe) => (
                    <li key={recipe.sno}>
                        <RecipeCard recipe={recipe} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipe;
