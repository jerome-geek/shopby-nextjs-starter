import { includes, isEmpty } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { ProductCard } from '@/components/product';
import { Button } from '@/components/ui/button';
import { InputCheckbox } from '@/components/ui/input';
import Paging from '@/components/ui/paging';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { toWishProductCardModel } from '@/entities/product/utils/mapper';
import { useProductProfileMutation } from '@/hooks/mutations';
import useLikeProductList from '@/hooks/query/product/profile/useLikeProductList';
import { productKeys, productProfileKeys } from '@/hooks/queryKeys';
import { useToast } from '@/hooks/ui';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/mypage/wish/index.css';
const PAGE_SIZE = 20;

export const MypageWish = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const [selected, setSelected] = useState<Set<number>>(() => new Set());

    const pageNumber = Number(router.query.pageNumber) || 1;

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

    const { data: likeListData, isLoading: isRawLikeListLoading } =
        useLikeProductList({
            searchParams,
        });

    const productList = useMemo(() => {
        return likeListData?.items ?? [];
    }, [likeListData]);

    const { productsWithDiscounts, isLoadingAdditionalDiscounts } =
        useProductsWithAdditionalDiscounts(productList);

    const isLikeListLoading =
        isRawLikeListLoading || isLoadingAdditionalDiscounts;

    const totalCount = useMemo(() => {
        return likeListData?.totalCount ?? 0;
    }, [likeListData]);

    const setQuery = useCallback(
        (next: Record<string, string | number | undefined>) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        ...next,
                        ...(next.pageNumber ? {} : { pageNumber: 1 }),
                    },
                },
                undefined,
                { shallow: true },
            );
        },
        [router],
    );

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

    const invalidateProductLikeQueries = useCallback(() => {
        queryClient.invalidateQueries({
            predicate: (query) =>
                includes(query.queryKey[0], [
                    ...productKeys.all,
                    ...productProfileKeys.all,
                ]),
            refetchType: 'all',
        });
    }, [queryClient]);

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
                    invalidateProductLikeQueries();
                    setSelected(new Set());
                    addToast({
                        message: t('선택한 상품을 찜 목록에서 삭제했습니다.'),
                    });
                },
            },
        );
    }, [
        addToast,
        invalidateProductLikeQueries,
        openAsyncDialog,
        selectedInList,
        t,
        updateLikesMutate,
    ]);

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

                <div className={card.list}>
                    <LoadingWrapper isLoading={isLikeListLoading}>
                        {!isEmpty(productsWithDiscounts) ? (
                            <ul className={styles.productGrid}>
                                {productsWithDiscounts.map((product) => (
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
                                                    id={`wish-product-${product.productNo}`}
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
                                                {...toWishProductCardModel(
                                                    product,
                                                )}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <NoResult text={t('찜한 아이템이 없습니다.')} />
                        )}
                    </LoadingWrapper>
                </div>

                <div className={card.paging}>
                    <Paging
                        currentPage={pageNumber}
                        totalCount={totalCount}
                        pageSize={PAGE_SIZE}
                        onPageClick={(page) => {
                            setQuery({ pageNumber: page });
                        }}
                    />
                </div>
            </section>
        </div>
    );
};

MypageWish.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageWish;
