import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CollectionFormSheet } from '@/components/bottom-sheet/collection-form';
import { RecipeCreateSelectionSheet } from '@/components/bottom-sheet/recipe-create-select';
import { RecipeSaveSheet } from '@/components/bottom-sheet/recipe-save';
import { RecipeUrlInputSheet } from '@/components/bottom-sheet/recipe-url-input';
import { ImageDetailModal } from '@/components/modal';
import { CollectionFormModal } from '@/components/modal/collection-form';
import { RecipeCreateSelection } from '@/components/modal/recipe-create-select';
import { RecipeImageUploadModal } from '@/components/modal/recipe-image-upload';
import { RecipeSaveModal } from '@/components/modal/recipe-save';
import { RecipeUrlInput } from '@/components/modal/recipe-url-input';
import ConfirmDialog from '@/components/ui/dialog/confirm';
import { MODAL_QUERY_KEY } from '@/const/modal';
import { OVERLAY_ID } from '@/const/overlay';
import { PATHS } from '@/const/paths';
import { useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

export const useCustomDialog = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();

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

    const openRecipeUrlInput = useCallback(() => {
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

    const openRecipeImageUpload = useCallback(() => {
        overlay.open((props) => <RecipeImageUploadModal {...props} />);
    }, []);

    const openImageDetail = useCallback((src: string) => {
        overlay.open((props) => <ImageDetailModal {...props} src={src} />);
    }, []);

    const openRecipeCreateSelection = useCallback(() => {
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

    const openCollectionForm = useCallback(
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

    const openCollectionCreate = useCallback(() => {
        openCollectionForm();
    }, [openCollectionForm]);

    const openRecipeSave = useCallback(
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
    };
};
