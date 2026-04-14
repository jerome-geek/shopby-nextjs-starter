import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import * as recipeSectionStyle from '@/components/section/recipe-group/recipe/index.css';
import { PATHS } from '@/const/paths';
import { RecipeExposureGroupItem } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

import { RecipeCard } from '@/components/recipe';

const RecipeSection = ({
    group,
    groupNo,
}: {
    group: RecipeExposureGroupItem;
    groupNo: number;
}) => {
    return (
        <section className={recipeSectionStyle.Container}>
            <div className={recipeSectionStyle.RecipeSectionHeader}>
                <div className={recipeSectionStyle.RecipeSectionTitleContainer}>
                    <h3 className={recipeSectionStyle.RecipeSectionTitle}>
                        {group.groupName}
                    </h3>
                    <p className={recipeSectionStyle.RecipeSectionSubTitle}>
                        {group.description}
                    </p>
                </div>

                <Link
                    href={`${PATHS.RECIPES.MAIN}/groups/${groupNo}/${group.sno}`}
                    className={recipeSectionStyle.DetailLink}
                >
                    전체보기
                    <ChevronRight
                        color={vars.color.gray['60']}
                        width='16'
                        height='16'
                    />
                </Link>
            </div>

            <ul className={recipeSectionStyle.RecipeList}>
                {group?.recipes?.map((recipe) => {
                    return <RecipeCard key={recipe.sno} recipe={recipe} />;
                })}
            </ul>
        </section>
    );
};

export default RecipeSection;
