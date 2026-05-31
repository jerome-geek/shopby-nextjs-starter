import { useMemo } from 'react';

import { CollectionCard } from '@/components/collection/collection-card';
import * as integratedStyles from '@/features/search/components/view/integrated-results/index.css';
import { Column } from '@/shared/ui/layout/flex';
import {
    useInfinitePublicCollectionSearch,
    usePublicCollectionSearch,
} from '@/hooks/query/shop/collection';
import { useResponsive } from '@/hooks/utils';

type CollectionRecommendSectionProps = {
    enabled: boolean;
};

export const CollectionRecommendSection = ({
    enabled,
}: CollectionRecommendSectionProps) => {
    const { isTablet } = useResponsive();

    const { data: infiniteCollectionData } = useInfinitePublicCollectionSearch({
        searchParams: {
            order: 'DESC',
            sortBy: 'BOOKMARK_COUNT',
            take: 2,
        },
        options: {
            enabled,
        },
    });

    const { data: collectionData } = usePublicCollectionSearch({
        searchParams: {
            order: 'DESC',
            sortBy: 'BOOKMARK_COUNT',
            page: 1,
            take: 2,
        },
        options: {
            enabled,
        },
    });

    const collectionList = useMemo(() => {
        if (isTablet) {
            return (
                infiniteCollectionData?.pages.flatMap((page) => page.data) ?? []
            );
        }

        return collectionData?.data ?? [];
    }, [collectionData, infiniteCollectionData, isTablet]);

    return (
        <Column gap='12px'>
            <h3 className={integratedStyles.productSectionTitle}>
                이 컬렉션은 어떠세요?
            </h3>
            <div className={integratedStyles.collectionRecommendContainer}>
                {collectionList.map((collection) => (
                    <div
                        key={collection.sno}
                        style={!isTablet ? { flex: '1' } : { width: '100%' }}
                    >
                        <CollectionCard collection={collection} />
                    </div>
                ))}
            </div>
        </Column>
    );
};
