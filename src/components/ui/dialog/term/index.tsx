'use client';

import { useTranslations } from 'next-intl';
// import { useTranslation } from 'react-i18next';

// import { TermDialogStyle as S } from '@/components/Common/Dialog/Term/index.styled';
// import Typography from '@/components/Common/Typography';
import DialogLayout, { DefaultDialogProps } from '@/components/layout/dialog';

import DialogCloseIcon from '@/assets/icons/dialog/close.svg';
import { css } from '@/styled-system/css';

interface TermDialogProps extends DefaultDialogProps {
    title: string;
    contents: string;
}

const TermDialog = ({ title, contents, ...props }: TermDialogProps) => {
    const t = useTranslations();

    return (
        <DialogLayout {...props}>
            <button
                type="button"
                onClick={props.close}
                className={css({
                    position: 'absolute',
                    top: { base: 26, md: 32 },
                    right: { base: 26, md: 32 },
                    zIndex: 10,
                })}
            >
                {/* <DialogCloseIcon /> */}
                닫기
            </button>

            <div
                className={css({
                    padding: '33px 32px 25px 32px',
                    position: 'relative',
                })}
            >
                <h2 id="dialog-title">{t(title)}</h2>
            </div>

            <div
                className={css({
                    padding: '0 32px 32px 32px',
                    height: '100%',
                    maxHeight: '70vh',
                    overflowY: 'scroll',
                    '& *': {
                        all: 'revert',
                    },
                })}
                dangerouslySetInnerHTML={{ __html: contents }}
            />
        </DialogLayout>
    );
};

export default TermDialog;
