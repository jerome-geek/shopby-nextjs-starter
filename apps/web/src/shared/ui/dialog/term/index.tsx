'use client';

import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DialogLayout, type DefaultDialogProps } from '@/shared/components/layout';
import * as styles from '@/shared/ui/dialog/term/index.css';

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
                <h2 id='dialog-title' className={styles.title}>
                    {t(title)}
                </h2>
            </div>

            <div
                className={styles.contentContainer}
                data-lenis-prevent
                dangerouslySetInnerHTML={{ __html: contents }}
            />
        </DialogLayout>
    );
};

export default TermDialog;
