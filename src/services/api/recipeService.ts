import {API_URL} from "./config/apiConfig"

export const recipeService = {
    addRecipe: async (recipeRequest: any) => {
        const response = await fetch(`${API_URL}/recipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(recipeRequest)
        });

        if (response.status == 201){
            const data = await response.json();

            console.log(data)
        }
    },

        updateRecipe: async (id:number, recipeRequest: any) => {
        const response = await fetch(`${API_URL}/recipe/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(recipeRequest)
        });

        if (response.status == 200){
            const data = await response.json();
            console.log(data)
        }
    },

    getRecipe: async (id: number) => {
        const response = await fetch(`${API_URL}/recipe/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.status == 200){
            const data = await response.json();
            console.log(data)
        }
    },
}