import { useState, type JSX } from "react";
import RecipeSearch from "../../components/recipe/RecipeSearch";
import Favourites from "../../components/recipe/Favourites";
import OwnRecipes from "../../components/recipe/OwnRecipes";
import RecipeForm from "../../components/recipe/RecipeForm";
import "./Recipe.css"


const options = ["Search", "Favourites", "Own", "Add Recipe"];

const optionsDict: Record<string, JSX.Element> = {
        "Search": <RecipeSearch/>,
        "Favourites": <Favourites/>,
        "Own": <OwnRecipes/>,
        "Add Recipe": <RecipeForm/>
    }

export default function RecipePage() {
    const [selectedOption, setSelectedOption] = useState(options[0])

    return (
        <div className="recipe-cotainer">
            <ul className="recipe-options">
                {options.map(option => (
                    <li className={selectedOption===option?'active':''} onClick={() => setSelectedOption(option)} key={option}>
                        {option}
                    </li>
                ))}
            </ul>
            <div className="action-area">
                {optionsDict[selectedOption]}
            </div>
        </div>
    )
}