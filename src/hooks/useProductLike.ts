import { includes } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useProductProfileMutation } from '@/hooks/mutations';
import { productKeys, productProfileKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import useDialog from '@/hooks/useDialog';

const useProductLike = () => {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const { openDialog, openLoginDialog } = useDialog();

    const {
        like: { mutate: likeMutate },
    } = useProductProfileMutation();

    const isAuthenticated = useAuth();

    const onLikeButtonClick =
        (productNo: number, liked: boolean) => (e?: React.SyntheticEvent) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

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
                        // queryKey 하나로 배열을 넘기는 것은 지원하지 않음.
                        // 여러 개를 매칭하고 싶다면 predicate를 활용할 수 있습니다.
                        queryClient.invalidateQueries({
                            predicate: (query) =>
                                includes(query.queryKey[0], [
                                    ...productKeys.all,
                                    ...productProfileKeys.all,
                                ]),
                            refetchType: 'none',
                        });

                        openDialog({
                            message: t(
                                liked
                                    ? '좋아하는 상품에서 제거하였습니다.'
                                    : '좋아하는 상품에 추가하였습니다.',
                            ),
                        });
                    },
                },
            );
        };

    return { onLikeButtonClick };
};

export default useProductLike;
