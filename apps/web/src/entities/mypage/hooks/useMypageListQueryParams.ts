import dayjs from 'dayjs';
import {
    type Nullable,
    type UseQueryStatesKeysMap,
    type Values,
    useQueryStates,
} from 'nuqs';

import {
    parseAsPositiveInt,
    parseAsYmd,
} from '@/entities/mypage/utils/parsers';

interface UseMypageListQueryParamsOptions {
    defaultMonths?: number;
    shallow?: boolean;
    history?: 'push' | 'replace';
}

type SetQueryOptions = {
    resetPage?: boolean;
};

type DefaultQuery = {
    startYmd: string;
    endYmd: string;
    pageNumber: number;
};

/**
 * 마이페이지 리스트 쿼리(기간/페이지 + extra 스키마)를 단일 setQuery로 관리.
 *
 * - patch에서 키가 없으면 변경 없음
 * - 값이 null이면 URL에서 제거
 * - resetPage=true면 pageNumber=1 자동 포함
 */
export const useMypageListQueryParams = <
    const TExtra extends UseQueryStatesKeysMap = Record<never, never>,
>(
    extra?: TExtra,
    options?: UseMypageListQueryParamsOptions,
) => {
    const defaultMonths = options?.defaultMonths ?? 3;
    const shallow = options?.shallow ?? true;
    const history = options?.history ?? 'push';

    const defaultStartYmd = dayjs()
        .subtract(defaultMonths, 'month')
        .format('YYYY-MM-DD');
    const defaultEndYmd = dayjs().format('YYYY-MM-DD');

    const defaultQuery = {
        startYmd: parseAsYmd.withDefault(defaultStartYmd),
        endYmd: parseAsYmd.withDefault(defaultEndYmd),
        pageNumber: parseAsPositiveInt.withDefault(1),
    } satisfies UseQueryStatesKeysMap<DefaultQuery>;

    type DefaultKeyMap = typeof defaultQuery;
    type KeyMap = DefaultKeyMap & TExtra;
    type Query = Values<KeyMap>;

    const keyMap = { ...defaultQuery, ...(extra ?? {}) } as KeyMap;

    const [query, setQueryStates] = useQueryStates<KeyMap>(keyMap, {
        shallow,
        history,
    });

    const setQuery = (
        patch: Partial<Nullable<Query>>,
        setOptions?: SetQueryOptions,
    ) => {
        const next: Partial<Nullable<Query>> = {
            ...patch,
            ...(setOptions?.resetPage
                ? ({ pageNumber: 1 } as Partial<Nullable<Query>>)
                : {}),
        };

        return setQueryStates(next);
    };

    return [query, setQuery] as const;
};
