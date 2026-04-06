import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Image as ImageIcon, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

import InputContainer from '@/components/ui/input/container';
import InputField from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import TextArea from '@/components/ui/input/TextArea';
import { useResponsive } from '@/hooks/utils';
import {
    recipeCreateSchema,
    type RecipeCreateInput,
} from '@/schema/recipe.schema';
import { vars } from '@/styles/theme.css';
import * as styles from '@/pages/recipes/write.css';

const RecipeWritePage = () => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RecipeCreateInput>({
        resolver: zodResolver(recipeCreateSchema),
        defaultValues: {
            title: '',
            description: '',
            cookTimeMinutes: 0,
            servings: 1,
            caloriesPerServingKcal: 0,
            ingredients: [{ name: '', amount: '' }],
            steps: [{ stepNumber: 1, description: '', tempImageSno: null }],
        },
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const {
        fields: stepFields,
        append: appendStep,
        remove: removeStep,
        insert: insertStep,
    } = useFieldArray({
        control,
        name: 'steps',
    });

    const onSubmit = (data: RecipeCreateInput) => {
        console.log('Recipe Data:', data);
    };

    return (
        <>
            <Head>
                <title>{t('레시피 만들기')} | JollyPot</title>
            </Head>

            <div className={styles.container}>
                {!isMobile && (
                    <header className={styles.header}>
                        <h1 className={styles.pageTitle}>
                            {t('레시피 만들기')}
                        </h1>
                    </header>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {/* 이미지 섹션 */}
                    <section className={styles.section}>
                        <div className={styles.labelArea}>
                            <InputLabel isRequired>{t('이미지')}</InputLabel>
                            <span className={styles.labelHint}>
                                {t('이미지를 눌러 대표 이미지를 지정하세요')}
                            </span>
                        </div>

                        <div className={styles.imageUploadGrid}>
                            <div className={styles.imageSlot}>
                                <Camera className={styles.plusIcon} size={32} />
                            </div>
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className={styles.imageSlot}>
                                    {i === 0 && (
                                        <span className={styles.mainBadge}>
                                            {t('대표')}
                                        </span>
                                    )}
                                    <ImageIcon size={24} color='#ddd' />
                                    <button
                                        type='button'
                                        className={styles.deleteButton}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 제목 섹션 */}
                    <section className={styles.section}>
                        <InputContainer>
                            <InputLabel isRequired>{t('제목')}</InputLabel>
                            <InputField
                                placeholder={t('레시피 제목을 입력하세요')}
                                {...register('title')}
                            />
                        </InputContainer>
                    </section>

                    {/* 상세 정보 섹션 */}
                    <section className={styles.section}>
                        <div className={styles.inputGroup}>
                            <InputContainer>
                                <InputLabel>{t('요리 시간')}</InputLabel>
                                <InputField
                                    placeholder={t('30분')}
                                    type='number'
                                    {...register('cookTimeMinutes', {
                                        valueAsNumber: true,
                                    })}
                                />
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>{t('몇 인분')}</InputLabel>
                                <InputField
                                    placeholder={t('2인분')}
                                    type='number'
                                    {...register('servings', {
                                        valueAsNumber: true,
                                    })}
                                />
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>{t('칼로리')}</InputLabel>
                                <InputField
                                    placeholder={t('500kcal')}
                                    type='number'
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
                            <InputLabel isRequired>
                                {t('레시피 설명')}
                            </InputLabel>
                            <TextArea
                                placeholder={t(
                                    '레시피에 대한 간단한 설명을 입력하세요',
                                )}
                                style={{ height: '120px' }}
                                {...register('description')}
                            />
                        </InputContainer>
                    </section>

                    {/* 재료 섹션 */}
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
                                            {...register(
                                                `ingredients.${idx}.name`,
                                            )}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <InputField
                                            placeholder={t('용량')}
                                            {...register(
                                                `ingredients.${idx}.amount`,
                                            )}
                                        />
                                    </InputContainer>
                                    <button
                                        type='button'
                                        className={styles.addStepIcon}
                                        onClick={() =>
                                            appendIngredient({
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
                                        onClick={() => removeIngredient(idx)}
                                        disabled={ingredientFields.length <= 1}
                                    >
                                        <X size={16} strokeWidth={2.5} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </section>

                    {/* 조리 순서 섹션 */}
                    <section className={styles.section}>
                        <InputLabel isRequired>{t('조리 순서')}</InputLabel>
                        <div className={styles.stepSection}>
                            <AnimatePresence initial={false}>
                                {stepFields.map((field, idx) => (
                                    <motion.div
                                        key={field.id}
                                        className={styles.stepCard}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className={styles.stepHeader}>
                                            <span className={styles.stepNumber}>
                                                {idx + 1}
                                            </span>
                                            <div className={styles.stepActions}>
                                                <button
                                                    type='button'
                                                    className={
                                                        styles.addStepIcon
                                                    }
                                                    onClick={() =>
                                                        insertStep(idx + 1, {
                                                            stepNumber: idx + 2,
                                                            description: '',
                                                            tempImageSno: null,
                                                        })
                                                    }
                                                >
                                                    <Plus
                                                        size={16}
                                                        strokeWidth={2.5}
                                                    />
                                                </button>
                                                <button
                                                    type='button'
                                                    className={
                                                        styles.removeStepIcon
                                                    }
                                                    onClick={() =>
                                                        removeStep(idx)
                                                    }
                                                    disabled={
                                                        stepFields.length <= 1
                                                    }
                                                >
                                                    <X
                                                        size={16}
                                                        strokeWidth={2.5}
                                                    />
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
                                            {...register(
                                                `steps.${idx}.description`,
                                            )}
                                        />
                                        <div className={styles.stepImageGrid}>
                                            <div
                                                className={`${styles.imageSlot} ${styles.stepImageSlot}`}
                                            >
                                                <Plus size={24} color='#ccc' />
                                            </div>
                                            <div
                                                className={`${styles.imageSlot} ${styles.stepImageSlot}`}
                                            >
                                                <ImageIcon
                                                    size={24}
                                                    color='#ddd'
                                                />
                                                <button
                                                    type='button'
                                                    className={
                                                        styles.deleteButton
                                                    }
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>

                    <motion.button
                        className={styles.submitButton}
                        whileHover={{
                            scale: 1.02,
                            backgroundColor: vars.color.gray['80'],
                            color: vars.color.white,
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {t('레시피 등록하기')}
                    </motion.button>
                </form>
            </div>
        </>
    );
};

export default RecipeWritePage;
