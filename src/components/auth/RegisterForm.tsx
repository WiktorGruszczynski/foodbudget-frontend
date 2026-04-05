import React, { useEffect, useState } from "react"
import { authService } from "../../services/authService";
import type { AuthView, VerificationCodeType } from "../../pages/Auth";
import "./Auth.css"

interface RegisterProps {
    email: string;
    setEmail: (email: string) => void;
    setCodeType: (code: VerificationCodeType) => void;
    onChangeView: (view: AuthView) => void;
}

export default function RegisterForm({ email, setEmail, setCodeType, onChangeView }: RegisterProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Poprawiony typ zdarzenia na React.FormEvent
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent page reload on submit
        e.preventDefault();

        setError("");

        // Dodane return, aby nie wysyłać zapytania, gdy walidacja obleje
        if (password !== confirmPassword) {
            setError("Passwords mismatch");
            return; 
        }

        if (password.length < 6) {
            setError("Password too short");
            return; 
        }

        setIsLoading(true);

        try {
            const response = await authService.register(email, password);

            if (response.status === 201) {
                setCodeType('EMAIL_VERIFICATION');
                onChangeView('VERIFY');
            }
        } catch (err) {
            console.log(err);
            setError("error");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {setEmail("")}, [])

    return (
        // Poprawiony zapis onSubmit
        <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="error-message" style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}
            
            <h2 onClick={() => {onChangeView('VERIFY');}}>Zarejestruj się</h2>

            <div className="form-group">
                <input 
                    type="email" 
                    id="email"
                    placeholder="E-mail"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>

            <div className="form-group">
                <input 
                    type="password" 
                    id="password"
                    placeholder="Hasło"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>

            <div className="form-group">
                <input 
                    type="password" 
                    id="confirmPassword"
                    placeholder="Potwierdź hasło"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
            </div>

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Tworzenie konta..." : "Zarejestruj"}
            </button>

            {/* DODANY TEKST POWROTU DO LOGOWANIA */}
            <p className="toggle-text">
                Masz już konto? <span onClick={() => onChangeView('LOGIN')}>Zaloguj się</span>
            </p>
        </form>
    );
}