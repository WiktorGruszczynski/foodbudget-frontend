import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import VerifyForm from "../components/auth/VerifyForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import NewPasswordForm from "../components/auth/NewPassword";

export type AuthView = 'LOGIN' | 'REGISTER' | 'VERIFY' | 'FORGOT_PASSWORD' |  'NEW_PASSWORD';
export type VerificationCodeType = 'PASSWORD_RESET' | 'EMAIL_VERIFICATION';

export default function Auth() {
    const [view, setView] = useState<AuthView>('LOGIN');
    
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [codeType, setCodeType] = useState<VerificationCodeType>('PASSWORD_RESET')

    return (
        <div className="auth-container">
            {view === 'LOGIN' && (
                <LoginForm 
                    email={email} 
                    setEmail={setEmail} 
                    onChangeView={setView} 
                />
            )}

            {view === 'REGISTER' && (
                <RegisterForm 
                    email={email} 
                    setCodeType={setCodeType}
                    setEmail={setEmail} 
                    onChangeView={setView} 
                />
            )}

            {view === 'FORGOT_PASSWORD' && (
              <ForgotPasswordForm
                email={email}
                setEmail={setEmail}
                setCodeType={setCodeType}
                onChangeView={setView}
              />
            )}

            {view === 'NEW_PASSWORD' && (
                <NewPasswordForm
                code={code}
                email={email}
                onChangeView={setView}
                />
            )}

            {view === 'VERIFY' && (
                <VerifyForm 
                    code={code}
                    setCode={setCode}
                    email={email} 
                    onChangeView={setView} 
                    type={codeType}
                />
            )}

        </div>
    );
}