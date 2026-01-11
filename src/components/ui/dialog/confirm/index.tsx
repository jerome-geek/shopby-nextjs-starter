import { useTranslation } from 'react-i18next';

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
import { Button } from '@/components/ui/button';
import { BigCartIcon } from '@/components/icons';
import { token } from '@/styled-system/tokens';

export interface ConfirmDialogProps extends DefaultDialogProps {
    type?: 'confirm' | 'modal';
    confirm?: () => void;
    iconType?: 'auth' | 'lock' | 'warning' | 'cart';
    Title?: React.ReactNode;
    Description?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmDialog = (props: ConfirmDialogProps) => {
    const { t } = useTranslation();

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
                {iconType === 'cart' && (
                    <BigCartIcon currentColor={token('colors.gray70')} />
                )}
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
                    <Button type='button' frame='outlined' onClick={close}>
                        <span>{t(cancelText)}</span>
                    </Button>
                )}

                <Button
                    type='button'
                    frame='solid'
                    variant='primary'
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
                </Button>
            </div>
        </DialogLayout>
    );
};

export default ConfirmDialog;
