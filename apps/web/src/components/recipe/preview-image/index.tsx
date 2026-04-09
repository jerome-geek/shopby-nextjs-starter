import * as styles from '@/components/recipe/preview-image/index.css';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RecipePreviewImageProps {
    isMain?: boolean;
    sno: number | null;
    url: string;
    onDeleteButtonClick?: (sno: any) => void;
    onClick?: () => void;
    // DND 관련 props 추가
    attributes?: any;
    listeners?: any;
    setNodeRef?: (node: HTMLElement | null) => void;
    style?: React.CSSProperties;
}

const RecipePreviewImage = ({
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
            onClick={onClick}
            {...attributes}
            {...listeners}
        >
            {isMain && <span className={styles.mainBadge}>{t('대표')}</span>}
            <img
                src={url}
                // alt={`preview-${i}`}
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
                            onDeleteButtonClick(sno);
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecipePreviewImage;
