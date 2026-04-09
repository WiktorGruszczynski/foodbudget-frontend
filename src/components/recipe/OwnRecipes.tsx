import { useEffect, useState } from "react";
import { productService } from "../../services/productService";
import type { ProductResponse } from "../../types/product";

export default function OwnRecipes() {
    const [recipes, setRecipes] = useState<ProductResponse[]>([]);
    
    const fetchRecipes = async () => {
        const response = await productService.getUserRecipeProducts()

        if (response.status === 200) {
            setRecipes(response.data);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [])

    return (
        <div className="own-recipes">
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    )
}