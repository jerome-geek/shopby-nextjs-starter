import { isEmpty } from '@fxts/core';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryStates } from 'nuqs';

import { SearchIcon } from '@/components/icons';
import * as styles from '@/components/mypage/filters/keyword-search-query-filter/index.css';
import { InputField, InputFieldContainer, Select } from '@/components/ui/input';
import {
    parseAsEnum,
    parseAsOptionalString,
    parseAsPositiveInt,
} from '@/entities/mypage/utils/parsers';
import { useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

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
}

type RowProps = {
    keywordKey: string;
    typeKey: string;
    pageKey: string;
    placeholder?: string;
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
    typeOmitValue,
    typeOptions = [],
    typeDefault,
    type,
    keyword,
}: RowProps) => {
    const { isMobile } = useResponsive();

    const { t } = useTranslation();
    const keywordInputRef = useRef<HTMLInputElement>(null);

    const isTypeSelectUsed = !isEmpty(typeOptions);

    const allowedTypeValues = useMemo(() => {
        return typeOptions.map((option) => option.value);
    }, [typeOptions]);

    const [query, setQueryStates] = useQueryStates(
        {
            [keywordKey]: parseAsOptionalString,
            ...(isTypeSelectUsed
                ? {
                      [typeKey]: parseAsEnum(allowedTypeValues).withDefault(
                          typeDefault,
                      ),
                  }
                : {}),
            [pageKey]: parseAsPositiveInt.withDefault(1),
        } as never,
        { shallow: true, history: 'push' },
    );

    const keywordFromUrl = (query as Record<string, string | null>)[keywordKey];
    const typeFromUrl = isTypeSelectUsed
        ? (query as Record<string, string | null>)[typeKey]
        : undefined;

    const typeOptionFromUrl = useMemo(() => {
        if (!isTypeSelectUsed) {
            return undefined;
        }

        const current = typeFromUrl ?? typeDefault;

        return (
            typeOptions.find((option) => option.value === current) ??
            typeOptions[0]
        );
    }, [isTypeSelectUsed, typeDefault, typeFromUrl, typeOptions]);

    const [typeDraft, setTypeDraft] = useState<
        KeywordSearchQueryTypeOption | undefined
    >(() => {
        if (!isTypeSelectUsed) {
            return undefined;
        }

        const current = typeFromUrl ?? typeDefault;

        return (
            typeOptions.find((option) => option.value === current) ??
            typeOptions[0]
        );
    });

    const setQuery = (next: Record<string, string | number | undefined>) => {
        const isPageKeyIncludedInPatch = next[pageKey] !== undefined;

        const patch: Record<string, string | number | null> = {};
        if (keywordKey in next) {
            patch[keywordKey] = next[keywordKey]
                ? String(next[keywordKey])
                : null;
        }

        if (isTypeSelectUsed && typeKey in next) {
            patch[typeKey] = next[typeKey] ? String(next[typeKey]) : null;
        }

        if (isPageKeyIncludedInPatch) {
            patch[pageKey] = Number(next[pageKey]) || 1;
        } else {
            patch[pageKey] = 1;
        }

        setQueryStates(patch as never);
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
                gridRatio={isTypeSelectUsed ? (isMobile ? [1] : [1, 2]) : [1]}
            >
                {isTypeSelectUsed ? (
                    <Select
                        className={styles.typeSelect}
                        value={selectValue}
                        options={[...(typeOptions ?? [])]}
                        onChange={(opt) => {
                            setTypeDraft(opt ?? typeOptionFromUrl);
                        }}
                        classNames={{
                            control: () => styles.typeSelectContainer,
                        }}
                    />
                ) : null}

                <div className={styles.inputWrapper}>
                    <InputField
                        key={`${keywordKey}-${keywordFromUrl ?? ''}`}
                        ref={keywordInputRef}
                        defaultValue={keywordFromUrl ?? ''}
                        placeholder={
                            placeholder ?? t('검색어를 입력해 주세요.')
                        }
                    />

                    <button className={styles.searchButton} type='submit'>
                        <SearchIcon currentColor={vars.color.gray[60]} />
                    </button>
                </div>
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
}: MypageKeywordSearchQueryFilterProps) => {
    const isTypeSelectUsed = !isEmpty(typeOptions);

    const typeDefault = typeDefaultProp ?? typeOptions?.[0]?.value ?? '';

    return (
        <MypageKeywordSearchFilterRow
            keywordKey={keywordKey}
            typeKey={typeKey}
            pageKey={pageKey}
            placeholder={placeholder}
            typeOmitValue={typeOmitValue}
            typeOptions={typeOptions}
            typeDefault={typeDefault}
        />
    );
};
