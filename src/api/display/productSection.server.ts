import { cache } from 'react';

import { productSection } from '@/api/display';

export const getCachedProductSections = cache(async () => {
    const response = await productSection.getProductSections();

    return await response.json();
});