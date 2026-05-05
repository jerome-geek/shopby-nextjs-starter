import FetchBoundary from '@/components/common/FetchBoundary';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/components/layout';
import { OVERLAY_ID } from '@/const/overlay';
import { RecipeRecommendationLayerContent } from '@/features/recipe/components/recipe-recommendation-content';
import { RecipeRecommendationLayerContentSkeleton } from '@/features/recipe/components/skeleton/recipe-recommendation-content';

export const RecipeRecommendationBottomSheet = (
    props: DefaultBottomSheetProps,
) => {
    return (
        <BottomSheetLayout
            {...props}
            overlayId={OVERLAY_ID.ORDER_COMPLETE_RECIPE_RECOMMENDATION_BOTTOM_SHEET}
            isCloseButton={false}
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
