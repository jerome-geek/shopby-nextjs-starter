import { motion, AnimatePresence } from 'motion/react';

import { useKeyDown } from '@/hooks/utils';
import * as styles from '@/components/layout/dialog/index.css';

export interface DefaultDialogProps {
    overlayId?: string;
    isOpen: boolean;
    close: () => void;
    unmount: () => void;
}

interface DialogProps extends DefaultDialogProps {
    maxWidth?: number;
    children: React.ReactNode;
}

// TODO: 1. ESC 키로 닫기 (모달이 여러개 노출될 경우 모달 오픈 순서의 역순으로 닫혀야함)
// TODO: 2. 모달 열릴 때 포커스 트랩 설정
// TODO: 3. 모달 닫힐 때 이전 포커스 위치로 복귀
export const DialogLayout = ({
    isOpen,
    close,
    unmount,
    maxWidth,
    children,
}: DialogProps) => {
    useKeyDown({
        key: 'Escape',
        fn: () => {
            close();
        },
    });

    return (
        <AnimatePresence
            onExitComplete={() => {
                unmount();
            }}
        >
            {isOpen && (
                <>
                    <motion.div
                        className={styles.dimmed}
                        variants={{
                            init: { opacity: 0 },
                            show: { opacity: 0.6 },
                            hide: { opacity: 0 },
                        }}
                        initial='init'
                        animate='show'
                        exit='hide'
                    />
                    <motion.div
                        className={styles.container}
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='dialog-title'
                        aria-describedby='dialog-description'
                        variants={{
                            init: { opacity: 0, x: '-50%', y: '-55%' },
                            show: { opacity: 1, x: '-50%', y: '-50%' },
                            hide: { opacity: 0, x: '-50%', y: '-55%' },
                        }}
                        initial='init'
                        animate='show'
                        exit='hide'
                        style={{ maxWidth }}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
