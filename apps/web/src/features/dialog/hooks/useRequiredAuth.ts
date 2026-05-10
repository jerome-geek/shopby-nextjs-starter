import { useRouter } from 'next/router';
import { createSerializer, parseAsString } from 'nuqs';
import { useCallback } from 'react';

import { MODAL_QUERY_KEY, MODAL_TYPE, type ModalType } from '@/const/modal';
import { useAuth } from '@/hooks/useAuth';

const modalSerializer = createSerializer({
    [MODAL_QUERY_KEY]: parseAsString,
    recipeSno: parseAsString,
});

type PreventableEvent = {
    preventDefault: () => void;
    stopPropagation: () => void;
};

const isPreventableEvent = (value: unknown): value is PreventableEvent => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'preventDefault' in value &&
        'stopPropagation' in value
    );
};

export const useRequiredAuth = (
    openLoginDialog: (returnUrl?: string) => void,
) => {
    const router = useRouter();
    const isLogin = useAuth();

    return useCallback(
        <TArgs extends unknown[], TResult>(
            action: (...args: TArgs) => TResult,
            modalType?: ModalType,
        ) => {
            return (...args: TArgs): TResult | void => {
                if (isLogin) {
                    return action(...args);
                }

                const event = isPreventableEvent(args[0]) ? args[0] : undefined;

                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                if (!modalType) {
                    openLoginDialog(router.asPath);
                    return;
                }

                const returnUrl = modalSerializer(router.asPath, {
                    [MODAL_QUERY_KEY]: modalType,
                    recipeSno:
                        modalType === MODAL_TYPE.RECIPE_SAVE &&
                        typeof args[0] === 'number'
                            ? String(args[0])
                            : null,
                });

                openLoginDialog(returnUrl);
            };
        },
        [isLogin, openLoginDialog, router.asPath],
    );
};
