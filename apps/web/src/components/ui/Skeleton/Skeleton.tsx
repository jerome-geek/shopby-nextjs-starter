import React, { CSSProperties } from 'react';
import { skeleton } from './Skeleton.css';

interface SkeletonProps {
    className?: string;
    style?: CSSProperties;
    width?: string | number;
    height?: string | number;
    count?: number;
    circle?: boolean;
}

export const Skeleton = ({
    className,
    style,
    width,
    height,
    count = 1,
    circle,
}: SkeletonProps) => {
    const elements = Array.from({ length: count }).map((_, index) => (
        <span
            key={index}
            className={`${skeleton} ${className || ''}`}
            style={{
                ...style,
                width: width,
                height: height,
                borderRadius: circle ? '50%' : undefined,
            }}
        />
    ));

    if (count === 1) {
        return elements[0];
    }

    return <>{elements}</>;
};

export default Skeleton;
