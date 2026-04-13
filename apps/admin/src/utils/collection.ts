import {
    entries,
    filter,
    find,
    groupBy,
    map,
    pipe,
    sortBy,
    toArray,
} from '@fxts/core';

import { COLLECTION_GROUP_ID_OPTIONS } from '@/const/collection';
import type { CollectionExposureGroup } from '@/model/collection';

type CollectionExposureLocationTuple = [string, CollectionExposureGroup[]];

export const collectionExposureLocationLabel = (exposureLocation: string) =>
    pipe(
        COLLECTION_GROUP_ID_OPTIONS,
        find((option) => option.value === exposureLocation),
        (matched) => matched?.label ?? exposureLocation,
    );

export const groupCollectionExposureByLocation = (
    groups: CollectionExposureGroup[],
): CollectionExposureLocationTuple[] => {
    const grouped = pipe(groups, groupBy((item) => item.exposureLocation));

    const sortedEntries = pipe(
        entries(grouped),
        map(
            ([key, sectionGroups]): CollectionExposureLocationTuple => [
                key as string,
                sortBy((item) => item.sortOrder, sectionGroups),
            ],
        ),
        toArray,
    );

    const byLocation = new Map(sortedEntries);

    const ordered = pipe(
        COLLECTION_GROUP_ID_OPTIONS,
        map((o) => o.value),
        filter((location) => byLocation.has(location)),
        map(
            (location): CollectionExposureLocationTuple => [
                location,
                byLocation.get(location)!,
            ],
        ),
        toArray,
    );

    const known = new Set(
        COLLECTION_GROUP_ID_OPTIONS.map((o) => o.value as string),
    );

    const extras = pipe(
        sortedEntries,
        filter(([location]) => !known.has(location)),
        toArray,
    );

    return [...ordered, ...extras];
};
