import { ChevronRight, TimerIcon } from 'lucide-react';

import Link from 'next/link';
import * as recipeSectionStyle from '@/components/section/recipe/index.css';
import { vars } from '@/styles/theme.css';
import { normalizeImageUrl } from '@/utils/shopby';

const RecipeSection = () => {
    const recipeList = [
        {
            imageUrl:
                'https://shopby-images.cdn-nhncommerce.com/20260313/114038.355629141/5566baedc87bdd230dbce022c681d39e855f2876.jpg',
            name: '간장 계란밥',
            description: '요리왕김치',
            time: '10분',
            people: '2인분',
        },
        {
            imageUrl:
                'https://shopby-images.cdn-nhncommerce.com/20260313/114038.355629141/5566baedc87bdd230dbce022c681d39e855f2876.jpg',
            name: '김치볶음',
            description: '집밥요정',
            time: '10분',
            people: '3인분',
        },
    ];

    return (
        <section className={recipeSectionStyle.Container}>
            <div className={recipeSectionStyle.RecipeSectionHeader}>
                <div className={recipeSectionStyle.RecipeSectionTitleContainer}>
                    <h3 className={recipeSectionStyle.RecipeSectionTitle}>
                        반찬 따라 만들기
                    </h3>
                    <p className={recipeSectionStyle.RecipeSectionSubTitle}>
                        매일 먹어도 질리지 않는 반찬
                    </p>
                </div>

                <Link href="/recipe" className={recipeSectionStyle.DetailLink}>
                    자세히보기
                    <ChevronRight
                        color={vars.color.gray['60']}
                        width="16"
                        height="16"
                    />
                </Link>
            </div>

            <ul className={recipeSectionStyle.RecipeList}>
                {recipeList.map((recipe) => {
                    return (
                        <li
                            key={recipe.name}
                            className={recipeSectionStyle.RecipeListItem}
                        >
                            {normalizeImageUrl(recipe.imageUrl) && (
                                <img
                                    src={normalizeImageUrl(recipe.imageUrl)}
                                    alt={recipe.name}
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
                                        {recipe.name}
                                    </h4>
                                    <p
                                        className={
                                            recipeSectionStyle.RecipeDescription
                                        }
                                    >
                                        {recipe.description}
                                    </p>
                                </div>

                                <ul
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                    }}
                                >
                                    <li
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}
                                    >
                                        <TimerIcon />
                                        <span>{recipe.time}</span>
                                    </li>
                                    <li
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                        }}
                                    >
                                        <TimerIcon />
                                        <span>{recipe.people}</span>
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
