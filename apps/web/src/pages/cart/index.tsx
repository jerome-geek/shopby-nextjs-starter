import { Minus, Plus, X } from 'lucide-react';

import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { getCSRLayout } from '@/components/layout';
import ProductSection from '@/components/product-section';
import useCart from '@/hooks/cart/useCart';
import { useAuth } from '@/hooks/useAuth';
import { CURRENCY } from '@/utils/currency';

import * as styles from '@/pages/cart/index.css';

const CartPage = () => {
    const isLogin = useAuth() as boolean; // CSRLayout guarantees isLogin is not null

    return (
        <ShopbyApiErrorBoundary fallback={<p>Loading...</p>}>
            <CartContent isLogin={isLogin} />
        </ShopbyApiErrorBoundary>
    );
};

CartPage.getLayout = getCSRLayout;

const CartContent = ({ isLogin }: { isLogin: boolean }) => {
    const { cartInfo, isLoading } = useCart();
    
    // For a real implementation, you'd manage checked states and quantity mutations.
    // Assuming design implementation matching the layout for now.

    const deliveryGroups = cartInfo?.deliveryGroups ?? [];
    
    // Derived states
    const totalItemAmt = cartInfo?.price?.standardAmt ?? 0;
    const totalDeliveryAmt = cartInfo?.price?.totalDeliveryAmt ?? 0;
    const finalTotalAmt = totalItemAmt + totalDeliveryAmt;
    const orderItemCount = deliveryGroups.reduce(
        (acc, group) => acc + group.orderProducts.length, 
        0
    );

    if (isLoading) return <p>Loading cart...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>장바구니</h1>

            <div className={styles.contentWrapper}>
                {/* Left Area: Cart List */}
                <div className={styles.cartListArea}>
                    <div className={styles.selectAllArea}>
                        <label className={styles.partnerHeader}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.summaryLabel}>전체 선택</span>
                        </label>
                        <button type="button" className={styles.itemXButton}>
                            <span className={styles.summaryLabel}>선택 상품 삭제</span>
                        </button>
                    </div>

                    {deliveryGroups.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '40px' }}>장바구니에 담긴 상품이 없습니다.</p>
                    ) : (
                        deliveryGroups.map((group, groupIdx) => (
                            <div key={`group-${groupIdx}`} className={styles.partnerGroup}>
                                <label className={styles.partnerHeader}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.partnerName}>{group.partnerName}</span>
                                </label>

                                {group.orderProducts.map((product) =>
                                    product.orderProductOptions.map((option) => (
                                        <div
                                            key={`${product.productNo}-${option.optionNo}`}
                                            className={styles.cartItem}
                                        >
                                            <div className={styles.itemCheckbox}>
                                                <input type="checkbox" defaultChecked />
                                            </div>

                                            <img
                                                src={option.imageUrl || product.imageUrl}
                                                alt={product.productName}
                                                className={styles.itemImage}
                                            />

                                            <div className={styles.itemDetails}>
                                                <div className={styles.itemTop}>
                                                    <div className={styles.itemTextInfo}>
                                                        {product.brandName && (
                                                            <span className={styles.itemBrand}>
                                                                {product.brandName}
                                                            </span>
                                                        )}
                                                        <span className={styles.itemName}>
                                                            {product.productName}
                                                        </span>
                                                        {option.optionTitle && (
                                                            <span className={styles.itemOption}>
                                                                {option.optionTitle}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button type="button" className={styles.itemXButton}>
                                                        <X size={20} />
                                                    </button>
                                                </div>

                                                <div className={styles.quantityController}>
                                                    <button type="button" className={styles.quantityButton}>
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className={styles.quantityValue}>{option.orderCnt}</span>
                                                    <button type="button" className={styles.quantityButton}>
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <div className={styles.itemPriceArea}>
                                                    {option.price.immediateDiscountAmt > 0 && (
                                                        <span className={styles.itemDiscount}>
                                                            {Math.floor(
                                                                (option.price.immediateDiscountAmt / option.price.standardAmt) * 100
                                                            )}
                                                            %
                                                        </span>
                                                    )}
                                                    <span className={styles.itemPrice}>
                                                        {CURRENCY(option.price.buyAmt).format()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Right Area: Payment Summary Sticky Section */}
                <aside className={styles.summaryArea}>
                    <div className={styles.summaryBox}>
                        <h2 className={styles.summaryHeader}>예상 결제 금액</h2>
                        
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>상품 금액</span>
                            <span className={styles.summaryValue}>{CURRENCY(totalItemAmt).format()}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>배송비</span>
                            <span className={styles.summaryValue}>
                                {totalDeliveryAmt === 0 ? '무료' : CURRENCY(totalDeliveryAmt).format()}
                            </span>
                        </div>

                        <hr className={styles.summaryDivider} />

                        <div className={styles.summaryRow}>
                            <span className={styles.totalLabel}>총 결제 금액</span>
                            <span className={styles.totalValue}>{CURRENCY(finalTotalAmt).format()}</span>
                        </div>

                        <button className={styles.orderButton}>
                            {CURRENCY(finalTotalAmt).format()} ({orderItemCount}개) 주문하기
                        </button>
                    </div>
                </aside>
            </div>

            {/* Bottom Area: Recommended Products */}
            <div className={styles.recommendArea}>
                <h3 className={styles.recommendTitle}>함께 구매하면 좋은 상품</h3>
                {/* Reusing ProductSection from existing code as requested */}
                <ProductSection />
            </div>
        </div>
    );
};

export default CartPage;
