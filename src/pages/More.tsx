import { authService } from "../services/authService"

export default function More() {
    const handleLogout = async () => {
        await authService.logout()

        window.location.reload()
    }

    return (
        <div className="more">
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}