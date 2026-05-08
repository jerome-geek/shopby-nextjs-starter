import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonRecipe } from './style.css';

// 기본 props 확장
export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

// 🔑 기존처럼 Discriminated Union 패턴을 유지하여 타입 안정성 극대화
export type SolidButtonProps = BaseButtonProps & {
    frame?: 'solid'; // default 처리할 것이므로 선택적으로 변경
    variant?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'kakao'
        | 'kakao-sync'
        | 'naver'
        | 'apple'
        | 'facebook'
        | 'google'
        | 'line'
        | 'brick';
    size?: 'large' | 'medium' | 'small';
};

export type OutlinedButtonProps = BaseButtonProps & {
    frame: 'outlined'; // 명시적으로 입력해야만 에디터에서 아래 variant를 추천!
    variant?: 'primary' | 'secondary' | 'white';
    size?: 'large' | 'medium' | 'small';
};

export type TextButtonProps = BaseButtonProps & {
    frame: 'text';
    variant?: 'primary';
    size?: 'large' | 'medium' | 'small';
};

export type ButtonPropsV2 =
    | SolidButtonProps
    | OutlinedButtonProps
    | TextButtonProps;

export const ButtonV2 = ({
    children,
    frame = 'solid',
    variant = 'primary',
    className,
    ...props
}: ButtonPropsV2) => {
    return (
        <button
            type='button'
            className={`${buttonRecipe({ frame, variant })} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonV2;
