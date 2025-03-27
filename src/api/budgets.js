import API_BASE_URL from "@/config";
import axios from "axios";


const addBudget = async(budget) => {
    try {
        const buget = await axios.post(`${API_BASE_URL}/budgets/`, budget);
        return buget.data
    } catch {
        console.error("Не удалось добавить бюджет")
    }
    }


export {addBudget}