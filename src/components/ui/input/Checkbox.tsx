import { CheckIcon } from '@radix-ui/react-icons';
import { Checkbox } from 'radix-ui';

import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

interface CheckboxFieldProps {
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange: (checked: boolean) => void;
}

const InputCheckbox = ({
    id,
    onCheckedChange,
    disabled = false,
    checked,
}: CheckboxFieldProps) => {
    return (
        <Checkbox.Root
            id={id}
            checked={!!checked}
            disabled={disabled}
            onCheckedChange={onCheckedChange}
            className={css({
                width: 'var(--checkbox-size, 18px)',
                height: 'var(--checkbox-size, 18px)',
                backgroundColor: token('colors.white'),
                color: token('colors.white'),
                border: `1px solid ${token('colors.gray50')}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
                position: 'relative',
                _disabled: {
                    cursor: 'not-allowed',
                    backgroundColor: token('colors.gray20'),
                },
                // '*': {
                //     position: 'absolute',
                //     inset: '-1px',
                //     margin: '0',
                //     padding: '0',
                //     // border 두께만큼 보정
                // },
            })}
        >
            <Checkbox.Indicator
                className={css({
                    color: token('colors.black'),
                })}
            >
                <CheckIcon />
            </Checkbox.Indicator>
        </Checkbox.Root>
    );
};

export default InputCheckbox;
