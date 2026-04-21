import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import * as styles from '@/components/recipe/preview-image/index.css';

export interface RecipePreviewImageProps {
    isMain?: boolean;
    sno: number | null | undefined;
    url: string;
    onDeleteButtonClick?: (sno: number) => void;
    onClick?: () => void;
    // DND 관련 props 추가
    attributes?: DraggableAttributes;
    listeners?: SyntheticListenerMap;
    setNodeRef?: (node: HTMLElement | null) => void;
    style?: React.CSSProperties;
}

export const RecipePreviewImage = ({
    isMain,
    sno,
    url,
    onDeleteButtonClick,
    onClick,
    attributes,
    listeners,
    setNodeRef,
    style,
}: RecipePreviewImageProps) => {
    const { t } = useTranslation();

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={styles.container}
            {...attributes}
            {...listeners}
            onClick={onClick}
        >
            {isMain && <span className={styles.mainBadge}>{t('대표')}</span>}
            <img
                src={url}
                alt={`recipe-preview-image-${sno}`}
                className={styles.previewImage}
            />
            {onDeleteButtonClick && (
                <div className={styles.deleteButtonWrapper}>
                    <button
                        type='button'
                        className={styles.deleteButton}
                        // onClick={() => (img.sno ? null : handleDeleteImage(i))}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (sno) {
                                onDeleteButtonClick(sno);
                            }
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};
