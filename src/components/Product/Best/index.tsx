import Link from 'next/link';

import product from '@/api/product/product';
import { PATHS } from '@/const/paths';
import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';

export default async function BestProductList() {
    const { t } = await getTranslation();

    const data = await product.getBestSellerProducts();
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
