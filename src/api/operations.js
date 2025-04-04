import API_BASE_URL from "@/config";



const addOperation = async(operation) => {
    const response = await fetch(`${API_BASE_URL}/operations/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(operation)
    });
     if (response.ok) {
        return await response.json()
     } else {
        console.error("Не удалось добавить операцию")
     }
    }


const getOperations = async(currentBudget, currentMonth) => {
    const response = await fetch(`${API_BASE_URL}/operations/list/${currentBudget}/${currentMonth}`)
    if (response.ok) {
        return await response.json()
    } else {
        console.error("Не удалось получить список операций")
    }
}


const getOperationsByCategoryId = async(categoryId, month) => {
    const response = await fetch(`${API_BASE_URL}/operations/list_by_category_id/${categoryId}/${month}`)
    if (response.ok) {
        return await response.json()
    } else {
        console.error("Не удалось получить операцию")
    }
}


const getOperationsByType = async (type_, month) => {
    const response = await fetch(`${API_BASE_URL}/operations/list_by_type/${type_}/${month}`);
    if (response.ok) {
        return await response.json()
    } else {
        console.error("Не удалось получить список операций по категории")
    }
}

const deleteOperation = async(operationId) => {
    const response = await fetch(`${API_BASE_URL}/operations/${operationId}`, {
        method: "DELETE"
    })
    if (!response) {
        console.error("Не удлаось удалить операцию")
    }
}


const updateOperation = async(operation) => {
    const response = await fetch(`${API_BASE_URL}/operations/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(operation)
    });
    if (response.ok) {
        return await response.json()
    } else {
        console.error("Не удалось обновить операцию")
    }
}


const getDifference = async (currentBudgetId) => {
    const response = await fetch(`${API_BASE_URL}/operations/difference/${currentBudgetId}`);
    if (response.ok) {
        return await response.json()
    } else {
        console.error("Не удалось получить разницу операций")
    }
}


export {
    addOperation,
    getOperations, 
    getOperationsByCategoryId, 
    deleteOperation, 
    updateOperation, 
    getOperationsByType,
    getDifference
}