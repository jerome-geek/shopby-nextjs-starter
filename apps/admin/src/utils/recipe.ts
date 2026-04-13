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

import { RECIPE_GROUP_ID_OPTIONS } from '@/const/recipe';
import type { RecipeExposureGroup } from '@/model/recipe';

type ExposureLocationGroupTuple = [string, RecipeExposureGroup[]];

const EXPOSURE_LOCATION_ORDER: string[] = [
    'recipe_group_1',
    'recipe_group_2',
    'recipe_group_3',
];

export const isProcessingRecipe = (
    title: string,
    authorName: string,
): boolean => {
    if (title === '레시피 생성 중' && authorName === null) {
        return true;
    }

    return false;
};

export const exposureLocationLabel = (exposureLocation: string): string =>
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
                key as string,
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
