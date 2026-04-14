import { isEmpty } from '@fxts/core';

import FetchBoundary from '@/components/common/FetchBoundary';
import CollectionSection from '@/components/section/collection-group/collection';

type GroupId =
    | 'collection_group_1'
    | 'collection_group_2'
    | 'collection_group_3'
    | 'collection_group_4'
    | 'collection_group_5';

const CollectionSectionSkeleton = () => {
    return <div></div>;
};

const CollectionGroupSectionSkeleton = () => {
    return (
        <section>
            <CollectionSectionSkeleton />
            <CollectionSectionSkeleton />
        </section>
    );
};

const CollectionGroupSectionContent = ({ groupId }: { groupId: GroupId }) => {
    const data: never[] = [];

    if (isEmpty(data)) {
        return null;
    }

    console.log('groupId', groupId);

    return (
        <section>
            {data.map((group, index) => (
                <CollectionSection key={index} group={group} />
            ))}
        </section>
    );
};

const CollectionGroupSection = ({ groupId }: { groupId: GroupId }) => {
    return (
        <FetchBoundary fallback={<CollectionGroupSectionSkeleton />}>
            <CollectionGroupSectionContent groupId={groupId} />
        </FetchBoundary>
    );
};

export default CollectionGroupSection;
