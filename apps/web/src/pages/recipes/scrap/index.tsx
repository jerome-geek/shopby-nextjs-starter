import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ChevronRight,
    Plus,
    Bookmark,
    Clock,
    Users,
    LayoutGrid,
    List,
    Search,
    ShoppingCart,
    Share2,
    ArrowUp,
} from 'lucide-react';
import * as styles from '@/pages/recipes/scrap/index.css';
import { useTranslation } from 'react-i18next';
import { vars } from '@/styles/theme.css';
import { RecipeCollectionCreateModal } from '@/components/modal';
import { useRouter } from 'next/router';
import { DefaultLayout } from '@/components/layout';

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
        title: '크림 까르보나라',
        author: '이탈리안키친',
        time: '15분',
        servings: '2인분',
        kcal: '510kcal',
        img: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df',
        ingredients: [
            { name: '스파게티면', amount: '200g' },
            { name: '베이컨', amount: '100g' },
            { name: '생크림', amount: '200ml' },
            { name: '파마산 치즈', amount: '50g' },
            { name: '계란 노른자', amount: '2개' },
            { name: '마늘', amount: '3쪽' },
        ],
        steps: [
            '끓는물에 소금 넉넉히, 올리브유 1T 정도 넣고 스파게티면을...',
            '마늘을 으깨고, 베이컨을 1cm 정도로 썬 뒤 양송이버섯을...',
            '마늘, 베이컨, 양송이(페페론치니) 순서로 볶아줍니다.',
            '생크림을 넣습니다.',
            '파마산, 파슬리, 체다치즈를 넣고 끓여줍니다.',
            '스파게티면을 넣고 면수로 농도를 잡은 뒤 소금, 후추로 간을...',
            '접시에 담은 뒤 수란과 치즈, 파슬리, 후추를 뿌려 완성합니다.',
        ],
    },
    {
        id: 2,
        title: '고든 램지 삼겹살 요리',
        author: '나',
        time: '30분',
        servings: '4인분',
        kcal: '1,080kcal',
        img: 'https://images.unsplash.com/photo-1544124499-58912cbddaad',
        ingredients: [
            { name: '양파', amount: '반개 슬라이스' },
            { name: '대파', amount: '조금' },
            { name: '청양고추', amount: '반개' },
            { name: '깻잎', amount: '두 장' },
        ],
        steps: [
            '삼겹살 비계 부분을 다이아몬드 모양으로 칼집을 내주세요.',
            '칼집낸 비계 부분에 소금을 뿌려주세요...',
            '야채를 손질하고 올리브유에 향이 올라올 때까지 볶다가 월계수...',
            '삼겹살 비계 부분을 아래로 해서 야채와 월계수에 향이 잘 배...',
            '삼겹살을 다시 뒤집어주고 소주를 넣어 3~5분 정도 끓여주...',
            '적당히 끓여주다가 그대로 180도에서 예열된 오븐에 1시간...',
        ],
    },
    {
        id: 3,
        title: '최강록 셰프 라면',
        author: '최강록 셰프',
        time: '10분',
        servings: '2인분',
        kcal: '530kcal',
        img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
        ingredients: [
            { name: '라면', amount: '1봉지' },
            { name: '계란', amount: '1개' },
            { name: '대파', amount: '조금' },
            { name: '치즈 슬라이스', amount: '1장' },
        ],
        steps: [
            '물을 끓입니다.',
            '면과 스프를 넣고 3분간 끓입니다.',
            '계란을 넣고 1분 더 끓입니다.',
            '치즈를 올려 완성합니다.',
        ],
    },
    {
        id: 4,
        title: '밥도둑 한가인 삼겹살 강된장',
        author: '밥도둑 한가인',
        time: '20분',
        servings: '3인분',
        kcal: '480kcal',
        img: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c',
        ingredients: [
            { name: '삼겹살', amount: '300g' },
            { name: '된장', amount: '2스푼' },
            { name: '고추장', amount: '1스푼' },
            { name: '다진마늘', amount: '1티스푼' },
            { name: '양파', amount: '반개' },
            { name: '대파', amount: '반개' },
        ],
        steps: [
            '삼겹살을 먹기 좋게 썰어주세요.',
            '된장, 고추장, 다진마늘을 섞어 양념장을 만듭니다.',
            '팬에 삼겹살을 볶다가 양념장을 넣습니다.',
            '양파와 대파를 넣고 볶아 완성합니다.',
        ],
    },
    {
        id: 5,
        title: '돈까스 김치나베',
        author: '일식요리사',
        time: '40분',
        servings: '4인분',
        kcal: '510kcal',
        img: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b',
        ingredients: [
            { name: '돈까스', amount: '2장' },
            { name: '김치', amount: '200g' },
            { name: '두부', amount: '1모' },
            { name: '대파', amount: '반개' },
            { name: '육수', amount: '500ml' },
        ],
        steps: [
            '양파는 채썰고 대파는 송송 썰어 준비한다.',
            '채 썬 양파는 물에 담궈둔다.',
            '돈까스는 튀겨 썰어 놓는다.',
            '뚝배기에 기름을 살짝 두르고 양파와 대파를 볶아 기름을 낸...',
            '기름을 냈으면 김치를 넣어 볶은 후 김칫국물과 물을 붓는다.',
            '보글보글 끓으면 다진 마늘, 국간장, 설탕, 고춧가루를 넣는...',
            '국물이 조금 줄어들면 튀긴 돈까스를 올린다.',
            '계란물을 가장자리에 부어주고 썰어 놓은 대파를 뿌린다.',
        ],
    },
    {
        id: 6,
        title: '맛있는 멍게 토마토 비빔 파스타',
        author: '파스타셰프',
        time: '25분',
        servings: '2인분',
        kcal: '490kcal',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        ingredients: [
            { name: '스파게티면', amount: '200g' },
            { name: '멍게', amount: '100g' },
            { name: '방울토마토', amount: '10개' },
            { name: '올리브유', amount: '1스푼' },
            { name: '마늘', amount: '1티스푼' },
            { name: '바질', amount: '3개' },
        ],
        steps: [
            '면을 삶아 줍니다.',
            '팬에 올리브유와 마늘을 볶습니다.',
            '토마토를 넣고 볶습니다.',
            '면과 멍게를 넣고 비벼 완성합니다.',
        ],
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
                    onClick={openModal}
                >
                    <Plus size={18} />
                    {t('새 컬렉션 만들기')}
                </button>
            </section>

            <hr
                style={{
                    border: 'none',
                    height: '1px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: '48px',
                }}
            />

            {/* 상품 섹션 */}
            <section className={styles.section}>
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
            </section>

            <hr
                style={{
                    border: 'none',
                    height: '1px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: '48px',
                }}
            />

            {/* 레시피 섹션 */}
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>{t('레시피')}</h2>
                    <div className={styles.viewAll}>
                        {t('전체보기')} <ChevronRight size={14} />
                    </div>
                </div>
                <div className={styles.recipeGrid}>
                    {MOCK_RECIPES.map((r) => (
                        <motion.div key={r.id} whileHover={{ y: -4 }}>
                            <div className={styles.recipeImgArea}>
                                <img
                                    src={r.img}
                                    className={styles.productImg}
                                    alt={r.title}
                                />
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
                                <h3 className={styles.productName}>
                                    {r.title}
                                </h3>
                                <span className={styles.brandName}>
                                    {r.author}
                                </span>
                                <div className={styles.recipeMeta}>
                                    <span className={styles.iconText}>
                                        <Clock size={12} /> {r.time}
                                    </span>
                                    <span className={styles.iconText}>
                                        <Users size={12} /> {r.servings}
                                    </span>
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
    const [viewMode, setViewMode] = React.useState<'grid' | 'details'>(
        'details',
    );

    if (tabId === 'favorite') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.detailContainer}
            >
                <div className={styles.detailHeader}>
                    <div className={styles.detailTitleArea}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <h2 className={styles.detailTitle}>
                                {t('내가 좋아하는 레시피')}
                            </h2>
                            <button
                                type='button'
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                <Plus
                                    size={18}
                                    style={{
                                        transform: 'rotate(45deg)',
                                        color: vars.color.gray['40'],
                                    }}
                                />
                            </button>
                        </div>

                        <p className={styles.detailSubtitle}>
                            제가 좋아하지만 누구에게나 추천합니다 즐거운 식사
                            합시다
                        </p>

                        <p className={styles.detailMeta}>By 나 · 6개</p>
                    </div>

                    <div className={styles.viewToggle}>
                        <button
                            className={styles.toggleItem}
                            data-active={viewMode === 'details'}
                            onClick={() => setViewMode('details')}
                        >
                            <List
                                size={20}
                                color={
                                    viewMode === 'details'
                                        ? vars.color.black
                                        : vars.color.gray['30']
                                }
                            />
                        </button>
                        <button
                            className={styles.toggleItem}
                            data-active={viewMode === 'grid'}
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid
                                size={20}
                                color={
                                    viewMode === 'grid'
                                        ? vars.color.black
                                        : vars.color.gray['30']
                                }
                            />
                        </button>
                    </div>
                </div>

                <div
                    className={
                        viewMode === 'grid'
                            ? styles.recipeGrid
                            : styles.recipeDetailGrid
                    }
                >
                    {MOCK_RECIPES.map((r) => (
                        <motion.div
                            key={r.id}
                            className={
                                viewMode === 'grid'
                                    ? ''
                                    : styles.recipeDetailCard
                            }
                            whileHover={{ y: -4 }}
                        >
                            {viewMode === 'grid' ? (
                                <>
                                    <div className={styles.recipeImgArea}>
                                        <img
                                            src={r.img}
                                            className={styles.productImg}
                                            alt={r.title}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                            }}
                                        >
                                            <Bookmark
                                                size={20}
                                                fill='white'
                                                color='white'
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3
                                            className={styles.productName}
                                            style={{ fontWeight: 600 }}
                                        >
                                            {r.title}
                                        </h3>
                                        <span className={styles.brandName}>
                                            {r.author}
                                        </span>
                                        <div className={styles.recipeMeta}>
                                            <span className={styles.iconText}>
                                                <Clock size={12} /> {r.time}
                                            </span>
                                            <span className={styles.iconText}>
                                                <Users size={12} /> {r.servings}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.cardContent}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardTitleArea}>
                                            <h3
                                                className={
                                                    styles.recipeDetailTitle
                                                }
                                            >
                                                {r.title}
                                            </h3>
                                            <span
                                                className={
                                                    styles.recipeDetailAuthor
                                                }
                                            >
                                                {r.author}
                                            </span>
                                        </div>
                                        <Bookmark
                                            size={20}
                                            fill='#4a5d45'
                                            color='#4a5d45'
                                        />
                                    </div>

                                    <div className={styles.recipeDetailMeta}>
                                        <span className={styles.iconText}>
                                            <Clock size={14} /> {r.time}
                                        </span>
                                        <span className={styles.iconText}>
                                            <Users size={14} /> {r.servings}
                                        </span>
                                        <span className={styles.iconText}>
                                            <div
                                                style={{
                                                    width: 14,
                                                    height: 14,
                                                    borderRadius: '50%',
                                                    border: '2px solid currentColor',
                                                }}
                                            />{' '}
                                            {r.kcal}
                                        </span>
                                    </div>

                                    <div className={styles.ingredientSection}>
                                        <div
                                            className={styles.ingredientHeader}
                                        >
                                            <h4
                                                className={
                                                    styles.ingredientTitle
                                                }
                                            >
                                                {t('요리 재료 List')}
                                            </h4>
                                            <div
                                                style={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        vars.color.gray['20'],
                                                    color: vars.color.white,
                                                    fontSize: 10,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                i
                                            </div>
                                        </div>
                                        <div
                                            className={styles.ingredientContent}
                                        >
                                            <div
                                                className={
                                                    styles.recipeDetailImgArea
                                                }
                                            >
                                                <img
                                                    src={r.img}
                                                    className={
                                                        styles.recipeDetailImg
                                                    }
                                                    alt={r.title}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.ingredientsList
                                                }
                                            >
                                                {r.ingredients.map((ing, i) => (
                                                    <div
                                                        key={i}
                                                        className={
                                                            styles.ingredientItem
                                                        }
                                                    >
                                                        <span>
                                                            · {ing.name}
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: vars
                                                                    .color.gray[
                                                                    '40'
                                                                ],
                                                            }}
                                                        >
                                                            - {ing.amount}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.stepSection}>
                                        <h4 className={styles.stepTitle}>
                                            {t('따라봐 How to Cook')}
                                        </h4>
                                        <div className={styles.stepList}>
                                            {r.steps.map((step, i) => (
                                                <div
                                                    key={i}
                                                    className={styles.stepItem}
                                                >
                                                    <span
                                                        className={
                                                            styles.stepNumber
                                                        }
                                                    >
                                                        {i + 1}
                                                    </span>
                                                    <p
                                                        className={
                                                            styles.stepText
                                                        }
                                                    >
                                                        {step}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    }

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
                textAlign: 'center',
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
                    color: '#8da287',
                }}
            >
                <Bookmark size={32} />
            </div>
            <div>
                <h3 className={styles.headingBold}>{t(activeTabLabel)}</h3>
                <p
                    className={styles.body2Regular}
                    style={{ color: vars.color.gray['40'], marginTop: '8px' }}
                >
                    {t('아직 스크랩된 아이템이 없습니다.')}
                    <br />
                    {t('마음에 드는 레시피와 상품을 담아보세요!')}
                </p>
            </div>
            <button
                className={styles.primaryButton}
                style={{
                    width: 'auto',
                    padding: '14px 32px',
                    marginTop: '20px',
                }}
                type='button'
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
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, tab: tabId },
            },
            undefined,
            { shallow: true },
        );
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
                        <ScrapAllContent
                            openModal={() => setIsModalOpen(true)}
                        />
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

            <button
                className={styles.fab}
                type='button'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <ArrowUp size={24} />
            </button>
        </div>
    );
};

RecipeScrap.getLayout = (page: React.ReactNode) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default RecipeScrap;
