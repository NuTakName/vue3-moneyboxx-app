import API_BASE_URL from "@/config";
import axios from "axios";


const addOperation = async(operation) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/operations/`, operation);
        return response.data
    } catch {
        console.error("Не удалось добавить операцию")
    }
    }


const getOperations = async(currentBudget) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/operations/list/${currentBudget}`)
        return response.data
    } catch {
        console.error("Не удалось получить список операций")
    }
}

export {addOperation, getOperations}