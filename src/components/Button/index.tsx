import OutlinedButton from '@/components/Button/Outlined';
import SolidButton from '@/components/Button/Solid';
import { ButtonProps } from '@/components/Button/types';

export const Button = (props: ButtonProps) => {
    // 🎯 Type Guard 패턴
    if (props.frame === 'outlined') {
        return <OutlinedButton {...props} />;
    }

    // if (props.frame === 'text') {
    //     return <TextButton {...props} />;
    // }

    return <SolidButton {...props} />;
};
