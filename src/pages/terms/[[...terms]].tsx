import { entries, filter, head, isUndefined, map, pipe } from '@fxts/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { terms } from '@/api/manage';
import TermsHistorySelect from '@/components/terms/TermHistorySelect';
import { SHOPBY_TERM_HISTORY_MAP, SHOPBY_TERMS_TYPE_MAP } from '@/const/label';
import { ShopbyTermHistoryTypes, ShopbyTermsTypes } from '@/models';
import { TermHistory } from '@/models/manage/terms';

import * as styles from './Terms.css';

interface TermsDetailPageProps {
    termData: {
        contents: string;
        enforcementDate: string;
        used: boolean;
        termsNo?: number;
    };
    historyData: TermHistory[];
    termsType: string;
    currentTermsNo: number | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
    // 주요 약관 타입들에 대해 기본 경로(/terms/USE 등)를 미리 생성
    const types = ['USE', 'PI_PROCESS', 'PRIVACY'];
    const paths = types.map((type) => ({
        params: { terms: [type] },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<TermsDetailPageProps> = async ({
    params,
}) => {
    const termsParams = params?.terms as string[] | undefined;

    // 1. /terms (파라미터 없음) -> 404
    if (!termsParams || termsParams.length === 0) {
        return { notFound: true };
    }

    const [termsType, termsNoStr] = termsParams;

    // 2. /terms/USE/123/abc (파라미터 3개 이상) -> 404
    if (termsParams.length > 2) {
        return { notFound: true };
    }

    const termsNo = termsNoStr ? termsNoStr : undefined;

    const upperType = termsType.toUpperCase();
    const isHistoryType =
        upperType in SHOPBY_TERM_HISTORY_MAP ||
        upperType in SHOPBY_TERMS_TYPE_MAP;

    try {
        let termData = null;
        let historyData: TermHistory[] = [];

        // 1. 변경 이력이 지원되는 타입인 경우 히스토리 조회
        // SHOPBY_TERMS_TYPE_MAP에 있는 타입이면 일단 시도
        if (isHistoryType) {
            try {
                historyData = await terms
                    .getTermHistory({
                        termsType: upperType as ShopbyTermHistoryTypes,
                    })
                    .json();
            } catch (e) {
                console.error('History fetch failed:', e);
            }
        }

        // 2. 특정 약관 번호가 요청된 경우 상세 조회, 없으면 리스트에서 현재 적용 중인 약관 조회
        if (termsNo) {
            termData = await terms.getTermDetail(Number(termsNo)).json();
        } else {
            const response = await terms
                .getTermList({
                    termsTypes: [upperType as ShopbyTermsTypes],
                    usedOnly: true,
                })
                .json();

            // API 응답 구조에 맞게 매핑 (ko -> ko, use -> use 등)
            const termKey = termsType.toLowerCase();
            termData = response[termKey as keyof typeof response];
        }

        if (!termData) {
            return { notFound: true };
        }

        return {
            props: {
                termData,
                historyData,
                termsType: upperType,
                currentTermsNo: termsNo
                    ? Number(termsNo)
                    : historyData?.[0]?.termsNo || null,
            },
            revalidate: 604800, // 7 days (ISR)
        };
    } catch (error) {
        console.error('Failed to fetch terms detail:', error);
        return { notFound: true };
    }
};

export default function TermsDetailPage({
    termData,
    historyData,
    termsType,
    currentTermsNo,
}: TermsDetailPageProps) {
    const { t } = useTranslation();
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const isHistoryType =
        termsType in SHOPBY_TERM_HISTORY_MAP ||
        termsType in SHOPBY_TERMS_TYPE_MAP;

    const termTitle = pipe(
        SHOPBY_TERMS_TYPE_MAP,
        entries,
        filter(([k]) => k === termsType),
        map(([, v]) => v),
        head,
        (a) => (isUndefined(a) ? '이용약관' : a),
    );

    return (
        <>
            <Head>
                <title>{`${t(termTitle)} | My Shop`}</title>
            </Head>

            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>{t(termTitle)}</h1>

                    {/* 변경 이력 선택 */}
                    {isHistoryType && historyData && historyData.length > 0 && (
                        <TermsHistorySelect
                            historyList={historyData}
                            currentTermsNo={currentTermsNo || undefined}
                        />
                    )}

                    <div className={styles.date}>
                        {t('시행일: {{enforcementDate}}', {
                            enforcementDate: termData.enforcementDate,
                        })}
                    </div>
                </header>

                <section
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: termData.contents }}
                />
            </article>
        </>
    );
}
