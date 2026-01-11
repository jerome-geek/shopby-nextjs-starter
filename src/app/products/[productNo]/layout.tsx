import { getCachedProductDetail } from '@/api/product/product.server';
import productProfile from '@/api/product/profile';
import GuestRecentViewProductLogger from '@/components/product/GuestRecentViewProductLogger';
import ProductMainImage from '@/components/product/MainImage';
import ProductInfo from '@/components/product/ProductInfo';
import { css } from '@/styled-system/css';
import { isAuthenticated } from '@/utils/auth.server';
import { notFound } from 'next/navigation';

type ProductDetailLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ productNo: string }>;
};

export default async function ProductDetailLayout({
    children,
    params,
}: ProductDetailLayoutProps) {
    console.log(
        '🏠 [LAYOUT RENDERED] - This should stay static during tab switches',
    );
    const { productNo: productNoStr } = await params;
    const productNo = Number(productNoStr);

    if (isNaN(productNo) || productNo <= 0) {
        return notFound();
    }

    const productDetailData = await getCachedProductDetail(productNo, {
        preview: false,
    });

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

            <section
                className={css({
                    display: 'grid',
                    gridTemplateColumns: { base: '1fr', md: '1fr 486px' },
                    gap: { base: '40px', md: '24px' },
                    alignItems: 'start',
                    justifyContent: 'center',
                })}
            >
                {/* 1. 상품 이미지 영역 */}
                <div
                    className={css({
                        gridColumn: { md: '1' },
                        gridRow: { md: '1' },
                        width: '100%',
                        maxWidth: { md: '690px' },
                        margin: { md: '0 auto' },
                        display: 'flex',
                        justifyContent: 'center',
                    })}
                >
                    <ProductMainImage
                        imageUrls={productDetailData.baseInfo.imageUrls}
                    />
                </div>

                {/* 2. 상품 구매 정보 영역 (Sticky) */}
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
                            padding: '20px',
                        })}
                    >
                        <ProductInfo
                            params={params}
                            searchParams={Promise.resolve({})}
                        />
                    </div>
                </aside>

                {/* 3. 가변 영역 (Children: Tab & Content) */}
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
                    {children}
                </div>
            </section>
        </article>
    );
}
