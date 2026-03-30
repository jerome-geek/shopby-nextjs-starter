import { isEmpty } from '@fxts/core';
import { useEffect, useRef, useState } from 'react';

import { useFileUpload } from '@/hooks/utils';
import { UploadFileBlob } from '@/hooks/utils/useFileUpload';
import * as styles from '@/components/ui/file-upload/index.css';
import { vars } from '@/styles/theme.css';

import { CloseIcon, PlusIcon } from '@/components/icons';

interface FileUploadProps {
    initialFileList: string[];
    setFileList: (fileList: (string | UploadFileBlob)[]) => void;
    maxLength?: number;
}

const FileUpload = ({
    initialFileList,
    setFileList: setFileListProps,
    maxLength = 3,
}: FileUploadProps) => {
    const { uploadFile, uploadFileHandler, deleteUploadFileImage } =
        useFileUpload({
            maxSize: 12 * 1024 * 1024,
            maxLength,
        });

    const [fileList, setFileList] = useState<(string | UploadFileBlob)[]>(
        () => {
            return initialFileList;
        },
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickUpload = () => {
        inputRef.current?.click();
    };

    useEffect(() => {
        console.log(fileList);
        setFileListProps(fileList);
    }, [fileList]);

    return (
        <div className={styles.imageContainer}>
            {!isEmpty(fileList) && (
                <ul className={styles.imageList}>
                    {fileList.map((image, index) => {
                        return (
                            <li key={index} className={styles.imageListItem}>
                                {typeof image === 'string' ? (
                                    <img
                                        src={image}
                                        alt={image}
                                        className={styles.imageListItemImage}
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={image.name ?? ''}
                                        className={styles.imageListItemImage}
                                    />
                                )}
                                <button
                                    className={styles.imageListItemCloseButton}
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation();
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
                                    <CloseIcon
                                        width={18}
                                        height={18}
                                        currentColor={vars.color.white}
                                        strokeWidth={2}
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            {fileList.length < maxLength && (
                <button
                    type='button'
                    onClick={onClickUpload}
                    className={styles.uploadButton}
                >
                    <input
                        ref={inputRef}
                        type='file'
                        onChange={(e) => {
                            const result = uploadFileHandler(e);

                            if (result && !isEmpty(result)) {
                                setFileList((prev) => [...prev, ...result]);
                            }
                        }}
                        style={{ display: 'none' }}
                    />

                    <PlusIcon
                        className={styles.plusIcon}
                        width={20}
                        height={20}
                        currentColor={vars.color.gray['80']}
                    />

                    <span
                        className={styles.uploadButtonText}
                    >{`${fileList.length} / ${maxLength}`}</span>
                </button>
            )}
        </div>
    );
};

export default FileUpload;
