import { Star } from 'lucide-react';
import { SVGProps } from 'react';

import { vars } from '@/styles/theme.css';

interface ReviewStarIconProps extends SVGProps<SVGSVGElement> {
    filled?: boolean;
}

const ReviewStartIcon = ({
    filled,
    width,
    height,
    ...props
}: ReviewStarIconProps) => {
    return (
        <Star
            width={width ?? 16}
            height={height ?? 16}
            fill={filled ? vars.color.pink['80'] : 'none'}
            color={filled ? vars.color.pink['80'] : vars.color.gray['40']}
            {...props}
        />
    );
};

export default ReviewStartIcon;
