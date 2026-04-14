import { ChevronRight } from 'lucide-react';

import Link from 'next/link';
import * as recipeSectionStyle from '@/components/section/recipe/index.css';
import { vars } from '@/styles/theme.css';
import { normalizeImageUrl } from '@/utils/shopby';
import { RecipeExposureGroupItem } from '@/models/shop/recipe';

import { TimerIcon, PeopleIcon } from '@/components/icons';

const toMinutes = (durationSeconds?: number | null) => {
    if (!durationSeconds || durationSeconds <= 0) {
        return 0;
    }

    return Math.ceil(durationSeconds / 60);
};

const RecipeSection = ({ group }: { group: RecipeExposureGroupItem }) => {
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

                <Link href='/recipe' className={recipeSectionStyle.DetailLink}>
                    자세히보기
                    <ChevronRight
                        color={vars.color.gray['60']}
                        width='16'
                        height='16'
                    />
                </Link>
            </div>

            <ul className={recipeSectionStyle.RecipeList}>
                {group?.recipes?.map((recipe) => {
                    return (
                        <li
                            key={recipe.sno}
                            className={recipeSectionStyle.RecipeListItem}
                        >
                            {normalizeImageUrl(recipe.thumbnailUrl ?? '') && (
                                <img
                                    className={recipeSectionStyle.RecipeImage}
                                    src={normalizeImageUrl(
                                        recipe.thumbnailUrl ?? '',
                                    )}
                                    alt={recipe.title}
                                />
                            )}
                            <div
                                className={
                                    recipeSectionStyle.RecipeContentsContainer
                                }
                            >
                                <div>
                                    <h4
                                        className={
                                            recipeSectionStyle.RecipeTitle
                                        }
                                    >
                                        {recipe.title}
                                    </h4>
                                    <p
                                        className={
                                            recipeSectionStyle.RecipeDescription
                                        }
                                    >
                                        {recipe.authorName}
                                    </p>
                                </div>

                                <ul
                                    className={
                                        recipeSectionStyle.RecipeMetaList
                                    }
                                >
                                    <li
                                        className={
                                            recipeSectionStyle.RecipeMetaItem
                                        }
                                    >
                                        <TimerIcon
                                            currentColor={vars.color.gray['80']}
                                        />
                                        <span
                                            className={
                                                recipeSectionStyle.RecipeMetaItemText
                                            }
                                            style={{
                                                color: vars.color.gray['80'],
                                            }}
                                        >
                                            {toMinutes(recipe.durationSeconds)}
                                            분
                                        </span>
                                    </li>
                                    <li
                                        className={
                                            recipeSectionStyle.RecipeMetaItem
                                        }
                                    >
                                        <PeopleIcon
                                            currentColor={vars.color.gray['60']}
                                        />
                                        <span
                                            className={
                                                recipeSectionStyle.RecipeMetaItemText
                                            }
                                            style={{
                                                color: vars.color.gray['60'],
                                            }}
                                        >
                                            {recipe.servings}인분
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default RecipeSection;
