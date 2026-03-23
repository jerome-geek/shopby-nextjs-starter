import { entries, filter, head, isUndefined, map, pipe } from '@fxts/core';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import TermsHistorySelect from '@/components/terms/historySelect';
import { SHOPBY_TERMS_TYPE_MAP } from '@/const/label';
import { useTermHistory, useTermList } from '@/hooks/query/manage/terms';
import { ShopbyTermHistoryTypes, ShopbyTermsTypes } from '@/models';
import * as styles from '@/pages/terms/[termsType]/index.css';
import { useSearchParams } from 'next/navigation';

interface TermsDetailPageProps {
    termsType: ShopbyTermsTypes;
}

export const getStaticPaths: GetStaticPaths = async () => {
    // 주요 약관 타입들에 대해 기본 경로(/terms/USE 등)를 미리 생성
    const types = ['USE', 'PI_PROCESS', 'PRIVACY'];
    const paths = types.map((type) => ({
        params: { termsType: type },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<TermsDetailPageProps> = async ({
    params,
}) => {
    const termsType = params?.termsType as string;

    const isValidType = termsType && termsType in SHOPBY_TERMS_TYPE_MAP;

    if (!isValidType) {
        return { notFound: true };
    }

    return {
        props: {
            termsType: termsType as ShopbyTermsTypes,
        },
    };
};

export default function TermsDetailPage({
    termsType,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { t } = useTranslation();

    const searchParams = useSearchParams();

    const termsNo = searchParams.get('termsNo')
        ? Number(searchParams.get('termsNo'))
        : undefined;

    const termTitle = pipe(
        SHOPBY_TERMS_TYPE_MAP,
        entries,
        filter(([k]) => k === termsType),
        map(([, v]) => v),
        head,
        (a) => (isUndefined(a) ? '이용약관' : a),
    );

    const { data: termListData } = useTermList({
        searchParams: { termsTypes: [termsType] },
    });

    const termData =
        termListData?.[termsType.toLowerCase() as keyof typeof termListData];

    const { data: termHistoryData } = useTermHistory({
        searchParams: {
            termsType: termsType as ShopbyTermHistoryTypes,
        },
    });

    return (
        <>
            <Head>
                {generateNextSeo({
                    title: `${t(termTitle)}`,
                })}
            </Head>

            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t(termTitle)}</h1>

                    {/* 변경 이력 선택 */}
                    {termHistoryData && termHistoryData.length > 0 && (
                        <TermsHistorySelect
                            historyList={termHistoryData}
                            currentTermsNo={
                                termsNo || termHistoryData[0]?.termsNo
                            }
                        />
                    )}

                    <div className={styles.date}>
                        {termData?.enforcementDate &&
                            t('시행일: {{enforcementDate}}', {
                                enforcementDate: termData.enforcementDate,
                            })}
                    </div>
                </header>

                <section
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                        __html: termData?.contents ?? '',
                    }}
                />
            </article>
        </>
    );
}
