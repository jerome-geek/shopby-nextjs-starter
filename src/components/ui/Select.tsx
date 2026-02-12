import { Ref } from 'react';
import { useTranslation } from 'react-i18next';
import ReactSelect, {
    ActionMeta,
    GroupBase,
    OnChangeValue,
    Props,
    SelectInstance,
    StylesConfig,
} from 'react-select';

import { vars } from '@/styles/theme.css';

interface SelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<Props<Option, IsMulti, Group>, 'value' | 'onChange'> {
    ref?: Ref<SelectInstance<Option, IsMulti, Group>>;
    value?: OnChangeValue<Option, IsMulti> | null;
    onChange?: (
        newValue: OnChangeValue<Option, IsMulti>,
        actionMeta: ActionMeta<Option>,
    ) => void;
}

const Select = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>({
    ref,
    styles,
    ...props
}: SelectProps<Option, IsMulti, Group>) => {
    const { t } = useTranslation();

    const customStyles: StylesConfig<Option, IsMulti, Group> = {
        container: (base) => ({
            ...base,
            width: '100%',
        }),
        control: (base, state) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '44px',
            padding: '0 8px',
            backgroundColor: vars.color.white,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: state.isFocused
                ? vars.color.gray[600]
                : vars.color.gray[400],
            borderRadius: '8px',
            transition: 'all 0.2s',
            boxShadow: 'none',
            outline: 'none',
            cursor: state.isDisabled ? 'not-allowed' : 'pointer',
            opacity: state.isDisabled ? 0.5 : 1,
            ':hover': {
                borderColor: state.isDisabled
                    ? vars.color.gray[400]
                    : vars.color.gray[600],
            },
            '@media (min-width: 768px)': {
                height: '50px',
            },
            ...styles?.control?.(base, state),
        }),
        menu: (base, state) => ({
            ...base,
            backgroundColor: vars.color.white,
            borderWidth: '1px',
            borderColor: vars.color.gray[400],
            borderRadius: '6px',
            boxShadow: vars.shadow.sm,
            marginTop: '4px',
            overflow: 'hidden',
            zIndex: 10,
            animation: 'slideDownFade 0.2s ease-out forwards',
            ...styles?.menu?.(base, state),
        }),
        menuList: (base, state) => ({
            ...base,
            padding: 0,
            margin: 0,
            ...styles?.menuList?.(base, state),
        }),
        option: (base, state) => ({
            ...base,
            fontSize: '1.4rem',
            fontWeight: '500',
            padding: '16px',
            cursor: state.isDisabled ? 'not-allowed' : 'pointer',
            color: state.isDisabled
                ? vars.color.gray[500]
                : vars.color.gray[700],
            backgroundColor: state.isSelected
                ? vars.color.gray[300]
                : state.isFocused
                  ? vars.color.gray[100]
                  : 'transparent',
            textDecoration: state.isDisabled ? 'line-through' : 'none',
            ':active': {
                backgroundColor: vars.color.gray[200],
            },
            '@media (min-width: 768px)': {
                fontSize: '1.5rem',
                padding: '12px 16px',
            },
            ...styles?.option?.(base, state),
        }),
        placeholder: (base, state) => ({
            ...base,
            fontSize: '1.4rem',
            fontWeight: '500',
            color: vars.color.gray[500],
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '@media (min-width: 768px)': {
                fontSize: '1.5rem',
            },
            ...styles?.placeholder?.(base, state),
        }),
        singleValue: (base, state) => ({
            ...base,
            fontSize: '1.4rem',
            fontWeight: '500',
            color: vars.color.gray[700],
            '@media (min-width: 768px)': {
                fontSize: '1.5rem',
            },
            ...styles?.singleValue?.(base, state),
        }),
        valueContainer: (base, state) => ({
            ...base,
            padding: '0 8px',
            display: 'flex',
            gap: '4px',
            flex: 1,
            ...styles?.valueContainer?.(base, state),
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            padding: 0,
            margin: '0 8px',
            color: vars.color.gray[500],
            transform: state.selectProps.menuIsOpen
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out',
            ...styles?.dropdownIndicator?.(base, state),
        }),
        menuPortal: (base, state) => ({
            ...base,
            zIndex: 1000,
            ...styles?.menuPortal?.(base, state),
        }),
        indicatorSeparator: () => ({ display: 'none' }),
    };

    return (
        <ReactSelect
            ref={ref}
            unstyled
            isSearchable={false}
            noOptionsMessage={() => t('검색 결과가 없습니다.')}
            styles={customStyles}
            {...props}
        />
    );
};

export default Select;
