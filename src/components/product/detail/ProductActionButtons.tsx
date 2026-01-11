'use client';

import { useTranslation } from 'react-i18next';

import LikeButton from '@/components/product/LikeButton';
import { Button } from '@/components/ui/button';
import { hstack } from '@/styled-system/patterns';
import { css } from '@/styled-system/css';
import useDialog from '@/hooks/useDialog';

export default function ProductActionButtons({
    productNo,
    liked,
    likeCnt,
}: {
    productNo: number;
    liked: boolean;
    likeCnt: number;
}) {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    return (
        <div
            className={hstack({
                gap: '8px',
                width: '100%',
                alignItems: 'stretch',
            })}
        >
            {/* TODO: 전체에 버튼 이벤트가 걸리도록 해야됨 */}
            <div
                className={css({
                    width: '52px',
                    height: '52px',
                    flexShrink: 0,
                    border: '1px solid {colors.border}',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                })}
            >
                <LikeButton
                    productNo={productNo}
                    liked={liked}
                    likeCnt={likeCnt}
                />
            </div>

            <Button
                type='button'
                frame='outlined'
                className={css({ flex: 1, height: '52px!' })}
                onClick={(e) => {
                    openDialog({
                        type: 'confirm',
                        iconType: 'cart',
                        message: '장바구니에 아이템을 담았습니다.',
                        cancelText: '계속 쇼핑하기',
                        confirmText: '장바구니 바로가기',
                    });
                }}
            >
                <span>{t('장바구니')}</span>
            </Button>
            <Button
                type='button'
                frame='solid'
                variant='primary'
                className={css({ flex: 1, height: '52px!' })}
            >
                <span>{t('구매하기')}</span>
            </Button>
        </div>
    );
}
