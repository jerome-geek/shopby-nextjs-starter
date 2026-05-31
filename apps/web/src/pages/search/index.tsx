import { ProductListSearchInput } from '@/features/product/list/search-input';
import Seo from '@/shared/components/common/seo';
import { Column } from '@/shared/ui/layout/flex';
import { SearchBodyContainer } from '@/features/search/components/search-body-container';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/search/index.css';

const Search = () => {
    const { isTablet } = useResponsive();

    return (
        <Column style={{ gap: '90px', paddingTop: isTablet ? '0' : '66px' }}>
            <Seo title='검색' />
            {!isTablet && (
                <div className={styles.searchInputContainer}>
                    <ProductListSearchInput syncKeywordFromUrl />
                </div>
            )}

            <SearchBodyContainer />
        </Column>
    );
};

export default Search;
