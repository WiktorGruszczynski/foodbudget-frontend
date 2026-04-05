import { useEffect, useState } from "react";
import type { AuthView } from "../../pages/Auth";
import "./Auth.css"
import { authService } from "../../services/authService";

interface LoginProps {
    email: string;
    setEmail: (email: string) => void;
    onChangeView: (view: AuthView) => void;
}

export default function LoginForm({ email, setEmail, onChangeView }: LoginProps) {
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Logowanie...", { email, password });
        
        const response = await authService.login(email, password)

        if (response.status === 200) {
            window.location.reload()
        }
    };

    useEffect(() => {setEmail("")}, [])

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Zaloguj się</h2>
            <input 
                type="email" 
                placeholder="E-mail" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Hasło" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
            />
            
            <p className="forgot-password" onClick={() => onChangeView('FORGOT_PASSWORD')}>
                Zapomniałeś hasła?
            </p>

            <button type="submit">Zaloguj</button>
            
            <p className="toggle-text">
                Nie masz konta? <span onClick={() => onChangeView('REGISTER')}>Zarejestruj się</span>
            </p>
        </form>
    );
}