import { ShoppingCart } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ConfirmDialog from '@/components/ui/dialog/confirm';
import { RecipeCreateSelection } from '@/components/modal/recipe-create-select';
import { RecipeImageUploadModal } from '@/components/modal/recipe-image-upload';
import { RecipeUrlInput } from '@/components/modal/recipe-url-input';
import { RecipeSaveModal } from '@/components/modal/recipe-save';
import { CollectionCreateModal } from '@/components/modal/collection-create';
import { PATHS } from '@/const/paths';
import { vars } from '@/styles/theme.css';

export const useCustomDialog = () => {
    const { t } = useTranslation();
    const router = useRouter();

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
        overlay.open((props) => <RecipeUrlInput {...props} />);
    }, []);

    const openRecipeImageUpload = useCallback(() => {
        overlay.open((props) => <RecipeImageUploadModal {...props} />);
    }, []);

    const openRecipeCreateSelection = useCallback(() => {
        overlay.open((props) => <RecipeCreateSelection {...props} />);
    }, []);

    const openCollectionCreate = useCallback(() => {
        overlay.open((props) => <CollectionCreateModal {...props} />);
    }, []);

    const openRecipeSave = useCallback((recipeSno?: number) => {
        overlay.open((props) => (
            <RecipeSaveModal
                {...props}
                recipeSno={recipeSno}
                onAddCollection={() => {
                    openCollectionCreate();
                }}
            />
        ));
    }, [openCollectionCreate]);

    return {
        openAddCartDialog,
        openLoginDialog,
        openRecipeCreateSelection,
        openRecipeUrlInput,
        openRecipeImageUpload,
        openRecipeSave,
        openCollectionCreate,
    };
};
