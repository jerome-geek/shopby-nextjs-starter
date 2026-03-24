import { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect, {
    ActionMeta,
    GroupBase,
    OnChangeValue,
    Props,
    SelectInstance,
    components,
} from 'react-select';
import { clsx } from 'clsx';

import * as s from '@/components/ui/select/index.css';
import { ChevronDown } from 'lucide-react';

interface SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<Props<Option, IsMulti, Group>, 'value' | 'onChange' | 'styles'> {
    ref?: Ref<SelectInstance<Option, IsMulti, Group>>;
    value?: OnChangeValue<Option, IsMulti> | null;
    onChange?: (
        newValue: OnChangeValue<Option, IsMulti>,
        actionMeta: ActionMeta<Option>,
    ) => void;
}

const Select = <
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>({
    ref,
    classNames: overridenClassNames,
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
            }}
            classNames={{
                container: (state) =>
                    clsx(s.container, overridenClassNames?.container?.(state)),
                control: (state) =>
                    clsx(
                        s.control({
                            isFocused: state.isFocused,
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
                    clsx(overridenClassNames?.menuPortal?.(state)),
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

export default Select;
