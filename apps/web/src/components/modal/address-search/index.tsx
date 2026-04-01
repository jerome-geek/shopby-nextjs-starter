import { isEmpty } from '@fxts/core';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

import Paging from '@/components/ui/paging';
import ModalLayout from '@/components/layout/modal';
import InputField from '@/components/ui/input/field';
import { useAddressList } from '@/hooks/query/manage/address';
import * as styles from './index.css';
import { vars } from '@/styles/theme.css';

export interface AddressRegister {
    receiverJibunAddress: string;
    receiverAddress: string;
    receiverZipCd: string;
}

interface AddressSearchModalProps {
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
    onSelect: (address: AddressRegister) => void;
}

const AddressSearchModal = ({
    isOpen,
    close,
    unmount,
    onSelect,
}: AddressSearchModalProps) => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useState({
        pageNumber: 1,
        keyword: '',
        pageSize: 10,
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const { data } = useAddressList({
        params: searchParams,
        options: {
            enabled: searchParams.keyword !== '',
        },
    });

    const onSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const keyword = inputRef.current?.value || '';

        if (!keyword) {
            return;
        }

        setSearchParams((prev) => ({
            ...prev,
            keyword,
            pageNumber: 1,
        }));
    };

    const searchList = useMemo(() => {
        if (!data || isEmpty(data?.items)) {
            return [];
        }
        return data.items;
    }, [data]);

    return (
        <ModalLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            title={t('주소 검색')}
            size='medium'
        >
            <div className={styles.container}>
                <form
                    className={styles.searchInputForm}
                    onSubmit={onSubmitClick}
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
                </form>

                {!isEmpty(searchList) ? (
                    <>
                        <div className={styles.addressList} data-lenis-prevent>
                            {searchList.map((address: any, index: number) => (
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
                            <Paging
                                currentPage={searchParams.pageNumber}
                                totalCount={data?.totalCount ?? 0}
                                pageSize={searchParams.pageSize}
                                onPageClick={(page: number) => {
                                    setSearchParams((prev) => ({
                                        ...prev,
                                        pageNumber: page,
                                    }));
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '40px 0',
                            color: vars.color.gray['40'],
                        }}
                    >
                        {searchParams.keyword
                            ? t('검색 결과가 없습니다.')
                            : t('검색어를 입력해주세요.')}
                    </div>
                )}
            </div>
        </ModalLayout>
    );
};

export default AddressSearchModal;
