import Skeleton from '@/components/ui/skeleton';
import * as cardStyles from '@/components/mypage/common/mypage-list-card/index.css';
import * as styles from '@/pages/mypage/wish/index.css';

const WishCardSkeleton = () => {
    return (
        <div className={styles.productGridItem}>
            <div className={styles.cardSelectWrap}>
                <div className={styles.checkboxAnchor} style={{ boxShadow: 'none', border: '1px solid #eee' }}>
                    <Skeleton width={18} height={18} style={{ borderRadius: 2 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Skeleton width='100%' style={{ aspectRatio: '1/1', borderRadius: 8 }} />
                    <Skeleton width='80%' height={14} style={{ borderRadius: 4 }} />
                    <Skeleton width='40%' height={16} style={{ borderRadius: 4 }} />
                </div>
            </div>
        </div>
    );
};

export const MypageWishSkeleton = () => {
    // 모바일 3열, 태블릿/데스크탑 5열에 맞게 개수 조절
    const skeletonItems = Array.from({ length: 10 });

    return (
        <div className={cardStyles.container} aria-busy='true'>
            <section className={cardStyles.section}>
                {/* 상단 액션 바 스켈레톤 */}
                <div className={styles.actionsWrapper}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Skeleton width={20} height={20} style={{ borderRadius: 4 }} />
                        <Skeleton width={60} height={18} style={{ borderRadius: 4 }} />
                    </div>
                    <Skeleton width={50} height={18} style={{ borderRadius: 4 }} />
                </div>

                {/* 상품 그리드 스켈레톤 */}
                <div className={cardStyles.list}>
                    <ul className={styles.productGrid}>
                        {skeletonItems.map((_, idx) => (
                            <WishCardSkeleton key={idx} />
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};
