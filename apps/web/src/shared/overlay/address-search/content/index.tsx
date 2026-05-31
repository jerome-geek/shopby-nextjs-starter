import { isEmpty } from '@fxts/core';
import { Search } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import { ObserverTarget } from '@/shared/components/observer-target';
import * as styles from '@/shared/overlay/address-search/content/index.css';
import { InputField, InputFieldContainer } from '@/shared/ui/input';
import { useInfiniteAddressList } from '@/hooks/query/manage/address';

export interface AddressRegister {
    receiverJibunAddress: string;
    receiverAddress: string;
    receiverZipCd: string;
}

interface AddressSearchProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onSelect: (address: AddressRegister) => void;
}

export const AddressSearch = ({ close, onSelect }: AddressSearchProps) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useState({
        pageNumber: 1,
        keyword: '',
        pageSize: 20,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const {
        data: infiniteAddressListData,
        isLoading: infiniteAddressListLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteAddressList({
        searchParams,
    });

    const onSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const keyword = inputRef.current?.value || '';

        if (!keyword) {
            return;
        }

        const content = document.getElementById('modal-content');

        if (content) {
            content.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        }

        setSearchParams((prev) => ({
            ...prev,
            keyword,
            pageNumber: 1,
        }));
    };

    const searchList = useMemo(() => {
        return (
            infiniteAddressListData?.pages?.flatMap((a) => a.data.items) ?? []
        );
    }, [infiniteAddressListData]);

    const totalCount = infiniteAddressListData?.pages[0]?.data.totalCount || 0;

    return (
        <div className={styles.container}>
            <form
                className={styles.searchInputForm}
                onSubmit={onSubmitClick}
                id='address-search-form'
            >
                <InputFieldContainer
                    style={{
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <InputField
                        ref={inputRef}
                        placeholder={t(
                            '도로명, 건물명, 지번에 대한 통합검색이 가능합니다.',
                        )}
                    />
                    <button type='submit' className={styles.searchButton}>
                        <Search size={20} />
                    </button>
                </InputFieldContainer>
            </form>

            <LoadingWrapper
                isLoading={infiniteAddressListLoading}
                isLoadedAnimation
            >
                {!isEmpty(searchList) ? (
                    <>
                        <div className={styles.addressList} data-lenis-prevent>
                            {searchList.map((address, index) => (
                                <div
                                    key={index}
                                    className={styles.addressListItem}
                                >
                                    <button
                                        type='button'
                                        className={styles.addressButton}
                                        onClick={() => {
                                            onSelect({
                                                receiverAddress:
                                                    address.roadAddress,
                                                receiverJibunAddress:
                                                    address.jibunAddress,
                                                receiverZipCd: address.zipCode,
                                            });
                                            close();
                                        }}
                                    >
                                        <span className={styles.zipCode}>
                                            {address.zipCode}
                                        </span>
                                        <div className={styles.addressRow}>
                                            <span
                                                className={styles.addressBadge}
                                            >
                                                {t('도로명')}
                                            </span>
                                            <span>{address.roadAddress}</span>
                                        </div>
                                        <div className={styles.addressRow}>
                                            <span
                                                className={styles.addressBadge}
                                            >
                                                {t('지번')}
                                            </span>
                                            <span>{address.jibunAddress}</span>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.pagingContainer}>
                            <ObserverTarget
                                onIntersect={() => {
                                    if (hasNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                                hasNextPage={hasNextPage || false}
                            />
                        </div>
                    </>
                ) : (
                    <NoResult
                        text={
                            searchParams.keyword
                                ? t('검색 결과가 없습니다.')
                                : t('검색어를 입력해주세요.')
                        }
                        style={{
                            height: '250px',
                        }}
                    />
                )}
            </LoadingWrapper>
        </div>
    );
};
