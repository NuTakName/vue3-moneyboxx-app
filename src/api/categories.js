import API_BASE_URL from "@/config";
import axios from "axios";



const getOrAddCategory = async(category) => {
    try {
        const cat = await axios.get(`${API_BASE_URL}/categories/${category.user_id}/${category.type_}/${category.name}`)
        return cat.data
    } catch {
        try {
            const cat = await axios.post(`${API_BASE_URL}/categories/`, category);
            return cat.data
        } catch {
            console.error("Не удалось добавить категорию")
        }
    }
}


export {getOrAddCategory}