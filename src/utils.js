
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


const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
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



  const formatDate = (dateString, weekday) => {
    const options = {
      ...(weekday ? { weekday: 'short' } : {}),
      day: 'numeric',
      month: 'long'
    };
    
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', options);
  };
  
const formatTime = (dateString) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  };
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', options);
  }

const closeBackButton = () => {
  const backButton = window.Telegram.WebApp.BackButton;
  backButton.hide()
}


const getRegistrationDate = (dateString) => {
  const options = { 
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('ru-RU', options);
  const [day, month, year] = formattedDate.split(' ');
  return `${day} ${month} ${year}`;
};


const formatDateToISO = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}


const format = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export {
  fiatCurrencies,
  cryptoCurrencies, 
  incomeСategories, 
  expenseСategories, 
  formatValue, 
  formatDate, 
  formatTime,
  months,
  closeBackButton,
  getRegistrationDate,
  formatDateToISO,
  format
}