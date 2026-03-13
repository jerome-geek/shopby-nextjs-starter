import { vars } from '@/styles/theme.css';

interface ThumbnailBookmarkIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
    isActive?: boolean;
}

export function ThumbnailBookmarkIcon({
    className,
    width = 32,
    height = 32,
    currentColor = vars.color.gray[70],
    isActive,
}: ThumbnailBookmarkIconProps) {
    return (
        <>
            {/* <svg
                className={className}
                width={width}
                height={height}
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.10065 0.109999C8.17096 0.0397745 8.26627 0.00032961 8.36565 0.000329606C8.46502 0.000329601 8.56033 0.0397745 8.63065 0.109999L10.6306 2.11C10.6969 2.18109 10.7329 2.27511 10.7312 2.37226C10.7295 2.46941 10.6902 2.5621 10.6215 2.63081C10.5528 2.69952 10.4601 2.73887 10.3629 2.74059C10.2658 2.7423 10.1717 2.70624 10.1006 2.64L8.74065 1.28062L8.74065 10.375C8.74065 10.4745 8.70114 10.5698 8.63081 10.6402C8.56049 10.7105 8.4651 10.75 8.36565 10.75C8.26619 10.75 8.17081 10.7105 8.10048 10.6402C8.03016 10.5698 7.99065 10.4745 7.99065 10.375L7.99065 1.28062L6.63065 2.64C6.55956 2.70624 6.46554 2.7423 6.36838 2.74059C6.27123 2.73887 6.17854 2.69952 6.10983 2.63081C6.04113 2.5621 6.00177 2.46941 6.00006 2.37226C5.99834 2.27511 6.03441 2.18109 6.10065 2.11L8.10065 0.109999ZM4.63065 8.64C4.69689 8.56891 4.73295 8.47489 4.73123 8.37774C4.72952 8.28059 4.69016 8.1879 4.62146 8.11919C4.55275 8.05048 4.46006 8.01113 4.36291 8.00941C4.26576 8.0077 4.17173 8.04376 4.10065 8.11L2.74065 9.46937L2.74065 0.375C2.74065 0.275544 2.70114 0.18016 2.63081 0.109835C2.56048 0.0395087 2.4651 -1.07753e-07 2.36565 -1.03406e-07C2.26619 -9.90583e-08 2.17081 0.0395087 2.10048 0.109835C2.03015 0.18016 1.99065 0.275544 1.99065 0.375L1.99065 9.46937L0.630646 8.11C0.559558 8.04376 0.465535 8.0077 0.368385 8.00941C0.271234 8.01113 0.178541 8.05048 0.109835 8.11919C0.0411283 8.1879 0.00177242 8.28059 5.832e-05 8.37774C-0.00165578 8.47489 0.0344057 8.56891 0.100646 8.64L2.10065 10.64C2.17096 10.7102 2.26627 10.7497 2.36565 10.7497C2.46502 10.7497 2.56033 10.7102 2.63065 10.64L4.63065 8.64Z"
                    fill={currentColor}
                />
            </svg> */}

            {isActive ? (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g filter="url(#filter0_d_6_252)">
                        <path
                            d="M21 6H10.5C10.1022 6 9.72064 6.15804 9.43934 6.43934C9.15804 6.72064 9 7.10218 9 7.5V24C9.00007 24.1338 9.03595 24.2652 9.10393 24.3805C9.17191 24.4958 9.2695 24.5908 9.38659 24.6557C9.50367 24.7206 9.63598 24.7529 9.76978 24.7494C9.90358 24.7458 10.034 24.7066 10.1475 24.6356L15.75 21.1341L21.3534 24.6356C21.4669 24.7063 21.5972 24.7454 21.7309 24.7488C21.8646 24.7522 21.9967 24.7198 22.1136 24.655C22.2306 24.5902 22.3281 24.4953 22.396 24.3801C22.4639 24.2649 22.4998 24.1337 22.5 24V7.5C22.5 7.10218 22.342 6.72064 22.0607 6.43934C21.7794 6.15804 21.3978 6 21 6Z"
                            fill="#39532E"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_6_252"
                            x="6"
                            y="5"
                            width="19.5"
                            height="24.7496"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_6_252"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_6_252"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
            ) : (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g filter="url(#filter0_d_6_253)">
                        <path
                            d="M21 6H10.5C10.1022 6 9.72064 6.15804 9.43934 6.43934C9.15804 6.72064 9 7.10218 9 7.5V24C9.00007 24.1338 9.03595 24.2652 9.10393 24.3805C9.17191 24.4958 9.2695 24.5908 9.38659 24.6557C9.50367 24.7206 9.63598 24.7529 9.76978 24.7494C9.90358 24.7458 10.034 24.7066 10.1475 24.6356L15.75 21.1341L21.3534 24.6356C21.4669 24.7063 21.5972 24.7454 21.7309 24.7488C21.8646 24.7522 21.9967 24.7198 22.1136 24.655C22.2306 24.5902 22.3281 24.4953 22.396 24.3801C22.4639 24.2649 22.4998 24.1337 22.5 24V7.5C22.5 7.10218 22.342 6.72064 22.0607 6.43934C21.7794 6.15804 21.3978 6 21 6ZM21 22.6472L16.1466 19.6144C16.0274 19.5399 15.8896 19.5004 15.7491 19.5004C15.6085 19.5004 15.4708 19.5399 15.3516 19.6144L10.5 22.6472V7.5H21V22.6472Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <filter
                            id="filter0_d_6_253"
                            x="6"
                            y="5"
                            width="19.5"
                            height="24.7496"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            />
                            <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                            />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="1.5" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"
                            />
                            <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_6_253"
                            />
                            <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_dropShadow_6_253"
                                result="shape"
                            />
                        </filter>
                    </defs>
                </svg>
            )}
        </>
    );
}
