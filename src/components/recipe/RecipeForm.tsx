import { useEffect, useState } from 'react';
import type { Product, ProductResponse } from '../../types/product';
import { productService } from '../../services/productService';
import type { Recipe, RecipeRequest } from '../../types/recipe';
import { recipeService } from '../../services/recipeService';


const calculateMacros = (recipe: Recipe) => {
    const macros = {
        energy: 0,
        protein: 0,
        fat: 0,
        carbohydrates: 0
    }

    recipe.ingredients.forEach(ing => {
        const product = ing.product;
        const factor = (ing.quantity/100);

        macros.energy += product.energyKcal*factor
        macros.protein += product.protein*factor
        macros.fat += product.fat*factor
        macros.carbohydrates += product.carbohydrates*factor
    })

    return macros
}

export default function RecipeForm() {
    const [recipe, setRecipe] = useState<Recipe>({
        name: "",
        description: "",
        ingredients: []
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<ProductResponse[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [macros, setMacros] = useState<any>({});


    useEffect(() => {
        setMacros(calculateMacros(recipe))
    }, [recipe])

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
   
        const recipeRequest: RecipeRequest = {
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients.map(ing => ({
                productId: ing.product.id,
                quantity: ing.quantity,
                unit: ing.unit
            }))
        }

        const res = await recipeService.addRecipe(recipeRequest)

        console.log(res)
    };

    const handleSearchChange = async (value: string) => {
        setSearchQuery(value)

        if (value.length >= 3){
            const response = await productService.getProducts(value)
            setSearchResults(response.data)
            setIsDropdownOpen(true);
        }
        else {
            setIsDropdownOpen(false);
            setSearchResults([]);
        }
    
    };

    const handleSelectProduct = (product: ProductResponse) => {
        setRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { 
                product: product as Product , quantity: 0, unit: product.nutrientUnit
            }]
        }));
        
        setSearchQuery("");
        setIsDropdownOpen(false);
    };

    const handleRemoveIngredient = (indexToRemove: number) => {
        setRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleAmountChange = (index: number, newAmount: string) => {
        const parsedAmount = parseFloat(newAmount) || 0;
        
        setRecipe(prev => {
            const updatedIngredients = [...prev.ingredients];
            updatedIngredients[index].quantity = parsedAmount;
            
            return { ...prev, ingredients: updatedIngredients };
        });
    };

    const handleTextChange = (name: string, value: string) => {
        setRecipe(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Makro</h3>
            <div className="macros">
                <ul>
                    {Object.keys(macros).map(key => (
                        <li key={key}>{`${key}: ${Math.round(macros[key] * 100) / 100}`}</li>
                    ))}
                </ul>
            </div>
            <h3>Podstawowe dane</h3>
            <div>
                <label>Nazwa: </label>
                <input value={recipe.name} onChange={(e) => handleTextChange("name", e.target.value)}/>
            </div>
            <div>
                <label>Opis: </label>
                <textarea value={recipe.description} onChange={(e) => handleTextChange("description", e.target.value)} />
            </div>
            <hr />
            <h3>Wybrane składniki</h3>
            <ul>
                {recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>
                        {ing.product.name} - 
                        <input 
                            type="number" 
                            value={ing.quantity} 
                            onChange={(e) => handleAmountChange(idx, e.target.value)} 
                            placeholder="Ilość"
                        /> 
                        {ing.unit}
                        <button type="button" onClick={() => handleRemoveIngredient(idx)}> [Usuń] </button>
                    </li>
                ))}
            </ul>

            <hr />

            <h3>Dodaj nowy składnik</h3>
            <div>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                    placeholder="Wpisz nazwę produktu..."
                />
                
                {isDropdownOpen && (
                    <ul>
                        {searchResults.length > 0 ? (
                            searchResults.map(product => (
                                <li key={product.id} onClick={() => handleSelectProduct(product)}>
                                    + {product.name}
                                </li>
                            ))
                        ) : (
                            <li>Nie znaleziono...</li>
                        )}
                    </ul>
                )}
            </div>

            <hr />
            <button type="submit">Zapisz cały przepis</button>
        </form>
    );
}