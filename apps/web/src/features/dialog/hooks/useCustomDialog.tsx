import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';
import { parseAsString, useQueryStates } from 'nuqs';
import { overlay } from 'overlay-kit';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import { CollectionFormSheet } from '@/features/recipe/overlay/collection-form/bottom-sheet';
import { PhotoReviewListBottomSheet } from '@/features/product/overlay/photo-review-list/bottom-sheet';
import { ProductCouponBottomSheet } from '@/features/product/overlay/product-coupon/bottom-sheet';
import { RecipeCreateSelectionSheet } from '@/features/recipe/overlay/recipe-create-select/bottom-sheet';
import { RecipeImageUploadSheet } from '@/features/recipe/overlay/recipe-image-upload/bottom-sheet';
import { RecipeRecommendationBottomSheet } from '@/features/recipe/overlay/recipe-recommendation/bottom-sheet';
import { RecipeSaveSheet } from '@/features/recipe/overlay/recipe-save/bottom-sheet';
import { RecipeUrlInputSheet } from '@/features/recipe/overlay/recipe-url-input/bottom-sheet';
import ShareBottomSheet from '@/features/share/overlay/share/bottom-sheet';
import { ShippingAddressChangeBottomSheet } from '@/features/order/overlay/shipping-address-change/bottom-sheet';
import { ImageDetailModal } from '@/shared/overlay/image-detail/modal';
import { CollectionFormModal } from '@/features/recipe/overlay/collection-form/modal';
import { PhotoReviewListModal } from '@/features/product/overlay/photo-review-list/modal';
import { ProductCouponModal } from '@/features/product/overlay/product-coupon/modal';
import { RecipeCreateSelection } from '@/features/recipe/overlay/recipe-create-select/modal';
import { RecipeImageUploadModal } from '@/features/recipe/overlay/recipe-image-upload/modal';
import { RecipeRecommendationModal } from '@/features/recipe/overlay/recipe-recommendation/modal';
import { RecipeSaveModal } from '@/features/recipe/overlay/recipe-save/modal';
import { RecipeUrlInput } from '@/features/recipe/overlay/recipe-url-input/modal';
import ShareModal from '@/features/share/overlay/share/modal';
import type { KakaoShareContent } from '@/features/share';
import { ShippingAddressChangeModal } from '@/features/order/overlay/shipping-address-change/modal';
import ConfirmDialog from '@/shared/ui/dialog/confirm';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import * as styles from '@/features/dialog/hooks/useCustomDialog.css';
import { useRequiredAuth } from '@/features/dialog/hooks/useRequiredAuth';
import { useMyApp } from '@/hooks/myapp';
import { useDialog, useResponsive } from '@/hooks/utils';

export const useCustomDialog = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();

    const { openAsyncDialog } = useDialog();
    const { isMyApp, handleSendLoginView } = useMyApp();

    const [, setModalQuery] = useQueryStates(
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

                                const nextPath = returnUrl ?? router.asPath;

                                if (isMyApp) {
                                    handleSendLoginView({
                                        option: {
                                            returnUrl: nextPath,
                                        },
                                    });
                                    return;
                                }

                                router.push({
                                    pathname: PATHS.AUTH.LOGIN,
                                    query: {
                                        returnUrl: nextPath,
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
        [t, router, isMyApp, handleSendLoginView],
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

    const openPhotoReviewList = useCallback(
        ({ productNo, reviewNo }: { productNo: number; reviewNo: number }) => {
            overlay.open((props) =>
                isMobile ? (
                    <PhotoReviewListBottomSheet
                        productNo={productNo}
                        reviewNo={reviewNo}
                        {...props}
                    />
                ) : (
                    <PhotoReviewListModal
                        productNo={productNo}
                        reviewNo={reviewNo}
                        {...props}
                    />
                ),
            );
        },
        [isMobile],
    );

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

                        const { data } =
                            await recipe.getRecipeDetail(recipeSno);

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
            overlay.open((props) => (
                <RecipeRecommendationBottomSheet {...props} />
            ));
        } else {
            overlay.open((props) => <RecipeRecommendationModal {...props} />);
        }
    }, [isMobile]);

    const openShippingAddressChangeDialog = useCallback(
        ({ orderNo, memberNo }: { orderNo: string; memberNo: number }) => {
            if (isMobile) {
                overlay.open(
                    (props) => (
                        <ShippingAddressChangeBottomSheet
                            {...props}
                            orderNo={orderNo}
                            memberNo={memberNo}
                        />
                    ),
                    { overlayId: OVERLAY_ID.SHIPPING_ADDRESS_CHANGE },
                );
            } else {
                overlay.open(
                    (props) => (
                        <ShippingAddressChangeModal
                            {...props}
                            orderNo={orderNo}
                            memberNo={memberNo}
                        />
                    ),
                    { overlayId: OVERLAY_ID.SHIPPING_ADDRESS_CHANGE },
                );
            }
        },
        [isMobile],
    );

    const openShareDialog = useCallback(
        (kakao?: KakaoShareContent) => {
            overlay.open((props) => {
                return isMobile ? (
                    <ShareBottomSheet {...props} kakao={kakao} />
                ) : (
                    <ShareModal {...props} kakao={kakao} />
                );
            });
        },
        [isMobile],
    );

    const openCouponDownloadDialog = useCallback(
        (productNo: number) => {
            overlay.open((props) => {
                return isMobile ? (
                    <ProductCouponBottomSheet
                        productNo={productNo}
                        {...props}
                    />
                ) : (
                    <ProductCouponModal productNo={productNo} {...props} />
                );
            });
        },
        [isMobile],
    );

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
        openPhotoReviewList,
        openRecipeRecommendation,
        openShippingAddressChangeDialog,
        openShareDialog,
        openCouponDownloadDialog,
        withRequiredAuth,
    };
};
