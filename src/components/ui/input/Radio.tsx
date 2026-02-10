import { RadioGroup } from 'radix-ui';
import * as styles from './Radio.css';

interface RadioFieldProps {
    id?: string;
    onChange: (value: string) => void;
    defaultValue?: string;
    value?: string;
    options: {
        value: string;
        label: string;
    }[];
}

const InputRadio = ({
    id,
    onChange,
    options,
    defaultValue,
    value,
}: RadioFieldProps) => {
    return (
        <RadioGroup.Root
            defaultValue={defaultValue}
            name="radio-group"
            onValueChange={onChange}
            value={value}
            className={styles.radioGroupRoot}
        >
            {options.map((option) => (
                <div key={option.value} className={styles.radioItemContainer}>
                    <RadioGroup.Item
                        value={option.value}
                        id={option.value}
                        className={styles.radioItem}
                    >
                        <RadioGroup.Indicator
                            className={styles.radioIndicator}
                        />
                    </RadioGroup.Item>

                    <label className="Label" htmlFor={option.value}>
                        <span className={styles.radioLabel}>
                            {option.label}
                        </span>
                    </label>
                </div>
            ))}
        </RadioGroup.Root>
    );
};

export default InputRadio;
