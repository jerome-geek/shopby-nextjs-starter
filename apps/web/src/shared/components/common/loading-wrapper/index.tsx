import { isArray } from '@fxts/core';
import { AnimatePresence, motion, Transition } from 'motion/react';
import { type ReactNode, useState } from 'react';

import * as styles from '@/shared/components/common/loading-wrapper/index.css';

interface LoadingWrapperProps {
    children: ReactNode;
    isLoading: boolean;
    isLoadedAnimation?: boolean;
    loadingText?: string | React.ReactNode;
    containerStyle?: React.CSSProperties;
    spinnerStyle?: React.CSSProperties;
    onExitComplete?: () => void;
}

const LoadingWrapper = ({
    children,
    isLoading,
    isLoadedAnimation,
    loadingText,
    containerStyle,
    spinnerStyle,
    onExitComplete,
}: LoadingWrapperProps) => {
    const transition: Transition = {
        type: 'keyframes',
        duration: 0.2,
    };

    const [isLoadedFinished, setIsLoadedFinished] = useState(
        !isLoading ? true : isLoadedAnimation ? false : true,
    );

    const [isLoadingFinished, setIsLoadingFinished] = useState(false);

    return (
        <AnimatePresence
            mode='wait'
            onExitComplete={() => {
                setTimeout(() => {
                    setIsLoadedFinished(true);
                }, 500);
                setIsLoadingFinished(true);
                onExitComplete?.();
            }}
        >
            {isLoading ? (
                <motion.div
                    className={styles.loadingContainer}
                    key='loading-container'
                    id='loading-wrapper-container'
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        ...transition,
                        damping: 50,
                        stiffness: 500,
                        type: 'spring',
                    }}
                    style={containerStyle}
                >
                    <>
                        <span className={styles.spinner} style={spinnerStyle} />

                        {loadingText && loadingText}
                    </>
                </motion.div>
            ) : (
                <motion.div
                    key='loaded-container'
                    id='loaded-wrapper-container'
                    className={styles.loadedContainer}
                    initial={{
                        opacity: 0,
                        height: isLoadedAnimation
                            ? isLoadingFinished
                                ? containerStyle?.height || 250
                                : 'auto'
                            : 'auto',
                        overflow: 'hidden',
                    }}
                    animate={{
                        opacity: 1,
                        height: 'auto',
                        overflow: isLoadedAnimation
                            ? isLoadedFinished
                                ? 'visible'
                                : 'hidden'
                            : 'visible',
                    }}
                    transition={{
                        ...transition,
                        ease: 'easeOut',
                    }}
                >
                    {isArray(children) &&
                    (children as ReactNode[]).length > 1 ? (
                        <>{children}</>
                    ) : (
                        children
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingWrapper;
