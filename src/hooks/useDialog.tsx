'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { overlay } from 'overlay-kit';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ConfirmDialog from '@/components/ui/dialog/confirm';
import { PATHS } from '@/const/paths';

interface UseDialogProps {
    message: string;
    description?: string;
    iconType?: 'auth' | 'lock' | 'warning';
    type?: 'confirm' | 'modal';
    confirm?: () => void;
    confirmText?: string;
    cancelText?: string;
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

    const openDialog = useCallback(
        ({
            message,
            description,
            iconType = 'warning',
            confirm,
            confirmText,
            cancelText,
            options,
        }: UseDialogProps) => {
            overlay.open((props) => {
                return (
                    <ConfirmDialog
                        {...props}
                        iconType={iconType}
                        Title={
                            <p
                                style={{
                                    wordBreak: 'break-word',
                                    whiteSpace: 'normal',
                                }}
                                dangerouslySetInnerHTML={{ __html: t(message) }}
                            />
                        }
                        Description={
                            description && (
                                <p
                                    style={{ color: 'var(--color-gray-700)' }}
                                    dangerouslySetInnerHTML={{
                                        __html: t(description),
                                    }}
                                />
                            )
                        }
                        confirm={confirm}
                        confirmText={confirmText}
                        cancelText={cancelText}
                    />
                );
            }, options);
        },
        [t]
    );

    const openAsyncDialog = useCallback(
        async <T = boolean,>({
            message,
            description,
            iconType = 'warning',
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
                        iconType={iconType}
                        Title={
                            <p
                                style={{
                                    wordBreak: 'break-word',
                                    whiteSpace: 'normal',
                                }}
                                dangerouslySetInnerHTML={{ __html: t(message) }}
                            />
                        }
                        Description={
                            description && (
                                <p
                                    style={{ color: 'var(--color-gray-700)' }}
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
        [t]
    );

    const openLoginDialog = useCallback(() => {
        overlay.open((props) => {
            return (
                <ConfirmDialog
                    {...props}
                    iconType="auth"
                    Title={<p>{t('로그인 후 이용하실 수 있습니다.')}</p>}
                    Description={
                        <p>{t('로그인 페이지로 이동하시겠습니까?')}</p>
                    }
                    confirm={() => {
                        overlay.closeAll();

                        const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
                        const params = new URLSearchParams({
                            returnUrl: currentUrl,
                        });

                        router.push(`${PATHS.AUTH.LOGIN}?${params.toString()}`);
                    }}
                />
            );
        });
    }, [t]);

    return { openDialog, openAsyncDialog, openLoginDialog };
};

export default useDialog;
