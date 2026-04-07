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
        <div className="recipe-container flex flex-col h-full md:flex-row md:gap-8 md:h-[calc(100vh-38px)]">
            <ul className="
                    /* MOBILKA: Wyskakuje nad navbar na dole */
                    fixed bottom-9.5 left-0 w-full z-40
                    flex flex-row justify-around bg-white border-t p-2 shadow-lg
                    
                    /* PC: Grzecznie wraca do kontenera po lewej */
                    md:static md:w-64 md:flex-col md:justify-start md:border-t-0 md:shadow-none md:p-0
                ">
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