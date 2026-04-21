import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DefaultModalLayoutProps, ModalLayout } from '@/components/layout';
import * as styles from '@/components/modal/recipe-recommendation/index.css';
import { RecipeCard } from '@/components/recipe/card';
import { PagingV3 } from '@/components/ui/paging-v3';
import { PATHS } from '@/const/paths';
import { usePublicRecipeSearch } from '@/hooks/query/shop/recipe';

export const RecipeRecommendationModal = ({
    close,
    unmount,
    isOpen,
}: DefaultModalLayoutProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const { data: publicRecipeSearchData } = usePublicRecipeSearch({
        searchParams: {
            page: page,
            take: pageSize,
            order: 'DESC',
            sortBy: 'LATEST',
        },
    });

    const recipes = publicRecipeSearchData?.data ?? [];
    const totalCount = publicRecipeSearchData?.count ?? 0;
    const totalPages = Math.ceil(totalCount / pageSize);

    const handleMoreClick = () => {
        router.push(PATHS.RECIPES.MAIN);
        close();
    };

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            width='800px'
            modalContentClass={styles.modalContent}
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

                <div className={styles.recipeArea}>
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

                    {totalPages > 1 && (
                        <PagingV3
                            currentPage={page}
                            totalCount={totalCount}
                            pageSize={pageSize}
                            onPageClick={setPage}
                        />
                    )}
                </div>

                <div className={styles.footerButtonGroup}>
                    <button
                        className={styles.closeButton}
                        onClick={close}
                        type='button'
                    >
                        {t('닫기')}
                    </button>
                    <button
                        className={styles.moreButton}
                        onClick={handleMoreClick}
                        type='button'
                    >
                        {t('레시피 더 보러가기')}
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};

export default RecipeRecommendationModal;
