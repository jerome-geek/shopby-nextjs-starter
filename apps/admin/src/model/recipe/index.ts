export interface SearchRecipesParams {
    keyword: string;
    // page: number;
    // take: number;
}

export interface Recipe {
    authorName: string;
    sno: number;
    sourceType: string;
    thumbnailUrl: string;
    title: string;
}

export type SearchRecipesResponse = Recipe[];
