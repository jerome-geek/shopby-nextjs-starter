import * as Accordion from '@radix-ui/react-accordion';
import { clsx } from 'clsx';
import { type CSSProperties, type ReactNode, useState } from 'react';

import { SmallCaretIcon } from '@/components/icons';

import * as styles from '@/components/ui/accordion/index.css';

export type AccordionItem = {
    value: string;
    header: ReactNode;
    content: ReactNode;
};

type BaseAccordionProps = {
    items: AccordionItem[];
    className?: string;
    itemClassName?: string;
    headerClassName?: string;
    contentClassName?: string;
    customIcon?: ReactNode;
    headerStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    isContentForceMount?: boolean;
};

export type SingleAccordionProps = BaseAccordionProps & {
    type?: 'single';
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
};

export type MultipleAccordionProps = BaseAccordionProps & {
    type: 'multiple';
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
};

export type CustomAccordionProps =
    | SingleAccordionProps
    | MultipleAccordionProps;

const defaultCaret = <SmallCaretIcon direction='down' height={16} width={16} />;

export const CustomAccordion = (props: CustomAccordionProps) => {
    const {
        items,
        className,
        itemClassName,
        headerClassName,
        contentClassName,
        customIcon = defaultCaret,
        headerStyle,
        contentStyle,
        isContentForceMount,
        type = 'single',
    } = props;

    const [isForceMount, setIsForceMount] = useState(() =>
        Boolean(isContentForceMount),
    );

    const renderItems = () =>
        items.map((item) => (
            <Accordion.Item
                key={item.value}
                className={clsx(styles.item, itemClassName)}
                value={item.value}
            >
                <Accordion.Header className={styles.header}>
                    <Accordion.Trigger asChild>
                        <button
                            className={clsx(styles.trigger, headerClassName)}
                            style={headerStyle}
                            type='button'
                        >
                            {item.header}
                            <span aria-hidden className={styles.iconWrapper}>
                                {customIcon}
                            </span>
                        </button>
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                    className={clsx(styles.content, contentClassName)}
                    forceMount={isContentForceMount ? true : undefined}
                    style={contentStyle}
                    {...(isForceMount ? { 'data-mount-state': 'true' } : {})}
                >
                    <div className={styles.contentInner}>{item.content}</div>
                </Accordion.Content>
            </Accordion.Item>
        ));

    if (type === 'multiple') {
        const multipleProps = props as MultipleAccordionProps;
        const multipleDefault =
            multipleProps.value !== undefined
                ? undefined
                : multipleProps.defaultValue;

        return (
            <Accordion.Root
                className={clsx(styles.root, className)}
                defaultValue={multipleDefault}
                onValueChange={(next: string[]) => {
                    setIsForceMount(false);
                    multipleProps.onValueChange?.(next);
                }}
                type='multiple'
                value={multipleProps.value}
            >
                {renderItems()}
            </Accordion.Root>
        );
    }

    const singleProps = props as SingleAccordionProps;
    const singleDefault = singleProps.defaultValue;

    return (
        <Accordion.Root
            className={clsx(styles.root, className)}
            collapsible
            defaultValue={singleDefault}
            onValueChange={(next: string) => {
                setIsForceMount(false);
                singleProps.onValueChange?.(next);
            }}
            type='single'
            value={singleProps.value}
        >
            {renderItems()}
        </Accordion.Root>
    );
};
