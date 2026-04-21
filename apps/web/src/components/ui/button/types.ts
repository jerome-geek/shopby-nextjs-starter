import type { ButtonHTMLAttributes } from 'react';

// 기본 button element props 확장
export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// 각 버튼 타입별로 고유한 프롭스 정의
export type SolidButtonProps = BaseButtonProps & {
    frame: 'solid'; // 🔑 타입 구분을 위한 discriminator!
    variant:
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
        | 'green';
    size?: 'large' | 'medium' | 'small';
    // solid 버튼만의 고유 프롭스들...
};

export type OutlinedButtonProps = BaseButtonProps & {
    frame: 'outlined';
    variant?: 'primary' | 'secondary' | 'white'; // assistive는 없음!
    size?: 'large' | 'medium' | 'small';
    // outlined 버튼만의 고유 프롭스들...
};

export type TextButtonProps = BaseButtonProps & {
    frame: 'text';
    variant?: 'primary'; // primary만 허용!
    size?: 'large' | 'medium' | 'small';
    // text 버튼만의 고유 프롭스들...
};

// Union Type으로 결합
export type ButtonProps =
    | SolidButtonProps
    | OutlinedButtonProps
    | TextButtonProps;
