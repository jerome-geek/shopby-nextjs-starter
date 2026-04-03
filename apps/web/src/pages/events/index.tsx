import { keepPreviousData } from '@tanstack/react-query';
import Head from 'next/head';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import EventItem from '@/components/event/list/event-item';
import { EVENT_LIST } from '@/const/event';
import { useInfiniteEventList } from '@/hooks/query/display/event';
import { useResponsive } from '@/hooks/utils';
import { GetEventsV2Params } from '@/models/display';

import * as styles from '@/pages/events/index.css';

const Events = () => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const searchParams: GetEventsV2Params = {
        page: {
            size: Number(EVENT_LIST.DEFAULT_PAGE_SIZE),
            number: Number(EVENT_LIST.DEFAULT_PAGE_NUMBER) || 1,
        },
        order: {
            by: 'REGISTER_DATE',
            direction: 'DESC',
        },
        eventYn: 'N',
    };

    const {
        data: infiniteEventListData,
        hasNextPage,
        fetchNextPage,
        isLoading: isInfiniteEventListLoading,
    } = useInfiniteEventList({
        searchParams,
        options: {
            placeholderData: keepPreviousData,
            enabled: true,
        },
    });

    const isLoading = isInfiniteEventListLoading;

    const eventList = useMemo(
        () =>
            infiniteEventListData?.pages?.flatMap((page) => page.contents) ??
            [],
        [infiniteEventListData],
    );

    const totalCount = useMemo(
        () => infiniteEventListData?.pages?.[0]?.totalCount ?? 0,
        [infiniteEventListData],
    );

    return (
        <section className={styles.pageContainer}>
            <Head>
                <title>{t('기획전')} | JollyPot</title>
                <meta
                    name='description'
                    content={t('졸리팟의 다양한 기획전을 만나보세요.')}
                />
            </Head>

            {!isMobile && <h1 className={styles.title}>{t('기획전')}</h1>}

            <LoadingWrapper
                isLoading={isLoading}
                isLoadedAnimation
                containerStyle={{
                    minHeight: '50vh',
                }}
            >
                {eventList.length > 0 ? (
                    <Fragment>
                        <ul className={styles.contentsList}>
                            {eventList.map((content) => (
                                <li
                                    key={content.eventNo}
                                    className={styles.listItem}
                                >
                                    <EventItem {...content} />
                                </li>
                            ))}
                        </ul>

                        <ObserverTarget
                            onIntersect={() => {
                                if (hasNextPage) {
                                    fetchNextPage();
                                }
                            }}
                            hasNextPage={hasNextPage || false}
                            totalCount={totalCount}
                        />
                    </Fragment>
                ) : (
                    <NoResult text={t('등록된 기획전이 없습니다.')} />
                )}
            </LoadingWrapper>
        </section>
    );
};

export default Events;
