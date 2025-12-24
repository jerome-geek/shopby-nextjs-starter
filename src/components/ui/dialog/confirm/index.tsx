import React from 'react';
import { useTranslations } from 'next-intl';

// import DialogAuthIcon from '@/assets/icons/dialog/auth.svg';
// import DialogCloseIcon from '@/assets/icons/dialog/close.svg';
// import DialogLockIcon from '@/assets/icons/dialog/lock.svg';
// import DialogWarningIcon from '@/assets/icons/dialog/warning.svg';

import DialogLayout, { DefaultDialogProps } from '@/components/layout/dialog';
import {
    ContentContainerStyle,
    dialogFooterStyle,
    titleContainerStyle,
} from '@/components/ui/dialog/confirm/index.style';

export interface ConfirmDialogProps extends DefaultDialogProps {
    type?: 'confirm' | 'modal';
    confirm?: () => void;
    iconType?: 'auth' | 'lock' | 'warning';
    Title?: React.ReactNode;
    Description?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
    const t = useTranslations();

    const {
        type = 'modal',
        iconType,
        Title,
        close,
        confirm,
        Description,
        confirmText = '확인',
        cancelText = '취소',
    } = props;

    return (
        <DialogLayout {...props} maxWidth={400}>
            <div className={ContentContainerStyle}>
                {/* <S.IconContainer>
                    {iconType === 'auth' && <DialogAuthIcon />}
                    {iconType === 'lock' && <DialogLockIcon />}
                    {iconType === 'warning' && <DialogWarningIcon />}
                    <S.CloseButton type="button" onClick={close}>
                        <DialogCloseIcon />
                    </S.CloseButton>
                </S.IconContainer> */}

                <div className={titleContainerStyle}>
                    {Title}
                    {Description && <div>{Description}</div>}
                </div>
            </div>

            <div className={dialogFooterStyle}>
                {type === 'confirm' && (
                    <button type="button" onClick={close}>
                        <span>{t(cancelText)}</span>
                    </button>
                )}

                <button
                    type="button"
                    autoFocus
                    onClick={() => {
                        if (confirm) {
                            confirm();
                            return;
                        }
                        close();
                    }}
                >
                    <span>{t(confirmText)}</span>
                </button>
            </div>
        </DialogLayout>
    );
};

export default ConfirmDialog;
