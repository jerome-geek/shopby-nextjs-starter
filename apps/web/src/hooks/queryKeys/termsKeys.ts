import type {
    GetTermHistoryParams,
    GetTermListByPostData,
    GetTermListParams,
    GetUsedTermsParams,
} from '@/models/manage/terms';

const termsKeys = {
    all: ['terms'] as const,

    lists: () => [...termsKeys.all, 'list'] as const,
    list: (searchParams: GetTermListParams) =>
        [...termsKeys.lists(), searchParams] as const,

    listV2: (data: GetTermListByPostData) =>
        [...termsKeys.lists(), 'v2', data] as const,

    details: () => [...termsKeys.all, 'detail'] as const,
    detail: (termsNo: number) => [...termsKeys.details(), termsNo] as const,

    histories: () => [...termsKeys.all, 'history'] as const,
    history: (searchParams: GetTermHistoryParams) =>
        [...termsKeys.histories(), searchParams] as const,

    usedTerms: () => [...termsKeys.all, 'used'] as const,
    usedTerm: (searchParams: GetUsedTermsParams) =>
        [...termsKeys.usedTerms(), searchParams] as const,
};

export default termsKeys;
