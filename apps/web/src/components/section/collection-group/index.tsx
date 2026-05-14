import { isEmpty } from '@fxts/core';

import FetchBoundary from '@/components/common/FetchBoundary';
import CollectionSection from '@/components/section/collection-group/collection';
import CollectionSectionSkeleton from '@/components/section/collection-group/skeleton';
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

    const groupNo = Number(groupId.split('_')?.[2]) || 0;

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
                        groupNo={groupNo}
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
