import { Bookmark, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

import { RecipeGridSection } from '@/components/recipe/grid-section';
import * as styles from '@/components/recipe/scrap/summary/index.css';
import { useCustomDialog } from '@/hooks/ui';

/* --- Mock Data --- */
const MOCK_COLLECTIONS = [
    {
        id: 1,
        title: '내가 좋아하는 레시피',
        desc: '제가 좋아하지만 누구에게나 추천합니다...',
        author: '나',
        count: 6,
        images: [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
            'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
        ],
    },
    {
        id: 2,
        title: '주말 요리',
        desc: '주말에 여유롭게 즐기는 요리 모음',
        author: '현지아빠',
        count: 3,
        images: [
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
            'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a',
        ],
    },
    {
        id: 3,
        title: '간단 레시피',
        desc: '누구나 하기 쉬운 간단 레시피, 20분 이내...',
        author: '나',
        count: 8,
        images: [
            'https://images.unsplash.com/photo-1493770348161-369560ae357d',
            'https://images.unsplash.com/photo-1473093226795-af9932fe5856',
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
            'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f',
        ],
    },
];

/**
 * 전체 탭 레이아웃 (컬렉션, 상품, 레시피 그리드)
 */
const RecipeScrapSummary = () => {
    const { t } = useTranslation();

    const { openCollectionCreate } = useCustomDialog();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}
        >
            {/* 컬렉션 섹션 */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('컬렉션')}</h2>

                <div className={styles.collectionGrid}>
                    {MOCK_COLLECTIONS.map((c) => (
                        <motion.div
                            key={c.id}
                            className={styles.collectionCard}
                            whileHover={{ y: -8 }}
                        >
                            <div className={styles.collageGrid}>
                                <img
                                    src={c.images[0]}
                                    className={styles.collageMain}
                                    alt={c.title}
                                />
                                <img
                                    src={c.images[1]}
                                    className={styles.collageSub}
                                    alt=''
                                />
                                <img
                                    src={c.images[2]}
                                    className={styles.collageSub}
                                    alt=''
                                />
                            </div>
                            <div className={styles.collectionInfo}>
                                <div className={styles.collectionTitleArea}>
                                    <h3 className={styles.body2Semibold}>
                                        {c.title}
                                    </h3>
                                    <Bookmark
                                        size={18}
                                        fill='#8da287'
                                        color='#8da287'
                                    />
                                </div>
                                <p className={styles.collectionDesc}>
                                    {c.desc}
                                </p>
                                <p className={styles.collectionFooter}>
                                    By {c.author} · {c.count}개
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <button
                    className={styles.createButton}
                    type='button'
                    onClick={openCollectionCreate}
                >
                    <Plus size={18} />
                    {t('새 컬렉션 만들기')}
                </button>
            </section>

            {/* 상품 섹션 */}
            {/* <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{t('상품')}</h2>
                    <div className={styles.viewAll}>
                        {t('전체보기')} <ChevronRight size={14} />
                    </div>
                </div>
                <div className={styles.productGrid}>
                    {MOCK_PRODUCTS.map((p) => (
                        <motion.div key={p.id} whileHover={{ y: -4 }}>
                            <div className={styles.productThumb}>
                                <img
                                    src={p.img}
                                    className={styles.productImg}
                                    alt={p.name}
                                />
                                {p.isSoldOut && (
                                    <div className={styles.soldOutOverlay}>
                                        {t('품절')}
                                    </div>
                                )}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                    }}
                                >
                                    <Bookmark
                                        size={18}
                                        fill='white'
                                        color='white'
                                    />
                                </div>
                            </div>
                            <div className={styles.productInfo}>
                                <span className={styles.brandName}>
                                    {p.brand}
                                </span>
                                <h3 className={styles.productName}>{p.name}</h3>
                                <div className={styles.priceArea}>
                                    {p.discount && (
                                        <span className={styles.discount}>
                                            {p.discount}%
                                        </span>
                                    )}
                                    <span className={styles.price}>
                                        {p.price.toLocaleString()}
                                    </span>
                                </div>
                                <div className={styles.badgeArea}>
                                    {p.badges.map((b: string) => (
                                        <span key={b} className={styles.badge}>
                                            {b}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <span style={{ color: vars.color.black, fontWeight: 700 }}>
                        1
                    </span>
                    <span>2</span>
                    <span>3</span>
                    <ChevronRight size={14} />
                </div>
            </section> */}

            {/* 레시피 섹션 */}
            <RecipeGridSection title='레시피' />
        </motion.div>
    );
};

export default RecipeScrapSummary;
