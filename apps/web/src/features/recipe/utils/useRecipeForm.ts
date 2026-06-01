import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { filter, map, pipe, range, toArray, uniqBy, zip } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
    useRecipeImageUploadMutation,
    useRecipeMutation,
} from '@/hooks/mutations';
import { useToast } from '@/hooks/ui';
import { useFileUpload } from '@/hooks/utils';
import type {
    GetRecipeDetailResponse,
    UpdateRecipeData,
} from '@/models/shop/recipe';
import {
    recipeCreateSchema,
    RecipeFormInput,
    recipeUpdateSchema,
} from '@/features/recipe/schema/form';
import {
    ManualTempImage,
    useRecipeManualStore,
} from '@/features/recipe/store/useRecipeManualStore';

interface UseRecipeFormProps {
    isModify: boolean;
    recipeDetailData?: GetRecipeDetailResponse;
}

export const useRecipeForm = ({
    isModify,
    recipeDetailData,
}: UseRecipeFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { addToast } = useToast();

    const { uploadAndRegister } = useRecipeImageUploadMutation();
    const {
        createManualRecipe: { mutate: createManualRecipeMutate },
        updateRecipe: { mutate: updateRecipeMutate },
    } = useRecipeMutation();

    const { uploadFileHandler } = useFileUpload({
        maxSize: 10 * 1024 * 1024,
        maxLength: 10,
    });

    const tempImages = useRecipeManualStore(({ tempImages }) => tempImages);
    const setTempImages = useRecipeManualStore(
        ({ setTempImages }) => setTempImages,
    );
    const clearTempImages = useRecipeManualStore(
        ({ clearTempImages }) => clearTempImages,
    );

    const methods = useForm<RecipeFormInput>({
        resolver: zodResolver(
            isModify ? recipeUpdateSchema : recipeCreateSchema,
        ),
        defaultValues: {
            title: '',
            description: '',
            thumbnailUrl: null,
            ingredients: [{ name: '', amount: '' }],
            steps: [
                {
                    stepNumber: 1,
                    description: '',
                    stepImageUrl: null,
                    tempImageSno: null,
                },
            ],
        },
    });

    const { control, handleSubmit, setValue, reset, getValues } = methods;

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
        replace: replaceStep,
    } = useFieldArray({
        control,
        name: 'steps',
    });

    const updateThumbnailFromImages = useCallback(
        (images: ManualTempImage[]) => {
            const sortedImages = [...images].sort(
                (a, b) => a.sortOrder - b.sortOrder,
            );
            const mainImage = sortedImages.find((img) => img.sortOrder === 1);
            if (mainImage?.imageUrl) {
                setValue('thumbnailUrl', mainImage.imageUrl);
            }
        },
        [setValue],
    );

    useEffect(() => {
        if (!recipeDetailData) return;

        reset(
            {
                title: recipeDetailData.title,
                description: recipeDetailData.description,
                cookTimeMinutes: recipeDetailData.durationSeconds,
                servings: recipeDetailData.servings,
                caloriesPerServingKcal: recipeDetailData.caloriesPerServingKcal,
                thumbnailUrl: recipeDetailData.thumbnailUrl,
                ingredients:
                    recipeDetailData.ingredients.length > 0
                        ? recipeDetailData.ingredients.map(
                              ({ name, amount }) => ({
                                  name,
                                  amount: amount || '',
                              }),
                          )
                        : [{ name: '', amount: '' }],
                steps:
                    recipeDetailData.steps.length > 0
                        ? recipeDetailData.steps.map(
                              ({ stepNumber, description, stepImageUrl }) => ({
                                  stepNumber,
                                  description: description || '',
                                  stepImageUrl: stepImageUrl,
                                  tempImageSno: null,
                              }),
                          )
                        : [
                              {
                                  stepNumber: 1,
                                  description: '',
                                  stepImageUrl: null,
                                  tempImageSno: null,
                              },
                          ],
            },
            {
                keepFieldsRef: true,
            },
        );

        const tempImageSnoString = tempImages.map((img) => img.sno).join(',');
        const recipeDetailDataStepsSnoString = recipeDetailData.steps
            .map((step) => step.sno)
            .join(',');

        const isNewSteps =
            tempImageSnoString !== recipeDetailDataStepsSnoString;

        if (isModify && isNewSteps) {
            const uniqueImages = pipe(
                recipeDetailData.steps,
                filter((step) => !!step.sno),
                uniqBy((step) => step.sno),
                (iter) => zip(range(1, Infinity), iter),
                map(([idx, step]) => ({
                    sno: step.sno as number,
                    uploadPath: '',
                    imageUrl: step.stepImageUrl as string,
                    sortOrder: step.stepNumber || idx,
                    status: 'REGISTERED',
                })),
                toArray,
            );
            setTempImages(uniqueImages);
        }
    }, [tempImages.length, recipeDetailData, reset, isModify, setTempImages]);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (!url.includes('/recipes/write')) {
                clearTempImages();
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router, clearTempImages]);

    useEffect(() => {
        const currentThumb = getValues('thumbnailUrl');
        const currentSteps = getValues('steps');

        if (tempImages.length > 0 && !currentThumb) {
            updateThumbnailFromImages(tempImages);
        }

        const nextSteps =
            tempImages.length > 0
                ? tempImages.map((img, index) => {
                      const existingStep = currentSteps[index];
                      return {
                          stepNumber: index + 1,
                          description: existingStep?.description || '',
                          stepImageUrl: img.imageUrl,
                          tempImageSno: img.sno,
                      };
                  })
                : [
                      {
                          stepNumber: 1,
                          description: '',
                          stepImageUrl: null,
                          tempImageSno: null,
                      },
                  ];

        const isDifferent =
            nextSteps.length !== currentSteps.length ||
            nextSteps.some(
                (step, i) =>
                    step.stepImageUrl !== currentSteps[i]?.stepImageUrl,
            );

        if (isDifferent) {
            replaceStep(nextSteps);
        }
    }, [tempImages, getValues, updateThumbnailFromImages, replaceStep]);

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        targetStepIndex?: number,
    ) => {
        try {
            const files = await uploadFileHandler(e);
            if (!files || files.length === 0) {
                return;
            }

            const blobUrls = files.map((file) => URL.createObjectURL(file));
            const currentTempImages =
                useRecipeManualStore.getState().tempImages;

            const response = await uploadAndRegister.mutateAsync({
                blobUrls,
                startOrder: currentTempImages.length + 1,
            });

            if (targetStepIndex !== undefined) {
                const newUploaded = response.data.tempImages;
                if (newUploaded && newUploaded.length > 0) {
                    setValue(
                        `steps.${targetStepIndex}.stepImageUrl`,
                        newUploaded[0].imageUrl,
                    );
                    setValue(
                        `steps.${targetStepIndex}.tempImageSno`,
                        newUploaded[0].sno,
                    );
                }
            }

            addToast({ message: t('이미지가 업로드되었습니다.') });
        } catch (error) {
            console.error('Image upload error:', error);
            addToast({
                message: t('이미지 업로드 중 오류가 발생했습니다.'),
                variant: 'error',
            });
        } finally {
            e.target.value = '';
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const currentTempImages =
                useRecipeManualStore.getState().tempImages;
            const oldIndex = currentTempImages.findIndex(
                (img) => (img.sno ?? img.imageUrl) === active.id,
            );
            const newIndex = currentTempImages.findIndex(
                (img) => (img.sno ?? img.imageUrl) === over.id,
            );

            if (oldIndex !== -1 && newIndex !== -1) {
                const newTempImages = arrayMove(
                    currentTempImages,
                    oldIndex,
                    newIndex,
                ).map((img, idx) => ({
                    ...img,
                    sortOrder: idx + 1,
                }));
                setTempImages(newTempImages);

                updateThumbnailFromImages(newTempImages);
            }
        }
    };

    const handleImageClick = (index: number) => {
        if (index === 0) return;
        const currentTempImages = useRecipeManualStore.getState().tempImages;
        const newTempImages = arrayMove(currentTempImages, index, 0).map(
            (img, idx) => ({
                ...img,
                sortOrder: idx + 1,
            }),
        );
        setTempImages(newTempImages);
        updateThumbnailFromImages(newTempImages);
    };

    const handleDeleteImage = (index: number) => {
        const currentTempImages = useRecipeManualStore.getState().tempImages;
        const deletedImage = currentTempImages[index];
        const newImages = currentTempImages
            .filter((_, i) => i !== index)
            .map((img, idx) => ({
                ...img,
                sortOrder: idx + 1,
            }));
        setTempImages(newImages);
        updateThumbnailFromImages(newImages);

        if (deletedImage && deletedImage.imageUrl) {
            const currentSteps = getValues('steps');
            const stepIndex = currentSteps.findIndex(
                (step: { stepImageUrl?: string | null }) =>
                    step.stepImageUrl === deletedImage.imageUrl,
            );
            if (stepIndex !== -1) {
                setValue(`steps.${stepIndex}.stepImageUrl`, null);
            }
        }
    };

    const onDeleteStepImage = (stepIndex: number) => {
        setValue(`steps.${stepIndex}.stepImageUrl`, null);
        setValue(`steps.${stepIndex}.tempImageSno`, null);
    };

    const onSubmitHandler = handleSubmit(async (data) => {
        const currentImages = useRecipeManualStore.getState().tempImages;
        if (currentImages.length === 0) {
            addToast({
                message: t('최소 한 장의 이미지를 등록해주세요.'),
                variant: 'error',
            });
            return;
        }

        try {
            const finalSteps = data.steps.map((step) => {
                return {
                    stepNumber: step.stepNumber,
                    description: step.description,
                    ...(isModify
                        ? { stepImageUrl: step.stepImageUrl }
                        : { tempImageSno: step.tempImageSno }),
                };
            });

            const { ...baseData } = data;

            const finalData = {
                ...baseData,
                steps: finalSteps,
                thumbnailTempImageSno: null,
            };

            if (isModify && recipeDetailData) {
                updateRecipeMutate(
                    {
                        sno: recipeDetailData.sno,
                        data: finalData as UpdateRecipeData,
                    },
                    {
                        onSuccess: () => {
                            addToast({
                                message: t('레시피가 수정되었습니다.'),
                            });
                            router.replace(`/recipes/${recipeDetailData.sno}`);
                            clearTempImages();
                        },
                    },
                );
            } else {
                createManualRecipeMutate(
                    {
                        data: {
                            ...finalData,
                            thumbnailUrl: undefined,
                            thumbnailTempImageSno:
                                data?.steps?.find(
                                    (step) =>
                                        step?.stepImageUrl ===
                                        finalData.thumbnailUrl,
                                )?.tempImageSno || null,
                        },
                    },
                    {
                        onSuccess: (res) => {
                            addToast({
                                message: t('레시피가 등록되었습니다.'),
                            });
                            router.replace(`/recipes/${res.data.sno}`);
                            clearTempImages();
                        },
                    },
                );
            }
        } catch (error) {
            addToast({
                message: t(
                    isAxiosError(error)
                        ? error.response?.data.message
                        : '레시피 등록 중 오류가 발생했습니다.',
                ),
                variant: 'error',
            });
        }
    });

    const displayImages = [...tempImages]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((img) => ({
            url: img.imageUrl,
            isMain: img.sortOrder === 1,
            sno: img.sno,
        }));

    return {
        methods,
        fields: {
            ingredientFields,
            stepFields,
        },
        actions: {
            appendIngredient,
            removeIngredient,
            appendStep,
            removeStep,
            insertStep,
            replaceStep,
        },
        handlers: {
            handleDragEnd,
            handleImageClick,
            handleDeleteImage,
            handleFileChange,
            onSubmit: onSubmitHandler,
            onDeleteStepImage,
        },
        state: {
            displayImages,
            tempImages,
            isLoading: uploadAndRegister.isPending,
        },
    };
};
