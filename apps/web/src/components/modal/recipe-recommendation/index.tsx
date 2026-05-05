import FetchBoundary from '@/components/common/FetchBoundary';
import { DefaultModalLayoutProps, ModalLayout } from '@/components/layout';
import { OVERLAY_ID } from '@/const/overlay';
import { RecipeRecommendationLayerContent } from '@/features/recipe/components/recipe-recommendation-content';
import { RecipeRecommendationLayerContentSkeleton } from '@/features/recipe/components/skeleton/recipe-recommendation-content';

export const RecipeRecommendationModal = (props: DefaultModalLayoutProps) => {
    return (
        <ModalLayout
            {...props}
            width='792px'
            overlayId={OVERLAY_ID.ORDER_COMPLETE_RECIPE_RECOMMENDATION}
        >
            <FetchBoundary
                fallback={<RecipeRecommendationLayerContentSkeleton />}
            >
                <RecipeRecommendationLayerContent close={props.close} />
            </FetchBoundary>
        </ModalLayout>
    );
};

export default RecipeRecommendationModal;
