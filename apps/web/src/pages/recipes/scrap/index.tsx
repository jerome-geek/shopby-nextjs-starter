import { map, pipe, prepend, sort, toArray } from '@fxts/core';
import { useMemo } from 'react';
import { ArrowUp, Bookmark, ChevronRight, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { overlay } from 'overlay-kit';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { AuthGuardLayout, CSRLayout } from '@/components/layout';
import { RecipeCollectionCreateModal } from '@/components/modal';
import { RecipeGridSection } from '@/components/recipe/grid-section';
import { ScrapFavoriteContent } from '@/components/recipe/scrap/scrap-favorite-content';
import * as styles from '@/pages/recipes/scrap/index.css';
import { vars } from '@/styles/theme.css';
import { OVERLAY_ID } from '@/const/overlay';
import { useScrapCollections } from '@/hooks/query/shop/recipe';
import RecipeScrapSummary from '@/components/recipe/scrap/summary';

/**
 * 스크랩 상세 레이아웃 (개별 카테고리 탭용)
 */
const ScrapDetailContent = ({ sno, title }: { sno: number; title: string }) => {
    const { t } = useTranslation();

    // TODO: 만약 '내가 좋아하는 레시피' 등의 특정 탭을 위한 컴포넌트를 분기처리해야 한다면 여기서 sno나 title로 구분하여 렌더링할 수 있습니다.
    // if (title === '내가 좋아하는 레시피') {
    //     return <ScrapFavoriteContent />;
    // }

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
                <h3 className={styles.headingBold}>{t(title)}</h3>
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

const RecipeScrapPage = () => {
    const router = useRouter();
    const { t } = useTranslation();

    // 컬렉션 API 조회
    const { data: tabs = [{ sno: 0, id: 'all', label: '전체' }] } =
        useScrapCollections({
            options: {
                select: (data) =>
                    pipe(
                        data,
                        sort((a) => (a.isDefault ? -1 : 1)),
                        map((b) => ({
                            sno: b.sno,
                            id: b.shareCode,
                            label: b.title,
                        })),
                        prepend({ sno: 0, id: 'all', label: '전체' }),
                        toArray,
                    ),
            },
        });

    // URL 쿼리 파라미터에서 탭 상태 가져오기 (라우터 준비 완료 후)
    const activeTabId = useMemo(() => {
        if (!router.isReady) return 0;
        return Number(router.query.sno) || 0;
    }, [router.isReady, router.query.sno]);

    // 탭 변경 시 URL 업데이트
    const handleTabChange = (sno: number) => {
        const query = { ...router.query };
        delete query.tab; // 기존 tab 파라미터 제거

        if (sno === 0) {
            delete query.sno;
        } else {
            query.sno = String(sno);
        }
        router.push(
            {
                pathname: router.pathname,
                query,
            },
            undefined,
            { shallow: true },
        );
    };

    const openCollectionCreateModal = () => {
        overlay.open((props) => <RecipeCollectionCreateModal {...props} />, {
            overlayId: OVERLAY_ID.RECIPE_COLLECTION_CREATE,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{t('스크랩북')}</h1>

                <div
                    role='tablist'
                    aria-label={t('스크랩 컬렉션')}
                    className={styles.tabList}
                >
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            type='button'
                            role='tab'
                            id={`tab-${tab.sno}`}
                            aria-selected={activeTabId === tab.sno}
                            aria-controls={`tabpanel-scrap`}
                            className={styles.tabItem}
                            data-active={activeTabId === tab.sno}
                            onClick={() => handleTabChange(tab.sno)}
                            whileTap={{ scale: 0.96 }}
                        >
                            {activeTabId === tab.sno && (
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
                        </motion.button>
                    ))}
                    <button
                        type='button'
                        className={styles.addCollectionButton}
                        onClick={openCollectionCreateModal}
                        aria-label={t('컬렉션 추가')}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div
                id='tabpanel-scrap'
                role='tabpanel'
                aria-labelledby={`tab-${activeTabId}`}
            >
                <AnimatePresence mode='wait'>
                    <div key={activeTabId}>
                        {activeTabId === 0 ? (
                            <RecipeScrapSummary />
                        ) : (
                            <ScrapDetailContent
                                sno={activeTabId}
                                title={
                                    tabs.find((t) => t.sno === activeTabId)
                                        ?.label || ''
                                }
                            />
                        )}
                    </div>
                </AnimatePresence>
            </div>

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

RecipeScrapPage.getLayout = (page: React.ReactNode) => {
    return <CSRLayout>{page}</CSRLayout>;
};

export default RecipeScrapPage;
