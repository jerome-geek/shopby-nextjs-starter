import { motion } from 'motion/react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputContainer, InputField, InputLabel } from '@/shared/ui/input';
import { RecipeImageSection } from '@/features/recipe/components/recipe-form/RecipeImageSection';
import { RecipeIngredientSection } from '@/features/recipe/components/recipe-form/RecipeIngredientSection';
import { RecipeStepSection } from '@/features/recipe/components/recipe-form/RecipeStepSection';
import { useRecipeForm } from '@/features/recipe/utils/useRecipeForm';
import type { GetRecipeDetailResponse } from '@/models/shop/recipe';
import * as styles from '@/pages/recipes/write/index.css';
import { ErrorMessage, TextArea } from '@/shared/components/form';

interface RecipeFormProps {
    isModify?: boolean;
    recipeDetailData?: GetRecipeDetailResponse;
}

export const RecipeForm = ({
    isModify = false,
    recipeDetailData,
}: RecipeFormProps) => {
    const { t } = useTranslation();

    const { methods, fields, actions, handlers, state } = useRecipeForm({
        isModify,
        recipeDetailData,
    });

    const { register } = methods;

    const sourceType = recipeDetailData?.sourceType;

    const isImageModifiable = sourceType === 'MANUAL' || !isModify;

    return (
        <FormProvider {...methods}>
            <form onSubmit={handlers.onSubmit} className={styles.form}>
                <RecipeImageSection
                    displayImages={state.displayImages}
                    onDragEnd={handlers.handleDragEnd}
                    onImageClick={handlers.handleImageClick}
                    onDeleteImage={handlers.handleDeleteImage}
                    onFileChange={handlers.handleFileChange}
                    isModifiable={isImageModifiable}
                />

                {/* 제목 섹션 */}
                <section className={styles.section}>
                    <InputContainer>
                        <InputLabel isRequired>{t('제목')}</InputLabel>
                        <InputField
                            placeholder={t('레시피 제목을 입력하세요')}
                            {...register('title')}
                        />
                    </InputContainer>
                    <ErrorMessage name='title' />
                </section>

                {/* 상세 정보 섹션 */}
                <section className={styles.section}>
                    <div className={styles.inputGroup}>
                        <InputContainer>
                            <InputLabel>{t('요리 시간')}</InputLabel>
                            <InputField
                                placeholder={t('30분')}
                                inputMode='numeric'
                                {...register('cookTimeMinutes', {
                                    valueAsNumber: true,
                                })}
                            />
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>{t('몇 인분')}</InputLabel>
                            <InputField
                                placeholder={t('2인분')}
                                inputMode='numeric'
                                {...register('servings', {
                                    valueAsNumber: true,
                                })}
                            />
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>{t('칼로리')}</InputLabel>
                            <InputField
                                placeholder={t('500kcal')}
                                inputMode='numeric'
                                {...register('caloriesPerServingKcal', {
                                    valueAsNumber: true,
                                })}
                            />
                        </InputContainer>
                    </div>
                </section>

                {/* 레시피 설명 섹션 */}
                <section className={styles.section}>
                    <InputContainer>
                        <InputLabel isRequired>{t('레시피 설명')}</InputLabel>
                        <TextArea
                            placeholder={t(
                                '레시피에 대한 간단한 설명을 입력하세요',
                            )}
                            style={{ height: '120px' }}
                            {...register('description')}
                        />
                    </InputContainer>
                </section>

                <RecipeIngredientSection
                    ingredientFields={fields.ingredientFields}
                    onAppend={actions.appendIngredient}
                    onRemove={actions.removeIngredient}
                />

                <RecipeStepSection
                    isModifiable={isImageModifiable}
                    stepFields={fields.stepFields}
                    tempImages={state.tempImages}
                    onInsert={actions.insertStep}
                    onRemove={actions.removeStep}
                    onFileChange={handlers.handleFileChange}
                    onDeleteStepImage={handlers.onDeleteStepImage}
                />

                <motion.button
                    type='submit'
                    className={styles.submitButton}
                    disabled={state.isLoading}
                    whileHover={{
                        backgroundColor: 'var(--color-primary-dark)',
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    {t(isModify ? '레시피 수정하기' : '레시피 등록하기')}
                </motion.button>
            </form>
        </FormProvider>
    );
};
