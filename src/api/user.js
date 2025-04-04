import API_BASE_URL from "@/config";


const getUser = async(userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (response.ok) {
        return await response.json()
    } else {
        console.error("Пользователь не найден")
    }
}


const addUser = async(u) => {
    const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(u)
    });
    if (response.ok) {
        return await response.json()
    }
}

const setCurrentBudget = async(data) => {
    const response = await fetch(`${API_BASE_URL}/users/set_current_budget`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        return await response.json()
    } else {
        console.log("Не удалось установить текущий бюджет")
    }
}



export {getUser, addUser, setCurrentBudget}