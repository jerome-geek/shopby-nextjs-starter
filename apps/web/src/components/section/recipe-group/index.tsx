import { isEmpty } from '@fxts/core';

import RecipeSection from '@/components/section/recipe-group/recipe';
import * as styles from '@/components/section/recipe-group/index.css';
import FetchBoundary from '@/components/common/FetchBoundary';
import useRecipeExposureGroup from '@/hooks/suspenseQuery/shop/recipe/useRecipeExposureGroup';
import * as recipeSectionStyle from '@/components/section/recipe-group/recipe/index.css';

type GroupId =
    | 'recipe_group_1'
    | 'recipe_group_2'
    | 'recipe_group_3'
    | 'recipe_group_4'
    | 'recipe_group_5';

const RecipeSectionSkeleton = () => {
    return (
        <section className={recipeSectionStyle.Container}>
            <div className={recipeSectionStyle.RecipeSectionHeader}>
                <div className={recipeSectionStyle.RecipeSectionTitleContainer}>
                    <div className={styles.SkeletonTitleBlock} />
                    <div className={styles.SkeletonSubTitleBlock} />
                </div>
                <div className={styles.SkeletonLinkBlock} />
            </div>

            <ul className={recipeSectionStyle.RecipeList}>
                {Array.from({ length: 2 }).map((_, idx) => (
                    <li key={idx} className={recipeSectionStyle.RecipeListItem}>
                        <div
                            className={`${styles.SkeletonImage} ${recipeSectionStyle.RecipeImage}`}
                        />
                        <div
                            className={
                                recipeSectionStyle.RecipeContentsContainer
                            }
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                }}
                            >
                                <div className={styles.SkeletonTextLineLong} />
                                <div className={styles.SkeletonTextLineShort} />
                            </div>
                            <div className={styles.SkeletonMetaRow}>
                                <div className={styles.SkeletonMetaChip} />
                                <div className={styles.SkeletonMetaChip} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const RecipeGroupSectionSkeleton = () => {
    return (
        <section className={styles.RecipeGroupSection}>
            <RecipeSectionSkeleton />
            <RecipeSectionSkeleton />
        </section>
    );
};

const RecipeGroupSectionContent = ({ groupId }: { groupId: GroupId }) => {
    const count = 2;

    const { data } = useRecipeExposureGroup({
        groupId,
        params: { exposureCount: count },
    });

    if (isEmpty(data?.groups)) {
        return null;
    }

    return (
        <section className={styles.RecipeGroupSection}>
            {data.groups.slice(0, count).map((group) => (
                <RecipeSection key={group.sno} group={group} />
            ))}
        </section>
    );
};

const RecipeGroupSection = ({ groupId }: { groupId: GroupId }) => {
    return (
        <FetchBoundary fallback={<RecipeGroupSectionSkeleton />}>
            <RecipeGroupSectionContent groupId={groupId} />
        </FetchBoundary>
    );
};

export default RecipeGroupSection;
