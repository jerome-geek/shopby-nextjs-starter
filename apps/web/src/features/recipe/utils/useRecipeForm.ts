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
    CreateManualRecipeData,
    GetRecipeDetailResponse,
    UpdateRecipeData,
} from '@/models/shop/recipe';
import {
    recipeCreateSchema,
    RecipeFormInput,
    recipeUpdateSchema,
} from '@/schema/recipe.schema';
import {
    ManualTempImage,
    useRecipeManualStore,
} from '@/store/useRecipeManualStore';

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
        createManualRecipe: { mutateAsync: createManualRecipeAsync },
        updateRecipe: { mutateAsync: updateRecipeAsync },
    } = useRecipeMutation();

    const { uploadFileHandler } = useFileUpload({
        maxSize: 10 * 1024 * 1024,
        maxLength: 10,
    });

    // Zustand store
    const tempImages = useRecipeManualStore(({ tempImages }) => tempImages);
    const setTempImages = useRecipeManualStore(
        ({ setTempImages }) => setTempImages,
    );
    const clearTempImages = useRecipeManualStore(
        ({ clearTempImages }) => clearTempImages,
    );

    // React Hook Form
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

    // Helpers
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

    // 1. 초기 데이터 페칭 후 폼과 스토어 초기화
    useEffect(() => {
        if (!recipeDetailData) return;

        // 폼 리셋
        reset({
            title: recipeDetailData.title,
            description: recipeDetailData.description,
            cookTimeMinutes: recipeDetailData.durationSeconds,
            servings: recipeDetailData.servings,
            caloriesPerServingKcal: recipeDetailData.caloriesPerServingKcal,
            thumbnailUrl: recipeDetailData.thumbnailUrl,
            ingredients:
                recipeDetailData.ingredients.length > 0
                    ? recipeDetailData.ingredients.map(({ name, amount }) => ({
                          name,
                          amount: amount || '',
                      }))
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
        });

        // 수정 모드 시 tempImages 스토어 복원
        if (isModify && tempImages.length === 0) {
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
    }, [tempImages.length, recipeDetailData, reset, isModify, setTempImages]); // tempImages는 제외 (최초 1회만 실행되도록)

    // 1. 페이지 이탈 시에만 스토어 초기화 (명시적 경로 감시)
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            // 작성 페이지 영역(/recipes/write)을 완전히 벗어나는 경우에만 클리어
            if (!url.includes('/recipes/write')) {
                clearTempImages();
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router, clearTempImages]);

    // 2. 스토어 이미지 변경 시 폼 썸네일 및 조리 단계 동기화 (Strict Sync)
    useEffect(() => {
        const currentThumb = getValues('thumbnailUrl');
        const currentSteps = getValues('steps');

        // 썸네일 동기화
        if (tempImages.length > 0 && !currentThumb) {
            updateThumbnailFromImages(tempImages);
        }

        // 조리 단계(Steps) 동기화: 스토어의 모든 이미지를 단계에 반영
        // 이미지가 없으면 기본 빈 단계 1개 유지, 이미지가 있으면 이미지 개수만큼 단계 생성
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

        // 상태가 실제로 다를 때만 업데이트 (개수, 순서, 매칭된 URL 기준)
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

    // Handlers
    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        targetStepIndex?: number,
    ) => {
        const files = uploadFileHandler(e);
        if (!files || files.length === 0) return;

        try {
            const blobUrls = files.map((file) => URL.createObjectURL(file));
            // 최신 상태를 참조하기 위해 스토어에서 직접 가져오기 권장, 하지만 클로저의 tempImages 사용
            const currentTempImages =
                useRecipeManualStore.getState().tempImages;

            const response = await uploadAndRegister.mutateAsync({
                blobUrls,
                startOrder: currentTempImages.length + 1,
            });

            // 개별 단계 업로드인 경우 폼 필드 바로 업데이트
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
        }

        // input value 초기화 (같은 파일 다시 올릴 수 있도록)
        e.target.value = '';
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

                // 대표 이미지가 변경되었을 수 있으므로 업데이트
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

        // 삭제된 이미지가 steps에 참조되어 있다면 제거
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
            const mainImage = currentImages.find((img) => img.sortOrder === 1);

            // 최종 전송 페이로드 (불필요 필드 제거)
            const finalSteps = data.steps.map((step) => {
                return {
                    stepNumber: step.stepNumber,
                    description: step.description,
                    ...(isModify
                        ? { stepImageUrl: step.stepImageUrl }
                        : { tempImageSno: step.tempImageSno }),
                };
            });

            // 생성/수정 공통 필드 구성 (thumbnailUrl은 일단 제외)
            const { thumbnailUrl, ...baseData } = data;
            const finalData = {
                ...baseData,
                steps: finalSteps,
                thumbnailTempImageSno:
                    mainImage?.sno ?? currentImages[0]?.sno ?? null,
            };

            if (isModify && recipeDetailData) {
                await updateRecipeAsync({
                    sno: recipeDetailData.sno,
                    data: {
                        ...finalData,
                        thumbnailUrl: data.thumbnailUrl,
                    } as UpdateRecipeData,
                });
                addToast({ message: t('레시피가 수정되었습니다.') });
                router.replace(`/recipes/${recipeDetailData.sno}`);
            } else {
                const { data: responseData } = await createManualRecipeAsync({
                    data: finalData as CreateManualRecipeData,
                });
                addToast({ message: t('레시피가 등록되었습니다.') });
                router.replace(`/recipes/${responseData.sno}`);
            }

            clearTempImages();
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
