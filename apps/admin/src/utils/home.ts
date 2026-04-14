import { map, pipe, range, toArray } from '@fxts/core';

export const DASHBOARD_RECENT_TAKE = 20;
export const DASHBOARD_RECENT_PER_PAGE = 5;

export const chunkBy = <T>(items: T[], size: number): T[][] => {
    if (size <= 0) {
        return [];
    }

    const pageCount = Math.ceil(items.length / size);

    return pipe(
        range(0, pageCount),
        map((page) => items.slice(page * size, (page + 1) * size)),
        toArray,
    );
};

export const formatStatValue = (
    value: number | undefined,
    isLoading: boolean,
    isError: boolean,
) => {
    if (isLoading) {
        return '—';
    }

    if (isError) {
        return '—';
    }

    return (value ?? 0).toLocaleString();
};
