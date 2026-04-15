import type { MeasurementUnit, ProductResponse } from "./product";

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack_1' | 'Snack_2' | 'Snack_3';

export interface MealItem {
    id: string;
    quantity: number; 
    unit: MeasurementUnit;
    product: ProductResponse;
}

export interface Meal{
    id: string;
    mealtype: MealType;
    date: string; // ISO string
    mealItems: MealItem[];
}