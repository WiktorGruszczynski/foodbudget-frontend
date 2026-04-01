import {API_URL} from "./config/apiConfig"



export const authService = {
    register: async (email:string, password:string) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email, password: password}),
    });

        console.log('Register status:', response.status);
    },

    verify_register: async (code:string) => {
        const response = await fetch(`${API_URL}/auth/register-verify?code=${code}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        console.log("Verify status: ", response.status)
    },

    login: async (email:string, password:string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email, password: password }),
        });

        console.log('Login response:', response.status);
    }
}