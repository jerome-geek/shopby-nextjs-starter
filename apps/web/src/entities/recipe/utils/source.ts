import type { RecipeSourceType } from '@/models/shop';

export type RecipeMediaVariant = 'youtube' | 'external' | 'image';

export function resolveRecipeMediaVariant(
    sourceType: RecipeSourceType,
    sourceId?: string | null,
    sourceUrl?: string | null,
): RecipeMediaVariant {
    if (sourceType === 'YOUTUBE' && sourceId) return 'youtube';
    if (sourceUrl) return 'external';
    return 'image';
}
