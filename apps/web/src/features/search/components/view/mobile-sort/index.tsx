import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SortBottomSheet } from '@/shared/overlay/sort/bottom-sheet';
import * as mobileFilterStyles from '@/features/product/list/mobile-filter/index.css';
import * as styles from '@/features/search/components/view/mobile-sort/index.css';
import type { SearchSortOption } from '@/const/recipe';
import type { OrderDirectionType } from '@/models';

type SearchMobileSortProps<TSortBy extends string> = {
    orderQueryKey: string;
    sortByQueryKey: string;
    pageQueryKey?: string;
    sortOptions: SearchSortOption<TSortBy>[];
};

const parseOrderDirectionParam = (
    value: string | string[] | undefined,
): OrderDirectionType => {
    const raw = Array.isArray(value) ? value[0] : value;

    if (raw === 'ASC' || raw === 'DESC') {
        return raw;
    }

    return 'DESC';
};

const parseSortByParam = <TSortBy extends string>(
    value: string | string[] | undefined,
    fallback: TSortBy,
): TSortBy => {
    const raw = Array.isArray(value) ? value[0] : value;

    return raw ? (raw as TSortBy) : fallback;
};

export const SearchMobileSort = <TSortBy extends string>({
    orderQueryKey,
    sortByQueryKey,
    pageQueryKey,
    sortOptions,
}: SearchMobileSortProps<TSortBy>) => {
    const { t } = useTranslation();

    const router = useRouter();

    const orderQuery = router.query[orderQueryKey];
    const sortByQuery = router.query[sortByQueryKey];

    const sortOrder = useMemo(
        () => parseOrderDirectionParam(orderQuery),
        [orderQuery],
    );
    const sortBy = useMemo(
        () => parseSortByParam(sortByQuery, sortOptions[0].sortBy),
        [sortByQuery, sortOptions],
    );

    const selectedSortOption = useMemo(
        () =>
            sortOptions.find(
                (o) => o.order === sortOrder && o.sortBy === sortBy,
            ) ?? sortOptions[0],
        [sortBy, sortOptions, sortOrder],
    );

    const sortLabel = t(selectedSortOption.name);

    const openSortBottomSheet = () => {
        overlay.open((props) => (
            <SortBottomSheet
                {...props}
                queryOptions={sortOptions.map((o) => ({
                    id: o.id,
                    name: o.name,
                }))}
                selectedQueryOption={{
                    id: selectedSortOption.id,
                    name: selectedSortOption.name,
                }}
                onQueryChange={(option) => {
                    const next = sortOptions.find((o) => o.id === option.id);

                    if (!next) {
                        return;
                    }

                    router.replace(
                        {
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                [orderQueryKey]: next.order,
                                [sortByQueryKey]: next.sortBy,
                                ...(pageQueryKey && { [pageQueryKey]: '1' }),
                            },
                        },
                        undefined,
                        { shallow: true },
                    );
                }}
            />
        ));
    };

    return (
        <div className={mobileFilterStyles.filterSwiper}>
            <div className={styles.sortBarInner}>
                <div className={mobileFilterStyles.filterPill()}>
                    <button
                        type='button'
                        className={mobileFilterStyles.filterPillMain}
                        onClick={openSortBottomSheet}
                    >
                        <span className={mobileFilterStyles.filterPillLabel}>
                            {sortLabel}
                        </span>
                    </button>
                    <div className={mobileFilterStyles.filterPillTrailing}>
                        <ChevronDown size={16} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </div>
    );
};
