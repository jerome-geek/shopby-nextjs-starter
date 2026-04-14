import { isEmpty } from '@fxts/core';

import FetchBoundary from '@/components/common/FetchBoundary';
import * as styles from '@/components/section/recipe-group/index.css';
import RecipeSection from '@/components/section/recipe-group/recipe';
import RecipeGroupSectionSkeleton from '@/components/section/recipe-group/skeleton';
import useRecipeExposureGroup from '@/hooks/suspenseQuery/shop/recipe/useRecipeExposureGroup';

type GroupId =
    | 'recipe_group_1'
    | 'recipe_group_2'
    | 'recipe_group_3'
    | 'recipe_group_4'
    | 'recipe_group_5';

const RecipeGroupSectionContent = ({ groupId }: { groupId: GroupId }) => {
    const count = 2;

    const { data } = useRecipeExposureGroup({
        groupId,
        params: { exposureCount: count },
    });

    if (isEmpty(data?.groups)) {
        return null;
    }

    const groupNo = Number(groupId.split('_')?.[2]) || 0;

    return (
        <section className={styles.RecipeGroupSection}>
            {data.groups.slice(0, count).map((group) => (
                <RecipeSection
                    key={group.sno}
                    group={group}
                    groupNo={groupNo}
                />
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
