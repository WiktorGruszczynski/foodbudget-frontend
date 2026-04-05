import { useState } from "react"
import { productService } from "../../services/productService";
import type { ProductResponse } from "../../types/product";

export default function RecipeSearch() {
    const withRecipe = true;
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<ProductResponse[]>([]);

    const handleInputUpdate = async (value: string) => {
        setQuery(value)

        if (query.length >= 3) {
            const response = await productService.getProducts(query, withRecipe)

            if (response.status === 200){
                setProducts(response.data)
            }
        }
    }

    return (
        <div className="recipe-search">
            <div className="search-wrapper">
                <input type="text" value={query} onChange={e => handleInputUpdate(e.target.value)}/>
            </div>
            <ul className="recipe-list">
                {
                    products.map(product => (
                        <li>{product.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}