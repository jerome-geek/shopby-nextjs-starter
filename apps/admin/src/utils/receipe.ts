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

import { RECIPE_GROUP_ID_OPTIONS } from '@/const/receipe';
import type { ExposureLocation, RecipeExposureGroup } from '@/model/recipe';

type ExposureLocationGroupTuple = [ExposureLocation, RecipeExposureGroup[]];

const EXPOSURE_LOCATION_ORDER: ExposureLocation[] = [
    'recipe_group_1',
    'recipe_group_2',
    'recipe_group_3',
];

export const exposureLocationLabel = (
    exposureLocation: ExposureLocation,
): string =>
    pipe(
        RECIPE_GROUP_ID_OPTIONS,
        find((option) => option.value === exposureLocation),
        (matched) => matched?.label ?? exposureLocation,
    );

export const groupByExposureLocation = (
    recipeExposureGroups: RecipeExposureGroup[],
): ExposureLocationGroupTuple[] => {
    const grouped = pipe(
        recipeExposureGroups,
        groupBy((item) => item.exposureLocation),
    );

    const sortedEntries = pipe(
        entries(grouped),
        map(
            ([key, groups]): ExposureLocationGroupTuple => [
                key as ExposureLocation,
                sortBy((item) => item.sortOrder, groups),
            ],
        ),
        toArray,
    );

    const byLocation = new Map(sortedEntries);

    const ordered = pipe(
        EXPOSURE_LOCATION_ORDER,
        filter((location) => byLocation.has(location)),
        map(
            (location): ExposureLocationGroupTuple => [
                location,
                byLocation.get(location)!,
            ],
        ),
        toArray,
    );

    const extras = pipe(
        sortedEntries,
        filter(([location]) => !EXPOSURE_LOCATION_ORDER.includes(location)),
        toArray,
    );

    return [...ordered, ...extras];
};
