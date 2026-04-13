import Link from 'next/link';

import { ProductListFilter } from '@/components/product-list/filter';
import * as styles from '@/components/product-list/side-bar/index.css';
import { useCategoryMenu } from '@/hooks/utils/useCategoryMenu';

type ProductListSideBarProps = {
    categoryNo?: number;
};

export const ProductListSideBar = ({ categoryNo }: ProductListSideBarProps) => {
    const { depth2CategoryLabel, depth3CategoryList, depth3CategoryNo } =
        useCategoryMenu();

    return (
        <aside className={styles.sidebar}>
            <h1 className={styles.depth2Title}>{depth2CategoryLabel}</h1>

            <ul className={styles.depth3CategoryList}>
                {depth3CategoryList.map((depth3Category) => (
                    <li
                        key={`depth3category-${depth3Category.categoryNo}`}
                        className={styles.depth3CategoryListItem}
                        data-selected={
                            depth3CategoryNo === depth3Category.categoryNo
                                ? 'true'
                                : undefined
                        }
                    >
                        <Link href={`/categories/${depth3Category.categoryNo}`}>
                            {depth3Category.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <ProductListFilter categoryNo={categoryNo} />
        </aside>
    );
};
