import { vars } from '@/styles/theme.css';

interface CloseIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
    strokeWidth?: number;
}

export function CloseIcon({
    className,
    width = 24,
    height = 24,
    currentColor = vars.color.black,
    strokeWidth = 1.5,
}: CloseIconProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M18.75 5.25L5.25 18.75M5.25 5.25L18.75 18.75'
                stroke={currentColor}
                strokeWidth={strokeWidth}
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
