import { Check } from 'lucide-react';
import { Checkbox } from 'radix-ui';

import * as styles from '@/components/ui/input/checkbox/index.css';

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
            <Check className={styles.checkIcon} />
            <Checkbox.Indicator className={styles.checkboxIndicator} />
        </Checkbox.Root>
    );
};

export default InputCheckbox;
