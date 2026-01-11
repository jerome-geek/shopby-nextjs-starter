import { filter, flatMap, join, map, pipe, prop, toArray } from '@fxts/core';
import { notFound } from 'next/navigation';

import { getCachedProductDetail } from '@/api/product/product.server';
import CategoryBestProducts from '@/components/product/detail/category-best-products';
import ProductDescription from '@/components/product/detail/Description';
import ProductDetailTab, { Tab } from '@/components/product/detail/Tab';
import { css } from '@/styled-system/css';
import DutyInfo from '@/components/product/detail/DutyInfo';
import { vstack } from '@/styled-system/patterns';
import PartnerInfo from '@/components/product/detail/PartnerInfo';
import ProductInquiry from '@/components/product/detail/product-inquiry';

type ProductDetailPageProps = AppPageProps<'/products/[productNo]'>;

export default async function ProductDetailPage(props: ProductDetailPageProps) {
    const params = await props.params;
    const productNo = Number(params.productNo);

    if (isNaN(productNo) || productNo <= 0) {
        return notFound();
    }

    const searchParams = await props.searchParams;
    const tab = searchParams.tab;

    const productDetailData = await getCachedProductDetail(productNo, {
        preview: false,
    });
    console.log(
        '🚀 ~ ProductDetailPage ~ productDetailData:',
        productDetailData,
    );
    const categoryNos = pipe(
        productDetailData,
        prop('categories'),
        filter((a) => a.representativeYn === 'Y'),
        flatMap((b) => b.categories),
        map((c) => c.categoryNo),
        toArray,
    );
    console.log('🚀 ~ ProductDetailPage ~ categoryNos:', categoryNos);

    const {
        contentHeader = '',
        content = '',
        contentFooter = '',
    } = productDetailData.baseInfo;

    const productContent = pipe(
        [contentHeader, content, contentFooter],
        filter((a) => !!a),
        join(''),
    );

    const TABS: Tab[] = [
        { id: 'info', label: '상품 정보' },
        {
            id: 'review',
            label: '리뷰',
            count: productDetailData.counter.reviewCnt,
        },
        {
            id: 'qna',
            label: '문의',
            count: productDetailData.counter.inquiryCnt,
        },
    ];

    return (
        <>
            <ProductDetailTab tabs={TABS} />

            <div
                className={css({
                    padding: '40px 0',
                })}
            >
                {(!tab || tab === 'info') && (
                    <div
                        role='tabpanel'
                        id='tabpanel-info'
                        aria-labelledby='tab-info'
                        className={vstack({
                            gap: '10px',
                            alignItems: 'stretch',
                        })}
                    >
                        <ProductDescription threshold={500}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: productContent,
                                }}
                            />
                        </ProductDescription>

                        <CategoryBestProducts categoryNos={categoryNos} />

                        <DutyInfo
                            dutyInfo={productDetailData.baseInfo.dutyInfo}
                        />

                        <PartnerInfo partner={productDetailData.partner} />
                    </div>
                )}

                {tab === 'review' && (
                    <div
                        role='tabpanel'
                        id='tabpanel-review'
                        aria-labelledby='tab-review'
                    >
                        <h3>리뷰 ({productDetailData.counter.reviewCnt})</h3>
                        <p>리뷰 목록이 여기에 표시됩니다.</p>
                    </div>
                )}

                {tab === 'qna' && (
                    <div
                        role='tabpanel'
                        id='tabpanel-qna'
                        aria-labelledby='tab-qna'
                    >
                        <ProductInquiry productNo={productNo} />
                    </div>
                )}
            </div>
        </>
    );
}
