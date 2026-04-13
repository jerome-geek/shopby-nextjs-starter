import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ImageIcon, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CSRLayout } from '@/components/layout';
import { RecipePreviewImage } from '@/components/recipe';
import { ErrorMessage } from '@/components/ui/form';
import {
    InputContainer,
    InputField,
    InputLabel,
    TextArea,
} from '@/components/ui/input';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useToast } from '@/hooks/ui';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/recipes/write.css';
import {
    recipeCreateSchema,
    type RecipeCreateInput,
} from '@/schema/recipe.schema';
import { useRecipeManualStore } from '@/store/useRecipeManualStore';
import { vars } from '@/styles/theme.css';

interface SortablePreviewImageProps {
    image: {
        url: string;
        isMain: boolean;
        sno: number | null;
    };
    index: number;
    onDelete: (index: number) => void;
    onClick: () => void;
}

const SortablePreviewImage = ({
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
    } = useSortable({ id: image.sno ?? image.url });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
        <RecipePreviewImage
            sno={image.sno}
            url={image.url}
            isMain={image.isMain}
            onDeleteButtonClick={() => onDelete(index)}
            onClick={onClick}
            setNodeRef={setNodeRef}
            style={style}
            attributes={attributes}
            listeners={listeners}
        />
    );
};

// TODO: 회원만 접근 가능하도록 처리
const RecipeWritePage = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();

    const tempImages = useRecipeManualStore((state) => state.tempImages);
    const setTempImages = useRecipeManualStore((state) => state.setTempImages);
    const clearTempImages = useRecipeManualStore(
        (state) => state.clearTempImages,
    );

    const methods = useForm<RecipeCreateInput>({
        resolver: zodResolver(recipeCreateSchema),
        defaultValues: {
            title: 'test',
            description: 'testttt',
            cookTimeMinutes: 1,
            servings: 1,
            caloriesPerServingKcal: 1,
            thumbnailTempImageSno: 1, // TODO: 임시 데이터
            ingredients: [{ name: 'ggggg', amount: '11111' }],
            steps: [{ stepNumber: 1, description: '', tempImageSno: null }],
        },
    });

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = methods;
    console.log('🚀 ~ RecipeWritePage ~ errors:', errors);

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

    useEffect(() => {
        if (tempImages.length > 0) {
            const sortedImages = [...tempImages].sort(
                (a, b) => a.sortOrder - b.sortOrder,
            );

            // 1. 대표 이미지 설정
            const mainImage = sortedImages.find((img) => img.sortOrder === 1);
            if (mainImage) {
                setValue('thumbnailTempImageSno', mainImage.sno);
            }

            // 2. 이미지 개수만큼 steps 자동 생성 및 sno 매핑
            const newSteps = sortedImages.map((img, idx) => ({
                stepNumber: idx + 1,
                description: '',
                tempImageSno: img.sno,
            }));

            setValue('steps', newSteps);
        }
    }, [tempImages, setValue]);

    const {
        createManualRecipe: { mutate: createManualRecipeMutation },
    } = useRecipeMutation();

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = tempImages.findIndex(
                (img) => (img.sno ?? img.imageUrl) === active.id,
            );
            const newIndex = tempImages.findIndex(
                (img) => (img.sno ?? img.imageUrl) === over.id,
            );

            if (oldIndex !== -1 && newIndex !== -1) {
                const newTempImages = arrayMove(
                    tempImages,
                    oldIndex,
                    newIndex,
                ).map((img, idx) => ({
                    ...img,
                    sortOrder: idx + 1,
                }));
                setTempImages(newTempImages);
            }
        }
    };

    const handleImageClick = (index: number) => {
        if (index === 0) return;

        const newTempImages = arrayMove(tempImages, index, 0).map(
            (img, idx) => ({
                ...img,
                sortOrder: idx + 1,
            }),
        );
        setTempImages(newTempImages);
    };

    const sortedTempImages = [...tempImages].sort(
        (a, b) => a.sortOrder - b.sortOrder,
    );

    const displayImages = sortedTempImages.map((img) => ({
        url: img.imageUrl,
        isMain: img.sortOrder === 1,
        sno: img.sno,
    }));

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: 이미지가 이미 업로드된 상태이므로 파일 선택 시 어떻게 동작할지 정의 필요 (예: 모달 띄우기)
        console.log(
            'File selection triggered, but images should be pre-uploaded.',
        );
    };

    const handleDeleteImage = (index: number) => {
        const newImages = tempImages.filter((_, i) => i !== index);
        setTempImages(newImages);
    };

    const onSubmit = async (data: RecipeCreateInput) => {
        if (tempImages.length === 0) {
            addToast({
                message: t('최소 한 장의 이미지를 등록해주세요.'),
                variant: 'error',
            });
            return;
        }

        try {
            addToast({ message: t('레시피를 등록 중입니다...') });

            const mainImage = tempImages.find((img) => img.sortOrder === 1);

            const finalData = {
                ...data,
                thumbnailTempImageSno: mainImage?.sno ?? tempImages[0].sno,
            };

            createManualRecipeMutation(
                {
                    data: finalData,
                },
                {
                    onSuccess: (res) => {
                        console.log('🚀 ~ onSubmit ~ res:', res);
                        addToast({ message: t('레시피가 등록되었습니다.') });
                        clearTempImages();
                        router.push(`/recipes/${res.data.sno}`);
                    },
                    onError: (error) => {
                        addToast({
                            message: t(
                                isAxiosError(error)
                                    ? error.response?.data.message
                                    : '알 수 없는 오류가 발생했습니다.',
                            ),
                            variant: 'error',
                        });
                    },
                },
            );
        } catch {
            addToast({
                message: t('레시피 등록 중 오류가 발생했습니다.'),
                variant: 'error',
            });
        }
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

                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        {/* 이미지 섹션 */}
                        <section className={styles.section}>
                            <div className={styles.labelArea}>
                                <InputLabel isRequired>
                                    {t('이미지')}
                                </InputLabel>
                                <span className={styles.labelHint}>
                                    {t(
                                        '이미지를 눌러 대표 이미지를 지정하세요',
                                    )}
                                </span>
                            </div>

                            <div className={styles.imageUploadGrid}>
                                <div
                                    className={styles.imageSlot}
                                    onClick={handleCameraClick}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Plus
                                        size={'40px'}
                                        color={vars.color.gray['50']}
                                    />
                                </div>
                                <input
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext
                                        items={displayImages.map(
                                            (img) => img.sno ?? img.url,
                                        )}
                                        strategy={rectSortingStrategy}
                                    >
                                        {displayImages.map((image, i) => (
                                            <SortablePreviewImage
                                                key={image.sno || image.url}
                                                image={image}
                                                index={i}
                                                onDelete={handleDeleteImage}
                                                onClick={() =>
                                                    handleImageClick(i)
                                                }
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                                {/* 자리 표시용 빈 슬롯 (이미지가 적을 때) */}
                                {displayImages.length < 4 &&
                                    Array.from({
                                        length: 4 - displayImages.length,
                                    }).map((_, i) => (
                                        <div
                                            key={`empty-${i}`}
                                            className={styles.imageSlot}
                                        >
                                            <ImageIcon size={24} color='#ddd' />
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
                            <ErrorMessage name='title' />
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
                                            onClick={() =>
                                                removeIngredient(idx)
                                            }
                                            disabled={
                                                ingredientFields.length <= 1
                                            }
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
                                    {stepFields.map((field, idx) => {
                                        const stepImage = tempImages.find(
                                            (img) =>
                                                img.sno === field.tempImageSno,
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
                                                <div
                                                    className={
                                                        styles.stepHeader
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.stepNumber
                                                        }
                                                    >
                                                        {idx + 1}
                                                    </span>
                                                    <div
                                                        className={
                                                            styles.stepActions
                                                        }
                                                    >
                                                        <button
                                                            type='button'
                                                            className={
                                                                styles.addStepIcon
                                                            }
                                                            onClick={() =>
                                                                insertStep(
                                                                    idx + 1,
                                                                    {
                                                                        stepNumber:
                                                                            idx +
                                                                            2,
                                                                        description:
                                                                            '',
                                                                        tempImageSno:
                                                                            null,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            <Plus
                                                                size={16}
                                                                strokeWidth={
                                                                    2.5
                                                                }
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
                                                                stepFields.length <=
                                                                1
                                                            }
                                                        >
                                                            <X
                                                                size={16}
                                                                strokeWidth={
                                                                    2.5
                                                                }
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
                                                        backgroundColor:
                                                            'white',
                                                    }}
                                                    {...register(
                                                        `steps.${idx}.description`,
                                                    )}
                                                />
                                                <div
                                                    className={
                                                        styles.stepImageGrid
                                                    }
                                                >
                                                    {stepImage ? (
                                                        <div
                                                            className={
                                                                styles.stepImageSlot
                                                            }
                                                        >
                                                            <RecipePreviewImage
                                                                url={
                                                                    stepImage.imageUrl
                                                                }
                                                                sno={
                                                                    stepImage.sno
                                                                }
                                                                onDeleteButtonClick={() =>
                                                                    setValue(
                                                                        `steps.${idx}.tempImageSno`,
                                                                        null,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={`${styles.imageSlot} ${styles.stepImageSlot}`}
                                                        >
                                                            <Plus
                                                                size={24}
                                                                color='#ccc'
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
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
                </FormProvider>
            </div>
        </>
    );
};

RecipeWritePage.getLayout = (page: React.ReactNode) => {
    return <CSRLayout>{page}</CSRLayout>;
};

export default RecipeWritePage;
