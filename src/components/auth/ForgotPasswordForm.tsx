import { useState } from "react";
import type { AuthView, VerificationCodeType } from "../../pages/Auth";
import { authService } from "../../services/authService";

interface ForgotProps {
    email: string;
    setEmail: (email: string) => void;
    setCodeType: (code: VerificationCodeType) => void;
    onChangeView: (view: AuthView) => void;
}

export default function ForgotPasswordForm({ email, setEmail, setCodeType, onChangeView }: ForgotProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleReset = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            authService.issuePasswordReset(email);

            setIsSent(true);
        } catch (err) {
            console.error("Błąd wysyłki", err);
        } finally {
            setIsLoading(false);
            setCodeType('PASSWORD_RESET')
            onChangeView('VERIFY')
        }
    };

    return (
        <form className="auth-form" onSubmit={handleReset}>
            <h2>Resetuj hasło</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
                Wpisz swój e-mail, a wyślemy Ci kod do zresetowania hasła.
            </p>
            
            <input 
                type="email" 
                placeholder="E-mail" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
            />

            <button type="submit" disabled={isLoading || isSent}>
                {isSent ? "Kod został wysłany!" : isLoading ? "Wysyłanie..." : "Wyślij kod"}
            </button>

            <p className="toggle-text">
                <span onClick={() => onChangeView('LOGIN')}>Wróć do logowania</span>
            </p>
        </form>
    );
}