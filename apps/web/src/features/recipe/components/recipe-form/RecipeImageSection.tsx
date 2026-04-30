import type { DragEndEvent } from '@dnd-kit/core';
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import {
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { ImageIcon, Plus } from 'lucide-react';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { SortablePreviewImage } from '@/components/recipe/sortable-preview-image';
import { InputLabel } from '@/components/ui/input';
import * as styles from '@/pages/recipes/write/index.css';
import { vars } from '@/styles/theme.css';

interface RecipeImageSectionProps {
    displayImages: {
        url: string;
        isMain: boolean;
        sno: number | null | undefined;
    }[];
    onDragEnd: (event: DragEndEvent) => void;
    onImageClick: (index: number) => void;
    onDeleteImage: (index: number) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RecipeImageSection = ({
    displayImages,
    onDragEnd,
    onImageClick,
    onDeleteImage,
    onFileChange,
}: RecipeImageSectionProps) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <section className={styles.section}>
            <div className={styles.labelArea}>
                <InputLabel isRequired>{t('이미지')}</InputLabel>
                <span className={styles.labelHint}>
                    {t('이미지를 눌러 대표 이미지를 지정하세요')}
                </span>
            </div>

            <div className={styles.imageUploadGrid}>
                {/* 주황색 명시적 업로드 버튼 (이 버튼만 작동) */}
                <div
                    className={styles.imageSlot}
                    onClick={handleCameraClick}
                    style={{ cursor: 'pointer' }}
                >
                    <Plus size={'40px'} color={vars.color.gray['50']} />
                </div>

                <input
                    type='file'
                    multiple
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={(e) => onFileChange(e)}
                    style={{ display: 'none' }}
                />

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                    modifiers={[restrictToFirstScrollableAncestor]}
                >
                    <SortableContext
                        items={displayImages.map((img) => img.sno ?? img.url)}
                        strategy={rectSortingStrategy}
                    >
                        {displayImages.map((image, i) => (
                            <SortablePreviewImage
                                key={image.sno || image.url}
                                image={image}
                                index={i}
                                onDelete={onDeleteImage}
                                onClick={() => onImageClick(i)}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                {/* 자리 표시용 빈 슬롯 (클릭해도 작동안함) */}
                {displayImages.length < 4 &&
                    Array.from({
                        length: 4 - displayImages.length,
                    }).map((_, i) => (
                        <div key={`empty-${i}`} className={styles.imageSlot}>
                            <ImageIcon size={24} color='#ddd' />
                        </div>
                    ))}
            </div>
        </section>
    );
};
