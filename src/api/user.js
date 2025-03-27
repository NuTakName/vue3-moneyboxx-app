import API_BASE_URL from "@/config";
import axios from "axios";


const getUser = async(userId) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data
    } catch{
        console.error("Пользователь не найден")
        return null
    }
}


const addUser = async(u) => {
    try {
        const user = await axios.post(`${API_BASE_URL}/users/`, u);
        return user.data
    } catch {
        console.error("Не удалось добавить пользователя")
    }
}

const setCurrentBudget = async(data) => {
    try {
        const user = await axios.patch(`${API_BASE_URL}/users/set_current_budget`, data)
        return user.data
    } catch {
        console.error("Не удалось установить текущий бюджет")
    }
}



export {getUser, addUser, setCurrentBudget}