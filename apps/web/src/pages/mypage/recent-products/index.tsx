import { isEmpty } from '@fxts/core';
import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import ProductCard from '@/components/product/card';
import { Button } from '@/components/ui/button';
import InputCheckbox from '@/components/ui/input/checkbox';
import { useProductProfileMutation } from '@/hooks/mutations';
import { useRecentViewProductList } from '@/hooks/query/product/profile';
import { useToast } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import type { RecentViewProductsContents } from '@/models/product/profile';
import * as styles from '@/pages/mypage/recent-products/index.css';

const pickListImages = (product: RecentViewProductsContents) => {
    if (!isEmpty(product.listImageUrlInfo)) {
        return [product.listImageUrlInfo];
    }

    return [product.imageUrlInfo];
};

const toProductCardModel = (product: RecentViewProductsContents) => {
    return {
        productNo: product.productNo,
        productName: product.productName,
        imageUrlInfo: pickListImages(product),
        brandNo: product.brandNo,
        brandName:
            product.brandNameKo ||
            product.brandNameEn ||
            product.brandName ||
            '',
        stickerInfos: product.stickerInfos ?? [],
        likeCount: product.likeCount,
        liked: product.liked,
        reviewRating: product.reviewRating,
        totalReviewCount: product.totalReviewCount,
        salePrice: product.salePrice,
        immediateDiscountAmt: product.immediateDiscountAmt,
        additionDiscountAmt: product.additionDiscountAmt,
    };
};

export const MypageRecentProducts = () => {
    const { t } = useTranslation();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const [selected, setSelected] = useState<Set<number>>(() => new Set());

    const { data: recentViewProductListData, isLoading } =
        useRecentViewProductList({
            searchParams: {
                soldout: true,
                hasOptionValues: true,
                hasMaxCouponAmt: true,
            },
        });

    const recentViewProductList = useMemo(() => {
        return recentViewProductListData ?? [];
    }, [recentViewProductListData]);

    const totalCount = recentViewProductList.length;

    const productNosInList = useMemo(() => {
        return new Set(
            recentViewProductList.map((product) => product.productNo),
        );
    }, [recentViewProductList]);

    const selectedInList = useMemo(() => {
        return new Set(
            [...selected].filter((productNo) =>
                productNosInList.has(productNo),
            ),
        );
    }, [selected, productNosInList]);

    const selectAllCheckboxState = useMemo(() => {
        if (recentViewProductList.length === 0) {
            return false;
        }

        if (selectedInList.size === recentViewProductList.length) {
            return true;
        }

        return false;
    }, [recentViewProductList.length, selectedInList.size]);

    const onSelectAllChange = useCallback(
        (checked: boolean) => {
            if (checked) {
                setSelected(
                    new Set(
                        recentViewProductList.map(
                            (product) => product.productNo,
                        ),
                    ),
                );
                return;
            }

            setSelected(new Set());
        },
        [recentViewProductList],
    );

    const toggleProductSelect = useCallback(
        (productNo: number, checked: boolean) => {
            setSelected((previous) => {
                const next = new Set(previous);

                if (checked) {
                    next.add(productNo);
                } else {
                    next.delete(productNo);
                }

                return next;
            });
        },
        [],
    );

    const {
        deleteRecentView: { mutateAsync: deleteRecentViewAsync },
    } = useProductProfileMutation();

    const onDeleteSelected = useCallback(async () => {
        if (selectedInList.size === 0) {
            return;
        }

        const agreed = await openAsyncDialog({
            type: 'confirm',
            message: t('선택한 상품을 삭제하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!agreed) {
            return;
        }

        try {
            await Promise.allSettled(
                [...selectedInList].map((productNo) =>
                    deleteRecentViewAsync({ data: { productNo } }),
                ),
            );
        } catch (error) {
            console.error(error);
        }

        setSelected(new Set());
        addToast({ message: t('선택한 상품을 삭제했습니다.') });
    }, [addToast, deleteRecentViewAsync, openAsyncDialog, selectedInList, t]);

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={styles.actionsWrapper}>
                    <label
                        className={styles.selectAllLabel}
                        htmlFor='recent-select-all'
                    >
                        <InputCheckbox
                            id='recent-select-all'
                            checked={selectAllCheckboxState}
                            disabled={recentViewProductList.length === 0}
                            onCheckedChange={onSelectAllChange}
                        />
                        <span>{t('전체선택')}</span>
                    </label>

                    <Button
                        type='button'
                        frame='text'
                        className={styles.deleteButton}
                        disabled={selectedInList.size === 0}
                        onClick={onDeleteSelected}
                    >
                        {t('선택삭제')}
                    </Button>
                </div>

                <div className={card.metaRow} style={{ marginTop: 0 }}>
                    <div className={card.metaRowLeft}>
                        <span
                            className={card.count}
                            dangerouslySetInnerHTML={{
                                __html: t('총 <b>{{totalCount}}</b>개', {
                                    totalCount,
                                }),
                            }}
                        />
                    </div>
                </div>

                <div className={card.list}>
                    <LoadingWrapper isLoading={isLoading}>
                        {!isEmpty(recentViewProductList) ? (
                            <ul className={styles.productGrid}>
                                {recentViewProductList.map((product) => (
                                    <li
                                        key={product.productNo}
                                        className={styles.productGridItem}
                                    >
                                        <div className={styles.cardSelectWrap}>
                                            <div
                                                className={
                                                    styles.checkboxAnchor
                                                }
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                }}
                                                onPointerDown={(event) => {
                                                    event.stopPropagation();
                                                }}
                                            >
                                                <InputCheckbox
                                                    id={`recent-product-${product.productNo}`}
                                                    checked={selectedInList.has(
                                                        product.productNo,
                                                    )}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) => {
                                                        toggleProductSelect(
                                                            product.productNo,
                                                            checked,
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <ProductCard
                                                {...toProductCardModel(product)}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NoResult
                                text={t('최근 본 상품 내역이 없습니다.')}
                            />
                        )}
                    </LoadingWrapper>
                </div>
            </section>
        </div>
    );
};

MypageRecentProducts.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageRecentProducts;
