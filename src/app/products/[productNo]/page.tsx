import { product } from '@/api/product';
import productProfile from '@/api/product/profile';
import GuestRecentViewProductLogger from '@/components/product/GuestRecentViewProductLogger';
import ProductMainImage from '@/components/product/MainImage';
import ProductInfo from '@/components/product/ProductInfo';
import { css } from '@/styled-system/css';
import { isAuthenticated } from '@/utils/auth.server';

type ProductDetailPageProps = AppPageProps<'/products/[productNo]'>;

export default async function ProductDetailPage(props: ProductDetailPageProps) {
    const params = await props.params;
    const productNo = Number(params.productNo) || 0;

    const searchParams = await props.searchParams;
    const channelType = searchParams.channelType;
    const preview = searchParams.preview || false;

    const productDetailData = await product
        .getProductDetail(productNo, {
            preview,
            channelType,
        })
        .json();
    console.log(
        '🚀 ~ ProductDetailPage ~ productDetailData:',
        productDetailData
    );

    const isLogin = await isAuthenticated();

    if (isLogin) {
        productProfile.registerRecentViewProduct({ productNo });
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

            {/* 상품 상단 영역: 이미지 + 기본 정보 */}
            <section
                className={css({
                    display: 'flex',
                    flexDirection: { base: 'column', md: 'row' },
                    gap: '30px',
                    alignItems: 'flex-start',
                })}
            >
                {/* 좌측: 상품 이미지 영역 */}
                <div
                    className={css({
                        flex: 1,
                        width: '100%',
                        minWidth: 0,
                    })}
                >
                    <div
                        className={css({
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        })}
                    >
                        <ProductMainImage
                            imageUrls={productDetailData.baseInfo.imageUrls}
                        />
                    </div>
                </div>

                {/* 우측: 상품 구매 정보 영역 */}
                <div
                    className={css({
                        flex: '1',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
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
                            brand={productDetailData.brand}
                            productName={productDetailData.baseInfo.productName}
                            likeCnt={productDetailData.counter.likeCnt || 0}
                            reviewRate={productDetailData.reviewRate}
                            reviewCnt={productDetailData.counter.reviewCnt || 0}
                        />
                    </div>
                </div>
            </section>

            {/* 상품 하단 영역: 상세 설명, 리뷰 등 (작업 예정) */}
            <div className={css({ marginTop: '80px' })}>
                {/* 하단 탭 영역 들어갈 자리 */}
            </div>
        </article>
    );
}
