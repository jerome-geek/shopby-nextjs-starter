export function HeartLikeFilledSmallIcon({
    className,
}: {
    className?: string;
}) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_471_11045)">
                <g filter="url(#filter0_d_471_11045)">
                    <path
                        d="M16.0179 4C14.3585 4 12.9056 4.74017 12 5.9913C11.0944 4.74017 9.64152 4 7.98214 4C6.66125 4.00154 5.39489 4.54651 4.46088 5.51534C3.52687 6.48418 3.00149 7.79775 3 9.16789C3 15.0026 11.3403 19.7254 11.6954 19.9204C11.7891 19.9727 11.8937 20 12 20C12.1063 20 12.2109 19.9727 12.3046 19.9204C12.6597 19.7254 21 15.0026 21 9.16789C20.9985 7.79775 20.4731 6.48418 19.5391 5.51534C18.6051 4.54651 17.3387 4.00154 16.0179 4Z"
                        fill="white"
                    />
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_d_471_11045"
                    x="-1"
                    y="1"
                    width="26"
                    height="24"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.301961 0 0 0 0 0.301961 0 0 0 0 0.301961 0 0 0 0.4 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_471_11045"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_471_11045"
                        result="shape"
                    />
                </filter>
                <clipPath id="clip0_471_11045">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
