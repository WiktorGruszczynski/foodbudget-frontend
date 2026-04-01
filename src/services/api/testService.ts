import {API_URL} from "./config/apiConfig"

export const testService = {
    ping: async () => {
        const response = await fetch(`${API_URL}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
    });

        if (response.status == 200){
            console.log("Pong!")
        }
    }
}