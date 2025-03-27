import API_BASE_URL from "@/config";
import axios from "axios";



const getOrAddCurrency = async(currency) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/currency/${currency.name}`)
        return response.data
    } catch {
        try {
            const addResponse = await axios.post(`${API_BASE_URL}/currency/`, currency);
            return addResponse.data
        } catch {
            console.error("Не удалось добавить валюту")
        }
    }
}


export {getOrAddCurrency}