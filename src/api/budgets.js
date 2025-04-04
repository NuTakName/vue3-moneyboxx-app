import API_BASE_URL from "@/config";



const addBudget = async(budget) => {
    const response = await fetch(`${API_BASE_URL}/budgets/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'User-Agent': 'MyCustomUserAgent/1.0'
            },
            body: JSON.stringify(budget)
        });
        if (response.ok) {
            return await response.json()
        } else {
            console.error("Не удалось добавить бюджет")
        }
    }


const getBudgets = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/budgets/list/${userId}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'MyCustomUserAgent/1.0'
        },
    });
    if (response.ok) {
        return await response.json()
    } else {
        console.error("Не удалось получить список бюджетов")
    }
}

const deleteBudget = async (budgetId) => {
    const response = await fetch(`${API_BASE_URL}/budgets/${budgetId}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'MyCustomUserAgent/1.0'
        },
        method: "DELETE"
    })
    if (!response.ok) {
        console.error("Не удалось удалить бюджет")
    }
 }


export {addBudget, getBudgets, deleteBudget}