import { concurrent, map, pipe, range, toArray, toAsync } from '@fxts/core';
import dayjs from 'dayjs';

import { accumulation } from '@/api/manage';
import SearchPaging from '@/components/common/SearchPaging';
import AccumulationList from '@/components/mypage/accumulation/List';
import { getTranslation } from '@/i18n/server';
import { GetAccumulationsParams } from '@/models/manage/accumulation';
import { css } from '@/styled-system/css';
import { VStack } from '@/styled-system/jsx';
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
        concurrent(5),
        toArray,
    );

    const initialData = responseList.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    const totalCount =
        initialData[initialData.length - 1]?.data.totalCount ?? 0;

    return (
        <VStack alignItems='stretch' gap='6'>
            <VStack alignItems='stretch' gap='4'>
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
            </VStack>

            <div
                className={css({
                    width: '100%',
                    mt: '2',
                    display: { base: 'none', lg: 'block' },
                })}
            >
                <SearchPaging totalCount={totalCount} pageSize={pageSize} />
            </div>
        </VStack>
    );
}
