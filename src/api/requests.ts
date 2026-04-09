import axios, { type AxiosResponse } from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const requests = {
    get: <T>(url: string, params?: any): Promise<AxiosResponse<T>> => api.get<T>(url, {
        params
    }),
    post: <T>(url: string, data?: object): Promise<AxiosResponse<T>> => api.post<T>(url, data),
    patch: <T>(url: string, data?: object): Promise<AxiosResponse<T>> => api.patch<T>(url, data),
    delete: <T>(url: string): Promise<AxiosResponse<T>> => api.delete<T>(url),
};