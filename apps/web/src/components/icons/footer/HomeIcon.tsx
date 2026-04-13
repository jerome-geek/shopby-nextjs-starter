import { vars } from '@/styles/theme.css';

interface HomeIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
}

export function HomeIcon({
    className,
    width = 24,
    height = 24,
    currentColor = vars.color.gray[50],
}: HomeIconProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 11.25V20.25C21 20.4489 20.921 20.6397 20.7803 20.7803C20.6397 20.921 20.4489 21 20.25 21H3.75C3.55109 21 3.36032 20.921 3.21967 20.7803C3.07902 20.6397 3 20.4489 3 20.25V11.25C2.9993 11.0528 3.03781 10.8574 3.11329 10.6752C3.18878 10.493 3.29972 10.3277 3.43969 10.1887L10.9397 2.68875C11.221 2.40766 11.6023 2.24976 12 2.24976C12.3977 2.24976 12.779 2.40766 13.0603 2.68875L20.5603 10.1887C20.7003 10.3277 20.8112 10.493 20.8867 10.6752C20.9622 10.8574 21.0007 11.0528 21 11.25Z"
                fill={currentColor}
            />
        </svg>
    );
}
