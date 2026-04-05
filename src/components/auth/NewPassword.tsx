import type React from "react"
import { authService } from "../../services/authService";
import { useState } from "react";
import type { AuthView } from "../../pages/Auth";

interface NewPasswordProps {
    code: string;
    email: string;
    onChangeView: (view: AuthView) => void;
}

export default function NewPasswordForm({code, email, onChangeView}: NewPasswordProps) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Hasła nie są identyczne.");
            return;
        }

        if (password.length < 6) {
            setError("Hasło musi mieć co najmniej 6 znaków.");
            return;
        }

        setIsLoading(true);

        try {
            // Wysyłamy email, nowe hasło i kod, który dostaliśmy z poprzedniego kroku
            const res = await authService.setNewPassword(email, password, code);
            
            if (res.status === 200) {
                alert("Hasło zostało zmienione pomyślnie!");
                onChangeView('LOGIN'); // Przekierowanie do logowania
            }
        } catch (err) {
            console.error(err);
            setError("Nie udało się zmienić hasła. Kod mógł wygasnąć.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Ustaw nowe hasło</h2>
            <p className="toggle-text" style={{ marginBottom: '1rem' }}>
                Wprowadź nowe hasło dla konta <strong>{email}</strong>
            </p>

            {error && (
                <div className="error-message" style={{ color: "red", marginBottom: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
                    {error}
                </div>
            )}

            <input 
                type="password" 
                placeholder="Nowe hasło" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                disabled={isLoading}
            />

            <input 
                type="password" 
                placeholder="Powtórz nowe hasło" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                required 
                disabled={isLoading}
            />

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Zapisywanie..." : "Zatwierdź nowe hasło"}
            </button>

            <p className="toggle-text">
                <span onClick={() => onChangeView('LOGIN')}>Anuluj i wróć</span>
            </p>
        </form>
    );
}
