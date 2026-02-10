import { CheckIcon } from '@radix-ui/react-icons';
import { Checkbox } from 'radix-ui';
import * as styles from './Checkbox.css';

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
            className={styles.checkboxRoot({ disabled })}
        >
            <Checkbox.Indicator
                className={styles.checkboxIndicator({ disabled })}
            >
                <CheckIcon className={styles.checkIcon} />
            </Checkbox.Indicator>
        </Checkbox.Root>
    );
};

export default InputCheckbox;
