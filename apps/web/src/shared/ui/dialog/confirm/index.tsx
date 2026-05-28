import { useTranslation } from 'react-i18next';

// import DialogAuthIcon from '@/assets/icons/dialog/auth.svg';
// import DialogCloseIcon from '@/assets/icons/dialog/close.svg';
// import DialogLockIcon from '@/assets/icons/dialog/lock.svg';
// import DialogWarningIcon from '@/assets/icons/dialog/warning.svg';

import type { DefaultDialogProps } from '@/shared/components/layout';
import { DialogLayout } from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';
import * as styles from '@/shared/ui/dialog/confirm/index.css';
// import { BigCartIcon } from '@/shared/ui/icons';
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
            <div className={styles.contentContainer}>
                {/* {iconType === 'cart' && (
                    <BigCartIcon currentColor={vars.color.gray[70]} />
                )} */}
                {/* <S.IconContainer>
                    {iconType === 'auth' && <DialogAuthIcon />}
                    {iconType === 'lock' && <DialogLockIcon />}
                    {iconType === 'warning' && <DialogWarningIcon />}
                    <S.CloseButton type="button" onClick={close}>
                        <DialogCloseIcon />
                    </S.CloseButton>
                </S.IconContainer> */}

                <div className={styles.titleContainer}>
                    {Title}
                    {Description && <div>{Description}</div>}
                </div>
            </div>

            <div className={styles.dialogFooter}>
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
