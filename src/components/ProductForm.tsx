import { useState } from "react"
import type { ProductRequest } from "../types/product";

const INITIAL_PRODUCT_STATE = {
    name: "",
    manufacturer: "",
    ean: "",
    quantity: 0,
    quantityUnit: "ml",
    nutrientUnit: "ml",
    energyKcal: 0,
    fat: 0,
    saturatedFat: 0,
    carbohydrates: 0,
    sugars: 0,
    fiber: 0,
    protein: 0,
    salt: 0,
    price: 0,
};


export default function ProductForm() {
    const [product, setProduct] = useState<ProductRequest>(INITIAL_PRODUCT_STATE);

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const { name, value, type } = e.target;
        // Ważne: Spring oczekuje liczb, więc parsujemy wartości numeryczne
        const finalValue = type === "number" ? parseFloat(value) : value;
        
        setProduct({
        ...product,
        [name]: finalValue
        });
    };

    const handleSubmit = async () => {

    }

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Dodaj nowy produkt</h2>
            <ul>
                {/* --- PODSTAWOWE DANE --- */}
                <li>
                    <label>Nazwa produktu:</label>
                    <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
                </li>
                <li>
                    <label>Producent:</label>
                    <input type="text" name="manufacturer" value={product.manufacturer} onChange={handleInputChange} />
                </li>
                <li>
                    <label>EAN (Kod kreskowy):</label>
                    <input type="text" name="ean" value={product.ean} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Cena (PLN):</label>
                    <input type="number" step="0.01" name="price" value={product.price} onChange={handleInputChange} />
                </li>

                <hr />

                {/* --- JEDNOSTKI I ILOŚĆ --- */}
                <li>
                    <label>Ilość:</label>
                    <input type="number" step="0.1" name="quantity" value={product.quantity} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Jednostka ilości:</label>
                    <select name="quantityUnit" value={product.quantityUnit} onChange={handleInputChange}>
                        <option value="ml">Mililitry (ml)</option>
                        <option value="g">Gramy (g)</option>
                        <option value="szt">Sztuki (szt)</option>
                    </select>
                </li>

                <hr />

                {/* --- WARTOŚCI ODŻYWCZE --- */}
                <li>
                    <label>Jednostka wartości odżywczych (na 100...):</label>
                    <select name="nutrientUnit" value={product.nutrientUnit} onChange={handleInputChange}>
                        <option value="ml">ml</option>
                        <option value="g">g</option>
                    </select>
                </li>
                <li>
                    <label>Kalorie (kcal):</label>
                    <input type="number" step="1" name="energyKcal" value={product.energyKcal} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Tłuszcz (g):</label>
                    <input type="number" step="0.1" name="fat" value={product.fat} onChange={handleInputChange} />
                </li>
                <li>
                    <label>w tym kwasy tłuszczowe nasycone (g):</label>
                    <input type="number" step="0.1" name="saturatedFat" value={product.saturatedFat} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Węglowodany (g):</label>
                    <input type="number" step="0.1" name="carbohydrates" value={product.carbohydrates} onChange={handleInputChange} />
                </li>
                <li>
                    <label>w tym cukry (g):</label>
                    <input type="number" step="0.1" name="sugars" value={product.sugars} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Błonnik (g):</label>
                    <input type="number" step="0.1" name="fiber" value={product.fiber} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Białko (g):</label>
                    <input type="number" step="0.1" name="protein" value={product.protein} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Sól (g):</label>
                    <input type="number" step="0.01" name="salt" value={product.salt} onChange={handleInputChange} />
                </li>
            </ul>

            <button type="submit">Zapisz produkt</button>
        </form>
    );
}