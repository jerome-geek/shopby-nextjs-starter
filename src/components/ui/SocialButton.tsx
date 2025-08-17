'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// Social Button variant 정의 (cva 사용)
const socialButtonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                kakao: 'bg-yellow-400 text-black hover:bg-yellow-500 focus-visible:ring-yellow-400',
                naver: 'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500',
                apple: 'bg-black text-white hover:bg-gray-800 focus-visible:ring-black',
                google: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-blue-500',
            },
            size: {
                sm: 'h-9 rounded-md px-3 text-sm',
                md: 'h-10 px-4 py-2',
                lg: 'h-11 rounded-md px-8',
                xl: 'h-12 rounded-md px-10 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'kakao',
            size: 'md',
        },
    }
);

// Social Button Props 타입
export interface SocialButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof socialButtonVariants> {
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

// Social Button 컴포넌트
export function SocialButton({
    className = '',
    size,
    variant,
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
}: SocialButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <button
            className={cn(
                socialButtonVariants({ variant, size }),
                fullWidth && 'w-full',
                className
            )}
            disabled={isDisabled}
            data-loading={loading}
            {...props}
        >
            {loading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
        </button>
    );
}
