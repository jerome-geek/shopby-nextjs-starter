import { outlinedButton } from '@/components/Button/style';
import { OutlinedButtonProps } from '@/components/Button/types';
import React from 'react';

const OutlinedButton = ({ children, ...props }: OutlinedButtonProps) => {
    return (
        <button className={outlinedButton({ visual: props.variant })}>
            {children}
        </button>
    );
};

export default OutlinedButton;
