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
    return isActive ? (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g filter='url(#filter0_d_6_252)'>
                <path
                    d='M21 6H10.5C10.1022 6 9.72064 6.15804 9.43934 6.43934C9.15804 6.72064 9 7.10218 9 7.5V24C9.00007 24.1338 9.03595 24.2652 9.10393 24.3805C9.17191 24.4958 9.2695 24.5908 9.38659 24.6557C9.50367 24.7206 9.63598 24.7529 9.76978 24.7494C9.90358 24.7458 10.034 24.7066 10.1475 24.6356L15.75 21.1341L21.3534 24.6356C21.4669 24.7063 21.5972 24.7454 21.7309 24.7488C21.8646 24.7522 21.9967 24.7198 22.1136 24.655C22.2306 24.5902 22.3281 24.4953 22.396 24.3801C22.4639 24.2649 22.4998 24.1337 22.5 24V7.5C22.5 7.10218 22.342 6.72064 22.0607 6.43934C21.7794 6.15804 21.3978 6 21 6Z'
                    fill='#39532E'
                />
            </g>
            <defs>
                <filter
                    id='filter0_d_6_252'
                    x='6'
                    y='5'
                    width='19.5'
                    height='24.7496'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                >
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                    />
                    <feOffset dy='2' />
                    <feGaussianBlur stdDeviation='1.5' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'
                    />
                    <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_6_252'
                    />
                    <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_6_252'
                        result='shape'
                    />
                </filter>
            </defs>
        </svg>
    ) : (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g filter='url(#filter0_d_6_253)'>
                <path
                    d='M21 6H10.5C10.1022 6 9.72064 6.15804 9.43934 6.43934C9.15804 6.72064 9 7.10218 9 7.5V24C9.00007 24.1338 9.03595 24.2652 9.10393 24.3805C9.17191 24.4958 9.2695 24.5908 9.38659 24.6557C9.50367 24.7206 9.63598 24.7529 9.76978 24.7494C9.90358 24.7458 10.034 24.7066 10.1475 24.6356L15.75 21.1341L21.3534 24.6356C21.4669 24.7063 21.5972 24.7454 21.7309 24.7488C21.8646 24.7522 21.9967 24.7198 22.1136 24.655C22.2306 24.5902 22.3281 24.4953 22.396 24.3801C22.4639 24.2649 22.4998 24.1337 22.5 24V7.5C22.5 7.10218 22.342 6.72064 22.0607 6.43934C21.7794 6.15804 21.3978 6 21 6ZM21 22.6472L16.1466 19.6144C16.0274 19.5399 15.8896 19.5004 15.7491 19.5004C15.6085 19.5004 15.4708 19.5399 15.3516 19.6144L10.5 22.6472V7.5H21V22.6472Z'
                    fill='white'
                />
            </g>
            <defs>
                <filter
                    id='filter0_d_6_253'
                    x='6'
                    y='5'
                    width='19.5'
                    height='24.7496'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                >
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                        in='SourceAlpha'
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                        result='hardAlpha'
                    />
                    <feOffset dy='2' />
                    <feGaussianBlur stdDeviation='1.5' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                        type='matrix'
                        values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'
                    />
                    <feBlend
                        mode='normal'
                        in2='BackgroundImageFix'
                        result='effect1_dropShadow_6_253'
                    />
                    <feBlend
                        mode='normal'
                        in='SourceGraphic'
                        in2='effect1_dropShadow_6_253'
                        result='shape'
                    />
                </filter>
            </defs>
        </svg>
    );
}
