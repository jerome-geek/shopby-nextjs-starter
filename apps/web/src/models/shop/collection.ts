export interface CreateCollectionRequest {
    title: string;
    description?: string;
}

export interface UpdateCollectionRequest {
    title?: string;
    description?: string;
}

export interface RecipeCollection {
    deletable: boolean;
    description: Nullable<string>;
    editable: boolean;
    isDefault: boolean;
    ownershipType: 'OWNED';
    recipeCount: number;
    shareCode: string;
    sno: number;
    title: string;
}

export type CollectionListResponse = RecipeCollection[];

export interface SearchPublicCollectionParams {
    keyword?: string;
    order?: 'ASC' | 'DESC';
    page?: number;
    take?: number;
}
