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



export {getUser}