import { clsx } from 'clsx';
import { motion } from 'motion/react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/components/mypage/filters/segmented-toggle/index.css';

import 'swiper/css';

export type SegmentedToggleOption<T extends string> = {
    value: T;
    label: string;
};

interface SegmentedToggleProps<T extends string> {
    value?: T | null;
    defaultValue?: T | null;
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
    const router = useRouter();

    const activeSegment = isOptionValue(options, value)
        ? value
        : isOptionValue(options, defaultValue)
        ? defaultValue
        : undefined;

    return (
        <div className={clsx(styles.group, className)}>
            <Swiper
                spaceBetween={2}
                slidesPerView={'auto'}
                style={{
                    width: '100%',
                }}
            >
                {options.map((option) => (
                    <SwiperSlide
                        key={option.value}
                        style={{
                            width: 'auto',
                        }}
                    >
                        <button
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
                                    layoutId={`${router.pathname}-tab-indicator`}
                                    initial={{
                                        y: 'none',
                                    }}
                                    animate={{
                                        y: 'none',
                                    }}
                                />
                            )}
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
