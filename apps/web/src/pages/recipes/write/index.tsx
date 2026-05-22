import Seo from '@/components/common/seo';
import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'next/router';
import { Suspense, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { CSRLayout } from '@/components/layout';
import { RecipeForm } from '@/features/recipe/components/recipe-form';
import { recipeKeys } from '@/hooks/queryKeys';
import { useProfile } from '@/hooks/suspenseQuery/member/profile';
import { useDialog, useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/recipes/write/index.css';

const RecipeWritePage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const recipeNo = Number(router.query.recipeNo) || 0;
    const { isMobile } = useResponsive();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;
    const isModify = !!memberNo && !!recipeNo;

    const { openAsyncDialog } = useDialog();

    const isProcessing = useRef(false);

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
                    <Suspense
                        fallback={
                            <LoadingWrapper
                                isLoading
                                containerStyle={{
                                    height: '50vh',
                                }}
                            >
                                <span />
                            </LoadingWrapper>
                        }
                    >
                        <SuspenseQuery
                            queryKey={recipeKeys.detail(recipeNo)}
                            queryFn={async () => {
                                const { data } = await recipe.getRecipeDetail(
                                    recipeNo,
                                );

                                return data;
                            }}
                            staleTime={1000 * 60 * 5}
                            gcTime={1000 * 60 * 10}
                        >
                            {async ({ data }) => {
                                if (data?.memberNo !== memberNo) {
                                    if (!isProcessing.current) {
                                        isProcessing.current = true;

                                        await openAsyncDialog({
                                            message: t(
                                                '내가 작성한 레시피만 수정할 수 있습니다.',
                                            ),
                                            onConfirmReturnValue: true,
                                            onCloseReturnValue: false,
                                        });

                                        router.back();
                                    }

                                    return null;
                                }

                                return (
                                    <RecipeForm
                                        isModify
                                        recipeDetailData={data}
                                    />
                                );
                            }}
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
