import { getTranslation } from '@/i18n/server';
import { css } from '@/styled-system/css';
import { vstack } from '@/styled-system/patterns';
import { map, pipe, range, toArray, toAsync } from '@fxts/core';
import dayjs from 'dayjs';

import { accumulation } from '@/api/manage';
import SearchPaging from '@/components/common/SearchPaging';
import AccumulationList from '@/components/mypage/accumulation/List';
import AccumulationSummary from '@/components/mypage/accumulation/Summary';
import MypageSearchPeriod from '@/components/mypage/search-period';
import { GetAccumulationsParams } from '@/models/manage/accumulation';
import { getIsMobile } from '@/utils/device.server';

type MypageAccumulationsPageProps = AppPageProps<'/mypage/accumulations'>;

export default async function MypageAccumulationsPage(
    props: MypageAccumulationsPageProps,
) {
    const { t } = await getTranslation();

    const searchParams = await props.searchParams;
    const isMobile = await getIsMobile();

    const pageNumber = Number(searchParams.pageNumber) || 1;
    const pageSize = Number(searchParams.pageSize) || 10;

    const accumulationsSearchParams: GetAccumulationsParams = {
        pageNumber,
        pageSize,
        startYmd:
            (searchParams.startYmd as string) ||
            dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
        endYmd: (searchParams.endYmd as string) || dayjs().format('YYYY-MM-DD'),
    };

    // [Hybrid Support] PC/Mobile 환경에 상관없이 항상 1페이지부터 현재 요청된 pageNumber까지 데이터를 가져옵니다.
    // 이렇게 해야 PC에서 접속 후 창을 줄였을 때(모바일 뷰) 이전 데이터들이 누적되어 보입니다.
    const responseList = await pipe(
        range(1, pageNumber + 1),
        toAsync,
        map((a) => {
            return accumulation
                .getAccumulations({
                    ...accumulationsSearchParams,
                    pageNumber: a,
                })
                .json();
        }),
        toArray,
    );

    const initialData = responseList.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    const totalCount =
        initialData[initialData.length - 1]?.data.totalCount ?? 0;

    return (
        <div className={vstack({ gap: '10', alignItems: 'stretch' })}>
            <AccumulationSummary />

            <div className={vstack({ gap: '6', alignItems: 'stretch' })}>
                <MypageSearchPeriod />

                <div className={vstack({ gap: '4', alignItems: 'flex-start' })}>
                    <p
                        className={css({
                            textStyle: 'headline2.semibold',
                        })}
                        dangerouslySetInnerHTML={{
                            __html: t('총 <b>{{totalCount}}</b>건', {
                                totalCount,
                            }),
                        }}
                    />

                    <AccumulationList
                        searchParams={accumulationsSearchParams}
                        initialData={initialData}
                        isMobile={isMobile}
                    />
                </div>
            </div>

            <div
                className={css({
                    width: '100%',
                    mt: '2',
                    display: { base: 'none', lg: 'block' },
                })}
            >
                <SearchPaging totalCount={totalCount} pageSize={pageSize} />
            </div>
        </div>
    );
}
