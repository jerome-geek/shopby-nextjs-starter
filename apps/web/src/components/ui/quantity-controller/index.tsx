import { Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import * as styles from '@/components/ui/quantity-controller/index.css';

interface QuantityControllerProps {
    value: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    debounceMs?: number;
    onChange: (nextValue: number) => void;
}

export const QuantityController = ({
    value,
    min = 1,
    max = Number.POSITIVE_INFINITY,
    disabled = false,
    debounceMs = 400,
    onChange,
}: QuantityControllerProps) => {
    const parsedMax = max === -999 ? Number.POSITIVE_INFINITY : max;

    const [inputValue, setInputValue] = useState(() => value);
    const [draftValue, setDraftValue] = useState(() => value);
    const [debouncedDraftValue] = useDebounceValue(draftValue, debounceMs);
    const lastValueRef = useRef<number>(value);

    const handleChangeValue = (nextValue: number) => {
        setInputValue(nextValue);
        setDraftValue(nextValue);
    };

    useEffect(() => {
        if (debouncedDraftValue === lastValueRef.current) {
            return;
        }

        lastValueRef.current = debouncedDraftValue;
        onChange(debouncedDraftValue);
    }, [debouncedDraftValue, onChange]);

    const canDecrease = !disabled && draftValue > min;
    const canIncrease = !disabled && draftValue < parsedMax;

    return (
        <div className={styles.quantityController}>
            <button
                type='button'
                className={styles.quantityButton}
                disabled={!canDecrease}
                onClick={() => {
                    const nextValue = Math.max(min, draftValue - 1);
                    handleChangeValue(nextValue);
                }}
            >
                <Minus size={16} />
            </button>
            <input
                type='text'
                inputMode='numeric'
                value={inputValue}
                className={styles.quantityInput}
                onChange={(e) => {
                    const nextValue = parseInt(e.target.value) || 0;
                    setInputValue(nextValue);
                }}
                onBlur={(e) => {
                    let nextValue = parseInt(e.target.value) || 0;

                    if (nextValue < min) {
                        nextValue = min;
                    }

                    if (nextValue > parsedMax) {
                        nextValue = parsedMax;
                    }

                    handleChangeValue(nextValue);
                }}
            />
            <button
                type='button'
                className={styles.quantityButton}
                disabled={!canIncrease}
                onClick={() => {
                    const nextValue = Math.min(parsedMax, draftValue + 1);
                    handleChangeValue(nextValue);
                }}
            >
                <Plus size={16} />
            </button>
        </div>
    );
};

export default QuantityController;
