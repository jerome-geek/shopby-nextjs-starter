import { useEffect, useRef } from 'react';

import Button from '@/components/ui/button/Button';
import { DialogLayout, type DefaultDialogLayoutProps } from '@/layout/dialog';

export interface ConfirmDialogProps extends DefaultDialogLayoutProps {
    type?: 'confirm' | 'modal';
    confirm?: () => void;
    iconType?: 'auth' | 'lock' | 'warning' | 'cart';
    Title?: React.ReactNode;
    Description?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog = ({
    type = 'modal',
    Title,
    Description,
    confirm,
    confirmText = '확인',
    cancelText = '취소',
    close,
    isOpen,
    overlayId,
    unmount,
}: ConfirmDialogProps) => {
    const confirmButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const focusConfirm = () => {
            confirmButtonRef.current?.focus();
        };

        const t0 = window.setTimeout(focusConfirm, 0);
        const raf = window.requestAnimationFrame(focusConfirm);

        return () => {
            window.clearTimeout(t0);
            window.cancelAnimationFrame(raf);
        };
    }, [isOpen]);

    return (
        <DialogLayout
            overlayId={overlayId}
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            className='w-full max-w-[400px] p-6'
        >
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2 pt-3 pb-3'>
                    {Title}
                    {Description}
                </div>

                <div className='flex items-center justify-end gap-2'>
                    {type === 'confirm' && (
                        <Button
                            variant='outline'
                            size='sm'
                            className='w-full'
                            onClick={close}
                        >
                            {cancelText}
                        </Button>
                    )}

                    <Button
                        variant='primary'
                        size='sm'
                        className='w-full'
                        autoFocus
                        ref={confirmButtonRef}
                        onClick={() => {
                            if (confirm) {
                                confirm();
                                return;
                            }
                            close();
                        }}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </DialogLayout>
    );
};

export default ConfirmDialog;
