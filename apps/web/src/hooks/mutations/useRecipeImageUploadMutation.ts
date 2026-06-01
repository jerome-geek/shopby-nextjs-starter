import { useMutation } from '@tanstack/react-query';

import common from '@/api/shop/common';
import recipe from '@/api/shop/recipe';
import useApiError from '@/hooks/useApiError';
import { useRecipeManualStore } from '@/features/recipe/store/useRecipeManualStore';

/**
 * blob URL(string)을 File 객체로 변환합니다.
 * 업로드 전 FormData에 첨부하기 위해 사용합니다.
 */
const blobUrlToFile = async (blobUrl: string, index: number): Promise<File> => {
    const res = await fetch(blobUrl);
    const blob = await res.blob();
    return new File(
        [blob],
        `recipe-image-${index}.${blob.type.split('/')[1] ?? 'jpg'}`,
        {
            type: blob.type,
        },
    );
};

const useRecipeImageUploadMutation = () => {
    const { setTempImages } = useRecipeManualStore();
    const { handleErrorToast } = useApiError();

    /**
     * 이미지 업로드 + 임시 이미지 등록을 한 번에 수행합니다.
     *
     * 1. blob URL 배열을 File 객체로 변환
     * 2. Promise.all로 병렬 업로드
     * 3. registerManualTempImages로 임시 이미지 등록
     * 4. 성공 시 Zustand store에 결과 저장
     */
    const uploadAndRegister = useMutation({
        mutationFn: async ({
            blobUrls,
            startOrder = 1,
        }: {
            blobUrls: string[];
            startOrder?: number;
        }) => {
            // Step 1: blob URL → File 변환 (병렬)
            const files = await Promise.all(
                blobUrls.map((url, i) => blobUrlToFile(url, i)),
            );

            // Step 2: 각 파일을 FormData에 담아 병렬 업로드
            const uploadResults = await Promise.all(
                files.map((file) => {
                    const formData = new FormData();
                    formData.append('file', file);
                    return common.upload(formData);
                }),
            );

            // Step 3: 업로드 결과를 sortOrder와 함께 정제
            const images = uploadResults.map((result, index) => ({
                filePath: result.data.filePath,
                originFileName: result.data.originFileName,
                size: result.data.size,
                contentType: result.data.contentType,
                sortOrder: startOrder + index,
            }));

            // Step 4: 임시 이미지 등록
            const registered = await recipe.registerManualTempImages({
                images,
            });

            return registered;
        },
        onSuccess: ({ data }) => {
            // 기존 이미지 목록 가져오기
            const currentImages = useRecipeManualStore.getState().tempImages;

            // 새 이미지 정렬 (sortOrder 기준)
            const newSortedImages = [...data.tempImages].sort(
                (a, b) => a.sortOrder - b.sortOrder,
            );

            // 기존 이미지 뒤에 추가
            setTempImages([...currentImages, ...newSortedImages]);
        },
        onError: (error) => {
            handleErrorToast(error);
        },
    });

    return { uploadAndRegister };
};

export default useRecipeImageUploadMutation;
