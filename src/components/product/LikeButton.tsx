'use client';

import React from 'react';

import { HeartIcon } from '@/components/icons';
import { useProductProfileMutation } from '@/hooks/mutations';
import { useAuth } from '@/hooks/useAuth';
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
    const { openDialog, openLoginDialog } = useDialog();

    const {
        like: { mutate: likeMutate },
    } = useProductProfileMutation();

    const { isAuthenticated } = useAuth();

    const onLikeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            openLoginDialog();
            return;
        }

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
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                cursor: 'pointer',
                width: 'auto',
            })}
            onClick={onLikeButtonClick}
        >
            <HeartIcon />
            <span
                className={css({
                    fontSize: '1rem',
                    lineHeight: '1.4',
                    letterSpacing: '-0.02em',
                    fontWeight: '500',
                    color: token('colors.gray70'),
                    textAlign: 'center',
                })}
            >
                {likeCnt}
            </span>
        </button>
    );
}
