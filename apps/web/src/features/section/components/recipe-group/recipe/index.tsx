import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { RecipeCard } from '@/features/recipe/components/view';
import * as recipeSectionStyle from '@/features/section/components/recipe-group/recipe/index.css';
import { PATHS } from '@/const/paths';
import type { RecipeExposureGroupItem } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

interface RecipeSectionProps {
    group: RecipeExposureGroupItem;
    groupNo: number;
}

const RecipeSection = ({ group, groupNo }: RecipeSectionProps) => {
    return (
        <section className={recipeSectionStyle.container}>
            <div className={recipeSectionStyle.recipeSectionHeader}>
                <div className={recipeSectionStyle.recipeSectionTitleContainer}>
                    <h3 className={recipeSectionStyle.recipeSectionTitle}>
                        {group.groupName}
                    </h3>
                    <p className={recipeSectionStyle.recipeSectionSubTitle}>
                        {group.description}
                    </p>
                </div>

                <Link
                    href={`${PATHS.RECIPES.MAIN}/groups/${groupNo}/${group.sno}`}
                    className={recipeSectionStyle.detailLink}
                    prefetch={false}
                >
                    <span>전체보기</span>
                    <ChevronRight
                        color={vars.color.gray['60']}
                        width='16'
                        height='16'
                    />
                </Link>
            </div>

            <ul className={recipeSectionStyle.recipeList}>
                {group?.recipes?.map((recipe) => {
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

export default RecipeSection;
