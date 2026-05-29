import { isEmpty } from '@fxts/core';
import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { MypageWishSkeleton } from '@/components/mypage/wish/skeleton';
import { ProductCard } from '@/components/product';
import { Button } from '@/shared/ui/button';
import { InputCheckbox } from '@/shared/ui/input';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { toRecentProductCardModel } from '@/entities/product/utils/mapper';
import { useProductProfileMutation } from '@/hooks/mutations';
import { useRecentViewProductList } from '@/hooks/suspenseQuery/product/profile';
import { useToast } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/mypage/recent-products/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

export const MypageRecentProductsContent = () => {
    const { t } = useTranslation();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const [selected, setSelected] = useState<Set<number>>(() => new Set());

    const { data: recentViewProductListData } = useRecentViewProductList({
        searchParams: {
            soldout: true,
            hasOptionValues: false,
            hasMaxCouponAmt: false,
        },
    });

    const recentViewProductList = useMemo(() => {
        return recentViewProductListData ?? [];
    }, [recentViewProductListData]);

    const { productsWithDiscounts, isLoadingAdditionalDiscounts } =
        useProductsWithAdditionalDiscounts(recentViewProductList);

    const isRecentProductsLoading = isLoadingAdditionalDiscounts;

    const totalCount = productsWithDiscounts.length;

    const productNosInList = useMemo(() => {
        return new Set(
            productsWithDiscounts.map((product) => product.productNo),
        );
    }, [productsWithDiscounts]);

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

        return selectedInList.size === recentViewProductList.length;
    }, [recentViewProductList.length, selectedInList.size]);

    const onSelectAllChange = useCallback(
        (checked: boolean) => {
            if (checked) {
                setSelected(
                    new Set(
                        productsWithDiscounts.map(
                            (product) => product.productNo,
                        ),
                    ),
                );
                return;
            }

            setSelected(new Set());
        },
        [productsWithDiscounts],
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

                <div
                    className={card.metaRow}
                    style={{ marginTop: 0, marginBottom: 12 }}
                >
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

                <div
                    className={card.list}
                    style={{
                        opacity: isRecentProductsLoading ? 0.5 : 1,
                        transition: 'opacity 0.2s',
                    }}
                >
                    {!isEmpty(productsWithDiscounts) ? (
                        <ul className={styles.productGrid}>
                            {productsWithDiscounts.map((product) => (
                                <li
                                    key={product.productNo}
                                    className={styles.productGridItem}
                                >
                                    <div className={styles.cardSelectWrap}>
                                        <div
                                            className={styles.checkboxAnchor}
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
                                                onCheckedChange={(checked) => {
                                                    toggleProductSelect(
                                                        product.productNo,
                                                        checked,
                                                    );
                                                }}
                                            />
                                        </div>
                                        <ProductCard
                                            {...toRecentProductCardModel(
                                                product,
                                            )}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <NoResult text={t('최근 본 상품 내역이 없습니다.')} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default function MypageRecentProductsPage() {
    return (
        <>
            <Seo title='최근 본 상품' noindex={true} />
            <ShopbyAsyncBoundary fallback={<MypageWishSkeleton />}>
                <MypageRecentProductsContent />
            </ShopbyAsyncBoundary>
        </>
    );
}

MypageRecentProductsPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
