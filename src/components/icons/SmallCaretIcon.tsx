import { vars } from '@/styles/theme.css';

interface SmallCaretIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
}

export function SmallCaretIcon({
    className,
    width = 16,
    height = 16,
    currentColor = vars.color.gray[70],
    direction = 'up',
}: SmallCaretIconProps) {
    const rotation = {
        up: 'rotate(0deg)',
        down: 'rotate(180deg)',
        left: 'rotate(-90deg)',
        right: 'rotate(90deg)',
    };

    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: rotation[direction],
                transformOrigin: 'center',
            }}
        >
            <path
                d="M13.2654 10.265C13.1951 10.3352 13.0998 10.3746 13.0004 10.3746C12.901 10.3746 12.8057 10.3352 12.7354 10.265L8.00041 5.5306L3.26541 10.265C3.19432 10.3312 3.1003 10.3673 3.00315 10.3656C2.906 10.3638 2.81331 10.3245 2.7446 10.2558C2.67589 10.1871 2.63654 10.0944 2.63482 9.99724C2.63311 9.90009 2.66917 9.80606 2.73541 9.73498L7.73541 4.73498C7.80572 4.66475 7.90104 4.62531 8.00041 4.62531C8.09979 4.62531 8.1951 4.66475 8.26541 4.73498L13.2654 9.73498C13.3356 9.80529 13.3751 9.9006 13.3751 9.99998C13.3751 10.0994 13.3356 10.1947 13.2654 10.265Z"
                fill={currentColor}
            />
        </svg>
    );
}
