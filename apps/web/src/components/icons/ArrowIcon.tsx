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
    width = 18,
    height = 15,
    currentColor = vars.color.black,
    direction = 'up',
}: ArrowIconProps) {
    const rotation = {
        up: 'rotate(90deg)',
        down: 'rotate(-90deg)',
        left: 'rotate(0deg)',
        right: 'rotate(180deg)',
    };

    return (
        <>
            <svg
                className={className}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{
                    transform: rotation[direction],
                    transformOrigin: 'center',
                }}
            >
                <path
                    d='M17.6245 7.29847C17.6245 7.44765 17.5652 7.59073 17.4598 7.69622C17.3543 7.80171 17.2112 7.86097 17.062 7.86097H1.92044L7.7095 13.651C7.76477 13.7025 7.8091 13.7646 7.83984 13.8336C7.87058 13.9026 7.88712 13.9771 7.88845 14.0526C7.88978 14.1281 7.87589 14.2031 7.8476 14.2732C7.81931 14.3432 7.7772 14.4068 7.72378 14.4602C7.67037 14.5137 7.60674 14.5558 7.5367 14.5841C7.46666 14.6124 7.39164 14.6262 7.31611 14.6249C7.24059 14.6236 7.1661 14.607 7.0971 14.5763C7.0281 14.5456 6.966 14.5012 6.9145 14.446L0.164505 7.69597C0.059167 7.5905 0 7.44753 0 7.29847C0 7.14941 0.059167 7.00644 0.164505 6.90097L6.9145 0.150969C7.02114 0.0516087 7.16217 -0.00248353 7.3079 8.76355e-05C7.45362 0.0026588 7.59266 0.0616926 7.69572 0.164752C7.79878 0.267812 7.85781 0.406851 7.86039 0.552577C7.86296 0.698303 7.80886 0.839338 7.7095 0.945969L1.92044 6.73597H17.062C17.2112 6.73597 17.3543 6.79523 17.4598 6.90072C17.5652 7.00621 17.6245 7.14928 17.6245 7.29847Z'
                    fill={currentColor}
                />
            </svg>
        </>
    );
}
