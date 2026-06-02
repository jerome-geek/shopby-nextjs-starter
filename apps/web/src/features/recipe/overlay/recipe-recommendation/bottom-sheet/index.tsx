import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { PATHS } from '@/const/paths';
import { RecipeRecommendationLayerContent } from '@/features/recipe/components/recipe-recommendation-content';
import { RecipeRecommendationLayerContentSkeleton } from '@/features/recipe/components/skeleton/recipe-recommendation-content';
import FetchBoundary from '@/shared/components/common/FetchBoundary';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/shared/components/layout';
import { Button } from '@/shared/ui';

export const RecipeRecommendationBottomSheet = (
    props: DefaultBottomSheetProps,
) => {
    const { t } = useTranslation();

    const router = useRouter();

    return (
        <BottomSheetLayout
            {...props}
            isCloseButton={false}
            footerButtonList={[
                <Button
                    key='close'
                    frame='outlined'
                    variant='secondary'
                    onClick={props.close}
                    type='button'
                >
                    {t('닫기')}
                </Button>,
                <Button
                    key='more'
                    frame='solid'
                    variant='green'
                    onClick={() => {
                        router.push(PATHS.MAIN);
                        props.close();
                    }}
                    type='button'
                >
                    {t('레시피 더 보러가기')}
                </Button>,
            ]}
        >
            <FetchBoundary
                fallback={<RecipeRecommendationLayerContentSkeleton />}
            >
                <RecipeRecommendationLayerContent close={props.close} />
            </FetchBoundary>
        </BottomSheetLayout>
    );
};

export default RecipeRecommendationBottomSheet;
