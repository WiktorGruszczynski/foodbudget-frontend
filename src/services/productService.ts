import type { ProductRequest, ProductResponse} from "../types/product";
import { requests } from "../api/requests";

export const productService = {
    getProductById: async (id: number) => {
        return await requests.get<ProductResponse>(`/product/${id}`);
    },

    addProduct: async (productRequest: ProductRequest) => {
        return await requests.post<ProductResponse>("/product", productRequest);
    },

    updateProduct: async (id: number, productRequest: ProductRequest) => {
        return await requests.patch<ProductResponse>(`/product/${id}`, productRequest)
    },

    getProducts: async (query: string, hasRecipe: boolean | null = null, isGlobal: boolean | null = null) => {
        return await requests.get<ProductResponse[]>(`/product`, {
            query: query,
            hasRecipe: hasRecipe,
            isGlobal: isGlobal
        })
    },

    getUserProducts: async () => {
        return await requests.get<ProductResponse[]>(`/product/me`)
    },

    getUserRecipeProducts: async () => {
        return await requests.get<ProductResponse[]>(`/product/me?hasRecipe=true`)
    },

    generateEmptyProductRequest: (): ProductRequest => {
        return {
            name: "",
            manufacturer: "",
            ean: "",
            quantity: 0,
            quantityUnit: "g",
            nutrientUnit: "g",
            energyKcal: 0,
            fat: 0,
            saturatedFat: 0,
            carbohydrates: 0,
            sugars: 0,
            fiber: 0,
            protein: 0,
            salt: 0,
            price: 0,
        }
    }

}