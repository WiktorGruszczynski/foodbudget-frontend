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

const getMacroRingColor = (key: string) => {
        const k = key.toLowerCase();
        if (k.includes('energy')) return 'border-energy text-black';
        if (k.includes('protein')) return 'border-protein text-black';
        if (k.includes('fat')) return 'border-fat text-black';
        if (k.includes('carb')) return 'border-carb text-black';
        return 'border-indigo-400 text-indigo-600'; // Default fallback color
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 md:p-6 flex flex-col gap-6 pb-24">
            
            {/* 1. MACROS SECTION */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap justify-around items-center gap-4">
                {Object.keys(macros).map(key => (
                    <div key={key} className="flex flex-col items-center gap-2">
                        <div className={`
                            flex flex-col items-center justify-center 
                            w-20 h-20 sm:w-24 sm:h-24 rounded-full 
                            border-[6px] bg-white shadow-inner
                            ${getMacroRingColor(key)}
                        `}>
                            <span className="text-lg sm:text-xl font-extrabold leading-none">
                                {Math.round(macros[key] * 10) / 10}
                            </span>
                            <span className="text-xs font-medium opacity-70 mt-0.5">
                                {key.toLowerCase().includes('kcal') ? 'kcal' : 'g'}
                            </span>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            {key}
                        </span>
                    </div>
                ))}
            </div>

            {/* 2. BASIC DETAILS */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Basic Details</h3>
                
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-600 pl-1">Recipe Name</label>
                    <input 
                        value={recipe.name} 
                        onChange={(e) => handleTextChange("name", e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-800"
                        placeholder="e.g., Raspberry Oatmeal"
                    />
                </div>
                
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-600 pl-1">Description / Instructions</label>
                    <textarea 
                        value={recipe.description} 
                        onChange={(e) => handleTextChange("description", e.target.value)} 
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-800 resize-y"
                        placeholder="Describe how to prepare this dish..."
                    />
                </div>
            </div>

            {/* 3. INGREDIENTS LIST */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Ingredients</h3>
                
                {recipe.ingredients.length === 0 ? (
                    <p className="text-gray-400 text-center py-4 italic">No ingredients added yet. Add something below!</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {recipe.ingredients.map((ing, idx) => (
                            <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-3">
                                <span className="font-semibold text-gray-800 sm:w-1/2 line-clamp-1">
                                    {ing.product.name}
                                </span> 
                                
                                <div className="flex items-center gap-3 justify-between sm:justify-end">
                                    <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                                        <input 
                                            type="number" 
                                            value={ing.quantity || ''} 
                                            onChange={(e) => handleAmountChange(idx, e.target.value)} 
                                            placeholder="0"
                                            className="w-20 px-3 py-2 text-center outline-none text-gray-800 font-bold appearance-none"
                                        /> 
                                        <span className="pr-4 text-gray-500 font-medium bg-white">
                                            {ing.unit}
                                        </span>
                                    </div>
                                    
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveIngredient(idx)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove ingredient"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 4. INGREDIENT SEARCH */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Add new ingredient</h3>
                
                <div className="relative">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={e => handleSearchChange(e.target.value)}
                            placeholder="Search for a product (e.g., tomato)..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-800"
                        />
                    </div>
                    
                    {isDropdownOpen && (
                        <ul className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                            {searchResults.length > 0 ? (
                                searchResults.map(product => (
                                    <li 
                                        key={product.id} 
                                        onClick={() => handleSelectProduct(product)}
                                        className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors text-gray-700"
                                    >
                                        <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">{product.name}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="px-5 py-4 text-center text-gray-500 italic">
                                    No product found...
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            {/* 5. SUBMIT BUTTON */}
            <button 
                type="submit"
                className="
                    w-full py-4 text-lg font-bold text-white rounded-2xl transition-all transform hover:-translate-y-0.5
                    bg-brand            /* Główny niebieski kolor */
                    hover:bg-blue-700      /* Nieco ciemniejszy niebieski po najechaniu myszką */
                    active:bg-blue-800     /* Jeszcze ciemniejszy podczas klikania */
                    shadow-lg shadow-blue-200 /* Niebieska, miękka poświata pod przyciskiem */
                    "
            >
                Save Recipe
            </button>
        </form>
    );
}