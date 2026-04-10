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

    // 🎯 현재 열려 있는 모달의 타입을 기억하여 중복 오픈을 방지합니다.
    const openedModalTypeRef = useRef<string | null>(null);

    useEffect(() => {
        const modalType = query[MODAL_QUERY_KEY] as string | undefined;

        // 1. 이미 같은 모달이 열려 있다면 아무것도 하지 않습니다. (중복 방지)
        if (modalType === openedModalTypeRef.current) {
            return;
        }

        // 2. 레시피 생성 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_CREATE) {
            openedModalTypeRef.current = modalType;
            openRecipeCreateSelection();
            return;
        }

        // 3. 레시피 이미지 업로드 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_IMAGE_UPLOAD) {
            openedModalTypeRef.current = modalType;
            openRecipeImageUpload();
            return;
        }

        // 4. 레시피 URL 입력 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_URL_INPUT) {
            openedModalTypeRef.current = modalType;
            openRecipeUrlInput();
            return;
        }

        // 5. 레시피 저장 모달 처리
        if (modalType === MODAL_TYPE.RECIPE_SAVE) {
            openedModalTypeRef.current = modalType;
            openRecipeSave();
            return;
        }

        // 5. 쿼리가 사라졌다면 Ref 초기화 (닫힘 감지)
        if (!modalType) {
            openedModalTypeRef.current = null;
        }
    }, [
        query,
        openRecipeCreateSelection,
        openRecipeImageUpload,
        openRecipeUrlInput,
        openRecipeSave,
    ]);
};
