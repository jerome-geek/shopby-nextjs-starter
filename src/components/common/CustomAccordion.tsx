'use client';

import { Accordion } from 'radix-ui';
import React, { useState } from 'react';

import { css } from '@/styled-system/css';
import { SmallCaretIcon } from '@/components/icons';

interface BaseAccordionProps {
    type: 'single' | 'multiple';
    items: {
        value: string;
        header: React.ReactNode;
        content: React.ReactNode;
    }[];
    value?: string | string[];
    customIcon?: React.ReactNode;
    headerStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    isContentForceMount?: true;
}

interface SingleAccordionProps extends BaseAccordionProps {
    type: 'single';
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

interface MultipleAccordionProps extends BaseAccordionProps {
    type: 'multiple';
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
}

type CustomAccordionProps = SingleAccordionProps | MultipleAccordionProps;

const CustomAccordion = ({
    type,
    items,
    onValueChange,
    value,
    customIcon = <SmallCaretIcon direction='down' />,
    headerStyle,
    contentStyle,
    defaultValue,
    isContentForceMount,
}: CustomAccordionProps) => {
    const [isForceMount, setIsForceMount] = useState(
        () => !!isContentForceMount,
    );

    const renderAccordionItem = () => {
        return items.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
                <Accordion.Header>
                    <Accordion.Trigger asChild style={headerStyle}>
                        <div
                            className={css({
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                cursor: 'pointer',
                                '&[data-state="open"]': {
                                    '& #accordion-icon': {
                                        transform: 'rotate(180deg)',
                                    },
                                },
                            })}
                        >
                            {item.header}
                            <span
                                id='accordion-icon'
                                className={css({
                                    transition: 'transform 0.3s ease',
                                })}
                            >
                                {customIcon}
                            </span>
                        </div>
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                    style={contentStyle}
                    forceMount={isContentForceMount}
                    data-mount-state={isForceMount}
                    className={css({
                        overflow: 'hidden',
                        transition: 'height 0.3s ease, opacity 0.3s ease',
                        '&[data-state="open"]': {
                            animation:
                                'accordionSlideDown 0.3s ease-out forwards',
                        },
                        '&[data-state="closed"]': {
                            animation: 'accordionSlideUp 0.3s ease forwards',

                            '&[data-mount-state="true"]': {
                                position: 'absolute',
                                visibility: 'hidden',
                            },
                        },
                    })}
                >
                    {item.content}
                </Accordion.Content>
            </Accordion.Item>
        ));
    };

    if (type === 'multiple') {
        return (
            <Accordion.Root
                type='multiple'
                onValueChange={(value) => {
                    setIsForceMount(false);
                    onValueChange?.(value);
                }}
                value={value}
                defaultValue={defaultValue}
            >
                {renderAccordionItem()}
            </Accordion.Root>
        );
    }

    return (
        <Accordion.Root
            type='single'
            collapsible
            onValueChange={(value) => {
                setIsForceMount(false);
                onValueChange?.(value);
            }}
            value={value}
            defaultValue={defaultValue}
        >
            {renderAccordionItem()}
        </Accordion.Root>
    );
};

export default CustomAccordion;
