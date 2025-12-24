import { outlinedButton } from '@/components/ui/button/style';
import { OutlinedButtonProps } from '@/components/ui/button/types';
import React from 'react';

const OutlinedButton = ({ children, ...props }: OutlinedButtonProps) => {
    return (
        <button className={outlinedButton({ visual: props.variant })}>
            {children}
        </button>
    );
};

export default OutlinedButton;
