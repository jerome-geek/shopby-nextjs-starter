import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ChevronRight,
    Plus,
    Bookmark,
    Clock,
    Users,
} from 'lucide-react';
import * as styles from '@/pages/recipes/scrap/index.css';
import { useTranslation } from 'react-i18next';
import { vars } from '@/styles/theme.css';
import { RecipeCollectionCreateModal } from '@/components/modal';
import { useRouter } from 'next/router';

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

const MOCK_PRODUCTS = [
    {
        id: 1,
        brand: '올리브팜',
        name: '프리미엄 올리브 오일 500ml 최대 두 줄',
        price: 19900,
        discount: 33,
        badges: ['쿠폰', '조건부 무료배송'],
        img: 'https://images.unsplash.com/photo-1474979266404-7eaacbadb8c5',
        isSoldOut: false,
    },
    {
        id: 2,
        brand: '이태리키친',
        name: '유기농 파스타면 500g',
        price: 8900,
        badges: ['쿠폰'],
        img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
        isSoldOut: false,
    },
    {
        id: 3,
        name: '천연 암염',
        brand: '솔트킹',
        price: 12900,
        isSoldOut: true,
        badges: ['쿠폰', '조건부 무료배송'],
        img: 'https://images.unsplash.com/photo-1518110903425-4c6001716960',
    },
    {
        id: 4,
        brand: '주방명가',
        name: '세라믹 논스틱 프라이팬',
        price: 45000,
        discount: 27,
        badges: ['쿠폰', '조건부 무료배송'],
        img: 'https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7',
        isSoldOut: false,
    },
    {
        id: 5,
        brand: '이탈리아',
        name: '프리미엄 발사믹 식초',
        price: 18900,
        discount: 24,
        badges: ['쿠폰', '조건부 무료배송'],
        img: 'https://images.unsplash.com/photo-1547514300-8800bb1163b4',
        isSoldOut: false,
    },
];

const MOCK_RECIPES = [
    {
        id: 1,
        title: '고든 램지 삼겹살 요리',
        author: '나',
        time: '30분',
        servings: '2인분',
        img: 'https://images.unsplash.com/photo-1544124499-58912cbddaad',
    },
    {
        id: 2,
        title: '최강록 셰프 라면',
        author: '최강록 셰프',
        time: '10분',
        servings: '2인분',
        img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    },
    {
        id: 3,
        title: '밥도둑 한가인 삼겹살 강된장',
        author: '밥도둑 한가인',
        time: '20분',
        servings: '2인분',
        img: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c',
    },
    {
        id: 4,
        title: '돈까스 김치나베',
        author: '일식요리사',
        time: '40분',
        servings: '2인분',
        img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b',
    },
    {
        id: 5,
        title: '크림 까르보나라',
        author: '이탈리안키친',
        time: '15분',
        servings: '2인분',
        img: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df',
    },
];

const TABS = [
    { id: 'all', label: '전체' },
    { id: 'favorite', label: '내가 좋아하는 레시피' },
    { id: 'weekend', label: '주말 요리' },
    { id: 'easy', label: '간단 레시피' },
] as const;

type TabId = (typeof TABS)[number]['id'];

/* --- Sub Components --- */

/**
 * 전체 탭 레이아웃 (컬렉션, 상품, 레시피 그리드)
 */
