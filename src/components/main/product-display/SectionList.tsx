'use client';

import { useMemo } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

interface SectionListProps {
    desktopSections: React.ReactNode;
    mobileSections: React.ReactNode;
}

const SectionList = ({ desktopSections, mobileSections }: SectionListProps) => {
    const isMobileQuery = useMediaQuery('(max-width: 768px)');
    const isMobile = isMobileQuery === true;

    const sections = useMemo(() => {
        if (isMobileQuery === null) {
            return desktopSections;
        }
        return isMobile ? mobileSections : desktopSections;
    }, [isMobileQuery, isMobile, desktopSections, mobileSections]);

    return <>{sections}</>;
};

export default SectionList;
