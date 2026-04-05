import type { ProductResponse } from "./product";

interface IngredientResponse {
    id: number;
    product: ProductResponse
    quantity: number;
    unit: string;
    price: number;
}

interface IngredientRequest {
    id: number;
    productId: number;
    quantity: number;
    unit: string;
}


export interface RecipeResponse {
    id: number;
    name: string;
    description: string;
    ingredients: IngredientResponse[]
}

export interface RecipeRequest {
    id: number;
    name: string;
    description: string;
    ingredients: IngredientRequest[]
}


