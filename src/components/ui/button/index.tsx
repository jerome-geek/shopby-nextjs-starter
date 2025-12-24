import OutlinedButton from '@/components/ui/button/outlined';
import SolidButton from '@/components/ui/button/solid';
import { ButtonProps } from '@/components/ui/button/types';

export const Button = (props: ButtonProps) => {
    // 🎯 Type Guard 패턴
    if (props.frame === 'outlined') {
        return <OutlinedButton {...props} />;
    }

    if (props.frame === 'text') {
        // return <TextButton {...props} />;
        return <></>;
    }

    return <SolidButton {...props} />;
};
