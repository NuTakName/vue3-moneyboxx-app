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


export {addOperation}