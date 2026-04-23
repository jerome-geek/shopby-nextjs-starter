import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CollectionFormSheet } from '@/components/bottom-sheet/collection-form';
import { RecipeCreateSelectionSheet } from '@/components/bottom-sheet/recipe-create-select';
import { RecipeImageUploadSheet } from '@/components/bottom-sheet/recipe-image-upload';
import { RecipeSaveSheet } from '@/components/bottom-sheet/recipe-save';
import { RecipeUrlInputSheet } from '@/components/bottom-sheet/recipe-url-input';
import { ImageDetailModal } from '@/components/modal';
import { CollectionFormModal } from '@/components/modal/collection-form';
import { RecipeCreateSelection } from '@/components/modal/recipe-create-select';
import { RecipeImageUploadModal } from '@/components/modal/recipe-image-upload';
import { RecipeSaveModal } from '@/components/modal/recipe-save';
import { RecipeUrlInput } from '@/components/modal/recipe-url-input';
import ConfirmDialog from '@/components/ui/dialog/confirm';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

export const useCustomDialog = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const isLogin = useAuth();

    const removeModalQuery = useCallback(
        (originalClose: () => void) => () => {
            if (router.query[MODAL_QUERY_KEY]) {
                const { [MODAL_QUERY_KEY]: _, ...restQuery } = router.query;
                router.replace({ query: restQuery }, undefined, {
                    shallow: true,
                });
            }
            originalClose();
        },
        [router],
    );

    const openAddCartDialog = useCallback(async <T = boolean,>() => {
        return await overlay.openAsync<T>((props) => {
            return (
                <ConfirmDialog
                    {...props}
                    type='confirm'
                    Title={
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px',
                                padding: '10px 0',
                            }}
                        >
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '20px',
                                    backgroundColor: vars.color.pink['20'],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: vars.color.pink['80'],
                                }}
                            >
                                <ShoppingCart size={32} strokeWidth={1.5} />
                            </div>
                            <p
                                style={{
                                    fontSize: '18px',
                                    fontWeight: vars.typography.fontWeight.bold,
                                    color: vars.color.gray['90'],
                                    lineHeight: '1.4',
                                    wordBreak: 'keep-all',
                                }}
                            >
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
        });
    }, [t, router]);

    const openLoginDialog = useCallback(
        (returnUrl?: string) => {
            overlay.open((props) => {
                return (
                    <ConfirmDialog
                        {...props}
                        type='confirm'
                        Title={
                            <div style={{ textAlign: 'center' }}>
                                <p
                                    style={{
                                        fontSize: '18px',
                                        fontWeight:
                                            vars.typography.fontWeight.bold,
                                        marginBottom: '8px',
                                    }}
                                >
                                    {t('로그인이 필요합니다')}
                                </p>
                                <p
                                    style={{
                                        fontSize: '14px',
                                        color: vars.color.gray['60'],
                                    }}
                                >
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
            });
        },
        [t, router],
    );

    /**
     * 인증이 필요한 액션을 위한 내부 게이트웨이
     */
    const withRequiredAuth = useCallback(
        (action: (...args: any[]) => void, modalType?: string) => {
            return (...args: any[]) => {
                if (isLogin) {
                    return action(...args);
                }

                // 첫 번째 인자가 이벤트 객체인지 확인
                const e =
                    args[0] instanceof Object && 'preventDefault' in args[0]
                        ? (args[0] as React.MouseEvent | React.FormEvent)
                        : undefined;

                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                const [basePath, existingSearch] = router.asPath.split('?');
                const searchParams = new URLSearchParams(existingSearch);

                if (modalType) {
                    searchParams.set(MODAL_QUERY_KEY, modalType);

                    // 특정 모달에 필요한 추가 파라미터 보존 (예: 레시피 저장 시 sno)
                    if (
                        modalType === MODAL_TYPE.RECIPE_SAVE &&
                        typeof args[0] === 'number'
                    ) {
                        searchParams.set('recipeSno', String(args[0]));
                    }
                }

                const returnUrl = searchParams.toString()
                    ? `${basePath}?${searchParams.toString()}`
                    : basePath;

                openLoginDialog(returnUrl);
            };
        },
        [isLogin, router, openLoginDialog],
    );

    const _openRecipeUrlInput = useCallback(() => {
        if (isMobile) {
            overlay.open((props) => (
                <RecipeUrlInputSheet
                    {...props}
                    close={removeModalQuery(props.close)}
                />
            ));
        } else {
            overlay.open((props) => (
                <RecipeUrlInput
                    {...props}
                    close={removeModalQuery(props.close)}
                />
            ));
        }
    }, [isMobile, removeModalQuery]);

    const openRecipeUrlInput = withRequiredAuth(
        _openRecipeUrlInput,
        MODAL_TYPE.RECIPE_URL_INPUT,
    );

    const _openRecipeImageUpload = useCallback(() => {
        if (isMobile) {
            overlay.open((props) => <RecipeImageUploadSheet {...props} />);
        } else {
            overlay.open((props) => <RecipeImageUploadModal {...props} />);
        }
    }, [isMobile]);

    const openRecipeImageUpload = withRequiredAuth(
        _openRecipeImageUpload,
        MODAL_TYPE.RECIPE_IMAGE_UPLOAD,
    );

    const openImageDetail = useCallback((src: string) => {
        overlay.open((props) => <ImageDetailModal {...props} src={src} />);
    }, []);

    const _openRecipeCreateSelection = useCallback(() => {
        if (isMobile) {
            overlay.open((props) => (
                <RecipeCreateSelectionSheet
                    {...props}
                    close={removeModalQuery(props.close)}
                />
            ));
        } else {
            overlay.open((props) => (
                <RecipeCreateSelection
                    {...props}
                    close={removeModalQuery(props.close)}
                />
            ));
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
                            shareCode={shareCode}
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
                            shareCode={shareCode}
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
        (recipeSno?: number) => {
            const sharedProps = {
                recipeSno,
                onAddCollection: openCollectionCreate,
            };

            if (isMobile) {
                overlay.open((props) => (
                    <RecipeSaveSheet
                        {...props}
                        {...sharedProps}
                        close={removeModalQuery(props.close)}
                    />
                ));
            } else {
                overlay.open((props) => (
                    <RecipeSaveModal
                        {...props}
                        {...sharedProps}
                        close={removeModalQuery(props.close)}
                    />
                ));
            }
        },
        [isMobile, removeModalQuery, openCollectionCreate],
    );

    const openRecipeSave = withRequiredAuth(
        _openRecipeSave,
        MODAL_TYPE.RECIPE_SAVE,
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
        withRequiredAuth,
    };
};
