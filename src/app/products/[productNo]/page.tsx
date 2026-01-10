import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { getCachedProductDetail } from '@/api/product/product.server';
import productProfile from '@/api/product/profile';
import GuestRecentViewProductLogger from '@/components/product/GuestRecentViewProductLogger';
import ProductMainImage from '@/components/product/MainImage';
import ProductInfo from '@/components/product/ProductInfo';
import { css } from '@/styled-system/css';
import { isAuthenticated } from '@/utils/auth.server';

type ProductDetailPageProps = AppPageProps<'/products/[productNo]'>;

export async function generateMetadata(
    props: ProductDetailPageProps,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const params = await props.params;
    const productNo = Number(params.productNo);

    if (isNaN(productNo) || productNo <= 0) {
        return {};
    }

    const searchParams = await props.searchParams;
    const channelType = searchParams.channelType;
    const preview = searchParams.preview || false;

    const productDetailData = await getCachedProductDetail(productNo, {
        preview,
        channelType,
    });

    return {
        title: productDetailData.baseInfo.productName,
        description: productDetailData.baseInfo.promotionText,
    };
}

export default async function ProductDetailPage(props: ProductDetailPageProps) {
    const params = await props.params;
    const productNo = Number(params.productNo);

    if (isNaN(productNo) || productNo <= 0) {
        return notFound();
    }

    const searchParams = await props.searchParams;
    const channelType = searchParams.channelType;
    const preview = searchParams.preview || false;

    const productDetailData = await getCachedProductDetail(productNo, {
        preview,
        channelType,
    });
    console.log(
        '🚀 ~ ProductDetailPage ~ productDetailData:',
        productDetailData,
    );

    const isLogin = await isAuthenticated();

    if (isLogin) {
        await productProfile.registerRecentViewProduct({
            productNo,
        });
    }

    return (
        <article
            className={css({
                maxWidth: '1280px',
                margin: '0 auto',
                padding: { base: '20px', md: '40px 20px' },
            })}
        >
            {!isLogin && <GuestRecentViewProductLogger productNo={productNo} />}

            {/* CSS Grid 레이아웃: 소스 순서는 모바일 기준(이미지->정보->상세), 데스크탑은 Grid로 재배치 */}
            <section
                className={css({
                    display: 'grid',
                    // 모바일: 1열, 데스크탑: 2열 (좌측 1fr, 우측 486px 고정)
                    gridTemplateColumns: { base: '1fr', md: '1fr 486px' },
                    gap: { base: '40px', md: '24px' },
                    alignItems: 'start',
                    justifyContent: 'center',
                })}
            >
                {/* 1. 상품 이미지 영역 */}
                {/* 데스크탑: 1열 1행 */}
                <div
                    className={css({
                        gridColumn: { md: '1' },
                        gridRow: { md: '1' },
                        width: '100%',
                        maxWidth: { md: '690px' },
                        margin: { md: '0 auto' }, // 좌측 컬럼 내 중앙 정렬 느낌
                        display: 'flex',
                        justifyContent: 'center',
                    })}
                >
                    <ProductMainImage
                        imageUrls={productDetailData.baseInfo.imageUrls}
                    />
                </div>

                {/* 2. 상품 구매 정보 영역 (Sticky) */}
                {/* 모바일: 2번째 순서 (자연스럽게 이미지 아래 위치) */}
                {/* 데스크탑: 2열 전체(1~2행 병합)에 위치하며 Sticky 동작 */}
                <aside
                    className={css({
                        gridColumn: { md: '2' },
                        gridRow: { md: '1 / span 2' },
                        width: '100%',
                        position: { md: 'sticky' },
                        top: { md: '100px' },
                        height: 'fit-content',
                        zIndex: 1,
                    })}
                >
                    <div
                        className={css({
                            minHeight: '400px',
                            backgroundColor: '#fafafa',
                            padding: '20px',
                            border: '1px dashed #ddd',
                        })}
                    >
                        <ProductInfo
                            params={props.params}
                            searchParams={props.searchParams}
                            // brand={productDetailData.brand}
                            // productName={productDetailData.baseInfo.productName}
                            // likeCnt={productDetailData.counter.likeCnt || 0}
                            // reviewRate={productDetailData.reviewRate}
                            // reviewCnt={productDetailData.counter.reviewCnt || 0}
                            // price={productDetailData.price}
                        />
                    </div>
                </aside>

                {/* 3. 상품 상세 설명, 리뷰 등 긴 콘텐츠 */}
                {/* 모바일: 3번째 순서 */}
                {/* 데스크탑: 1열 2행 (이미지 바로 아래) */}
                <div
                    className={css({
                        gridColumn: { md: '1' },
                        gridRow: { md: '2' },
                        width: '100%',
                        maxWidth: { md: '690px' },
                        margin: { md: '0 auto' },
                        minHeight: '1000px',
                    })}
                >
                    <div
                        className={css({
                            borderTop: '1px solid #eee',
                            paddingTop: '40px',
                            marginTop: { md: '60px' }, // 이미지와 상세설명 사이 간격
                        })}
                    >
                        <h3>상품 상세 정보</h3>
                        <p>여기에 긴 상품 상세 설명이 들어갑니다...</p>
                    </div>
                </div>
            </section>
        </article>
    );
}
