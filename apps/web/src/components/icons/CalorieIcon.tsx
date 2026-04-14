import { vars } from '@/styles/theme.css';

interface CalorieIconProps {
    className?: string;
    width?: number;
    height?: number;
    currentColor?: string;
}

export function CalorieIcon({
    className,
    width = 14,
    height = 17,
    currentColor = vars.color.black,
}: CalorieIconProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox='0 0 14 17'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M8.07656 0.144405C7.99952 0.080348 7.9082 0.035754 7.81031 0.0143825C7.71241 -0.00698905 7.61082 -0.00451168 7.51408 0.0216057C7.41735 0.047723 7.32831 0.0967148 7.25448 0.164451C7.18065 0.232187 7.12418 0.316681 7.08984 0.410811L5.37109 5.13034L3.48359 3.30144C3.42021 3.23995 3.34451 3.1926 3.26149 3.1625C3.17847 3.1324 3.09002 3.12024 3.00196 3.12681C2.9139 3.13338 2.82823 3.15853 2.75059 3.20062C2.67296 3.2427 2.60513 3.30076 2.55156 3.37097C0.859375 5.58815 0 7.81862 0 9.99987C0 11.8232 0.724328 13.5719 2.01364 14.8612C3.30295 16.1505 5.05164 16.8749 6.875 16.8749C8.69836 16.8749 10.447 16.1505 11.7364 14.8612C13.0257 13.5719 13.75 11.8232 13.75 9.99987C13.75 5.35534 9.78203 1.56237 8.07656 0.144405Z'
                fill={currentColor}
            />
        </svg>
    );
}

