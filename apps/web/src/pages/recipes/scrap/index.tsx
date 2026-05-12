import { map, pipe, prepend, sort, toArray } from '@fxts/core';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Seo from '@/components/common/seo';
import { CSRLayout } from '@/components/layout';
import { RecipeScrapDetail } from '@/components/recipe/scrap/detail';
import RecipeScrapSummary from '@/components/recipe/scrap/summary';
import { useCustomDialog } from '@/features/dialog';
import { useCollectionList } from '@/hooks/query/shop/collection';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/recipes/scrap/index.css';

const RecipeScrapPage = () => {
    const { t } = useTranslation();

    const router = useRouter();

    const { isMobile } = useResponsive();

    const { openCollectionForm } = useCustomDialog();

    // 컬렉션 API 조회
    const { data: tabs = [{ sno: 0, shareCode: 'all', label: '전체' }] } =
        useCollectionList({
            options: {
                select: (data) =>
                    pipe(
                        data,
                        sort((a) => (a.isDefault ? -1 : 1)),
                        map((b) => ({
                            sno: b.sno,
                            shareCode: b.shareCode,
                            label: b.title,
                        })),
                        prepend({ sno: 0, shareCode: 'all', label: '전체' }),
                        toArray,
                    ),
            },
        });

    const activeShareCode = useMemo(() => {
        if (!router.isReady) return 'all';

        return (router.query.shareCode as string) || 'all';
    }, [router.isReady, router.query.shareCode]);

    const activeTab = useMemo(() => {
        return tabs.find((tab) => tab.shareCode === activeShareCode);
    }, [tabs, activeShareCode]);

    // 탭 변경 시 URL 업데이트
    const handleTabChange = (shareCode: string) => {
        const query = { ...router.query };

        if (shareCode === 'all') {
            delete query.shareCode;
        } else {
            query.shareCode = shareCode;
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

    return (
        <>
            <Seo title={t('스크랩북')} />

            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <div className={styles.titleArea}>
                        {!isMobile && (
                            <h1 className={styles.title}>{t('스크랩북')}</h1>
                        )}

                        <div
                            role='tablist'
                            aria-label={t('스크랩 컬렉션')}
                            className={styles.tabList}
                        >
                            {tabs.map((tab) => (
                                <motion.button
                                    key={tab.shareCode}
                                    type='button'
                                    role='tab'
                                    id={`tab-${tab.shareCode}`}
                                    aria-selected={
                                        activeShareCode === tab.shareCode
                                    }
                                    aria-controls={`tabpanel-scrap`}
                                    className={styles.tabItem}
                                    data-active={
                                        activeShareCode === tab.shareCode
                                    }
                                    onClick={() =>
                                        handleTabChange(tab.shareCode)
                                    }
                                    whileTap={{ scale: 0.96 }}
                                >
                                    {activeShareCode === tab.shareCode && (
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
                                    <span
                                        style={{
                                            position: 'relative',
                                            zIndex: 1,
                                        }}
                                    >
                                        {t(tab.label)}
                                    </span>
                                </motion.button>
                            ))}
                            <button
                                type='button'
                                className={styles.addCollectionButton}
                                onClick={() => openCollectionForm()}
                                aria-label={t('컬렉션 추가')}
                            >
                                <Plus size={isMobile ? 16 : 20} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.divider} />
                </div>

                <div
                    id='tabpanel-scrap'
                    role='tabpanel'
                    aria-labelledby={`tab-${activeShareCode}`}
                >
                    <AnimatePresence mode='wait'>
                        <div key={activeShareCode}>
                            {activeShareCode === 'all' ? (
                                <RecipeScrapSummary />
                            ) : (
                                <RecipeScrapDetail
                                    shareCode={activeShareCode}
                                    title={activeTab?.label || ''}
                                />
                            )}
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

RecipeScrapPage.getLayout = (page: React.ReactNode) => {
    return <CSRLayout>{page}</CSRLayout>;
};

export default RecipeScrapPage;
