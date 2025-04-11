import API_BASE_URL from "@/config";

const getMoneybox = async(moneyboxId) => {
    const response = await fetch(`${API_BASE_URL}/moneybox/${moneyboxId}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'MyCustomUserAgent/1.0'
        }
    })
    if (response.ok) {
        return await response.json()
    } else {
        return null
    }
}


const addMoneybox = async(moneybox) => {
    const response = await fetch(`${API_BASE_URL}/moneybox/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'MyCustomUserAgent/1.0'
        },
        body: JSON.stringify(moneybox)
    });
     if (response.ok) {
        return await response.json()
     } else {
        console.error("Не удалось добавить операцию")
     }
    }


const updateMoneyboxCurrentBalance = async(data) => {
    const response = await fetch(`${API_BASE_URL}/moneybox/update_current_balance`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'MyCustomUserAgent/1.0'
        },
        body: JSON.stringify(data)
    });
        if (response.ok) {
        return await response.json()
        } else {
        console.error("Не удалось обновить баланс копилки")
        }
    }


export {getMoneybox, addMoneybox, updateMoneyboxCurrentBalance}