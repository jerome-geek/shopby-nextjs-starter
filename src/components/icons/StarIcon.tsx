// interface StarIconProps {
//     className?: string;
//     width?: number;
//     height?: number;
//     currentColor?: string;
// }

// export default function StarIcon({
//     className,
//     width = 14,
//     height = 14,
//     currentColor = '#777472',
// }: StarIconProps) {
//     return (
//         <svg
//             className={className}
//             width={width}
//             height={height}
//             viewBox={`0 0 ${width} ${height}`}
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M6.02319 1.56934C6.38542 0.810219 7.46598 0.81022 7.82822 1.56934L8.85207 3.715C8.99786 4.02051 9.2883 4.23153 9.6239 4.27577L11.9809 4.58647C12.8148 4.69639 13.1488 5.72407 12.5387 6.30315L10.8145 7.93995C10.569 8.173 10.458 8.51444 10.5197 8.84728L10.9525 11.185C11.1057 12.012 10.2315 12.6472 9.49222 12.2459L7.40272 11.1119C7.1052 10.9504 6.7462 10.9504 6.44869 11.1119L4.35918 12.2459C3.61992 12.6472 2.74573 12.012 2.89888 11.185L3.33175 8.84728C3.39338 8.51443 3.28244 8.173 3.03694 7.93995L1.31268 6.30315C0.702649 5.72407 1.03656 4.69639 1.87047 4.58647L4.2275 4.27577C4.56311 4.23153 4.85355 4.02051 4.99933 3.715L6.02319 1.56934Z"
//                 fill={currentColor}
//             />
//         </svg>
//     );
// }

import { useId } from 'react';

interface StarIconProps {
    className?: string;
    width?: number;
    height?: number;
    fillPercentage?: number; // 0 ~ 100
    baseColor?: string; // 채워지지 않은 부분 색상 (기본값: Gray 10)
    fillColor?: string; // 채워진 부분 색상 (기본값: Gray 90)
}

export function StarIcon({
    className,
    width = 14,
    height = 14,
    fillPercentage = 0,
    baseColor = '#A7A6A5',
    fillColor = '#5A5552',
}: StarIconProps) {
    // 고유 ID 생성 (여러 개의 별이 있을 때 그래디언트 충돌 방지)
    const id = useId();
    const gradientId = `star-grad-${id}`;

    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 14 14' // viewBox는 원본 패스 기준(14x14)으로 고정하는 것이 좋습니다.
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <defs>
                <linearGradient id={gradientId}>
                    {/* 채워지는 부분 */}
                    <stop offset={`${fillPercentage}%`} stopColor={fillColor} />
                    {/* 빈 부분 */}
                    <stop offset={`${fillPercentage}%`} stopColor={baseColor} />
                </linearGradient>
            </defs>
            <path
                d='M6.02319 1.56934C6.38542 0.810219 7.46598 0.81022 7.82822 1.56934L8.85207 3.715C8.99786 4.02051 9.2883 4.23153 9.6239 4.27577L11.9809 4.58647C12.8148 4.69639 13.1488 5.72407 12.5387 6.30315L10.8145 7.93995C10.569 8.173 10.458 8.51444 10.5197 8.84728L10.9525 11.185C11.1057 12.012 10.2315 12.6472 9.49222 12.2459L7.40272 11.1119C7.1052 10.9504 6.7462 10.9504 6.44869 11.1119L4.35918 12.2459C3.61992 12.6472 2.74573 12.012 2.89888 11.185L3.33175 8.84728C3.39338 8.51443 3.28244 8.173 3.03694 7.93995L1.31268 6.30315C0.702649 5.72407 1.03656 4.69639 1.87047 4.58647L4.2275 4.27577C4.56311 4.23153 4.85355 4.02051 4.99933 3.715L6.02319 1.56934Z'
                fill={`url(#${gradientId})`}
            />
        </svg>
    );
}
