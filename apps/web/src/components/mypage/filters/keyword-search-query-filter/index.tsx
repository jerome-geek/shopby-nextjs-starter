import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '@fxts/core';

import * as styles from '@/components/mypage/filters/keyword-search-query-filter/index.css';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input/field';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import Select from '@/components/ui/select';
import { useResponsive } from '@/hooks/utils';

export type KeywordSearchQueryTypeOption = {
    value: string;
    label: string;
};

export interface MypageKeywordSearchQueryFilterProps {
    keywordKey?: string;
    typeKey?: string;
    typeOptions?: readonly KeywordSearchQueryTypeOption[];
    typeDefault?: string;
    typeOmitValue?: string;
    pageKey?: string;
    placeholder?: string;
    searchButtonLabel?: string;
}

const getQueryString = (query: string | string[] | undefined) => {
    if (Array.isArray(query)) {
        return query[0];
    }
    return query;
};

type RowProps = {
    keywordKey: string;
    typeKey: string;
    pageKey: string;
    placeholder?: string;
    searchButtonLabel?: string;
    typeOmitValue?: string;
    typeOptions: readonly KeywordSearchQueryTypeOption[];
    typeDefault: string;
    type?: string;
    keyword?: string;
};

const MypageKeywordSearchFilterRow = ({
    keywordKey,
    typeKey,
    pageKey,
    placeholder,
    searchButtonLabel,
    typeOmitValue,
    typeOptions = [],
    typeDefault,
    type,
    keyword,
}: RowProps) => {
    const { isMobile } = useResponsive();

    const { t } = useTranslation();
    const router = useRouter();
    const keywordInputRef = useRef<HTMLInputElement>(null);

    const isTypeSelectUsed = !isEmpty(typeOptions);

    const typeOptionFromUrl = useMemo(() => {
        if (!isTypeSelectUsed) {
            return undefined;
        }

        const current = type ?? typeDefault;

        return (
            typeOptions.find((option) => option.value === current) ??
            typeOptions[0]
        );
    }, [isTypeSelectUsed, typeDefault, type, typeOptions]);

    const [typeDraft, setTypeDraft] = useState<
        KeywordSearchQueryTypeOption | undefined
    >(() => {
        if (!isTypeSelectUsed) {
            return undefined;
        }

        const current = type ?? typeDefault;

        return (
            typeOptions.find((option) => option.value === current) ??
            typeOptions[0]
        );
    });

    const setQuery = (next: Record<string, string | number | undefined>) => {
        const isPageKeyIncludedInPatch = Boolean(next[pageKey]);

        void router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    ...next,
                    ...(isPageKeyIncludedInPatch ? {} : { [pageKey]: 1 }),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const keyword = (keywordInputRef.current?.value ?? '').trim();

        const next: Record<string, string | number | undefined> = {
            [keywordKey]: keyword || undefined,
        };

        if (isTypeSelectUsed) {
            const option = typeDraft ?? typeOptionFromUrl;
            if (option) {
                const value = option.value;
                next[typeKey] =
                    typeOmitValue !== undefined && value === typeOmitValue
                        ? undefined
                        : value;
            }
        }

        setQuery(next);
    };

    const selectValue = typeDraft ?? typeOptionFromUrl;

    return (
        <form onSubmit={onSubmit}>
            <InputFieldContainer
                className={styles.container}
                gridRatio={
                    isTypeSelectUsed ? (isMobile ? [1] : [1, 2, 1]) : [2, 1]
                }
            >
                {isTypeSelectUsed ? (
                    <Select
                        className={styles.typeSelect}
                        value={selectValue}
                        options={[...(typeOptions ?? [])]}
                        onChange={(opt) => {
                            setTypeDraft(opt ?? typeOptionFromUrl);
                        }}
                    />
                ) : null}

                <InputField
                    key={`${keywordKey}-${keyword ?? ''}`}
                    ref={keywordInputRef}
                    type='search'
                    defaultValue={keyword ?? ''}
                    placeholder={placeholder ?? t('검색어를 입력해 주세요.')}
                />

                <Button
                    frame='solid'
                    variant='secondary'
                    className={styles.searchButton}
                    type='submit'
                >
                    {searchButtonLabel ?? t('검색')}
                </Button>
            </InputFieldContainer>
        </form>
    );
};

export const MypageKeywordSearchQueryFilter = ({
    keywordKey = 'keyword',
    typeKey = 'searchType',
    typeOptions = [],
    typeDefault: typeDefaultProp,
    typeOmitValue,
    pageKey = 'pageNumber',
    placeholder,
    searchButtonLabel,
}: MypageKeywordSearchQueryFilterProps) => {
    const router = useRouter();

    const isTypeSelectUsed = !isEmpty(typeOptions);

    const typeDefault = typeDefaultProp ?? typeOptions?.[0]?.value ?? '';

    const keyword = getQueryString(router.query[keywordKey]);

    const type = isTypeSelectUsed
        ? getQueryString(router.query[typeKey])
        : undefined;

    const optionValuesKey =
        typeOptions?.map((option) => option.value).join('\0') ?? '';

    const mountKey = isTypeSelectUsed
        ? `${typeKey}:${type ?? typeDefault}:${optionValuesKey}`
        : 'keyword-only';

    return (
        <MypageKeywordSearchFilterRow
            key={mountKey}
            keywordKey={keywordKey}
            typeKey={typeKey}
            pageKey={pageKey}
            placeholder={placeholder}
            searchButtonLabel={searchButtonLabel}
            typeOmitValue={typeOmitValue}
            typeOptions={typeOptions}
            typeDefault={typeDefault}
            type={type}
            keyword={keyword}
        />
    );
};
