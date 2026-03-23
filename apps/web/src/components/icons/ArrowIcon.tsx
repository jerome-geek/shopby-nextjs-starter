import { vars } from '@/styles/theme.css';

interface ArrowIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
}

export function ArrowIcon({
    className,
    width = 24,
    height = 24,
    currentColor = vars.color.black,
    direction = 'up',
}: ArrowIconProps) {
    const rotation = {
        up: 'rotate(0deg)',
        down: 'rotate(180deg)',
        left: 'rotate(-90deg)',
        right: 'rotate(90deg)',
    };

    return (
        <>
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
                    d="M19.1475 10.8975C19.042 11.0028 18.8991 11.062 18.75 11.062C18.6009 11.062 18.458 11.0028 18.3525 10.8975L12.5625 5.10843V20.25C12.5625 20.3992 12.5032 20.5423 12.3977 20.6477C12.2923 20.7532 12.1492 20.8125 12 20.8125C11.8508 20.8125 11.7077 20.7532 11.6023 20.6477C11.4968 20.5423 11.4375 20.3992 11.4375 20.25V5.10843L5.6475 10.8975C5.54087 10.9969 5.39983 11.0509 5.25411 11.0484C5.10838 11.0458 4.96934 10.9868 4.86628 10.8837C4.76322 10.7806 4.70419 10.6416 4.70162 10.4959C4.69905 10.3502 4.75314 10.2091 4.8525 10.1025L11.6025 3.35249C11.708 3.24716 11.8509 3.18799 12 3.18799C12.1491 3.18799 12.292 3.24716 12.3975 3.35249L19.1475 10.1025C19.2528 10.208 19.312 10.3509 19.312 10.5C19.312 10.6491 19.2528 10.792 19.1475 10.8975Z"
                    fill={currentColor}
                />
            </svg>
        </>
    );
}
