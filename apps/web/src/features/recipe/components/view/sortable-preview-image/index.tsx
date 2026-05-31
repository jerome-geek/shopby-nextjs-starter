import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

import { RecipePreviewImage } from '@/features/recipe/components/view/preview-image';

export interface SortablePreviewImageProps {
    image: {
        url: string;
        isMain: boolean;
        sno: number | null | undefined;
    };
    index: number;
    onDelete: (index: number) => void;
    onClick: () => void;
}

export const SortablePreviewImage = ({
    image,
    index,
    onDelete,
    onClick,
}: SortablePreviewImageProps) => {
    // id로 sno가 있으면 sno를, 없으면 url을 사용 (신규 업로드 이미지는 sno가 없으므로)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: image.sno || image.url });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none' as const,
        WebkitUserSelect: 'none' as const,
    };

    return (
        <RecipePreviewImage
            sno={image.sno}
            url={image.url}
            isMain={image.isMain}
            index={index} // 인덱스 전달 추가
            onDeleteButtonClick={() => onDelete(index)}
            onClick={onClick}
            setNodeRef={setNodeRef}
            style={style}
            attributes={attributes}
            listeners={listeners}
        />
    );
};
