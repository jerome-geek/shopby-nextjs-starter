import {
    concat,
    every,
    filter,
    includes,
    pipe,
    size,
    some,
    toArray,
    uniqBy,
} from '@fxts/core';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDialog } from '@/hooks/utils';
import { convertHeicFiles, isHeicFile } from '@/utils/heic';

export interface UploadFileBlob extends Blob {
    name?: string;
    lastModified?: number;
    lastModifiedDate?: string;
}

interface useFileUploadProps {
    maxSize: number;
    maxLength: number;
}

/** 샵바이 기본 파일 업로드 제한이 12MB */
export const DEFAULT_FILE_UPLOAD_MAX_SIZE = 12 * 1024 * 1024;
export const DEFAULT_FILE_UPLOAD_MAX_LENGTH = 6;

/** `availableExtensions` MIME 타입 기준 사용자 안내용 확장자 목록 */
export const FILE_UPLOAD_ALLOWED_EXTENSION_LABELS = [
    'BMP',
    'TIF',
    'TIFF',
    'MIFF',
    'GIF',
    'JPG',
    'JPEG',
    'PNG',
    'HEIC',
    'HEIF',
] as const;

interface GetFileUploadGuideMessageParams {
    maxSize?: number;
    maxLength?: number;
    extensionLabels?: readonly string[];
}

export const getFileUploadGuideMessage = ({
    maxSize = DEFAULT_FILE_UPLOAD_MAX_SIZE,
    maxLength = DEFAULT_FILE_UPLOAD_MAX_LENGTH,
    extensionLabels = FILE_UPLOAD_ALLOWED_EXTENSION_LABELS,
}: GetFileUploadGuideMessageParams = {}) => {
    const maxSizeMb = maxSize / 1024 / 1024;
    const extensions = extensionLabels.join(', ');

    return `첨부 가능 확장자: ${extensions}<br/>파일당 최대 ${maxSizeMb}MB, 최대 ${maxLength}장까지 등록 가능합니다.`;
};

const useFileUpload = (
    { maxSize, maxLength }: useFileUploadProps = {
        maxSize: DEFAULT_FILE_UPLOAD_MAX_SIZE,
        maxLength: DEFAULT_FILE_UPLOAD_MAX_LENGTH,
    },
) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const [uploadFile, setUploadFile] = useState<UploadFileBlob[]>([]);
    const [convertingCount, setConvertingCount] = useState(0);
    const availableExtensions = useMemo(
        () => [
            'image/bmp',
            'image/tif',
            'image/tiff',
            'image/miff',
            'image/gif',
            'image/jpe',
            'image/jpeg',
            'image/jpg',
            'image/jps',
            'image/pjpeg',
            'image/jng',
            'image/mng',
            'image/png',
            'image/heic',
            'image/heif',
        ],
        [],
    );

    const uploadGuideMessage = useMemo(
        () =>
            t(
                '첨부 가능 확장자: {{extensions}}<br/>파일당 최대 {{maxSize}}MB, 최대 {{maxLength}}장까지 등록 가능합니다.',
                {
                    extensions:
                        FILE_UPLOAD_ALLOWED_EXTENSION_LABELS.join(', '),
                    maxSize: maxSize / 1024 / 1024,
                    maxLength,
                },
            ),
        [maxLength, maxSize, t],
    );

    // TODO: maxLength가 1일때 기존 파일을 지우고 새로운 파일이 업데이트 될 수 있도록 한다
    const uploadFileHandler = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const fileList = e.target.files;

        if (!fileList) {
            return;
        }

        const isFileNameAvailable = every((a) => size(a.name) <= 255, fileList);

        if (!isFileNameAvailable) {
            openDialog({
                message: t('파일명은 255자까지 입력 가능합니다.'),
            });
            return;
        }

        const isSmallerThanMaxSize = every((a) => a.size < maxSize, fileList);

        if (!isSmallerThanMaxSize) {
            openDialog({
                message: t(
                    `${
                        maxSize / 1024 / 1024
                    }MB가 넘는 파일은 등록할 수 없습니다.`,
                ),
            });
            return;
        }

        const isExtensionAvailable = pipe(
            fileList,
            some((b) => includes(b.type, availableExtensions) || isHeicFile(b)),
        );

        if (!isExtensionAvailable && fileList.length > 0) {
            openDialog({
                message: t('해당 확장자는 업로드가 불가능합니다.'),
            });
            return;
        }

        if (uploadFile.length + fileList.length > maxLength) {
            openDialog({
                message: t(
                    `이미지는 최대 ${maxLength}장까지<br/> 등록이 가능합니다.`,
                ),
            });
            return;
        }

        setTimeout(() => {
            e.target.value = '';
        }, 1);

        if (fileList.length > 0) {
            const files = Array.from(fileList);
            setConvertingCount(files.length);

            try {
                const convertedFiles = await convertHeicFiles(files);

                setUploadFile((prev) =>
                    pipe(
                        prev,
                        concat(convertedFiles),
                        uniqBy((a) => a.name),
                        toArray,
                    ),
                );

                return convertedFiles;
            } finally {
                setConvertingCount(0);
            }
        }

        return;
    };

    const deleteUploadFileImage = (imageFileName: string) => {
        setUploadFile((prev) =>
            pipe(
                prev,
                filter((a) => a.name !== imageFileName),
                toArray,
            ),
        );
    };

    return {
        uploadFile,
        setUploadFile,
        uploadFileHandler,
        deleteUploadFileImage,
        convertingCount,
        uploadGuideMessage,
    };
};

export default useFileUpload;
