import { overlay } from 'overlay-kit';
import { useCallback } from 'react';

import ConfirmDialog from '@/components/dialog/confirm';

const dialogTitleClass =
    'text-gray-800 text-base font-medium leading-6 break-words whitespace-normal dark:text-white/90';

const dialogDescriptionClass =
    'text-gray-500 text-sm leading-5 break-words whitespace-normal dark:text-gray-400';

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
                                className={dialogTitleClass}
                                dangerouslySetInnerHTML={{ __html: message }}
                            />
                        }
                        Description={
                            description && (
                                <p
                                    className={dialogDescriptionClass}
                                    dangerouslySetInnerHTML={{
                                        __html: description,
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
        [],
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
                                className={dialogTitleClass}
                                dangerouslySetInnerHTML={{ __html: message }}
                            />
                        }
                        Description={
                            description && (
                                <p
                                    className={dialogDescriptionClass}
                                    dangerouslySetInnerHTML={{
                                        __html: description,
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
        [],
    );

    return { openDialog, openAsyncDialog };
};

export default useDialog;
