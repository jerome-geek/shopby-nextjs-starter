import DialogLayout, { DefaultDialogProps } from '@/components/layout/dialog';
import * as styles from '@/components/ui/dialog/share/index.css';

interface ShareDialogProps extends DefaultDialogProps {
    // title: string;
    // contents: string;
}

const ShareDialog = ({ title, contents, ...props }: ShareDialogProps) => {
    return (
        <DialogLayout title={'공유하기'} {...props}>
            <ul className={styles.list}>
                <li>
                    <button type="button">
                        <span>URL 복사</span>
                    </button>
                </li>
                <li>
                    <button type="button">
                        <span>카카오톡</span>
                    </button>
                </li>
                <li>
                    <button type="button">
                        <span>X</span>
                    </button>
                </li>
                <li>
                    <button type="button">
                        <span>페이스북</span>
                    </button>
                </li>
            </ul>
        </DialogLayout>
    );
};

export default ShareDialog;
