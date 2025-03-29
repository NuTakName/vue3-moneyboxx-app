const fiatCurrencies = [
    {name: "Рубль", code: "RUB", symbol: "₽"},
    {name: "Доллар", code: "USD", symbol: "$"},
    {name: "Евро", code: "EUR", symbol: "€"},
    {name: "Иена", code: "JPY", symbol: "¥"},
    {name: "Фунт стерлингов", code: "GBP", symbol: "£"},
    {name: "Австралийский доллар", code: "AUD", symbol: "A$"},
    {name: "Канадский доллар", code: "CAD", symbol: "C$"},
    {name: "Франк", code: "CHF", symbol: "₣"},
    {name: "Юань", code: "CNY", symbol: "¥"},
    {name: "Шведская крона", code: "SEK", symbol: "kr"}
]

const cryptoCurrencies = [
    {name: "Bitcoin", code: "BTC", symbol: "₿"},
    {name: "Ethereum", code: "ЕТН"},
    {name: "Tether USD", code: "USDT", symbol: "₮"},
    {name: "USD Coin", code: "USDC"},
    {name: "Ripple", code: "XRP"},
    {name: "The Open Network", code: "TON"},
    {name: "Solana", code: "SOL"},
    {name: "TRON", code: "TRX"},
    {name: "Polkadot", code: "DOT"},
    {name: "Cardano", code: "ADA"}
]


const expenseСategories = [
    "Гаджеты",
    "Питомцы",
    "Спорт",
    "Жилье",
    "Транспорт",
    "Питание",
    "Здоровье",
    "Образование",
    "Развлечения",
    "Гигиена и уход",
    "Одежда",
    "Связь",
    "Подарки",
    "Финансы",
    "Другое"
]

const incomeСategories = [
    "Образование",
    "Зарплата",
    "Бизнес",
    "Фриланс",
    "Инвестиции",
    "Пожертвования",
    "Подарки",
    "Социальные выплаты",
    "Аренда",
    "Роялти",
    "Другое"
]

const formatValue = (value, symbol, code) => {
    let totalValue;
    const numericValue = parseFloat(value) || 0;
    if (numericValue > 1e12 || numericValue < -1e12) {
      totalValue = "> " + (numericValue / 1e12).toFixed(0) + " трлн"; 
    }
    else if (numericValue == 1e12 || numericValue == -1e12) {
      totalValue = (numericValue / 1e12).toFixed(0) + " трлн"; 
    }
    else if (numericValue >= 1e9 || numericValue <= -1e9) {
      totalValue = (numericValue / 1e9).toFixed(2) + " млрд";
    } else if (numericValue >= 1e6 || numericValue <= -1e6) {
      totalValue = (numericValue / 1e6).toFixed(2) + " млн";
    } else {
      totalValue = numericValue.toLocaleString("ru-RU")
    }
    if (symbol) {
      if (symbol == '$') {
        totalValue = symbol + totalValue
      } else {
        totalValue = totalValue + " " + symbol
      }
    } else {
      totalValue = totalValue + " " + code
    }
    return totalValue;
  }



export {fiatCurrencies, cryptoCurrencies, incomeСategories, expenseСategories, formatValue}