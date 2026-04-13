import clsx from 'clsx';
import type { ForwardedRef, ReactElement } from 'react';
import ReactSelect, {
    type GroupBase,
    type OptionProps,
    type Props,
    type SelectInstance,
    components,
} from 'react-select';

import { ReactComponent as CheckLineIcon } from '@/icons/check-line.svg?react';
import { ReactComponent as ChevronDownSimpleIcon } from '@/icons/chevron-down-simple.svg?react';

export interface SelectOption {
    value: string;
    label: string;
}

export type AdminSelectProps<
    Option = SelectOption,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<Props<Option, IsMulti, Group>, 'styles' | 'unstyled'> & {
    ref?: ForwardedRef<SelectInstance<Option, IsMulti, Group>>;
    /** control 요소에 합쳐지는 클래스 (기존 API 호환) */
    className?: string;
};

const defaultMenuPortalTarget =
    typeof document !== 'undefined' ? document.body : null;

function OptionWithCheck<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
>(props: OptionProps<Option, IsMulti, Group>): ReactElement {
    return (
        <components.Option {...props}>
            <div className='flex w-full min-w-0 items-center justify-between gap-2'>
                <span className='min-w-0 flex-1 truncate text-left'>
                    {props.children}
                </span>
                {props.isSelected ? (
                    <CheckLineIcon
                        aria-hidden
                        className='h-4 w-4 shrink-0 text-[#364153] dark:text-gray-300'
                    />
                ) : (
                    <span className='h-4 w-4 shrink-0' aria-hidden />
                )}
            </div>
        </components.Option>
    );
}

function defaultClassNames<
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>,
>(
    controlClassName: string,
    overridden?: Props<Option, IsMulti, Group>['classNames'],
) {
    return {
        container: (state) => clsx('w-full', overridden?.container?.(state)),
        control: (state) =>
            clsx(
                'flex h-11 w-full cursor-pointer items-center rounded-lg border border-gray-300 bg-transparent py-0 pl-4 pr-1 text-left text-sm text-gray-800 shadow-theme-xs dark:border-gray-700 dark:bg-gray-900 dark:text-white/90',
                !state.isDisabled &&
                    'focus-within:border-brand-300 focus-within:outline-hidden focus-within:ring-3 focus-within:ring-brand-500/20 dark:focus-within:border-brand-800',
                state.isDisabled &&
                    'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-500 opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400',
                controlClassName,
                overridden?.control?.(state),
            ),
        input: (state) => clsx('outline-hidden', overridden?.input?.(state)),
        valueContainer: (state) =>
            clsx(
                'flex min-h-0 min-w-0 flex-1 items-center py-0 pr-1',
                overridden?.valueContainer?.(state),
            ),
        placeholder: (state) =>
            clsx(
                'truncate text-gray-400 dark:text-white/30',
                overridden?.placeholder?.(state),
            ),
        singleValue: (state) =>
            clsx(
                'truncate text-gray-800 dark:text-white/90',
                overridden?.singleValue?.(state),
            ),
        menu: (state) =>
            clsx(
                'mt-1.5 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white p-1.5 shadow-[0px_4px_16px_rgba(0,0,0,0.08),0px_2px_4px_rgba(0,0,0,0.04)] dark:border-gray-700 dark:bg-gray-900',
                overridden?.menu?.(state),
            ),
        menuList: (state) =>
            clsx('flex flex-col gap-0.5 p-0', overridden?.menuList?.(state)),
        menuPortal: (state) => clsx(overridden?.menuPortal?.(state)),
        option: (state) =>
            clsx(
                'cursor-pointer rounded-lg px-3 py-2.5 text-sm font-normal text-[#101828] transition-colors dark:text-gray-100',
                state.isDisabled && 'cursor-not-allowed opacity-50',
                state.isSelected && 'bg-[#f0f2f5] dark:bg-gray-800',
                state.isFocused &&
                    !state.isSelected &&
                    !state.isDisabled &&
                    'bg-[#fafafa] dark:bg-gray-800/60',
                overridden?.option?.(state),
            ),
        noOptionsMessage: (state) =>
            clsx(
                'px-3 py-4 text-center text-sm text-[#99a1af]',
                overridden?.noOptionsMessage?.(state),
            ),
        dropdownIndicator: (state) =>
            clsx(overridden?.dropdownIndicator?.(state)),
        indicatorSeparator: (state) =>
            clsx(overridden?.indicatorSeparator?.(state)),
        loadingIndicator: (state) =>
            clsx(overridden?.loadingIndicator?.(state)),
        loadingMessage: (state) => clsx(overridden?.loadingMessage?.(state)),
        clearIndicator: (state) => clsx(overridden?.clearIndicator?.(state)),
        multiValue: (state) => clsx(overridden?.multiValue?.(state)),
        multiValueLabel: (state) => clsx(overridden?.multiValueLabel?.(state)),
        multiValueRemove: (state) =>
            clsx(overridden?.multiValueRemove?.(state)),
        group: (state) => clsx(overridden?.group?.(state)),
        groupHeading: (state) => clsx(overridden?.groupHeading?.(state)),
    } as NonNullable<Props<Option, IsMulti, Group>['classNames']>;
}

function Select<
    Option = SelectOption,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>({
    classNames: overriddenClassNames,
    className = '',
    ref,
    components: userComponents,
    menuPortalTarget: menuPortalTargetProp,
    closeMenuOnSelect,
    blurInputOnSelect,
    menuPosition,
    ...rest
}: AdminSelectProps<Option, IsMulti, Group>) {
    const menuPortalTarget = menuPortalTargetProp
        ? menuPortalTargetProp
        : defaultMenuPortalTarget;

    const mergedClassNames = defaultClassNames<Option, IsMulti, Group>(
        className,
        overriddenClassNames,
    );

    const mergedComponents: Props<Option, IsMulti, Group>['components'] = {
        ...userComponents,
        IndicatorSeparator: userComponents?.IndicatorSeparator ?? (() => null),
        DropdownIndicator:
            userComponents?.DropdownIndicator ??
            ((indicatorProps) => (
                <div
                    className={clsx(
                        'mr-2 flex shrink-0 text-[#6a7282] transition-transform duration-200 dark:text-gray-400',
                        indicatorProps.selectProps.menuIsOpen && 'rotate-180',
                    )}
                >
                    <ChevronDownSimpleIcon className='h-3.5 w-3.5' />
                </div>
            )),
        Option:
            userComponents?.Option ??
            ((p) => <OptionWithCheck<Option, IsMulti, Group> {...p} />),
    };

    return (
        <ReactSelect<Option, IsMulti, Group>
            {...rest}
            ref={ref}
            unstyled
            closeMenuOnSelect={closeMenuOnSelect ?? true}
            blurInputOnSelect={blurInputOnSelect ?? true}
            menuPosition={menuPosition ?? 'fixed'}
            menuPortalTarget={menuPortalTarget}
            components={mergedComponents}
            classNames={mergedClassNames}
            styles={{
                menuPortal: (base) => ({ ...base, zIndex: 100_000 }),
            }}
        />
    );
}

export default Select;
