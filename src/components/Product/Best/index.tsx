import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { css } from '@/styled-system/css';
import { PATHS } from '@/const/paths';
import product from '@/api/product/product';

export default async function BestProductList() {
    const t = await getTranslations();

    const data = await product.getProductDisplayCategories(131868801);
    console.log('🚀 ~ BestProductList ~ data:', data);

    return (
        <section>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                })}
            >
                <h3>{t('많은 사람들이 구매했어요')}</h3>
                <Link href={PATHS.PRODUCTS.BEST}>{t('베스트 더보기')}</Link>
            </div>

            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>45</li>
                <li>65</li>
            </ul>
        </section>
    );
}
