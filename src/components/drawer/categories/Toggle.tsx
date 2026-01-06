'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ToggleGroup } from 'radix-ui';

import { useDragScroll } from '@/hooks/utils';
import { css } from '@/styled-system/css';
import { text } from '@/styled-system/recipes';

interface SingleToggleProps {
    defaultValue?: string;
    ariaLabel?: string;
    onValueChange?: (value: string) => void;
    items: {
        value: string;
        label: string;
        ariaLabel?: string;
    }[];
}

const Toggle = (props: SingleToggleProps) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const {
        containerRef,
        hasDraggedRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
    } = useDragScroll({
        itemRefs,
    });

    const initialValue = props.defaultValue ?? '';
    const [value, setValue] = useState(initialValue);

    const handleChange = (next: string) => {
        if (!next) {
            return;
        }

        if (hasDraggedRef.current) {
            return;
        }
        setValue(next);
        props.onValueChange?.(next);
    };

    return (
        <ToggleGroup.Root
            ref={rootRef}
            type='single'
            value={value}
            aria-label={props.ariaLabel}
            onValueChange={handleChange}
            className={css({
                width: '100%',
                display: 'flex',
                padding: '0 20px',
            })}
        >
            <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={css({
                    width: '100%',
                    display: 'flex',
                    height: '33px',
                    overflowX: 'auto',
                    backgroundColor: '{colors.gray20}',
                    borderRadius: '24px',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                })}
                style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {props.items.map((item) => (
                    <motion.div
                        key={item.value}
                        className={css({
                            width: '100%',
                            height: '100%',
                            minWidth: 'calc(100% / 3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        })}
                    >
                        <ToggleGroup.Item
                            key={item.value}
                            ref={(el) => {
                                itemRefs.current[item.value] = el;
                            }}
                            value={item.value}
                            aria-label={item.ariaLabel}
                            className={css({
                                zIndex: 2,
                                width: '100%',
                            })}
                        >
                            <span
                                className={text({
                                    size: { base: 'headline1' },
                                    weight: 'medium',
                                    color:
                                        value === item.value
                                            ? 'white'
                                            : 'gray80',
                                })}
                                style={{
                                    transition: 'color 0.8s ease',
                                }}
                            >
                                {item.label}
                            </span>
                        </ToggleGroup.Item>

                        {value === item.value && (
                            <motion.div
                                layoutId='tab-indicator'
                                className={css({
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '{colors.primary}',
                                    borderRadius: '24px',
                                    zIndex: 1,
                                })}
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </ToggleGroup.Root>
    );
};

export default Toggle;
