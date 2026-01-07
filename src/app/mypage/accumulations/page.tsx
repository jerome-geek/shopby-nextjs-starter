import { map, pipe, range, toArray, toAsync } from '@fxts/core';
import dayjs from 'dayjs';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

import { accumulation } from '@/api/manage';
import SearchPaging from '@/components/common/Paging/SearchPaging';
import AccumulationList from '@/components/mypage/accumulation/List';
import AccumulationSummary from '@/components/mypage/accumulation/Summary';
import { getTranslation } from '@/i18n/server';
import { GetAccumulationsParams } from '@/models/manage/accumulation';
import { css } from '@/styled-system/css';

type MypageAccumulationsPageProps = AppPageProps<'/mypage/accumulations'>;

export default async function MypageAccumulationsPage(
    props: MypageAccumulationsPageProps,
) {
    const { t } = await getTranslation();

    const searchParams = await props.searchParams;
    // TODO: headers를 사용할 경우 캐시 체크
    const headerList = await headers();
    const ua = headerList.get('user-agent') || '';
    const parser = new UAParser(ua);
    const isMobile =
        parser.getDevice().type === 'mobile' ||
        parser.getDevice().type === 'tablet';

    const pageNumber = Number(searchParams.pageNumber) || 1;
    console.log('🚀 ~ MypageAccumulationsPage ~ pageNumber:', pageNumber);
    const pageSize = Number(searchParams.pageSize) || 10;

    const accumulationsSearchParams: GetAccumulationsParams = {
        pageNumber,
        pageSize,
        startYmd: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
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
        <div>
            <AccumulationSummary />

            <AccumulationList
                searchParams={accumulationsSearchParams}
                initialData={initialData}
                isMobile={isMobile}
            />

            <div
                className={css({
                    mt: '40px',
                    display: { base: 'none', lg: 'block' },
                })}
            >
                <SearchPaging totalCount={totalCount} pageSize={pageSize} />
            </div>
        </div>
    );
}
