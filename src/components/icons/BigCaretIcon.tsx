import { token } from '@/styled-system/tokens';

interface BigCaretIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
}

export function BigCaretIcon({
    className,
    width = 24,
    height = 24,
    currentColor = token('colors.black'),
    direction = 'up',
}: BigCaretIconProps) {
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
                d="M20.2654 15.3767C20.1958 15.4465 20.113 15.5018 20.022 15.5395C19.9309 15.5773 19.8334 15.5967 19.7348 15.5967C19.6362 15.5967 19.5386 15.5773 19.4476 15.5395C19.3565 15.5018 19.2738 15.4465 19.2042 15.3767L12.2348 8.40642L5.26542 15.3767C5.12469 15.5175 4.93381 15.5965 4.73479 15.5965C4.53577 15.5965 4.3449 15.5175 4.20417 15.3767C4.06344 15.236 3.98438 15.0451 3.98438 14.8461C3.98437 14.6471 4.06344 14.4562 4.20417 14.3155L11.7042 6.81548C11.7738 6.74575 11.8565 6.69043 11.9476 6.65269C12.0386 6.61495 12.1362 6.59552 12.2348 6.59552C12.3334 6.59552 12.4309 6.61495 12.522 6.65269C12.613 6.69043 12.6958 6.74575 12.7654 6.81548L20.2654 14.3155C20.3351 14.3851 20.3905 14.4679 20.4282 14.5589C20.466 14.65 20.4854 14.7475 20.4854 14.8461C20.4854 14.9447 20.466 15.0423 20.4282 15.1333C20.3905 15.2244 20.3351 15.3071 20.2654 15.3767Z"
                fill={currentColor}
            />
        </svg>
    );
}
