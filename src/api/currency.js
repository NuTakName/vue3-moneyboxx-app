import API_BASE_URL from "@/config";




const getOrAddCurrency = async(currency) => {
    const response = await fetch(`${API_BASE_URL}/currency/by_name/${currency.name}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'MyCustomUserAgent/1.0'
        },
    })
    if (response.ok) {
        return await response.json()
    } else {
        const addResponse = await fetch(`${API_BASE_URL}/currency/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
                'User-Agent': 'MyCustomUserAgent/1.0'
            },
            body: JSON.stringify(currency)
        });
        return await addResponse.json()
    }
}


export {getOrAddCurrency}