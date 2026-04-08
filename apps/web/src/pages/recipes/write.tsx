import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Image as ImageIcon, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
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
import {
    CreateManualRecipeData,
    CreateRecipeData,
    RegisterManualTempImagesData,
} from '@/models/shop/recipe';
import { vars } from '@/styles/theme.css';
import * as styles from '@/pages/recipes/write.css';
import { ErrorMessage } from '@/components/ui/form';
import useRecipeMutation from '@/hooks/mutations/useRecipeMutation';
import { useToast } from '@/hooks/ui';
import { isAxiosError } from 'axios';
import useFileUpload from '@/hooks/utils/useFileUpload';

// TODO: 회원만 접근 가능하도록 처리
const RecipeWritePage = () => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();

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

    const {
        createManualRecipe: { mutate: createManualRecipeMutation },
        registerManualTempImages: { mutateAsync: registerTempImages },
        upload: { mutateAsync: uploadToGeek },
    } = useRecipeMutation();

    const { uploadFileHandler, deleteUploadFileImage } = useFileUpload({
        maxSize: 10 * 1024 * 1024,
        maxLength: 10,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [localFiles, setLocalFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = uploadFileHandler(e);
        if (files) {
            const newFiles = Array.from(files);
            setLocalFiles((prev) => [...prev, ...newFiles]);

            const newPreviews = newFiles.map((file) =>
                URL.createObjectURL(file),
            );
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const handleDeleteImage = (index: number) => {
        // 메모리 누수 방지를 위해 ObjectURL 해제
        URL.revokeObjectURL(previews[index]);

        setPreviews((prev) => prev.filter((_, i) => i !== index));
        setLocalFiles((prev) => prev.filter((_, i) => i !== index));

        // useFileUpload 내부 상태도 동기화 (파일명 기준)
        deleteUploadFileImage(localFiles[index].name);
    };

    const onSubmit = async (data: RecipeCreateInput) => {
        if (localFiles.length === 0) {
            addToast({
                message: t('최소 한 장의 이미지를 등록해주세요.'),
                variant: 'error',
            });
            return;
        }

        try {
            addToast({ message: t('이미지를 업로드 중입니다...') });

            // 1. 모든 로컬 파일을 순차적으로 Geek 백엔드(/common/upload)에 업로드하여 정보 수집
            const uploadedFileInfos = [];
            for (let i = 0; i < localFiles.length; i++) {
                const file = localFiles[i];
                const formData = new FormData();
                formData.append('file', file);
                const uploadRes = await uploadToGeek(formData);
                console.log('🚀 ~ onSubmit ~ uploadRes:', uploadRes);
                uploadedFileInfos.push({
                    filePath: uploadRes.data.filePath,
                    originFileName: uploadRes.data.originFileName,
                    size: uploadRes.data.size,
                    contentType: uploadRes.data.contentType,
                    sortOrder: i + 1,
                });
            }

            // 2. 임시 이미지 등록 API 호출하여 tempImageSno 가져오기
            const tempImagesRes = await registerTempImages({
                data: {
                    images: uploadedFileInfos,
                },
            });
            console.log('🚀 ~ onSubmit ~ tempImagesRes:', tempImagesRes);

            // 업로드 응답에서 tempImageSno 리스트 추출
            const tempImageSnos = tempImagesRes.data.tempImages.map(
                (item: { sno: number }) => item.sno,
            );
            console.log('🚀 ~ onSubmit ~ tempImageSnos:', tempImageSnos);
            return;

            // 3. 최종 데이터 구성 (첫 번째 이미지를 대표 이미지로 지정)
            const finalData = {
                ...data,
                thumbnailTempImageSno: tempImageSnos[0],
            };

            createManualRecipeMutation(
                {
                    data: finalData,
                },
                {
                    onSuccess: (res) => {
                        console.log('🚀 ~ onSubmit ~ res:', res);
                        addToast({ message: '레시피가 등록되었습니다.' });
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
                                    <Camera
                                        className={styles.plusIcon}
                                        size={32}
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
                                {previews.map((preview, i) => (
                                    <div key={i} className={styles.imageSlot}>
                                        {i === 0 && (
                                            <span className={styles.mainBadge}>
                                                {t('대표')}
                                            </span>
                                        )}
                                        <img
                                            src={preview}
                                            alt={`preview-${i}`}
                                            className={styles.previewImage}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '4px',
                                            }}
                                        />
                                        <button
                                            type='button'
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteImage(i)}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {/* 자리 표시용 빈 슬롯 (이미지가 적을 때) */}
                                {previews.length < 4 &&
                                    Array.from({
                                        length: 4 - previews.length,
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
                                                                        idx + 2,
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
                                                            stepFields.length <=
                                                            1
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
                                            <div
                                                className={styles.stepImageGrid}
                                            >
                                                <div
                                                    className={`${styles.imageSlot} ${styles.stepImageSlot}`}
                                                >
                                                    <Plus
                                                        size={24}
                                                        color='#ccc'
                                                    />
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
                </FormProvider>
            </div>
        </>
    );
};

export default RecipeWritePage;
