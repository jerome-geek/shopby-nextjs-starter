export function HeartLikeSmallIcon({ className }: { className?: string }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_471_10047)">
                <g filter="url(#filter0_d_471_10047)">
                    <path
                        d="M16.0179 4C14.3585 4 12.9056 4.74017 12 5.9913C11.0944 4.74017 9.64152 4 7.98214 4C6.66125 4.00154 5.39489 4.54651 4.46088 5.51534C3.52687 6.48418 3.00149 7.79775 3 9.16789C3 15.0026 11.3403 19.7254 11.6954 19.9204C11.7891 19.9727 11.8937 20 12 20C12.1063 20 12.2109 19.9727 12.3046 19.9204C12.6597 19.7254 21 15.0026 21 9.16789C20.9985 7.79775 20.4731 6.48418 19.5391 5.51534C18.6051 4.54651 17.3387 4.00154 16.0179 4ZM12 18.5701C10.5327 17.6832 4.28571 13.6431 4.28571 9.16789C4.28699 8.15139 4.67684 7.1769 5.36978 6.45813C6.06272 5.73936 7.00218 5.33497 7.98214 5.33365C9.54509 5.33365 10.8573 6.19718 11.4054 7.58418C11.4538 7.70648 11.5362 7.81109 11.6421 7.88471C11.7479 7.95832 11.8725 7.99763 12 7.99763C12.1275 7.99763 12.2521 7.95832 12.3579 7.88471C12.4638 7.81109 12.5462 7.70648 12.5946 7.58418C13.1427 6.19468 14.4549 5.33365 16.0179 5.33365C16.9978 5.33497 17.9373 5.73936 18.6302 6.45813C19.3232 7.1769 19.713 8.15139 19.7143 9.16789C19.7143 13.6364 13.4657 17.6824 12 18.5701Z"
                        fill="white"
                    />
                </g>
            </g>
            <defs>
                <filter
                    id="filter0_d_471_10047"
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
                        result="effect1_dropShadow_471_10047"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_471_10047"
                        result="shape"
                    />
                </filter>
                <clipPath id="clip0_471_10047">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
