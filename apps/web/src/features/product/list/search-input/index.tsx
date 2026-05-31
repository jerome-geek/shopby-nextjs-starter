import { ArrowLeft, Search, X } from 'lucide-react';
import { useEffect, type ReactElement } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import * as styles from '@/features/product/list/search-input/index.css';
import { useToast } from '@/hooks/ui/useToast';
import { useSearchKeyword } from '@/hooks/useSearchKeyword';
import { useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

type SearchKeywordFormValues = {
    keyword: string;
};

export type ProductListSearchInputProps = {
    searchAfterAction?: () => void;
    onBack?: () => void;
    placeholder?: string;
    autoFocus?: boolean;
    syncKeywordFromUrl?: boolean;
    className?: string;
};

export const ProductListSearchInput = ({
    searchAfterAction,
    onBack,
    placeholder = '레시피, 상품을 검색하세요',
    autoFocus = true,
    syncKeywordFromUrl = false,
    className,
}: ProductListSearchInputProps): ReactElement => {
    const { isMobile } = useResponsive();

    const { addToast } = useToast();

    const { keywordFromQuery, searchByKeyword } = useSearchKeyword();

    const urlKeyword = syncKeywordFromUrl ? keywordFromQuery : '';

    const { register, handleSubmit, control, setValue } =
        useForm<SearchKeywordFormValues>({
            defaultValues: { keyword: urlKeyword },
        });

    useEffect(() => {
        if (!syncKeywordFromUrl) {
            return;
        }

        setValue('keyword', keywordFromQuery);
    }, [keywordFromQuery, setValue, syncKeywordFromUrl]);

    const keywordInput =
        useWatch({ control, name: 'keyword', defaultValue: '' }) ?? '';

    const hasTypedKeyword = keywordInput.trim().length > 0;

    const showDesktopClear = !isMobile && hasTypedKeyword;

    const handleClearKeyword = () => {
        setValue('keyword', '', { shouldDirty: true });
    };

    const onSubmit = (data: SearchKeywordFormValues) => {
        const navigated = searchByKeyword(data.keyword);

        if (!navigated) {
            addToast({ message: '검색어를 입력해 주세요.' });
            return;
        }

        if (isMobile) {
            const active = document.activeElement;

            if (active instanceof HTMLElement) {
                active.blur();
            }
        }

        searchAfterAction?.();
    };

    return (
        <div
            className={[styles.searchKeywordFormContainer, className]
                .filter(Boolean)
                .join(' ')}
        >
            {isMobile && onBack && (
                <button
                    type='button'
                    className={styles.iconButton}
                    onClick={onBack}
                    aria-label='뒤로가기'
                >
                    <ArrowLeft size={24} strokeWidth={1.5} />
                </button>
            )}

            <form
                className={styles.searchForm}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles.searchFormRow}>
                    <input
                        {...register('keyword')}
                        placeholder={placeholder}
                        className={styles.searchInput}
                        autoFocus={autoFocus}
                        enterKeyHint='search'
                    />

                    <div className={styles.searchIconGroup}>
                        {showDesktopClear && (
                            <button
                                type='button'
                                className={styles.searchClearButton}
                                onClick={handleClearKeyword}
                                aria-label='검색어 지우기'
                            >
                                <X
                                    size={16}
                                    strokeWidth={1.5}
                                    color={vars.color.white}
                                />
                            </button>
                        )}

                        <button
                            type='submit'
                            className={styles.searchSubmitButton}
                            aria-label='검색'
                        >
                            {isMobile ? (
                                <Search
                                    size={20}
                                    strokeWidth={1.25}
                                    color={vars.color.gray['60']}
                                />
                            ) : (
                                <Search size={36} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
