import type { RecipeResponse } from "../types/recipe";
import { requests } from "./api/requests";


export const recipeService = {
    getRecipeById: async (id: number) => {
        return await requests.get<RecipeResponse>(`/recipe/${id}`)
    },
    addRecipe: async (recipeRequest: any) => {
        return await requests.post<RecipeResponse>("/recipe", recipeRequest);
    },
    updateRecipe: async (id:number, recipeRequest: any) => {
        return await requests.patch<RecipeResponse>(`/recipe/${id}`, recipeRequest);
    },
}