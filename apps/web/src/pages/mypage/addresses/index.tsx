import { isEmpty, pipe, sortBy, toArray } from '@fxts/core';
import { useRouter } from 'next/router';
import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useShippingAddressMutation } from '@/hooks/mutations';
import { useShippingAddressList } from '@/hooks/query/order/shippingAddress';
import { useToast } from '@/hooks/ui';
import { useDialog, useResponsive } from '@/hooks/utils';
import type { Address } from '@/models/order/shippingAddress';
import * as styles from '@/pages/mypage/addresses/index.css';

export const MypageAddresses = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const {
        data: shippingAddressListData,
        isLoading: isShippingAddressListLoading,
    } = useShippingAddressList();

    const addressList = useMemo(() => {
        if (!shippingAddressListData?.bookedAddresses) {
            return [];
        }

        return pipe(
            shippingAddressListData.bookedAddresses,
            sortBy((a: Address) => a.defaultYn === 'N'),
            toArray,
        );
    }, [shippingAddressListData]);

    const totalCount = addressList.length;

    const {
        delete: { mutate: deleteShippingAddressMutation },
        setDefault: { mutate: setDefaultMutation },
    } = useShippingAddressMutation();

    const isLoading = isShippingAddressListLoading;

    const onDeleteShippingAddress = async (
        addressNo: number,
        addressName: string,
    ) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: t('{{addressName}}을/를 삭제하시겠습니까?', {
                addressName,
            }),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isAgree) {
            deleteShippingAddressMutation(
                { addressNo },
                {
                    onSuccess() {
                        addToast({
                            message: t('배송지가 삭제되었습니다.'),
                        });
                    },
                },
            );
        }
    };

    const onSetDefaultShippingAddress = async (
        addressNo: number,
        addressName: string,
    ) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: t(
                '{{addressName}}을(를) 기본 배송지로 설정하시겠습니까?',
                {
                    addressName,
                },
            ),
            iconType: 'warning',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (isAgree) {
            setDefaultMutation(
                { addressNo },
                {
                    onSuccess() {
                        addToast({
                            message: t('기본 배송지가 변경되었습니다.'),
                        });
                    },
                },
            );
        }
    };

    const modifyPath = (addressNo: number) =>
        PATHS.MYPAGE.ADDRESSES.MODIFY.replace('[addressNo]', String(addressNo));

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div
                    className={card.metaRow}
                    style={{
                        marginTop: '0',
                    }}
                >
                    <div className={card.metaRowLeft}>
                        <span
                            className={card.count}
                            dangerouslySetInnerHTML={{
                                __html: t('총 <b>{{totalCount}}</b>개', {
                                    totalCount,
                                }),
                            }}
                        />
                    </div>

                    <div className={card.metaRowRight}>
                        <Button
                            className={card.registerButton}
                            frame='solid'
                            type='button'
                            variant='primary'
                            onClick={() => {
                                router.push(PATHS.MYPAGE.ADDRESSES.REGISTER);
                            }}
                        >
                            {t('배송지 등록')}
                        </Button>
                    </div>
                </div>

                <div className={card.list}>
                    {!isMobile && (
                        <div
                            className={card.headerRow}
                            style={{
                                gridTemplateColumns:
                                    'minmax(140px, 220px) minmax(0, 1fr) minmax(100px, 150px)',
                            }}
                        >
                            <div className={card.headerCell}>
                                {t('배송지명')}
                            </div>
                            <div className={card.headerCell}>
                                {t('배송지 정보')}
                            </div>
                            <div className={card.headerCell}>{t('선택')}</div>
                        </div>
                    )}

                    <LoadingWrapper isLoading={isLoading}>
                        {isEmpty(addressList) ? (
                            <NoResult text={t('배송지 목록이 없습니다.')} />
                        ) : (
                            <ul>
                                {addressList.map((address) => (
                                    <li
                                        key={address.addressNo}
                                        className={card.listItem}
                                        style={{
                                            gridTemplateColumns: isMobile
                                                ? '1fr'
                                                : 'minmax(140px, 220px) minmax(0, 1fr) minmax(100px, 150px)',
                                        }}
                                    >
                                        <div className={card.cellAlignStart}>
                                            <div
                                                className={
                                                    styles.addressNameBlock
                                                }
                                            >
                                                {address.defaultYn === 'Y' && (
                                                    <span
                                                        className={
                                                            styles.statusBadge
                                                        }
                                                    >
                                                        {t('기본 배송지')}
                                                    </span>
                                                )}
                                                <p
                                                    className={
                                                        styles.addressName
                                                    }
                                                >
                                                    {address.addressName}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={card.cellAlignStart}>
                                            <div
                                                className={styles.addressLines}
                                            >
                                                <p
                                                    className={
                                                        styles.addressLine
                                                    }
                                                >
                                                    {address.receiverName} /{' '}
                                                    {address.receiverContact1}
                                                </p>
                                                <p
                                                    className={
                                                        styles.addressLine
                                                    }
                                                >
                                                    ({address.receiverZipCd}) /{' '}
                                                    {address.receiverAddress},{' '}
                                                    {
                                                        address.receiverDetailAddress
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                styles.addressActionsCell
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.inlineButtonRow
                                                }
                                            >
                                                <button
                                                    className={
                                                        styles.textButton
                                                    }
                                                    type='button'
                                                    onClick={() => {
                                                        router.push(
                                                            modifyPath(
                                                                address.addressNo,
                                                            ),
                                                        );
                                                    }}
                                                >
                                                    {t('수정')}
                                                </button>
                                                {address.defaultYn === 'N' && (
                                                    <button
                                                        className={
                                                            styles.textButton
                                                        }
                                                        type='button'
                                                        onClick={() => {
                                                            onDeleteShippingAddress(
                                                                address.addressNo,
                                                                address.addressName,
                                                            );
                                                        }}
                                                    >
                                                        {t('삭제')}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {address.defaultYn === 'N' && (
                                            <button
                                                className={
                                                    styles.defaultChangeButton
                                                }
                                                type='button'
                                                onClick={() => {
                                                    onSetDefaultShippingAddress(
                                                        address.addressNo,
                                                        address.addressName,
                                                    );
                                                }}
                                            >
                                                {t('기본배송지로 변경')}
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </LoadingWrapper>
                </div>
            </section>
        </div>
    );
};

MypageAddresses.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageAddresses;
