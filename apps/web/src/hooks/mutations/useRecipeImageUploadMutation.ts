import { useMutation } from '@tanstack/react-query';

import recipe from '@/api/shop/recipe';
import { useRecipeManualStore } from '@/store/useRecipeManualStore';
import common from '@/api/shop/common';

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

    /**
     * 이미지 업로드 + 임시 이미지 등록을 한 번에 수행합니다.
     *
     * 1. blob URL 배열을 File 객체로 변환
     * 2. Promise.all로 병렬 업로드
     * 3. registerManualTempImages로 임시 이미지 등록
     * 4. 성공 시 Zustand store에 결과 저장
     */
    const uploadAndRegister = useMutation({
        mutationFn: async (blobUrls: string[]) => {
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
                sortOrder: index + 1,
            }));

            // Step 4: 임시 이미지 등록
            const registered = await recipe.registerManualTempImages({
                images,
            });

            return registered;
        },
        onSuccess: ({ data }) => {
            // Zustand store에 저장 (sortOrder 기준으로 정렬 보장)
            const sorted = [...data.tempImages].sort(
                (a, b) => a.sortOrder - b.sortOrder,
            );
            setTempImages(sorted);
        },
    });

    return { uploadAndRegister };
};

export default useRecipeImageUploadMutation;
