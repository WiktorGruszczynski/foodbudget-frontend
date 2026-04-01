import {API_URL} from "./config/apiConfig"

export const productService = {
    getProductById: async (id:number) => {
        const response = await fetch(`${API_URL}/product/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.status == 200){
            const data = await response.json();

            console.log(data)
        }
    },
    addProduct: async (productRequest: any) => {
        const res = await fetch(`${API_URL}/product`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(productRequest)
        });

        console.log(res.status)
    },

    updateProduct: async (id: number, productRequest: any) => {

        const res = await fetch(`${API_URL}/product/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(productRequest)
        });

        console.log(res.status)
    }
}