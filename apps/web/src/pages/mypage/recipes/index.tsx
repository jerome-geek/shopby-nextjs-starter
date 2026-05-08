import { parseAsInteger, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useTranslation } from 'react-i18next';

import FetchBoundary from '@/components/common/FetchBoundary';
import Seo from '@/components/common/seo';
import { MypageLayout } from '@/components/layout';
import { RecipeSearchSkeleton } from '@/components/recipe/search-skeleton';
import { ViewToggle } from '@/components/recipe/view-toggle';
import { RecipeList } from '@/features/recipe/components/recipe-list';
import * as styles from '@/pages/mypage/recipes/index.css';
import { vars } from '@/styles/theme.css';

const MyRecipesPage = () => {
    const { t } = useTranslation();

    // nuqs를 사용한 쿼리 파라미터 관리
    const [queryParams, setQueryParams] = useQueryStates(
        {
            page: parseAsInteger.withDefault(1),
            take: parseAsInteger.withDefault(12),
            sortBy: parseAsStringLiteral([
                'LATEST',
                'BOOKMARK_COUNT',
                'LIKE_COUNT',
            ]).withDefault('LATEST'),
            order: parseAsStringLiteral(['ASC', 'DESC']).withDefault('DESC'),
            viewMode: parseAsStringLiteral(['grid', 'details']).withDefault(
                'grid',
            ),
        },
        {
            shallow: true,
        },
    );


    const handlePageChange = (page: number) => {
        setQueryParams({ page }, { scroll: true });
    };

    return (
        <div className={styles.container}>
            <Seo title={t('나의 레시피')} noindex={true} />

            <header className={styles.header}>
                <h1 className={styles.title}>{t('나의 레시피')}</h1>
                <ViewToggle
                    viewMode={queryParams.viewMode === 'details' ? 'row' : 'grid'}
                    onToggle={(mode) =>
                        setQueryParams({ viewMode: mode === 'row' ? 'details' : 'grid' })
                    }
                />
            </header>

            <main>
                <FetchBoundary
                    fallback={
                        <RecipeSearchSkeleton
                            viewMode={queryParams.viewMode}
                            count={queryParams.take}
                        />
                    }
                >
                    <RecipeList
                        queryParams={queryParams}
                        onPageChange={handlePageChange}
                    />
                </FetchBoundary>
            </main>
        </div>
    );
};

MyRecipesPage.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);

export default MyRecipesPage;
