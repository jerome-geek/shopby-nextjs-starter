import { clsx } from 'clsx';
import { motion } from 'motion/react';

import * as styles from '@/components/mypage/filters/segmented-toggle/index.css';

export type SegmentedToggleOption<T extends string> = {
    value: T;
    label: string;
};

interface SegmentedToggleProps<T extends string> {
    value?: T | null;
    defaultValue?: T;
    options: ReadonlyArray<SegmentedToggleOption<T>>;
    onChange: (value: T) => void;
    className?: string;
    buttonClassName?: string;
}

const isOptionValue = <T extends string>(
    options: ReadonlyArray<SegmentedToggleOption<T>>,
    candidate: T | null | undefined,
) => {
    if (candidate == null) {
        return false;
    }
    return options.some((option) => option.value === candidate);
};

export const SegmentedToggle = <T extends string>({
    value,
    defaultValue,
    options,
    onChange,
    className,
    buttonClassName,
}: SegmentedToggleProps<T>) => {
    const activeSegment = isOptionValue(options, value)
        ? value
        : isOptionValue(options, defaultValue)
        ? defaultValue
        : undefined;

    return (
        <div className={clsx(styles.group, className)}>
            {options.map((option) => (
                <button
                    key={option.value}
                    type='button'
                    className={clsx(styles.button, buttonClassName)}
                    data-selected={option.value === activeSegment}
                    aria-pressed={option.value === activeSegment}
                    onClick={() => onChange(option.value)}
                >
                    <span className={styles.label}>{option.label}</span>

                    {option.value === activeSegment && (
                        <motion.div
                            className={styles.indicator}
                            layoutId='tab-indicator'
                            animate={{
                                y: 'none',
                            }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};
