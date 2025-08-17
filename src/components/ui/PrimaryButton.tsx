'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// Primary Button variant 정의 (cva 사용)
const primaryButtonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default:
                    'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
                destructive:
                    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
                success:
                    'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600',
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

// Primary Button Props 타입
export interface PrimaryButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof primaryButtonVariants> {
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

// Primary Button 컴포넌트
export function PrimaryButton({
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
}: PrimaryButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <button
            className={cn(
                primaryButtonVariants({ variant, size }),
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
