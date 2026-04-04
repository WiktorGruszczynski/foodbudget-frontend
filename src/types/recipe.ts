import type { ProductResponse } from "./product";

interface Ingredient {
    id: number;
    product: ProductResponse
    quantity: number;
    unit: string;
    price: number;
}

export interface RecipeResponse{
    id: number;
    name: string;
    description: string;
    ingredients: Ingredient[]
}

