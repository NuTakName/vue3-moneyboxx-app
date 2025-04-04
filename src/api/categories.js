import API_BASE_URL from "@/config";



const getOrAddCategory = async(category) => {
    const response = await fetch(`${API_BASE_URL}/categories/${category.user_id}/${category.type_}/${category.name}`)
    if (response.ok) {
        return await response.json()
    } else {
        const cat = await fetch(`${API_BASE_URL}/categories/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category)
        });
        if (cat.ok) {
            return cat.json()
        } else {
            console.log("Не удалось добавить категорию")
        }
    }
}


export {getOrAddCategory}