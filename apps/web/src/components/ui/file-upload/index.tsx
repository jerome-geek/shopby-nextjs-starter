import { includes, isEmpty } from '@fxts/core';
import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import * as styles from '@/components/ui/file-upload/index.css';
import { useFileUpload } from '@/hooks/utils';
import { UploadFileBlob } from '@/hooks/utils/useFileUpload';
import { vars } from '@/styles/theme.css';

interface FileUploadProps {
    initialFileList: string[];
    setFileList: (fileList: (string | UploadFileBlob)[]) => void;
    maxLength?: number;
}

type DeletedInitialImage = {
    image: string;
    index: number;
};

const FileUpload = ({
    initialFileList,
    setFileList: setFileListProps,
    maxLength = 3,
}: FileUploadProps) => {
    const { uploadFileHandler, deleteUploadFileImage } = useFileUpload({
        maxSize: 12 * 1024 * 1024,
        maxLength,
    });

    const [fileList, setFileList] = useState<(string | UploadFileBlob)[]>(
        () => {
            return initialFileList;
        },
    );

    const [deletedInitialImages, setDeletedInitialImages] = useState<
        DeletedInitialImage[]
    >([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickUpload = () => {
        inputRef.current?.click();
    };

    useEffect(() => {
        setFileListProps(fileList);
    }, [fileList, setFileListProps]);

    const isUndoDeletedInitialImage =
        !isEmpty(initialFileList) &&
        !isEmpty(deletedInitialImages) &&
        fileList.length < maxLength;

    const restoreLastDeletedInitialImage = () => {
        if (fileList.length >= maxLength) {
            return;
        }

        const lastDeleted = deletedInitialImages.at(-1);

        if (!lastDeleted) {
            return;
        }

        setDeletedInitialImages((prev) => prev.slice(0, -1));

        setFileList((prev) => {
            const next = [...prev];
            const safeIndex = Math.max(
                0,
                Math.min(lastDeleted.index, next.length),
            );
            next.splice(safeIndex, 0, lastDeleted.image);
            return next;
        });
    };

    return (
        <div className={styles.imageContainer}>
            {fileList.length < maxLength && (
                <button
                    type='button'
                    onClick={onClickUpload}
                    className={styles.uploadButton}
                >
                    <input
                        ref={inputRef}
                        type='file'
                        multiple
                        onChange={(e) => {
                            const result = uploadFileHandler(e);

                            if (result && !isEmpty(result)) {
                                setFileList((prev) => [...prev, ...result]);
                            }
                        }}
                        style={{ display: 'none' }}
                    />

                    <Plus
                        size={40}
                        strokeWidth={1.5}
                        color={vars.color.gray['50']}
                    />

                    <span
                        className={styles.uploadButtonText}
                    >{`${fileList.length} / ${maxLength}`}</span>
                </button>
            )}

            {!isEmpty(fileList) && (
                <ul className={styles.imageList}>
                    {fileList.map((image, index) => {
                        return (
                            <li key={index} className={styles.imageListItem}>
                                <div className={styles.imageListItemImageWrap}>
                                    {typeof image === 'string' ? (
                                        <img
                                            src={image}
                                            alt={image}
                                            className={
                                                styles.imageListItemImage
                                            }
                                        />
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={image.name ?? ''}
                                            className={
                                                styles.imageListItemImage
                                            }
                                        />
                                    )}
                                </div>
                                <button
                                    className={styles.imageListItemCloseButton}
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const isInitialImage =
                                            typeof image === 'string' &&
                                            includes(image, initialFileList);

                                        if (isInitialImage) {
                                            setDeletedInitialImages((prev) => [
                                                ...prev,
                                                { image, index },
                                            ]);
                                        }

                                        setFileList((prev) =>
                                            prev.filter(
                                                (_, prevIndex) =>
                                                    prevIndex !== index,
                                            ),
                                        );

                                        if (typeof image !== 'string') {
                                            deleteUploadFileImage(
                                                image.name ?? '',
                                            );
                                        }
                                    }}
                                >
                                    <X
                                        width={15}
                                        height={15}
                                        color={vars.color.white}
                                        strokeWidth={2}
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            {isUndoDeletedInitialImage && (
                <button
                    type='button'
                    className={styles.undoButton}
                    onClick={restoreLastDeletedInitialImage}
                >
                    삭제한 이미지 되돌리기
                </button>
            )}
        </div>
    );
};

export default FileUpload;
