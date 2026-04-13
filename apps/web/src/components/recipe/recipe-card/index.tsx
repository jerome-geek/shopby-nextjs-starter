import { useQueryClient } from '@tanstack/react-query';
import { Bookmark, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { overlay } from 'overlay-kit';

import { RecipeCollectionCreateModal } from '@/components/modal';
import { RecipeSaveModal } from '@/components/modal/recipe-save';
import * as styles from '@/components/recipe/recipe-card/index.css';
import { Column, Row } from '@/components/ui/layout/flex';
import { PATHS } from '@/const/paths';
import { useRecipeMutation } from '@/hooks/mutations';
import { recipeKeys } from '@/hooks/queryKeys';
import { useCustomDialog } from '@/hooks/ui/useCustomDialog';
import { useToast } from '@/hooks/ui/useToast';
import { useAuth } from '@/hooks/useAuth';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';

const formatRecipeDurationSeconds = (durationSeconds: number): string => {
    const s = Math.max(0, Math.floor(durationSeconds));

    if (s < 60) {
        return `${s}초`;
    }
    if (s < 3600) {
        return `${Math.floor(s / 60)}분`;
    }

    return `${Math.floor(s / 3600)}시간`;
};

export interface RecipeCardProps {
    recipe: GetRecipeDetailResponse;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const detailHref = PATHS.RECIPES.DETAIL.replace(
        '[recipeNo]',
        String(recipe.sno),
    );

    const isLogin = useAuth();

    const { addToast } = useToast();

    const { openLoginDialog } = useCustomDialog();

    const queryClient = useQueryClient();

    const { unBookmarkRecipe } = useRecipeMutation();

    const openRecipeCollectionCreateModal = () => {
        overlay.open((props) => <RecipeCollectionCreateModal {...props} />);
    };

    const openRecipeSaveModal = (recipe: GetRecipeDetailResponse) => {
        overlay.open((props) => (
            <RecipeSaveModal
                {...props}
                recipeSno={recipe.sno}
                onAddCollection={() => {
                    openRecipeCollectionCreateModal();
                }}
            />
        ));
    };

    const onBookmarkToggle = (recipe: GetRecipeDetailResponse) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        if (recipe.bookmarked) {
            unBookmarkRecipe.mutate(
                { sno: recipe.sno },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: recipeKeys.publicSearches(),
                        });
                        addToast({
                            message: '북마크를 취소했습니다.',
                            variant: 'success',
                        });
                    },
                },
            );
        } else {
            openRecipeSaveModal(recipe);
        }
    };

    return (
        <Link href={detailHref} className={styles.cardLink}>
            <div className={styles.recipeImageContainer}>
                <img
                    src={recipe.thumbnailUrl ?? ''}
                    alt={recipe.title}
                    className={styles.recipeImage}
                />
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onBookmarkToggle(recipe);
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '9px',
                    }}
                >
                    <Bookmark
                        size={20}
                        fill={recipe.bookmarked ? 'white' : 'none'}
                        color='white'
                        style={{ filter: 'drop-shadow(0px 2px 3px #00000099)' }}
                    />
                </button>
            </div>
            <Column gap='8px'>
                <Column style={{ gap: '1px' }}>
                    <h3 className={styles.title}>{recipe.title}</h3>
                    <p className={styles.authorName}>{recipe.authorName}</p>
                </Column>
                <Row gap='10px' align='center'>
                    <span className={styles.timeText}>
                        <Clock size={16} color={vars.color.gray['80']} />{' '}
                        {formatRecipeDurationSeconds(
                            recipe.durationSeconds ?? 0,
                        )}
                    </span>
                    <span className={styles.amountText}>
                        <Users size={16} color={vars.color.gray['60']} />{' '}
                        {recipe.servings ?? 0}인분
                    </span>
                </Row>
            </Column>
        </Link>
    );
};
