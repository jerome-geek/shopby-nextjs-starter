'use client';

import React from 'react';

import { HeartIcon } from '@/components/icons';
import { useProductProfileMutation } from '@/hooks/mutations';
import useDialog from '@/hooks/useDialog';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

export default function LikeButton({
    productNo,
    liked,
    likeCnt,
}: {
    productNo: number;
    liked: boolean;
    likeCnt: number;
}) {
    const { openDialog } = useDialog();

    const {
        like: { mutate: likeMutate },
    } = useProductProfileMutation();

    const onLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // TODO: 상품 좋아요 기능 구현 예정
        console.log('🚀 ~ onLikeButtonClick ~ e:', e);

        // if (!checkLogin()) {
        //     openLoginDialog();
        //     return;
        // }

        likeMutate(
            {
                data: {
                    items: [
                        {
                            productNo,
                            like: liked ? 'N' : 'Y',
                        },
                    ],
                },
            },
            {
                onSuccess: () => {
                    // router.refresh();
                    openDialog({
                        message: liked
                            ? '좋아하는 상품에서 제거하였습니다.'
                            : '좋아하는 상품에 추가하였습니다.',
                    });
                },
            },
        );
    };

    return (
        <button
            className={css({ marginLeft: 'auto' })}
            onClick={onLikeButtonClick}
        >
            <HeartIcon />
            <span
                className={css({
                    fontSize: '1rem',
                    lineHeight: '1.4',
                    letterSpacing: '-2%',
                    fontWeight: '500',
                    color: token('colors.gray70'),
                })}
            >
                {likeCnt}
            </span>
        </button>
    );
}
