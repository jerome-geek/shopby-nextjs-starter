import { vars } from '@/styles/theme.css';

interface PlusIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
}

export function PlusIcon({
    className,
    width = 24,
    height = 24,
    currentColor = vars.color.black,
}: PlusIconProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M10 2.5V17.5M2.5 10H17.5'
                stroke={currentColor}
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}
