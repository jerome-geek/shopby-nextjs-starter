import { map, pipe, range, toArray, toAsync } from '@fxts/core';
import dayjs from 'dayjs';

import { accumulation } from '@/api/manage';
import SearchPaging from '@/components/common/Paging/SearchPaging';
import AccumulationList from '@/components/mypage/accumulation/List';
import AccumulationSummary from '@/components/mypage/accumulation/Summary';
import { getTranslation } from '@/i18n/server';
import { GetAccumulationsParams } from '@/models/manage/accumulation';
import { css } from '@/styled-system/css';

type MypageAccumulationsPageProps = AppPageProps<'/mypage/accumulations'>;

export default async function MypageAccumulationsPage(
    props: MypageAccumulationsPageProps
) {
    const { t } = await getTranslation();

    const searchParams = await props.searchParams;

    const pageNumber = Number(searchParams.pageNumber) || 1;
    const pageSize = Number(searchParams.pageSize) || 10;

    const accumulationsSearchParams: GetAccumulationsParams = {
        pageNumber,
        pageSize,
        startYmd: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
    };

    const response = await pipe(
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
        toArray
    );

    const initialData = response.map((data, index) => ({
        data,
        pageNumber: index + 1,
    }));

    const totalCount =
        initialData[initialData.length - 1]?.data.totalCount ?? 0;

    return (
        <div>
            <AccumulationSummary />

            <AccumulationList
                searchParams={searchParams}
                initialData={initialData}
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
