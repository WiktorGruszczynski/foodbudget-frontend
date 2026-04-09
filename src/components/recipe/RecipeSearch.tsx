import { useState } from "react"
import { productService } from "../../services/productService";
import type { ProductResponse } from "../../types/product";

export default function RecipeSearch() {
    const withRecipe = true;
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<ProductResponse[]>([]);

    const handleInputUpdate = async (value: string) => {
        setQuery(value)

        if (value.length >= 3) {
            const response = await productService.getProducts(value, withRecipe)

            setProducts(response.data)
            
            console.log(response)
        }
        else{
            setProducts([])
        }
    }

    return (
        <div className="recipe-search h-full flex flex-col bg-blue-300">
            <div className="font-medium bg-white">
                <input type="text" className="w-full border-2" value={query} onChange={e => handleInputUpdate(e.target.value)}/>
            </div>
            <ul className="recipe-list">
                {
                    products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}