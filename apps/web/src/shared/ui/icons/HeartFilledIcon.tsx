interface HeartFilledIconProps {
    className?: string;
    width?: number;
    height?: number;
}

export function HeartFilledIcon({
    className,
    width = 24,
    height = 24,
}: HeartFilledIconProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M16.0179 4C14.3585 4 12.9056 4.74017 12 5.9913C11.0944 4.74017 9.64152 4 7.98214 4C6.66125 4.00154 5.39489 4.54651 4.46088 5.51534C3.52687 6.48418 3.00149 7.79775 3 9.16789C3 15.0026 11.3403 19.7254 11.6954 19.9204C11.7891 19.9727 11.8937 20 12 20C12.1063 20 12.2109 19.9727 12.3046 19.9204C12.6597 19.7254 21 15.0026 21 9.16789C20.9985 7.79775 20.4731 6.48418 19.5391 5.51534C18.6051 4.54651 17.3387 4.00154 16.0179 4Z'
                fill='black'
            />
        </svg>
    );
}
