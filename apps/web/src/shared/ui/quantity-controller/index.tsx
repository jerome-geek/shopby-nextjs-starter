import { Minus, Plus } from 'lucide-react';

import * as styles from '@/shared/ui/quantity-controller/index.css';

interface QuantityControllerProps {
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    onChange: (nextValue: number) => void;
}

export const QuantityController = ({
    value,
    min = 1,
    max = Number.POSITIVE_INFINITY,
    disabled = false,
    onChange,
}: QuantityControllerProps) => {
    const canDecrease = !disabled && value > min;
    const canIncrease = !disabled && value < max;

    return (
        <div className={styles.quantityController}>
            <button
                type='button'
                className={styles.quantityButton}
                disabled={!canDecrease}
                onClick={() => onChange(Math.max(min, value - 1))}
            >
                <Minus size={16} />
            </button>
            <span className={styles.quantityValue}>{value}</span>
            <button
                type='button'
                className={styles.quantityButton}
                disabled={!canIncrease}
                onClick={() => onChange(Math.min(max, value + 1))}
            >
                <Plus size={16} />
            </button>
        </div>
    );
};

export default QuantityController;

