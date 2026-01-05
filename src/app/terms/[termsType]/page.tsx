import { entries, filter, head, isUndefined, map, pipe } from '@fxts/core';
import { notFound } from 'next/navigation';

import { terms } from '@/api/manage';
import TermsHistorySelect from '@/components/terms/TermHistorySelect';
import { SHOPBY_TERM_HISTORY_MAP, SHOPBY_TERMS_TYPE_MAP } from '@/const/label';
import { getTranslation } from '@/i18n/server';
import { ShopbyTermHistoryTypes, ShopbyTermsTypes } from '@/models';
import { TermHistory } from '@/models/manage/terms';
import { css } from '@/styled-system/css';

// 약관 페이지는 자주 변경되지 않으므로 일주일 동안 캐싱합니다. (60초 * 60분 * 24시간 * 7일)
export const revalidate = 60 * 60 * 24 * 7;

export default async function TermsDetailPage({
    params,
    searchParams,
}: AppPageProps<'/terms/[termsType]'>) {
    const { termsType } = await params;
    const { termsNo } = await searchParams;
    const { t } = await getTranslation();

    const upperType = termsType.toUpperCase();
    const isHistoryType = upperType in SHOPBY_TERM_HISTORY_MAP;

    const termTitle = pipe(
        SHOPBY_TERMS_TYPE_MAP,
        entries,
        filter(([k]) => k === upperType),
        map(([, v]) => v),
        head,
        (a) => (isUndefined(a) ? '이용약관' : a)
    );

    try {
        let termData: {
            contents: string;
            enforcementDate: string;
            used: boolean;
        } | null = null;

        let historyData: TermHistory[] = [];

        // 1. 변경 이력이 지원되는 타입인 경우 히스토리 조회
        if (isHistoryType) {
            historyData = await terms
                .getTermHistory({
                    termsType: upperType as ShopbyTermHistoryTypes,
                })
                .json();
        }

        // 2. 특정 약관 번호가 요청된 경우 상세 조회, 없으면 리스트에서 현재 약관 조회
        if (termsNo) {
            termData = await terms.getTermDetail(Number(termsNo)).json();
        } else {
            const response = await terms
                .getTermList({
                    termsTypes: [upperType as ShopbyTermsTypes],
                    usedOnly: true,
                })
                .json();
            const termKey =
                termsType.toLowerCase() as Lowercase<ShopbyTermsTypes>;
            termData = response[termKey];
        }

        if (!termData) {
            return notFound();
        }

        return (
            <article
                className={css({
                    padding: { base: '24px 16px', md: '40px 20px' },
                })}
            >
                <header
                    className={css({
                        borderBottom: '2px solid #000',
                        paddingBottom: '20px',
                        marginBottom: '30px',
                    })}
                >
                    <h1
                        className={css({
                            fontSize: { base: '24px', md: '32px' },
                            fontWeight: 'bold',
                            color: '#111',
                            marginBottom: '20px',
                        })}
                    >
                        {t(termTitle)}
                    </h1>

                    {/* 변경 이력 선택 (지원되는 타입인 경우에만 노출) */}
                    {isHistoryType && historyData && historyData.length > 0 && (
                        <TermsHistorySelect
                            historyList={historyData}
                            currentTermsNo={
                                termsNo ? Number(termsNo) : undefined
                            }
                        />
                    )}

                    <div
                        className={css({
                            marginTop: '10px',
                            fontSize: '14px',
                            color: '#666',
                        })}
                    >
                        시행일: {termData.enforcementDate}
                    </div>
                </header>

                <section
                    className={css({
                        lineHeight: '1.7',
                        fontSize: '15px',
                        color: '#333',
                        '& p': { marginBottom: '1em' },
                        '& table': {
                            width: '100%',
                            borderCollapse: 'collapse',
                            margin: '20px 0',
                            border: '1px solid #ddd',
                        },
                        '& th, & td': {
                            border: '1px solid #ddd',
                            padding: '12px',
                            textAlign: 'left',
                        },
                        '& th': { backgroundColor: '#f9f9f9' },
                    })}
                    dangerouslySetInnerHTML={{ __html: termData.contents }}
                />
            </article>
        );
    } catch (error) {
        console.error('Failed to benefit terms detail:', error);
        return notFound();
    }
}
