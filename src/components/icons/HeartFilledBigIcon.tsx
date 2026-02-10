interface HeartFilledBigIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export function HeartFilledBigIcon({
    className,
    width = 24,
    height = 24,
}: HeartFilledBigIconProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 24 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M22.5 6.5625C22.5 13.125 12.7697 18.4369 12.3553 18.6562C12.2461 18.715 12.124 18.7458 12 18.7458C11.876 18.7458 11.7539 18.715 11.6447 18.6562C11.2303 18.4369 1.5 13.125 1.5 6.5625C1.50174 5.02146 2.11468 3.54404 3.20436 2.45436C4.29404 1.36468 5.77146 0.751737 7.3125 0.75C9.24844 0.75 10.9434 1.5825 12 2.98969C13.0566 1.5825 14.7516 0.75 16.6875 0.75C18.2285 0.751737 19.706 1.36468 20.7956 2.45436C21.8853 3.54404 22.4983 5.02146 22.5 6.5625Z'
                fill='black'
            />
        </svg>
    );
}
