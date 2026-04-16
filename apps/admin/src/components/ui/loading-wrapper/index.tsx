import { AnimatePresence, Transition, motion } from 'motion/react';
import { type ReactNode, useMemo, useState } from 'react';

import './index.css';

interface LoadingWrapperProps {
    children: React.ReactNode;
    isLoading: boolean;
    isLoadedAnimation?: boolean;
    type?: 'spinner' | 'progress';
    loadingText?: React.ReactNode;
    containerStyle?: React.CSSProperties;
    loadingSpinnerStyle?: React.CSSProperties;
    loadingChildren?: React.ReactNode;
    onExitComplete?: () => void;
}

const spinnerClassName =
    'h-9 w-9 rounded-full border-4 border-[#ff6900] border-t-[#dbdbdb] animate-spin';

const progressWrapClassName =
    'h-1 w-[130px] overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800';

const progressBarClassName =
    'h-full w-1/2 bg-[#ff6900] animate-[loading-progress_1.2s_ease-in-out_infinite]';

const progressKeyframes: React.CSSProperties = {};

const LoadingWrapper = ({
    children,
    isLoading,
    isLoadedAnimation,
    loadingText,
    containerStyle,
    loadingSpinnerStyle,
    loadingChildren,
    type = 'spinner',
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

    const loadedInitial = useMemo(() => {
        return {
            opacity: 0,
            height: isLoadedAnimation
                ? isLoadingFinished
                    ? (containerStyle?.height as number | string | undefined) ??
                      250
                    : 'auto'
                : 'auto',
            overflow: 'hidden' as const,
        };
    }, [isLoadedAnimation, isLoadingFinished, containerStyle?.height]);

    const loadedAnimate = useMemo(() => {
        return {
            opacity: 1,
            height: 'auto',
            overflow: (isLoadedAnimation
                ? isLoadedFinished
                    ? 'visible'
                    : 'hidden'
                : 'visible') as 'visible' | 'hidden',
        };
    }, [isLoadedAnimation, isLoadedFinished]);

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
                    className={`flex w-full items-center justify-center ${
                        loadingChildren ? 'h-auto' : 'h-[250px]'
                    } flex-col ${
                        type === 'spinner' ? 'gap-[15px]' : 'gap-5'
                    } text-sm text-gray-500 dark:text-gray-400 sm:text-base`}
                >
                    {loadingChildren ? (
                        loadingChildren
                    ) : (
                        <>
                            {type === 'spinner' ? (
                                <div
                                    className={spinnerClassName}
                                    style={loadingSpinnerStyle}
                                />
                            ) : (
                                <div
                                    className={progressWrapClassName}
                                    style={loadingSpinnerStyle}
                                >
                                    <div
                                        className={progressBarClassName}
                                        style={{
                                            ...progressKeyframes,
                                        }}
                                    />
                                </div>
                            )}

                            {loadingText && loadingText}
                        </>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    key='loaded-container'
                    id='loaded-wrapper-container'
                    initial={loadedInitial}
                    animate={loadedAnimate}
                    transition={{
                        ...transition,
                        ease: 'easeOut',
                    }}
                    className='flex w-full flex-col'
                >
                    {Array.isArray(children) &&
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
