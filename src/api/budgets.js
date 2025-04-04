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


const getBudgets = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/budgets/list/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Не удалось получить список бюджета");
    }
    }

const deleteBudget = async (budgetId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/budgets/${budgetId}`);
        return response.data;
    } catch (error) {
        console.error("Не удалось удалить бюджет");
    }
    }


export {addBudget, getBudgets, deleteBudget}