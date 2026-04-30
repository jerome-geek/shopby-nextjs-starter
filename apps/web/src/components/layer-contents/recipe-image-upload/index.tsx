import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Loader2, Plus, X } from 'lucide-react';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/layer-contents/recipe-image-upload/index.css';
import { PATHS } from '@/const/paths';
import useRecipeImageUploadMutation from '@/hooks/mutations/useRecipeImageUploadMutation';
import { vars } from '@/styles/theme.css';

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

interface SortableImageItemProps {
    src: string;
    index: number;
    onDelete: (index: number) => void;
}

const SortableImageItem = ({
    src,
    index,
    onDelete,
}: SortableImageItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: src });

    const dndStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <li ref={setNodeRef} style={dndStyle} className={styles.imageItem}>
            <motion.div
                layout
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={styles.imageWrapper}
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    opacity: isDragging ? 0.6 : 1,
                }}
                {...attributes}
                {...listeners}
            >
                <img
                    src={src}
                    alt={`${index + 1}`}
                    className={styles.imageThumb}
                />
                <span className={styles.imageBadge}>{index + 1}</span>
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    className={styles.imageDeleteBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(index);
                    }}
                    aria-label='이미지 삭제'
                >
                    <X size={16} strokeWidth={2.5} />
                </motion.button>
            </motion.div>
        </li>
    );
};

export const RecipeImageUpload = ({
    onSuccess,
    handleClose,
}: {
    onSuccess?: () => void;
    handleClose: () => void;
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<string[]>([]);
    const { uploadAndRegister } = useRecipeImageUploadMutation();

    const isLoading = uploadAndRegister.isPending;

    const imagesRef = useRef<string[]>([]);

    useEffect(
        function syncImagesRef() {
            imagesRef.current = images;
        },
        [images],
    );

    useEffect(() => {
        return function cleanupAllMemory() {
            imagesRef.current.forEach((url) => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const urls = files.map((f) => URL.createObjectURL(f));
        setImages((prev) => [...prev, ...urls]);
        e.target.value = '';
    };

    const handleDelete = (index: number) => {
        setImages((prev) => {
            const newImages = [...prev];
            const [deletedUrl] = newImages.splice(index, 1);
            if (deletedUrl.startsWith('blob:')) {
                URL.revokeObjectURL(deletedUrl);
            }
            return newImages;
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setImages((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const hint =
        images.length === 0
            ? t('요리 과정 사진을 업로드해 주세요')
            : t('이미지를 드래그하여 순서를 변경하세요');

    const onNext = () => {
        uploadAndRegister.mutate(
            { blobUrls: images },
            {
                onSuccess: () => {
                    handleClose();
                    onSuccess?.();
                    if (!router.pathname.includes(PATHS.RECIPES.WRITE)) {
                        router.push(PATHS.RECIPES.WRITE);
                    }
                },
            },
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.scrollArea}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToFirstScrollableAncestor]}
                >
                    <ul className={styles.imageGrid}>
                        <motion.li
                            variants={itemVariants}
                            initial='hidden'
                            animate='visible'
                            className={styles.imageItem}
                        >
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                type='button'
                                className={styles.imageAddCell}
                                onClick={() => inputRef.current?.click()}
                                aria-label={t('이미지 추가')}
                            >
                                <Plus
                                    size={40}
                                    strokeWidth={1.5}
                                    color={vars.color.gray['50']}
                                />
                                <span className={styles.imageAddLabel}>
                                    {t('이미지 추가')}
                                </span>
                                <input
                                    ref={inputRef}
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </motion.button>
                        </motion.li>

                        <SortableContext
                            items={images}
                            strategy={rectSortingStrategy}
                        >
                            <AnimatePresence mode='popLayout'>
                                {images.map((src, index) => (
                                    <SortableImageItem
                                        key={src}
                                        src={src}
                                        index={index}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </AnimatePresence>
                        </SortableContext>
                    </ul>
                </DndContext>
            </div>

            <div key='footer' className={styles.nextButtonContainer}>
                <p className={styles.hint}>{hint}</p>
                <motion.button
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={styles.nextButton}
                    disabled={images.length === 0 || isLoading}
                    onClick={onNext}
                >
                    {isLoading ? (
                        <Loader2
                            size={22}
                            strokeWidth={2}
                            className={styles.spinner}
                        />
                    ) : (
                        t('다음으로')
                    )}
                </motion.button>
            </div>
        </div>
    );
};
