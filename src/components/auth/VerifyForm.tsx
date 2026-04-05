import { useEffect } from "react";
import type { AuthView, VerificationCodeType } from "../../pages/Auth";
import { authService } from "../../services/authService";
import "./Auth.css"

interface VerifyProps {
    code: string;
    setCode: (code: string) => void;
    email: string;
    onChangeView: (view: AuthView) => void;
    type: VerificationCodeType
}

export default function VerifyForm({code, setCode, email, onChangeView, type}: VerifyProps) {
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        console.log("Weryfikacja...", { email, code });
        
        const res = await authService.verifyCode(email, code, type)

        if (res.status === 200){
            onChangeView('NEW_PASSWORD')
        }
    };

    useEffect(() => {setCode("")}, [])
    
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Wprowadź kod</h2>
            <p>Wysłaliśmy kod weryfikacyjny na: <strong>{email}</strong></p>
            <input 
                type="text" 
                placeholder="Kod z e-maila" 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                required 
            />
            <button type="submit">Potwierdź kod</button>
            
            <p className="toggle-text">
                <span onClick={() => onChangeView('LOGIN')}>Wróć do logowania</span>
            </p>
        </form>
    );
}