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

    verify_register: async (code:string, email:string) => {
        const response = await fetch(`${API_URL}/auth/register-verify?code=${code}&email=${email}`, {
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
    },

    issue_password_reset: async (email: string) => {
        const response = await fetch(`${API_URL}/auth/send-password-reset-code?email=${email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        console.log('issue_password_reset status: ', response.status)
    }
}