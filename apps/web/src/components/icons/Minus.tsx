import { vars } from '@/styles/theme.css';

interface MinusIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
}

export function MinusIcon({
    className,
    width = 24,
    height = 24,
    currentColor = vars.color.black,
}: MinusIconProps) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox='0 0 20 20'
            fill='none'
            className={className}
        >
            <path
                d='M17.3438 10C17.3438 10.1243 17.2944 10.2435 17.2065 10.3315C17.1185 10.4194 16.9993 10.4688 16.875 10.4688H3.125C3.00068 10.4688 2.88145 10.4194 2.79354 10.3315C2.70564 10.2435 2.65625 10.1243 2.65625 10C2.65625 9.87568 2.70564 9.75645 2.79354 9.66854C2.88145 9.58064 3.00068 9.53125 3.125 9.53125H16.875C16.9993 9.53125 17.1185 9.58064 17.2065 9.66854C17.2944 9.75645 17.3438 9.87568 17.3438 10Z'
                fill={currentColor}
            />
        </svg>
    );
}
