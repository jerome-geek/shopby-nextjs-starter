import OutlinedButton from '@/shared/ui/button/outlined';
import SolidButton from '@/shared/ui/button/solid';
import TextButton from '@/shared/ui/button/TextButton';
import type { ButtonProps } from '@/shared/ui/button/types';

export const Button = (props: ButtonProps) => {
    // 🎯 Type Guard 패턴
    if (props.frame === 'outlined') {
        return <OutlinedButton {...props} />;
    }

    if (props.frame === 'text') {
        return <TextButton {...props} />;
    }

    return <SolidButton {...props} />;
};
