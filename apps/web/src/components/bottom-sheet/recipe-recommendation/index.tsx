import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/bottom-sheet/recipe-recommendation/index.css';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/components/layout';
import { RecipeCard } from '@/components/recipe/card';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';

export const RecipeRecommendationBottomSheet = ({
    close,
    unmount,
    isOpen,
}: DefaultBottomSheetProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { data: publicRecipeSearchData } = usePublicRecipeSearch({
        params: {
            page: 1,
            take: 6,
            order: 'DESC',
            sortBy: 'LATEST',
        },
    });

    const recipes = publicRecipeSearchData?.data ?? [];

    const handleMoreClick = () => {
        router.push(PATHS.RECIPES.MAIN);
        close();
    };

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            overlayId={OVERLAY_ID.ORDER_COMPLETE_RECIPE_RECOMMENDATION}
            isCloseButton={false}
            footerButtonList={
                <div className={styles.footerButtonGroup}>
                    <button className={styles.closeButton} onClick={close}>
                        {t('닫기')}
                    </button>
                    <button
                        className={styles.moreButton}
                        onClick={handleMoreClick}
                    >
                        {t('레시피 더 보러가기')}
                    </button>
                </div>
            }
        >
            <div className={styles.container}>
                <div className={styles.titleGroup}>
                    <span className={styles.titleLine}>
                        {t('배송 기다리는 동안')}
                    </span>
                    <span className={styles.titleLine}>
                        {t('식비를 절반으로 줄여주는 레시피 구경하세요!')}
                    </span>
                </div>

                <ul className={styles.recipeList}>
                    {recipes.map((recipe) => (
                        <li
                            key={recipe.sno}
                            className={styles.recipeCardItem}
                            onClick={() => close()}
                        >
                            <RecipeCard recipe={recipe} />
                        </li>
                    ))}
                </ul>
            </div>
        </BottomSheetLayout>
    );
};

export default RecipeRecommendationBottomSheet;
