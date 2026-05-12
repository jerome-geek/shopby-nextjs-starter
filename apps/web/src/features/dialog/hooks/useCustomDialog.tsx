import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';
import { parseAsString, useQueryStates } from 'nuqs';
import { overlay } from 'overlay-kit';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import { CollectionFormSheet } from '@/components/bottom-sheet/collection-form';
import { RecipeCreateSelectionSheet } from '@/components/bottom-sheet/recipe-create-select';
import { RecipeImageUploadSheet } from '@/components/bottom-sheet/recipe-image-upload';
import { RecipeRecommendationBottomSheet } from '@/components/bottom-sheet/recipe-recommendation';
import { RecipeSaveSheet } from '@/components/bottom-sheet/recipe-save';
import { RecipeUrlInputSheet } from '@/components/bottom-sheet/recipe-url-input';
import { ImageDetailModal } from '@/components/modal';
import { CollectionFormModal } from '@/components/modal/collection-form';
import { RecipeCreateSelection } from '@/components/modal/recipe-create-select';
import { RecipeImageUploadModal } from '@/components/modal/recipe-image-upload';
import { RecipeRecommendationModal } from '@/components/modal/recipe-recommendation';
import { RecipeSaveModal } from '@/components/modal/recipe-save';
import { RecipeUrlInput } from '@/components/modal/recipe-url-input';
import ConfirmDialog from '@/components/ui/dialog/confirm';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import * as styles from '@/features/dialog/hooks/useCustomDialog.css';
import { useRequiredAuth } from '@/features/dialog/hooks/useRequiredAuth';
import { useDialog, useResponsive } from '@/hooks/utils';

