import { SuspenseQuery } from '@suspensive/react-query';
import Seo from '@/components/common/seo';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import { CSRLayout } from '@/components/layout';
import { RecipeForm } from '@/features/recipe/components/recipe-form';
import { recipeKeys } from '@/hooks/queryKeys';
import { useProfile } from '@/hooks/suspenseQuery/member/profile';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/recipes/write/index.css';

const RecipeWritePage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const recipeNo = Number(router.query.recipeNo) || 0;
    const { isMobile } = useResponsive();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;
    const isModify = !!memberNo && !!recipeNo;

    return (
        <>
            <Seo title={t('레시피 만들기')} />

            <div className={styles.container}>
                {!isMobile && (
                    <header className={styles.header}>
                        <h1 className={styles.pageTitle}>
                            {t('레시피 만들기')}
                        </h1>
                    </header>
                )}

                {isModify ? (
                    <Suspense fallback={<div>Loading...</div>}>
                        <SuspenseQuery
                            queryKey={recipeKeys.detail(recipeNo, memberNo)}
                            queryFn={async () => {
                                const { data } =
                                    await recipe.getRecipeDetail(recipeNo);

                                return data;
                            }}
                            staleTime={1000 * 60 * 5}
                            gcTime={1000 * 60 * 10}
                        >
                            {({ data }) => (
                                <RecipeForm isModify recipeDetailData={data} />
                            )}
                        </SuspenseQuery>
                    </Suspense>
                ) : (
                    <RecipeForm />
                )}
            </div>
        </>
    );
};

RecipeWritePage.getLayout = function getLayout(
    page: React.ReactElement<{ isModify?: boolean }>,
) {
    return <CSRLayout>{page}</CSRLayout>;
};

export default RecipeWritePage;
