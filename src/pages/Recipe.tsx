import { useState } from "react";
import { recipeService } from "../services/api/recipeService";

export function Recipe(){
    const [recipe, setRecipe] = useState({
        name: "Sos Teryiaki",
        description: "Fajny sos",
        ingredients: [
            {
                productId: 3, // Sos sojowy jasny
                quantity: 150,
                unit: "ml"
            },
            {
                productId: 12,
                quantity: 80,
                unit: "ml"
            },
            {
                productId: 4, // Cukier trzcinowy
                quantity: 60,
                unit: "g"
            },
            {
                productId: 8, // Ocet ryżowy
                quantity: 15,
                unit: "ml"
            },
            {
                productId: 9, // Imbir korzeń
                quantity: 10,
                unit: "g"
            },
            {
                productId: 10, // Czosnek granulowany
                quantity: 2,
                unit: "g"
            },
            {
                productId: 7, // Skrobia ziemniaczana
                quantity: 5,
                unit: "g"
            },
            {
                productId: 11, // Olej sezamowy
                quantity: 5,
                unit: "ml"
            }
        ]
    });

    return (
        <div>
            <h1>Recipes</h1>
            {/* <button onClick={() => recipeService.addRecipe(recipe)}>Add recipe</button> */}
            <p> </p>
            <button onClick={() => recipeService.getRecipe(1)}>Get recipe</button>
            <p></p>
            <button onClick={() => recipeService.updateRecipe(1, recipe)}>Update recipe</button>
        </div>
    )
}