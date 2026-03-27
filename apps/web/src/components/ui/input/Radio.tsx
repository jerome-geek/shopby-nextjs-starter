import { RadioGroup } from 'radix-ui';
import * as styles from './Radio.css';

interface RadioFieldProps {
    id?: string;
    onChange: (value: string) => void;
    defaultValue?: string;
    value?: string;
    options: {
        value: string;
        label: React.ReactNode;
    }[];
    className?: string; // 전체 컨테이너용 클래스
    itemClassName?: string; // 개별 아이템용 클래스
}

const InputRadio = ({
    id,
    onChange,
    options,
    defaultValue,
    value,
    className,
    itemClassName,
}: RadioFieldProps) => {
    return (
        <RadioGroup.Root
            defaultValue={defaultValue}
            name='radio-group'
            onValueChange={onChange}
            value={value}
            className={className || styles.radioGroupRoot}
        >
            {options.map((option) => (
                <div
                    key={option.value}
                    className={itemClassName || styles.radioItemContainer}
                >
                    <RadioGroup.Item
                        value={option.value}
                        id={option.value}
                        className={styles.radioItem}
                    >
                        <RadioGroup.Indicator
                            className={styles.radioIndicator}
                        />
                    </RadioGroup.Item>

                    <label className='Label' htmlFor={option.value}>
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
