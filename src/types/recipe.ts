import type {  Product, ProductResponse } from "./product";

interface IngredientResponse {
    id: string;
    product: ProductResponse
    quantity: number;
    unit: string;
    price: number;
}

interface IngredientRequest {
    productId: string;
    quantity: number;
    unit: string;
}

interface Ingredient {
    product: Product,
    quantity: number,
    unit: string,
}

export interface RecipeResponse {
    id: string;
    name: string;
    description: string;
    ingredients: IngredientResponse[]
}

export interface RecipeRequest {
    name: string;
    description: string;
    ingredients: IngredientRequest[]
}

export interface Recipe {
    name: string;
    description: string;
    ingredients: Ingredient[]
}