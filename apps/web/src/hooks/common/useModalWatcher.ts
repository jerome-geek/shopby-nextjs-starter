import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { useCustomDialog } from '@/hooks/ui';

export const useModalWatcher = () => {
    const { query } = useRouter();
    const {
        openRecipeCreateSelection,
        openRecipeImageUpload,
        openRecipeUrlInput,
        openRecipeSave,
    } = useCustomDialog();

    const openedModalTypeRef = useRef<string | null>(null);
    const handlersRef = useRef({
        openRecipeCreateSelection,
        openRecipeImageUpload,
        openRecipeUrlInput,
        openRecipeSave,
    });

    useEffect(() => {
        handlersRef.current = {
            openRecipeCreateSelection,
            openRecipeImageUpload,
            openRecipeUrlInput,
            openRecipeSave,
        };
    });

    // TODO: 쿼리스트링이 있는 경우에만 replace가 아니라 push
    useEffect(() => {
        const modalType = query[MODAL_QUERY_KEY] as string | undefined;

        // 1. 이미 같은 모달이 열려 있다면 아무것도 하지 않습니다. (중복 방지)
        if (modalType === openedModalTypeRef.current) {
            return;
        }

        // 2. 레시피 생성 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_CREATE) {
            openedModalTypeRef.current = modalType;
            handlersRef.current.openRecipeCreateSelection();
            return;
        }

        // 3. 레시피 이미지 업로드 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_IMAGE_UPLOAD) {
            openedModalTypeRef.current = modalType;
            handlersRef.current.openRecipeImageUpload();
            return;
        }

        // 4. 레시피 URL 입력 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_URL_INPUT) {
            openedModalTypeRef.current = modalType;
            handlersRef.current.openRecipeUrlInput();
            return;
        }

        // 5. 레시피 저장 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_SAVE) {
            openedModalTypeRef.current = modalType;
            handlersRef.current.openRecipeSave();
            return;
        }

        // 6. 쿼리가 사라졌다면 Ref 초기화 (닫힘 감지)
        if (!modalType) {
            openedModalTypeRef.current = null;
        }
    }, [query]);
};
