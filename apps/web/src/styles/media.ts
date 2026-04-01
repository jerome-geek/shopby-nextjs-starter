export const BREAKPOINTS = {
    /** Min mobile size, Based on IPhone 12 mini viewport (Here it is the Min width) */
    XXS: 335,
    /**  Based on IPhone 14 Pro max viewport */
    XS: 430,
    /** Max mobile size, Based on IPad mini viewport (Here it is the Max width) */
    SM: 768,
    /** Large Tablet Size */
    MD: 1024,
    /** Min Desktop Size */
    LG: 1280,
    /** Large Desktop Size */
    XL: 1410,
    /** Extra Large Desktop Size */
    XXL: 1540,
} as const;

export const media = {
    mobile: 'screen and (max-width: 768px)',
    tablet: 'screen and (min-width: 769px) and (max-width: 1024px)',
    desktop: 'screen and (min-width: 1025px)',
};
