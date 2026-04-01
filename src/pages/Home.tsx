import { testService } from "../services/api/testService";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => testService.ping()}>Ping Server</button>
        </div>
    )
}