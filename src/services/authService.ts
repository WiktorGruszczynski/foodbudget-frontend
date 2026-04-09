import type { AuthResponse } from "../types/auth";
import { requests } from "../api/requests";

export const authService = {
    register: async (email:string, password:string) => {
        return await requests.post<AuthResponse>("/auth/register", {
            email: email, 
            password: password
        })        
    },

    verifyRegister: async (code:string, email:string) => {
        return await requests.post<AuthResponse>(`/auth/register-verify?code=${code}&email=${email}`)    
    },

    login: async (email:string, password:string) => {
        return await requests.post<AuthResponse>("/auth/login", {
            email: email,
            password: password
        })
    },

    issuePasswordReset: async (email: string) => {
        return await requests.post<AuthResponse>(`/auth/send-password-reset-code?email=${email}`)
    },

    isAuthCookiePresent: () => {
        return document.cookie.split(';').some(c => c.trim().startsWith('is_auth='));
    },

    isSessionValid: async () => {
        return await requests.get<AuthResponse>(`/auth/validate-session`)
    },

    setNewPassword: async (email: string, newPassword: string, code: string) => {
        return await requests.post<AuthResponse>(`/auth/reset-password`, {
            email: email,
            password: newPassword,
            code: code
        })
    },

    verifyCode: async (email: string, code: string, type: string) => {
        return await requests.post<AuthResponse>(`/auth/verify-code`, {
            email: email,
            code: code,
            type: type
        })
    }
}