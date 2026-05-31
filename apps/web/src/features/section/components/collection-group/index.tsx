import { isEmpty } from '@fxts/core';

import FetchBoundary from '@/shared/components/common/FetchBoundary';
import CollectionSection from '@/features/section/components/collection-group/collection';
import CollectionSectionSkeleton from '@/features/section/components/collection-group/skeleton';
import { useCollectionExposureGroup } from '@/hooks/suspenseQuery/shop/collection';

import 'swiper/css';

type GroupId =
    | 'collection_group_1'
    | 'collection_group_2'
    | 'collection_group_3'
    | 'collection_group_4'
    | 'collection_group_5';

const CollectionGroupSectionContent = ({ groupId }: { groupId: GroupId }) => {
    const { data: collectionExposureGroupData } = useCollectionExposureGroup({
        groupId,
    });

    const collectionGroups = collectionExposureGroupData?.groups ?? [];

    if (isEmpty(collectionGroups)) {
        return null;
    }

    return (
        <>
            {collectionGroups.map((collectionGroup) => {
                const recipes = collectionGroup?.collection?.recipes ?? [];

                if (isEmpty(recipes)) {
                    return null;
                }

                return (
                    <CollectionSection
                        key={collectionGroup.sno}
                        collectionGroup={collectionGroup}
                    />
                );
            })}
        </>
    );
};

const CollectionGroupSection = ({ groupId }: { groupId: GroupId }) => {
    return (
        <FetchBoundary
            fallback={<CollectionSectionSkeleton />}
            errorFallback={<></>}
        >
            <CollectionGroupSectionContent groupId={groupId} />
        </FetchBoundary>
    );
};

export default CollectionGroupSection;