export const useCustomDialog = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();

    const { openAsyncDialog } = useDialog();

    const [_, setModalQuery] = useQueryStates(
        {
            [MODAL_QUERY_KEY]: parseAsString,
            recipeSno: parseAsString,
        },
        { history: 'replace', shallow: true },
    );

    const removeModalQuery = useCallback(
        (originalClose: () => void) => () => {
            const modalValue = router.query[MODAL_QUERY_KEY];

            if (modalValue) {
                setModalQuery({
                    [MODAL_QUERY_KEY]: null,
                    recipeSno: null,
                });
            }
            originalClose();
        },
        [router, setModalQuery],
    );

    const openAddCartDialog = useCallback(async <T = boolean,>() => {
        return await overlay.openAsync<T>(
            (props) => {
                return (
                    <ConfirmDialog
                        {...props}
                        type='confirm'
                        Title={
                            <div className={styles.addCartTitle}>
                                <div className={styles.cartIconBox}>
                                    <ShoppingCart size={32} strokeWidth={1.5} />
                                </div>
                                <p className={styles.addCartMessage}>
                                    {t('장바구니에 상품을 담았습니다.')}
                                </p>
                            </div>
                        }
                        confirm={() => router.push(PATHS.CART)}
                        close={() => props.close(false as T)}
                        confirmText={t('장바구니 이동')}
                        cancelText={t('쇼핑 계속하기')}
                    />
                );
            },
            { overlayId: OVERLAY_ID.ADD_TO_CART },
        );
    }, [t, router]);

    const openLoginDialog = useCallback(
        (returnUrl?: string) => {
            overlay.open(
                (props) => {
                    return (
                        <ConfirmDialog
                            {...props}
                            type='confirm'
                            Title={
                                <div className={styles.loginTitle}>
                                    <p className={styles.loginTitleText}>
                                        {t('로그인이 필요합니다')}
                                    </p>
                                    <p className={styles.loginDescription}>
                                        {t('로그인 페이지로 이동하시겠습니까?')}
                                    </p>
                                </div>
                            }
                            confirm={() => {
                                overlay.closeAll();
                                router.push({
                                    pathname: PATHS.AUTH.LOGIN,
                                    query: {
                                        returnUrl: returnUrl ?? router.asPath,
                                    },
                                });
                            }}
                            confirmText={t('로그인하기')}
                            cancelText={t('닫기')}
                        />
                    );
                },
                { overlayId: OVERLAY_ID.LOGIN_DIALOG },
            );
        },
        [t, router],
    );

    const withRequiredAuth = useRequiredAuth(openLoginDialog);

    const _openRecipeUrlInput = useCallback(() => {
        if (isMobile) {
            overlay.open(
                (props) => (
                    <RecipeUrlInputSheet
                        {...props}
                        close={removeModalQuery(props.close)}
                    />
                ),
                { overlayId: OVERLAY_ID.RECIPE_URL_INPUT },
            );
        } else {
            overlay.open(
                (props) => (
                    <RecipeUrlInput
                        {...props}
                        close={removeModalQuery(props.close)}
                    />
                ),
                { overlayId: OVERLAY_ID.RECIPE_URL_INPUT },
            );
        }
    }, [isMobile, removeModalQuery]);

    const openRecipeUrlInput = withRequiredAuth(
        _openRecipeUrlInput,
        MODAL_TYPE.RECIPE_URL_INPUT,
    );

    const _openRecipeImageUpload = useCallback(() => {
        if (isMobile) {
            overlay.open((props) => <RecipeImageUploadSheet {...props} />, {
                overlayId: OVERLAY_ID.RECIPE_IMAGE_UPLOAD,
            });
        } else {
            overlay.open((props) => <RecipeImageUploadModal {...props} />, {
                overlayId: OVERLAY_ID.RECIPE_IMAGE_UPLOAD,
            });
        }
    }, [isMobile]);

    const openRecipeImageUpload = withRequiredAuth(
        _openRecipeImageUpload,
        MODAL_TYPE.RECIPE_IMAGE_UPLOAD,
    );

    const openImageDetail = useCallback((src: string) => {
        overlay.open((props) => <ImageDetailModal {...props} src={src} />, {
            overlayId: OVERLAY_ID.IMAGE_DETAIL,
        });
    }, []);

    const _openRecipeCreateSelection = useCallback(() => {
        if (isMobile) {
            overlay.open(
                (props) => (
                    <RecipeCreateSelectionSheet
                        {...props}
                        close={removeModalQuery(props.close)}
                    />
                ),
                { overlayId: OVERLAY_ID.RECIPE_CREATE_SELECTION },
            );
        } else {
            overlay.open(
                (props) => (
                    <RecipeCreateSelection
                        {...props}
                        close={removeModalQuery(props.close)}
                    />
                ),
                { overlayId: OVERLAY_ID.RECIPE_CREATE_SELECTION },
            );
        }
    }, [isMobile, removeModalQuery]);

    const openRecipeCreateSelection = withRequiredAuth(
        _openRecipeCreateSelection,
        MODAL_TYPE.RECIPE_CREATE,
    );

    const _openCollectionForm = useCallback(
        ({ shareCode }: { shareCode?: string } = {}) => {
            if (isMobile) {
                overlay.open(
                    (props) => (
                        <CollectionFormSheet
                            {...props}
                            shareCode={shareCode ?? ''}
                            close={removeModalQuery(props.close)}
                        />
                    ),
                    {
                        overlayId: OVERLAY_ID.COLLECTION_FORM,
                    },
                );
            } else {
                overlay.open(
                    (props) => (
                        <CollectionFormModal
                            {...props}
                            shareCode={shareCode ?? ''}
                            close={removeModalQuery(props.close)}
                        />
                    ),
                    {
                        overlayId: OVERLAY_ID.COLLECTION_FORM,
                    },
                );
            }
        },
        [isMobile, removeModalQuery],
    );

    const openCollectionForm = withRequiredAuth(
        _openCollectionForm,
        MODAL_TYPE.COLLECTION_FORM,
    );

    const openCollectionCreate = useCallback(() => {
        openCollectionForm();
    }, [openCollectionForm]);

    const _openRecipeSave = useCallback(
        (recipeSno?: number, isClosePopup?: boolean) => {
            const sharedProps = {
                recipeSno,
                onAddCollection: openCollectionCreate,
            };

            const closeAfterEvent = async (isSaved: boolean) => {
                if (!isSaved && isClosePopup && recipeSno) {
                    try {
                        const isScrapPage =
                            router.pathname === PATHS.RECIPES.SCRAP;

                        if (isScrapPage) {
                            return;
                        }

                        const { data } = await recipe.getRecipeDetail(
                            recipeSno,
                        );

                        if (
                            data.recipeStatus === 'COMPLETED' ||
                            data.recipeStatus === 'PROCESSING'
                        ) {
                            const result = await openAsyncDialog({
                                type: 'modal',
                                message: t(
                                    data.recipeStatus === 'COMPLETED'
                                        ? '레시피가 만들어졌어요. 스크랩북 페이지로 이동할까요? ✨'
                                        : '레시피를 만들고 있어요. 곧 스크랩북에 도착해요 ✨',
                                ),
                                confirmText: t('스크랩북 보기'),
                                onConfirmReturnValue: true,
                                onCloseReturnValue: false,
                            });

                            if (!result) {
                                return;
                            }

                            router.push(PATHS.RECIPES.SCRAP);
                            return;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            };

            if (isMobile) {
                overlay.open(
                    (props) => (
                        <RecipeSaveSheet
                            {...props}
                            {...sharedProps}
                            close={async (isSaved) => {
                                await closeAfterEvent(!!isSaved);
                                removeModalQuery(props.close)();
                            }}
                        />
                    ),
                    { overlayId: OVERLAY_ID.RECIPE_SAVE },
                );
            } else {
                overlay.open(
                    (props) => (
                        <RecipeSaveModal
                            {...props}
                            {...sharedProps}
                            close={async (isSaved) => {
                                await closeAfterEvent(!!isSaved);
                                removeModalQuery(props.close)();
                            }}
                        />
                    ),
                    { overlayId: OVERLAY_ID.RECIPE_SAVE },
                );
            }
        },
        [
            isMobile,
            removeModalQuery,
            openCollectionCreate,
            openAsyncDialog,
            t,
            router,
        ],
    );

    const openRecipeSave = withRequiredAuth(
        _openRecipeSave,
        MODAL_TYPE.RECIPE_SAVE,
    );

    const openRecipeRecommendation = useCallback(() => {
        if (isMobile) {
            overlay.open(
                (props) => <RecipeRecommendationBottomSheet {...props} />,
                {
                    overlayId: OVERLAY_ID.ORDER_COMPLETE_RECIPE_RECOMMENDATION,
                },
            );
        } else {
            overlay.open((props) => <RecipeRecommendationModal {...props} />, {
                overlayId: OVERLAY_ID.ORDER_COMPLETE_RECIPE_RECOMMENDATION,
            });
        }
    }, [isMobile]);

    return {
        openAddCartDialog,
        openLoginDialog,
        openRecipeCreateSelection,
        openRecipeUrlInput,
        openRecipeImageUpload,
        openRecipeSave,
        openCollectionCreate,
        openCollectionForm,
        openImageDetail,
        openRecipeRecommendation,
        withRequiredAuth,
    };
};
