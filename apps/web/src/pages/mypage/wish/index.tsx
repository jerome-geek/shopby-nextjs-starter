import { isEmpty } from '@fxts/core';
import { parseAsInteger, useQueryState } from 'nuqs';
import {
    type ReactNode,
    useCallback,
    useMemo,
    useState,
    useTransition,
} from 'react';
import { useTranslation } from 'react-i18next';

import FetchBoundary from '@/components/common/FetchBoundary';
import { NoResult } from '@/components/common/no-result';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { MypageWishSkeleton } from '@/components/mypage/wish/skeleton';
import { ProductCard } from '@/components/product';
import { Button } from '@/components/ui/button';
import { InputCheckbox } from '@/components/ui/input';
import Paging from '@/components/ui/paging';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { toWishProductCardModel } from '@/entities/product/utils/mapper';
import { useProductProfileMutation } from '@/hooks/mutations';
import { useLikeProductList } from '@/hooks/suspenseQuery/product/profile';
import { useToast } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/mypage/wish/index.css';

const PAGE_SIZE = 10;

const MypageWishContent = () => {
    const { t } = useTranslation();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const [isPending, startTransition] = useTransition();
    const [pageNumber, setPageNumber] = useQueryState(
        'pageNumber',
        parseAsInteger.withDefault(1).withOptions({ shallow: true }),
    );

    const [selected, setSelected] = useState<Set<number>>(() => new Set());

    const {
        like: { mutate: updateLikesMutate, isPending: isUnlikePending },
    } = useProductProfileMutation();

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
        }),
        [pageNumber],
    );

    const { data: likeListData } = useLikeProductList({
        searchParams,
    });

    const productList = useMemo(() => {
        return likeListData?.items ?? [];
    }, [likeListData]);

    const { productsWithDiscounts, isLoadingAdditionalDiscounts } =
        useProductsWithAdditionalDiscounts(productList);

    const isLikeListLoading = isLoadingAdditionalDiscounts;

    const totalCount = useMemo(() => {
        return likeListData?.totalCount ?? 0;
    }, [likeListData]);

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
        if (productList.length === 0) {
            return false;
        }

        if (selectedInList.size === productList.length) {
            return true;
        }

        return false;
    }, [productList.length, selectedInList.size]);

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

    const onDeleteSelected = useCallback(async () => {
        if (selectedInList.size === 0) {
            return;
        }

        const agreed = await openAsyncDialog({
            type: 'confirm',
            message: t('선택한 상품을 찜 목록에서 삭제하시겠습니까?'),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!agreed) {
            return;
        }

        const items = [...selectedInList].map((productNo) => ({
            productNo,
            like: 'N' as const,
        }));

        updateLikesMutate(
            { data: { items } },
            {
                onSuccess: () => {
                    setSelected(new Set());
                    addToast({
                        message: t('선택한 상품을 찜 목록에서 삭제했습니다.'),
                    });
                },
            },
        );
    }, [addToast, openAsyncDialog, selectedInList, t, updateLikesMutate]);

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={styles.actionsWrapper}>
                    <label
                        className={styles.selectAllLabel}
                        htmlFor='wish-select-all'
                    >
                        <InputCheckbox
                            id='wish-select-all'
                            checked={selectAllCheckboxState}
                            disabled={productList.length === 0}
                            onCheckedChange={onSelectAllChange}
                        />
                        <span>{t('전체선택')}</span>
                    </label>

                    <Button
                        type='button'
                        frame='text'
                        className={styles.deleteButton}
                        disabled={selectedInList.size === 0 || isUnlikePending}
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
                        opacity: isPending || isLikeListLoading ? 0.5 : 1,
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
                                                id={`wish-product-${product.productNo}`}
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
                                            {...toWishProductCardModel(product)}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <NoResult text={t('찜한 아이템이 없습니다.')} />
                    )}
                </div>

                <div className={card.paging}>
                    <Paging
                        currentPage={pageNumber}
                        totalCount={totalCount}
                        pageSize={PAGE_SIZE}
                        onPageClick={(page) => {
                            startTransition(() => {
                                setPageNumber(page);
                            });
                        }}
                    />
                </div>
            </section>
        </div>
    );
};

export default function MypageWishPage() {
    return (
        <FetchBoundary fallback={<MypageWishSkeleton />}>
            <MypageWishContent />
        </FetchBoundary>
    );
}

MypageWishPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
