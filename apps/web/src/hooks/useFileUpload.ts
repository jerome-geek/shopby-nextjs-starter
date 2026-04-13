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

    const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList) {
            return;
        }

        const isFileNameAvailable = every((a) => size(a.name) <= 255, fileList);

        if (!isFileNameAvailable) {
            alert('파일명은 255자까지 입력 가능합니다.');
            return;
        }

        const isSmallerThanMaxSize = every((a) => a.size < maxSize, fileList);

        if (!isSmallerThanMaxSize) {
            alert(
                `${maxSize / 1024 / 1024}MB가 넘는 파일은 등록할 수 없습니다.`,
            );
            return;
        }

        const isExtensionAvailable = pipe(
            fileList,
            some((b) => includes(b.type, availableExtensions)),
        );

        if (!isExtensionAvailable && fileList.length > 0) {
            alert('해당 확장자는 업로드가 불가능합니다.');
            return;
        }

        if (uploadFile.length + fileList.length > maxLength) {
            alert(`이미지는 최대 ${maxLength}장까지 등록이 가능합니다.`);
            return;
        }

        if (fileList.length > 0) {
            setUploadFile((prev) =>
                pipe(
                    prev,
                    concat(fileList),
                    uniqBy((a) => a.name),
                    toArray,
                ),
            );
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

    return [
        uploadFile,
        setUploadFile,
        uploadFileHandler,
        deleteUploadFileImage,
    ] as const;
};

export default useFileUpload;
