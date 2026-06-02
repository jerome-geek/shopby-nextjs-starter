import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { ForwardedRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect, {
    GroupBase,
    Props,
    SelectInstance,
    components,
} from 'react-select';

import * as s from '@/shared/ui/input/select/index.css';

type SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<Props<Option, IsMulti, Group>, 'styles'> & {
    ref?: ForwardedRef<SelectInstance<Option, IsMulti, Group>>;
};

export const Select = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>({
    classNames: overridenClassNames,
    ref,
    ...props
}: SelectProps<Option, IsMulti, Group>) => {
    const { t } = useTranslation();

    return (
        <ReactSelect<Option, IsMulti, Group>
            ref={ref}
            unstyled
            isSearchable={false}
            noOptionsMessage={() => t('검색 결과가 없습니다.')}
            components={{
                Menu: (menuProps) => {
                    return (
                        <components.Menu
                            {...menuProps}
                            className={clsx(
                                menuProps.className,
                                menuProps.placement === 'top'
                                    ? s.menuTop
                                    : s.menuBottom,
                            )}
                        />
                    );
                },
                MenuList: (props) => {
                    return (
                        <div data-lenis-prevent>
                            <components.MenuList {...props} />
                        </div>
                    );
                },
                DropdownIndicator: (props) => {
                    return (
                        <div
                            className={s.dropdownIndicator({
                                isOpened: props.selectProps.menuIsOpen,
                            })}
                        >
                            <ChevronDown size={16} />
                        </div>
                    );
                },
                Option: (optionProps) => (
                    <components.Option {...optionProps}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: optionProps.selectProps.getOptionValue(
                                    optionProps.data,
                                ),
                            }}
                        />
                    </components.Option>
                ),
                SingleValue: (singleValueProps) => (
                    <components.SingleValue {...singleValueProps}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: singleValueProps.selectProps.getOptionValue(
                                    singleValueProps.data,
                                ),
                            }}
                        />
                    </components.SingleValue>
                ),
            }}
            classNames={{
                container: (state) =>
                    clsx(s.container, overridenClassNames?.container?.(state)),
                control: (state) =>
                    clsx(
                        s.control({
                            isDisabled: state.isDisabled,
                        }),
                        overridenClassNames?.control?.(state),
                    ),
                menu: (state) =>
                    clsx(s.menu, overridenClassNames?.menu?.(state)),
                option: (state) =>
                    clsx(
                        s.option({
                            isFocused: state.isFocused,
                            isSelected: state.isSelected,
                            isDisabled: state.isDisabled,
                        }),
                        overridenClassNames?.option?.(state),
                    ),
                placeholder: (state) =>
                    clsx(
                        s.placeholder,
                        overridenClassNames?.placeholder?.(state),
                    ),
                singleValue: (state) =>
                    clsx(
                        s.singleValue,
                        overridenClassNames?.singleValue?.(state),
                    ),
                valueContainer: (state) =>
                    clsx(
                        s.valueContainer,
                        overridenClassNames?.valueContainer?.(state),
                    ),
                dropdownIndicator: (state) =>
                    clsx(
                        s.dropdownIndicator({
                            isOpened: state.selectProps.menuIsOpen,
                        }),
                        overridenClassNames?.dropdownIndicator?.(state),
                    ),
                indicatorSeparator: (state) =>
                    clsx(overridenClassNames?.indicatorSeparator?.(state)),
                menuList: (state) =>
                    clsx(s.menuList, overridenClassNames?.menuList?.(state)),
                menuPortal: (state) =>
                    clsx(
                        s.menuPortal,
                        overridenClassNames?.menuPortal?.(state),
                    ),
                loadingIndicator: (state) =>
                    clsx(overridenClassNames?.loadingIndicator?.(state)),
                loadingMessage: (state) =>
                    clsx(overridenClassNames?.loadingMessage?.(state)),
                noOptionsMessage: (state) =>
                    clsx(
                        s.noOptionsMessage,
                        overridenClassNames?.noOptionsMessage?.(state),
                    ),
                clearIndicator: (state) =>
                    clsx(overridenClassNames?.clearIndicator?.(state)),
                multiValue: (state) =>
                    clsx(overridenClassNames?.multiValue?.(state)),
                multiValueLabel: (state) =>
                    clsx(overridenClassNames?.multiValueLabel?.(state)),
                multiValueRemove: (state) =>
                    clsx(overridenClassNames?.multiValueRemove?.(state)),
            }}
            {...props}
        />
    );
};
