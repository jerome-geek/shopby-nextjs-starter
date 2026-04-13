import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SortBottomSheet } from '@/components/bottom-sheet/sort';
import * as mobileFilterStyles from '@/components/product-list/mobile-filter/index.css';
import * as styles from '@/components/search/mobile-sort/index.css';
import { RECIPE_SORT_OPTIONS } from '@/const/recipe';
import type { OrderDirectionType } from '@/models';

export type SearchMobileSortProps = {
    queryKey: string;
    pageQueryKey?: string;
};

const parseOrderDirectionParam = (
    value: string | string[] | undefined,
): OrderDirectionType => {
    const raw = Array.isArray(value) ? value[0] : value;

    if (raw === 'ASC' || raw === 'DESC') {
        return raw;
    }

    return 'ASC';
};

export const SearchMobileSort = ({
    queryKey,
    pageQueryKey,
}: SearchMobileSortProps) => {
    const { t } = useTranslation();

    const router = useRouter();

    const orderQuery = router.query[queryKey];

    const sortOrder = useMemo(
        () => parseOrderDirectionParam(orderQuery),
        [orderQuery],
    );

    const selectedSortOption = useMemo(
        () =>
            RECIPE_SORT_OPTIONS.find((o) => o.order === sortOrder) ??
            RECIPE_SORT_OPTIONS[0],
        [sortOrder],
    );

    const sortLabel = t(selectedSortOption.name);

    const openSortBottomSheet = () => {
        overlay.open((props) => (
            <SortBottomSheet
                {...props}
                queryOptions={RECIPE_SORT_OPTIONS.map((o) => ({
                    id: o.id,
                    name: o.name,
                }))}
                selectedQueryOption={{
                    id: selectedSortOption.id,
                    name: selectedSortOption.name,
                }}
                onQueryChange={(option) => {
                    const next = RECIPE_SORT_OPTIONS.find(
                        (o) => o.id === option.id,
                    );

                    if (!next) {
                        return;
                    }

                    router.replace(
                        {
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                [queryKey]: next.order,
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
