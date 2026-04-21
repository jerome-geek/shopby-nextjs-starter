import { filter, flatMap, map, pipe, prop, toArray } from '@fxts/core';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Recommend from '@/components/cart/Recommend';
import CartSummary from '@/components/cart/summary';
import { NoResult } from '@/components/common/no-result';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { CSRLayout } from '@/components/layout';
import { InputCheckbox, InputLabel } from '@/components/ui/input';
import { PATHS } from '@/const/paths';
import useCart from '@/hooks/cart/useCart';
import { useCartMutation } from '@/hooks/mutations';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/cart/index.css';
import { CURRENCY } from '@/utils/currency';

const CartPage = () => {
    return (
        <ShopbyApiErrorBoundary fallback={<p>Loading...</p>}>
            <CartContent />
        </ShopbyApiErrorBoundary>
    );
};

const CartContent = () => {
    const { t } = useTranslation();

    const isLogin = useAuth();

    const { openDialog, openAsyncDialog } = useDialog();

    const { cartInfo, isLoading } = useCart();

    const deliveryGroups = cartInfo?.deliveryGroups ?? [];

    const cartNoList = useMemo(() => {
        if (!cartInfo) {
            return [];
        }

        try {
            return pipe(
                cartInfo,
                prop('deliveryGroups'),
                flatMap((a) => a.orderProducts),
                flatMap((b) => b.orderProductOptions),
                map((c) => c.cartNo),
                toArray,
            );
        } catch (error) {
            console.error(error);
            return [];
        }
    }, [cartInfo]);

    const [checkedCartNoList, setCheckedCartNoList] = useState<number[]>([]);

    const checkedProductNoList = useMemo(() => {
        if (!cartInfo) {
            return [];
        }

        try {
            return pipe(
                cartInfo,
                prop('deliveryGroups'),
                flatMap((a) => a.orderProducts),
                flatMap((b) => b.orderProductOptions),
                filter((c) => checkedCartNoList.includes(c.cartNo)),
                map((c) => c.productNo),
                toArray,
            );
        } catch (error) {
            console.error(error);
            return [];
        }
    }, [cartInfo, checkedCartNoList]);
    console.log(
        '🚀 ~ CartContent ~ checkedProductNoList:',
        checkedProductNoList,
    );

    const isAllChecked =
        cartNoList.length > 0 && checkedCartNoList.length === cartNoList.length;

    const onSelectButtonClick = (checked: boolean) => {
        setCheckedCartNoList(checked ? cartNoList : []);
    };

    const handleSelectOption = (optionNo: number, checked: boolean) => {
        setCheckedCartNoList((prev) =>
            checked
                ? [...prev, optionNo]
                : prev.filter((no) => no !== optionNo),
        );
    };

    const {
        delete: { mutate: cartDeleteMutate },
    } = useCartMutation();
    const onDeleteButtonClick = async (cartNos: number[]) => {
        if (cartNos.length === 0) {
            openDialog({
                message: t('선택된 상품이 없습니다.'),
            });
            return;
        }

        const isAgree = await openAsyncDialog({
            message: '선택한 상품을 삭제하시겠습니까?',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        if (isLogin) {
            cartDeleteMutate(
                {
                    params: {
                        cartNo: cartNos,
                    },
                },
                {
                    onSuccess: async () => {
                        openDialog({
                            message: '장바구니에서 삭제되었습니다.',
                        });
                    },
                },
            );
        } else {
            // dispatch(
            //     deleteCart({
            //         deleteList: cartNos,
            //     }),
            // );

            openDialog({
                message: '장바구니에서 삭제되었습니다.',
            });
        }
    };

    if (isLoading) return <p>Loading cart...</p>;

    const isEmpty = deliveryGroups.length === 0;

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper} data-empty={isEmpty}>
                {/* Left Area: Cart List */}
                <div className={styles.cartListArea} data-empty={isEmpty}>
                    {!isEmpty && (
                        <div className={styles.selectAllArea}>
                            <InputLabel
                                isCheckbox
                                className={styles.summaryLabel}
                            >
                                <InputCheckbox
                                    checked={isAllChecked}
                                    onCheckedChange={onSelectButtonClick}
                                />

                                {t('전체 선택')}
                            </InputLabel>
                            <button
                                type='button'
                                className={styles.deleteAllButton}
                                onClick={() =>
                                    onDeleteButtonClick(checkedCartNoList)
                                }
                            >
                                {t('선택 상품 삭제')}
                            </button>
                        </div>
                    )}

                    {isEmpty ? (
                        <NoResult
                            isIconVisible={false}
                            text={
                                <div className={styles.emptyCartContainer}>
                                    <h2 className={styles.emptyCartTitle}>
                                        {t('장바구니에 담긴 상품이 없어요')}
                                    </h2>
                                    <p className={styles.emptyCartDesc}>
                                        {t(
                                            '장바구니에 새로운 상품을 넣어 보세요!',
                                        )}
                                    </p>
                                </div>
                            }
                            button={
                                <Link
                                    href={PATHS.SHOP.DISCOVERY}
                                    className={styles.emptyCartLink}
                                >
                                    {t('쇼핑하러 가기')}
                                </Link>
                            }
                        />
                    ) : (
                        <ul className={styles.cartList}>
                            {deliveryGroups.map((group, groupIdx) => {
                                return (
                                    <React.Fragment key={`group-${groupIdx}`}>
                                        <li className={styles.partnerGroup}>
                                            <div
                                                className={styles.partnerHeader}
                                            >
                                                <InputLabel
                                                    isCheckbox
                                                    className={
                                                        styles.partnerName
                                                    }
                                                >
                                                    <InputCheckbox
                                                        checked={group.orderProducts.every(
                                                            (p) =>
                                                                p.orderProductOptions.every(
                                                                    (o) =>
                                                                        checkedCartNoList.includes(
                                                                            o.cartNo,
                                                                        ),
                                                                ),
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            const groupCartNos =
                                                                group.orderProducts.flatMap(
                                                                    (p) =>
                                                                        p.orderProductOptions.map(
                                                                            (
                                                                                o,
                                                                            ) =>
                                                                                o.cartNo,
                                                                        ),
                                                                );
                                                            setCheckedCartNoList(
                                                                (prev) =>
                                                                    checked
                                                                        ? Array.from(
                                                                              new Set(
                                                                                  [
                                                                                      ...prev,
                                                                                      ...groupCartNos,
                                                                                  ],
                                                                              ),
                                                                          )
                                                                        : prev.filter(
                                                                              (
                                                                                  no,
                                                                              ) =>
                                                                                  !groupCartNos.includes(
                                                                                      no,
                                                                                  ),
                                                                          ),
                                                            );
                                                        }}
                                                    />
                                                    {group.partnerName}
                                                </InputLabel>
                                            </div>

                                            <ul className={styles.itemList}>
                                                {group.orderProducts.map(
                                                    (product) =>
                                                        product.orderProductOptions.map(
                                                            (option) => (
                                                                <li
                                                                    key={`${product.productNo}-${option.optionNo}`}
                                                                    className={
                                                                        styles.cartItem
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.itemCheckbox
                                                                        }
                                                                    >
                                                                        <InputCheckbox
                                                                            checked={checkedCartNoList.includes(
                                                                                option.cartNo,
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked,
                                                                            ) =>
                                                                                handleSelectOption(
                                                                                    option.cartNo,
                                                                                    checked,
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div
                                                                        className={
                                                                            styles.itemContent
                                                                        }
                                                                    >
                                                                        <Link
                                                                            className={
                                                                                styles.itemImageLink
                                                                            }
                                                                            href={`${PATHS.PRODUCTS.MAIN}/${product.productNo}`}
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    option.imageUrl ||
                                                                                    product.imageUrl
                                                                                }
                                                                                alt={
                                                                                    product.productName
                                                                                }
                                                                                className={
                                                                                    styles.itemImage
                                                                                }
                                                                            />
                                                                        </Link>

                                                                        <div
                                                                            className={
                                                                                styles.itemDetails
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    styles.itemTextInfo
                                                                                }
                                                                            >
                                                                                {product.brandName && (
                                                                                    <span
                                                                                        className={
                                                                                            styles.itemBrand
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            product.brandName
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                                <span
                                                                                    className={
                                                                                        styles.itemName
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        product.productName
                                                                                    }
                                                                                </span>
                                                                                {option.optionTitle && (
                                                                                    <span
                                                                                        className={
                                                                                            styles.itemOption
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            option.optionTitle
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                            </div>

                                                                            <div
                                                                                className={
                                                                                    styles.quantityController
                                                                                }
                                                                            >
                                                                                <button
                                                                                    type='button'
                                                                                    className={
                                                                                        styles.quantityButton
                                                                                    }
                                                                                >
                                                                                    <Minus
                                                                                        size={
                                                                                            16
                                                                                        }
                                                                                    />
                                                                                </button>
                                                                                <span
                                                                                    className={
                                                                                        styles.quantityValue
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        option.orderCnt
                                                                                    }
                                                                                </span>
                                                                                <button
                                                                                    type='button'
                                                                                    className={
                                                                                        styles.quantityButton
                                                                                    }
                                                                                >
                                                                                    <Plus
                                                                                        size={
                                                                                            16
                                                                                        }
                                                                                    />
                                                                                </button>
                                                                            </div>

                                                                            <div
                                                                                className={
                                                                                    styles.itemPriceArea
                                                                                }
                                                                            >
                                                                                {option
                                                                                    .price
                                                                                    .immediateDiscountAmt >
                                                                                    0 && (
                                                                                    <span
                                                                                        className={
                                                                                            styles.itemDiscount
                                                                                        }
                                                                                    >
                                                                                        {Math.floor(
                                                                                            (option
                                                                                                .price
                                                                                                .immediateDiscountAmt /
                                                                                                option
                                                                                                    .price
                                                                                                    .standardAmt) *
                                                                                                100,
                                                                                        )}

                                                                                        %
                                                                                    </span>
                                                                                )}
                                                                                <span
                                                                                    className={
                                                                                        styles.itemPrice
                                                                                    }
                                                                                >
                                                                                    {CURRENCY(
                                                                                        option
                                                                                            .price
                                                                                            .buyAmt,
                                                                                    ).format()}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <button
                                                                        type='button'
                                                                        className={
                                                                            styles.itemXButton
                                                                        }
                                                                        onClick={() =>
                                                                            onDeleteButtonClick(
                                                                                [
                                                                                    option.cartNo,
                                                                                ],
                                                                            )
                                                                        }
                                                                    >
                                                                        <X
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    </button>
                                                                </li>
                                                            ),
                                                        ),
                                                )}
                                            </ul>
                                        </li>
                                        <div className={styles.thickDivider} />
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Right Area: Payment Summary Sticky Section */}
                {!isEmpty && (
                    <CartSummary checkedCartNoList={checkedCartNoList} />
                )}

                <div className={styles.recommendArea}>
                    <Recommend />
                </div>
            </div>
        </div>
    );
};

CartPage.getLayout = (page: React.ReactNode) => {
    return <CSRLayout>{page}</CSRLayout>;
};

export default CartPage;
