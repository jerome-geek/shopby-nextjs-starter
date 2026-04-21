import { Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputContainer, InputField, InputLabel } from '@/components/ui/input';
import * as styles from '@/pages/recipes/write/index.css';

interface RecipeIngredientSectionProps {
    ingredientFields: Record<'id', string>[];
    onAppend: (item: { name: string; amount: string }) => void;
    onRemove: (index: number) => void;
}

export const RecipeIngredientSection = ({
    ingredientFields,
    onAppend,
    onRemove,
}: RecipeIngredientSectionProps) => {
    const { t } = useTranslation();
    const { register } = useFormContext();

    return (
        <section className={styles.section}>
            <InputLabel isRequired>{t('재료')}</InputLabel>
            <AnimatePresence initial={false}>
                {ingredientFields.map((field, idx) => (
                    <motion.div
                        key={field.id}
                        className={styles.ingredientRow}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <InputContainer>
                            <InputField
                                placeholder={t('재료명')}
                                {...register(`ingredients.${idx}.name`)}
                            />
                        </InputContainer>
                        <InputContainer>
                            <InputField
                                placeholder={t('용량')}
                                {...register(`ingredients.${idx}.amount`)}
                            />
                        </InputContainer>
                        <button
                            type='button'
                            className={styles.addStepIcon}
                            onClick={() =>
                                onAppend({
                                    name: '',
                                    amount: '',
                                })
                            }
                        >
                            <Plus size={16} strokeWidth={2.5} />
                        </button>
                        <button
                            type='button'
                            className={styles.removeStepIcon}
                            onClick={() => onRemove(idx)}
                            disabled={ingredientFields.length <= 1}
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </section>
    );
};
