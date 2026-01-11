import Link from 'next/link';

import { product } from '@/api/product';
import { SearchProductItem } from '@/models/product/product';
import { css } from '@/styled-system/css';
import { flex, hstack } from '@/styled-system/patterns';
import { SmallCaretIcon } from '@/components/icons';
import CategoryBestProductsCarousel from '@/components/product/detail/category-best-products/Carousel';
import { getTranslation } from '@/i18n/server';

interface CategoryBestProductsProps {
    categoryNos: number[];
}

export default async function CategoryBestProducts({
    categoryNos,
}: CategoryBestProductsProps) {
    const { t } = await getTranslation();

    if (!categoryNos || categoryNos.length === 0) {
        return null;
    }

    try {
        const searchProductData = await product
            .searchProducts({
                pageNumber: 1,
                pageSize: 10,
                categoryNos,
                categoryOperator: 'OR',
            })
            .json();

        const products: SearchProductItem[] = searchProductData.items || [];

        if (products.length === 0) {
            return null;
        }

        return (
            <section
                className={css({
                    marginTop: '60px',
                    width: '100%',
                })}
            >
                {/* Header */}
                <header
                    className={flex({
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        marginBottom: '20px',
                        padding: { base: '0 20px', md: '0' },
                    })}
                >
                    <h3
                        className={css({
                            textStyle: 'title2.semibold',
                            color: 'black',
                        })}
                    >
                        {t('이 카테고리의 베스트 아이템')}
                    </h3>
                    <Link
                        href='#'
                        className={hstack({
                            gap: '2px',
                            textStyle: 'headline1.medium',
                            color: 'gray60',
                            textDecoration: 'none',
                            _hover: { textDecoration: 'underline' },
                        })}
                    >
                        <span>{t('베스트 더보기')}</span>
                        <SmallCaretIcon
                            direction='right'
                            width={14}
                            height={14}
                        />
                    </Link>
                </header>

                {/* Swiper 영역만 Client Component로 분리 */}
                <CategoryBestProductsCarousel products={products} />
            </section>
        );
    } catch (error) {
        console.error('Failed to fetch category best products:', error);
        return null;
    }
}
