import { requests } from "../api/requests"
import type { Meal } from "../types/meal"
import formatDate from "./dateService"

export const mealService = {
    getUserMeals: async (date: Date) => {
        return await requests.get<Meal[]>(`/meal?date=${formatDate(date)}`)
    }
}