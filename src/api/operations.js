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


const getOperations = async(currentBudget, currentMonth) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/operations/list/${currentBudget}/${currentMonth}`)
        return response.data
    } catch {
        console.error("Не удалось получить список операций")
    }
}


const getOperationsByCategoryId = async(categoryId, month) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/operations/list_by_category_id/${categoryId}/${month}`)
        return response.data
    } catch {
        console.error("Не удалось получить список операций")
    }
}


const getOperationsByType = async (type_, month) => {
    console.log(type_);
    try {
        const response = await axios.get(`${API_BASE_URL}/operations/list_by_type/${type_}/${month}`);
        return response.data;
    } catch (error) {
        console.error("Не удалось получить список операций");
    }
}

const deleteOperation = async(operationId) => {
    try{
        await axios.delete(`${API_BASE_URL}/operations/${operationId}`)
    } catch {
        console.error("Не удалось удалить операцию")
    }
}


const updateOperation = async(operation) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/operations/`, operation);
        return response.data
    } catch {
        console.error("Не удалось обновить операцию")
    }
    }



export {addOperation, getOperations, getOperationsByCategoryId, deleteOperation, updateOperation, getOperationsByType}