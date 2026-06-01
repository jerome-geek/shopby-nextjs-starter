import { pipe, reduce } from '@fxts/core';

import type { BrowserTargetType } from '@/models';
import type { LandingUrlType } from '@/models/display/banner';

export const getLinkTarget = (target: BrowserTargetType) =>
    target === 'CURRENT' ? '_self' : '_blank';

export const getLandingUrl = ({
    landingUrlType,
    landingUrl,
}: {
    landingUrlType: LandingUrlType;
    landingUrl: string;
}) => {
    if (landingUrlType === 'EVENT') {
        return `/events/${landingUrl}`;
    }

    return landingUrl;
};

export const breakWord = (
    words: string,
    division: string,
    substitute: string,
): string =>
    pipe(
        words.split(division),
        reduce((a, b) => a + substitute + b),
    );
