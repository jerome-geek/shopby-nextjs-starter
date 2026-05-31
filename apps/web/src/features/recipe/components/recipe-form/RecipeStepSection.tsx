/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RecipePreviewImage } from '@/features/recipe/components/view';
import { InputLabel } from '@/shared/ui/input';
import * as styles from '@/pages/recipes/write/index.css';
import { TextArea } from '@/shared/components/form';
import type { ManualTempImage } from '@/store/useRecipeManualStore';

interface RecipeStepSectionProps {
    isModifiable: boolean;
    stepFields: Record<'id', string>[];
    tempImages: ManualTempImage[];
    onInsert: (
        index: number,
        item: {
            stepNumber: number;
            description: string;
            tempImageSno: number | null;
            stepImageUrl: string | null;
        },
    ) => void;
    onRemove: (index: number) => void;
    onFileChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        stepIndex: number,
    ) => void;
    onDeleteStepImage: (stepIndex: number) => void;
}

export const RecipeStepSection = ({
    isModifiable = true,
    stepFields,
    tempImages,
    onInsert,
    onRemove,
    onFileChange,
    onDeleteStepImage,
}: RecipeStepSectionProps) => {
    const { t } = useTranslation();
    const { register, watch } = useFormContext();

    return (
        <section className={styles.section}>
            <InputLabel isRequired>{t('조리 순서')}</InputLabel>
            <div className={styles.stepSection}>
                <AnimatePresence initial={false}>
                    {stepFields.map((field, idx: number) => {
                        // watch is needed if we're dynamically updating fields
                        const currentValues = watch(`steps.${idx}`);
                        const tempImageSno =
                            currentValues?.tempImageSno ??
                            (field as any).tempImageSno;
                        const stepImageUrl =
                            currentValues?.stepImageUrl ??
                            (field as any).stepImageUrl ??
                            (field as any).imageUrl;

                        const stepImage = tempImages.find(
                            (img) =>
                                img.sno === tempImageSno &&
                                tempImageSno !== null,
                        );

                        return (
                            <motion.div
                                key={field.id}
                                className={styles.stepCard}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNumber}>
                                        {idx + 1}
                                    </span>
                                    <div className={styles.stepActions}>
                                        <button
                                            type='button'
                                            className={styles.addStepIcon}
                                            onClick={() =>
                                                onInsert(idx + 1, {
                                                    stepNumber: idx + 2,
                                                    description: '',
                                                    tempImageSno: null,
                                                    stepImageUrl: null,
                                                })
                                            }
                                        >
                                            <Plus size={16} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            type='button'
                                            className={styles.removeStepIcon}
                                            onClick={() => onRemove(idx)}
                                            disabled={stepFields.length <= 1}
                                        >
                                            <X size={16} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                                <TextArea
                                    placeholder={t(
                                        '예시: 물이 끓기 전까지 양파와 버섯, 대파도 썰어서 준비해 주세요.',
                                    )}
                                    style={{
                                        height: '100px',
                                        backgroundColor: 'white',
                                    }}
                                    {...register(`steps.${idx}.description`)}
                                />

                                {isModifiable && (
                                    <div className={styles.stepImageGrid}>
                                        {stepImage || stepImageUrl ? (
                                            <div
                                                className={styles.stepImageSlot}
                                            >
                                                <RecipePreviewImage
                                                    url={
                                                        stepImage?.imageUrl ||
                                                        stepImageUrl
                                                    }
                                                    sno={
                                                        stepImage?.sno ||
                                                        tempImageSno
                                                    }
                                                    onDeleteButtonClick={() =>
                                                        onDeleteStepImage(idx)
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <label
                                                    htmlFor={`upload-step-${idx}`}
                                                    className={`${styles.imageSlot} ${styles.stepImageSlot}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Plus
                                                        size={24}
                                                        color='#ccc'
                                                    />
                                                </label>
                                                <input
                                                    id={`upload-step-${idx}`}
                                                    type='file'
                                                    accept='image/*'
                                                    style={{ display: 'none' }}
                                                    onChange={(e) =>
                                                        onFileChange(e, idx)
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
};
