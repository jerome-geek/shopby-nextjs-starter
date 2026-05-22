/**
 * @file heic.ts
 * @description HEIC/HEIF 이미지를 브라우저 호환 포맷(JPEG)으로 변환하는 유틸리티
 *
 * iOS 디바이스에서 촬영한 HEIC/HEIF 이미지는 대부분의 브라우저에서
 * 미리보기가 불가능하므로, 업로드 전에 JPEG로 변환합니다.
 */

const HEIC_TYPES = ['image/heic', 'image/heif'];

/**
 * 파일이 HEIC/HEIF 포맷인지 판별합니다.
 * MIME type 또는 확장자 기반으로 확인합니다.
 */
export const isHeicFile = (file: File | Blob): boolean => {
    if ('type' in file && HEIC_TYPES.includes(file.type)) {
        return true;
    }

    if ('name' in file) {
        const name = (file as File).name?.toLowerCase() ?? '';
        return name.endsWith('.heic') || name.endsWith('.heif');
    }

    return false;
};

/**
 * HEIC/HEIF 파일을 JPEG Blob으로 변환합니다.
 * 변환된 Blob에 원본 파일명(.jpeg 확장자)을 부여합니다.
 */
export const convertHeicToJpeg = async (file: File): Promise<File> => {
    const { heicTo } = await import('heic-to');

    const arrayBuffer = await file.arrayBuffer();

    const jpegBlob = await heicTo({
        blob: new Blob([arrayBuffer]),
        type: 'image/jpeg',
        quality: 0.85,
    });

    const newName = file.name.replace(/\.(heic|heif)$/i, '.jpeg');

    return new File([jpegBlob], newName, {
        type: 'image/jpeg',
        lastModified: file.lastModified,
    });
};

/**
 * 파일 목록에서 HEIC/HEIF 파일을 JPEG로 변환합니다.
 * HEIC/HEIF가 아닌 파일은 그대로 통과시킵니다.
 */
export const convertHeicFiles = async (files: File[]): Promise<File[]> => {
    return Promise.all(
        files.map(async (file) => {
            if (isHeicFile(file)) {
                return convertHeicToJpeg(file);
            }
            return file;
        }),
    );
};
