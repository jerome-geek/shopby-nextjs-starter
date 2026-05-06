import { filter, map, pipe, takeRight, toArray } from '@fxts/core';

const SCROLL_STORAGE_KEY = 'route-scroll-positions';
const MAX_SCROLL_ENTRIES = 10;

export type ScrollStorage = {
    positions: Record<string, number>;
    order: string[];
};

const EMPTY_STORAGE = { positions: {}, order: [] };

export const readScrollStorage = (): ScrollStorage => {
    try {
        const stored = sessionStorage.getItem(SCROLL_STORAGE_KEY);

        if (!stored) {
            return EMPTY_STORAGE;
        }

        const parsed = JSON.parse(stored) as unknown;

        if (
            parsed &&
            typeof parsed === 'object' &&
            'positions' in parsed &&
            'order' in parsed
        ) {
            const typed = parsed as ScrollStorage;
            return {
                positions: typed.positions ?? {},
                order: Array.isArray(typed.order) ? typed.order : [],
            };
        }
    } catch (error) {
        console.error(error);
    }

    return EMPTY_STORAGE;
};

export const writeScrollStorage = (storage: ScrollStorage) => {
    try {
        sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(storage));
    } catch (e) {
        console.error(e);
    }
};

/** 경로별 스크롤 위치 저장 → 순서 갱신 → 최대 개수 제한을 한 번에 적용 */
export const updateScrollStorage = (path: string, scroll: number) => {
    const storage = readScrollStorage();

    const updated: ScrollStorage = pipe(
        storage,
        (s) => ({ ...s, positions: { ...s.positions, [path]: scroll } }),
        (s) => ({
            ...s,
            order: pipe(
                s.order,
                filter((p) => p !== path),
                toArray,
                (order) => [...order, path],
            ),
        }),
        (s) => {
            const nextOrder = pipe(
                s.order,
                takeRight(MAX_SCROLL_ENTRIES),
                toArray,
            );
            const nextPositions = Object.fromEntries(
                pipe(
                    nextOrder,
                    map((key) => {
                        const val = s.positions[key];
                        return val === undefined ? null : ([key, val] as const);
                    }),
                    filter((e) => e !== null),
                    toArray,
                ),
            );
            return { positions: nextPositions, order: nextOrder };
        },
    );

    writeScrollStorage(updated);
};
