'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// Secondary Button variant 정의 (cva 사용)
const secondaryButtonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default:
                    'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
                outline:
                    'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
                ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
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
            variant: 'default',
            size: 'md',
        },
    }
);

// Secondary Button Props 타입
export interface SecondaryButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof secondaryButtonVariants> {
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

// Secondary Button 컴포넌트
export function SecondaryButton({
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
}: SecondaryButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <button
            className={cn(
                secondaryButtonVariants({ variant, size }),
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
