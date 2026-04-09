import { requests } from "../api/requests";

export const testService = {
    ping: async () => {
        return await requests.get<string>("/user")
    }
}