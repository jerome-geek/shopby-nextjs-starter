'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { overlay } from 'overlay-kit';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ConfirmDialog from '@/components/ui/dialog/confirm';
import { PATHS } from '@/const/paths';
import { useMyApp } from '@/hooks/myapp';
import * as styles from '@/hooks/utils/useDialog.css';

interface UseDialogProps {
    message: string;
    description?: string;
    iconType?: 'auth' | 'lock' | 'warning' | 'cart';
    type?: 'confirm' | 'modal';
    confirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    cancel?: () => void;
    options?: {
        overlayId?: string | undefined;
    };
}

interface UseAsyncConfirmDialogProps<T = boolean> extends UseDialogProps {
    onConfirmReturnValue?: T;
    onCloseReturnValue?: T;
}

const useDialog = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { isMyApp, handleSendLoginView } = useMyApp();

    const openDialog = useCallback(
        ({
            type,
            message,
            description,
            iconType = 'warning',
            confirm,
            confirmText,
            cancelText,
            cancel,
            options,
        }: UseDialogProps) => {
            overlay.open((props) => {
                return (
                    <ConfirmDialog
                        {...props}
                        type={type}
                        iconType={iconType}
                        Title={
                            <p
                                className={styles.title}
                                dangerouslySetInnerHTML={{ __html: t(message) }}
                            />
                        }
                        Description={
                            description && (
                                <p
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{
                                        __html: t(description),
                                    }}
                                />
                            )
                        }
                        close={() => {
                            cancel?.();
                            props.close();
                        }}
                        confirm={confirm}
                        confirmText={confirmText}
                        cancelText={cancelText}
                    />
                );
            }, options);
        },
        [t],
    );

    const openAsyncDialog = useCallback(
        async <T = boolean,>({
            message,
            description,
            iconType = 'warning',
            type,
            onConfirmReturnValue,
            onCloseReturnValue,
            options,
            confirm,
            confirmText,
            cancelText,
        }: UseAsyncConfirmDialogProps<T>) => {
            return await overlay.openAsync<T>((props) => {
                return (
                    <ConfirmDialog
                        {...props}
                        type={type}
                        iconType={iconType}
                        Title={
                            <p
                                className={styles.title}
                                dangerouslySetInnerHTML={{ __html: t(message) }}
                            />
                        }
                        Description={
                            description && (
                                <p
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{
                                        __html: t(description),
                                    }}
                                />
                            )
                        }
                        confirm={() => {
                            confirm?.();
                            props.close(onConfirmReturnValue as T);
                        }}
                        close={() => props.close(onCloseReturnValue as T)}
                        confirmText={confirmText}
                        cancelText={cancelText}
                    />
                );
            }, options);
        },
        [t],
    );

    const openLoginDialog = useCallback(() => {
        overlay.open((props) => {
            return (
                <ConfirmDialog
                    {...props}
                    iconType='auth'
                    Title={
                        <p className={styles.title}>
                            {t('로그인 후 이용하실 수 있습니다.')}
                        </p>
                    }
                    Description={
                        <p className={styles.description}>
                            {t('로그인 페이지로 이동하시겠습니까?')}
                        </p>
                    }
                    confirm={() => {
                        overlay.closeAll();

                        const currentUrl = `${pathname}${
                            searchParams.toString()
                                ? `?${searchParams.toString()}`
                                : ''
                        }`;

                        if (isMyApp) {
                            handleSendLoginView({
                                option: {
                                    returnUrl: currentUrl,
                                },
                            });
                            return;
                        }

                        const params = new URLSearchParams({
                            returnUrl: currentUrl,
                        });

                        router.push(`${PATHS.AUTH.LOGIN}?${params.toString()}`);
                    }}
                />
            );
        });
    }, [pathname, searchParams, router, t, isMyApp, handleSendLoginView]);

    return { openDialog, openAsyncDialog, openLoginDialog };
};

export default useDialog;
