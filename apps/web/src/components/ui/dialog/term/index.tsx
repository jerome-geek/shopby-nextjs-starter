'use client';

import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

import DialogLayout, { DefaultDialogProps } from '@/components/layout/dialog';
import * as styles from '@/components/ui/dialog/term/index.css';

interface TermDialogProps extends DefaultDialogProps {
    title: string;
    contents: string;
}

const TermDialog = ({ title, contents, ...props }: TermDialogProps) => {
    const { t } = useTranslation();

    return (
        <DialogLayout {...props}>
            <button
                type='button'
                onClick={props.close}
                className={styles.closeButton}
            >
                <X />
            </button>

            <div className={styles.titleContainer}>
                <h2 id='dialog-title'>{t(title)}</h2>
            </div>

            <div
                className={styles.contentContainer}
                dangerouslySetInnerHTML={{ __html: contents }}
            />
        </DialogLayout>
    );
};

export default TermDialog;