const ScrapAllContent = ({ openModal }: { openModal: () => void }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {/* 컬렉션 섹션 */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{t('컬렉션')}</h2>
                </div>
                <div className={styles.collectionGrid}>
                    {MOCK_COLLECTIONS.map((c) => (
                        <motion.div
                            key={c.id}
                            className={styles.collectionCard}
                            whileHover={{ y: -8 }}
                        >
                            <div className={styles.collageGrid}>
                                <img src={c.images[0]} className={styles.collageMain} alt={c.title} />
                                <img src={c.images[1]} className={styles.collageSub} alt="" />
                                <img src={c.images[2]} className={styles.collageSub} alt="" />
                            </div>
                            <div className={styles.collectionInfo}>
                                <div className={styles.collectionTitleArea}>
                                    <h3 className={styles.body2Semibold}>{c.title}</h3>
                                    <Bookmark size={18} fill="#8da287" color="#8da287" />
                                </div>
                                <p className={styles.collectionDesc}>{c.desc}</p>
                                <p className={styles.collectionFooter}>By {c.author} · {c.count}개</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <button
                    className={styles.createButton}
                    type="button"
                    onClick={openModal}
                >
                    <Plus size={18} />
                    {t('새 컬렉션 만들기')}
                </button>
            </section>

            <hr style={{ border: 'none', height: '1px', backgroundColor: '#f0f0f0', marginBottom: '48px' }} />

            {/* 상품 섹션 */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{t('상품')}</h2>
                    <div className={styles.viewAll}>{t('전체보기')} <ChevronRight size={14} /></div>
                </div>
                <div className={styles.productGrid}>
                    {MOCK_PRODUCTS.map((p) => (
                        <motion.div key={p.id} whileHover={{ y: -4 }}>
                            <div className={styles.productThumb}>
                                <img src={p.img} className={styles.productImg} alt={p.name} />
                                {p.isSoldOut && <div className={styles.soldOutOverlay}>{t('품절')}</div>}
                                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                                    <Bookmark size={18} fill="white" color="white" />
                                </div>
                            </div>
                            <div className={styles.productInfo}>
                                <span className={styles.brandName}>{p.brand}</span>
                                <h3 className={styles.productName}>{p.name}</h3>
                                <div className={styles.priceArea}>
                                    {p.discount && <span className={styles.discount}>{p.discount}%</span>}
                                    <span className={styles.price}>{p.price.toLocaleString()}</span>
                                </div>
                                <div className={styles.badgeArea}>
                                    {p.badges.map((b: string) => <span key={b} className={styles.badge}>{b}</span>)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <span style={{ color: vars.color.black, fontWeight: 700 }}>1</span>
                    <span>2</span>
                    <span>3</span>
                    <ChevronRight size={14} />
                </div>
            </section>

            <hr style={{ border: 'none', height: '1px', backgroundColor: '#f0f0f0', marginBottom: '48px' }} />

            {/* 레시피 섹션 */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{t('레시피')}</h2>
                    <div className={styles.viewAll}>{t('전체보기')} <ChevronRight size={14} /></div>
                </div>
                <div className={styles.recipeGrid}>
                    {MOCK_RECIPES.map((r) => (
                        <motion.div key={r.id} whileHover={{ y: -4 }}>
                            <div className={styles.recipeImgArea}>
                                <img src={r.img} className={styles.productImg} alt={r.title} />
                                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                                    <Bookmark size={18} fill="white" color="white" />
                                </div>
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{r.title}</h3>
                                <span className={styles.brandName}>{r.author}</span>
                                <div className={styles.recipeMeta}>
                                    <span className={styles.iconText}><Clock size={12} /> {r.time}</span>
                                    <span className={styles.iconText}><Users size={12} /> {r.servings}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <span style={{ color: vars.color.black, fontWeight: 700 }}>1</span>
                    <span>2</span>
                    <ChevronRight size={14} />
                </div>
            </section>
        </motion.div>
    );
};

/**
 * 스크랩 상세 레이아웃 (개별 카테고리 탭용)
 */
const ScrapDetailContent = ({ tabId }: { tabId: TabId }) => {
    const { t } = useTranslation();
    const activeTabLabel = TABS.find((t) => t.id === tabId)?.label || '';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ 
                padding: '100px 0', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '20px',
                textAlign: 'center'
            }}
        >
            <div 
                style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '20px', 
                    backgroundColor: '#f2f5f1', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#8da287'
                }}
            >
                <Bookmark size={32} />
            </div>
            <div>
                <h3 className={styles.headingBold}>{t(activeTabLabel)}</h3>
                <p className={styles.body2Regular} style={{ color: vars.color.gray['40'], marginTop: '8px' }}>
                    {t('아직 스크랩된 아이템이 없습니다.')}<br/>
                    {t('마음에 드는 레시피와 상품을 담아보세요!')}
                </p>
            </div>
            <button 
                className={styles.primaryButton} 
                style={{ width: 'auto', padding: '14px 32px', marginTop: '20px' }}
                type="button"
            >
                {t('탐색하러 가기')}
            </button>
        </motion.div>
    );
};

/* --- Main Page --- */

const RecipeScrap = () => {
    const router = useRouter();
    const { t } = useTranslation();
    
    // URL 쿼리 파라미터에서 탭 상태 가져오기 (라우터 준비 완료 후)
    const activeTab = React.useMemo(() => {
        if (!router.isReady) return 'all';
        return (router.query.tab as TabId) || 'all';
    }, [router.isReady, router.query.tab]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // 탭 변경 시 URL 업데이트
    const handleTabChange = (tabId: TabId) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, tab: tabId },
        }, undefined, { shallow: true });
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{t('스크랩북')}</h1>

                <div className={styles.tabList}>
                    {TABS.map((tab) => (
                        <motion.div
                            key={tab.id}
                            className={styles.tabItem}
                            data-active={activeTab === tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            whileTap={{ scale: 0.96 }}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId='active-tab'
                                    className={styles.activeIndicator}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 380,
                                        damping: 30,
                                    }}
                                />
                            )}
                            <span style={{ position: 'relative', zIndex: 1 }}>
                                {t(tab.label)}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence mode='wait'>
                <div key={activeTab}>
                    {activeTab === 'all' ? (
                        <ScrapAllContent openModal={() => setIsModalOpen(true)} />
                    ) : (
                        <ScrapDetailContent tabId={activeTab} />
                    )}
                </div>
            </AnimatePresence>

            <RecipeCollectionCreateModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                unmount={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default RecipeScrap;
