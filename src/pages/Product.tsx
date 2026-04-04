import { useState } from "react";
import { productService } from "../services/api/productService";

export default function Product(){
    // Stan dla dynamicznego produktu
    const [product, setProduct] = useState({
        name: "",
        manufacturer: "",
        ean: "",
        density: null,
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
    });

    const handleInputChange = (e:any) => {
        const { name, value, type } = e.target;
        // Ważne: Spring oczekuje liczb, więc parsujemy wartości numeryczne
        const finalValue = type === "number" ? parseFloat(value) : value;
        
        setProduct({
        ...product,
        [name]: finalValue
        });
    };

    return (
              <section>
                <h3>Dodaj Nowy Produkt (Pełne dane)</h3>
                
                <h4>Podstawowe informacje</h4>
                <div><label>Nazwa: </label><input name="name" type="text" onChange={handleInputChange} /></div>
                <div><label>Producent: </label><input name="manufacturer" type="text" onChange={handleInputChange} /></div>
                <div><label>EAN: </label><input name="ean" type="text" onChange={handleInputChange} /></div>
                <div><label>Cena: </label><input name="price" type="number" step="0.01" onChange={handleInputChange} /></div>
                
                <h4>Wymiary i jednostki</h4>
                <div>
                  <label>Ilość w opakowaniu: </label>
                  <input name="quantity" type="number" onChange={handleInputChange} />
                  <select name="quantityUnit" onChange={handleInputChange}>
                    <option value="ml">ml</option>
                    <option value="g">g</option>
                  </select>
                </div>
                <div>
                  <label>Jednostka wartości odżywczych: </label>
                  <select name="nutrientUnit" onChange={handleInputChange}>
                    <option value="ml">ml</option>
                    <option value="g">g</option>
                  </select>
                </div>
                <div><label>Gęstość (opcjonalnie): </label><input name="density" type="number" step="0.01" onChange={handleInputChange} /></div>
        
                <h4>Wartości odżywcze (w 100g/100ml)</h4>
                <div><label>Energia (kcal): </label><input name="energyKcal" type="number" onChange={handleInputChange} /></div>
                
                <div style={{display: 'flex', gap: '20px'}}>
                  <div>
                    <label>Tłuszcz: </label><input name="fat" type="number" step="0.1" onChange={handleInputChange} /><br/>
                    <label> - w tym nasycone: </label><input name="saturatedFat" type="number" step="0.1" onChange={handleInputChange} />
                  </div>
                  <div>
                    <label>Węglowodany: </label><input name="carbohydrates" type="number" step="0.1" onChange={handleInputChange} /><br/>
                    <label> - w tym cukry: </label><input name="sugars" type="number" step="0.1" onChange={handleInputChange} />
                  </div>
                </div>
        
                <div><label>Błonnik: </label><input name="fiber" type="number" step="0.1" onChange={handleInputChange} /></div>
                <div><label>Białko: </label><input name="protein" type="number" step="0.1" onChange={handleInputChange} /></div>
                <div><label>Sól: </label><input name="salt" type="number" step="0.01" onChange={handleInputChange} /></div>
        
                <br />
                <button onClick={() => productService.addProduct(product)} style={{padding: '10px 20px', backgroundColor: 'green', color: 'white'}}>
                    DODAJ PRODUKT DO BAZY
                </button>
                <button onClick={() => productService.getProductById(25)}>Get Product</button>
              </section>
        
    )
}