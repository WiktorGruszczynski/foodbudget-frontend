import { useState } from "react";
import { authService } from "../services/api/authService";

export default function Auth(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    
    return (
    <section>
        <h3>Logowanie</h3>
        <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}/>
        <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} value={password}/>
        <button onClick={() => authService.register(email, password)}>Register</button>
        <button onClick={() => authService.login(email, password)}>Login</button>

        <label htmlFor="">Register code</label>
        <input type='text' onChange={e => setCode(e.target.value)} value={code}></input>
        <button onClick={() => authService.verify_register(code)}>Verify register</button>
      </section>
    )
}