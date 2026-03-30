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

export interface UploadFileBlob extends Blob {
    name?: string;
    lastModified?: number;
    lastModifiedDate?: string;
}

interface useFileUploadProps {
    maxSize: number;
    maxLength: number;
}

/**
 * 샵바이 기본 파일 업로드 제한이 12MB
 */
const useFileUpload = (
    { maxSize, maxLength }: useFileUploadProps = {
        maxSize: 12 * 1024 * 1024,
        maxLength: 6,
    },
) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const [uploadFile, setUploadFile] = useState<UploadFileBlob[]>([]);
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
        ],
        [],
    );

    // TODO: maxLength가 1일때 기존 파일을 지우고 새로운 파일이 업데이트 될 수 있도록 한다
    const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            some((b) => includes(b.type, availableExtensions)),
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
            setUploadFile((prev) =>
                pipe(
                    prev,
                    concat(fileList),
                    uniqBy((a) => a.name),
                    toArray,
                ),
            );

            return pipe(fileList, toArray);
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
    };
};

export default useFileUpload;
