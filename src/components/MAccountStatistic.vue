<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { months } from '@/utils';
import { router } from '@/router';
import { getStatistic, getStatisticForPeriod, getAllOperations } from '@/api/operations';
import { formatValue } from '@/utils';
import MStatisticDataChart from './MStatisticDataChart.vue';
import MDropdownSelector from './MDropdownSelector.vue';


const store = useStore();
const user = computed(() => store.state.user);
const tgUser = computed(() => store.state.tgUser);
const month = ref();
const indexMonth = ref()
const year = ref(new Date().getFullYear());
const totaAmountIncome = ref();
const totalAmountExpense = ref();
const countMoneybox = ref(0);
const typePeriod = ref("month");
const amountIncome = ref(0);
const amountExpense = ref(0);
const incomeOperations = ref([]);
const expenseOperations = ref([]);
const incomeValues = ref([]);
const expenseValues = ref([]);
const currencySymbol = ref();
const currencyCode = ref();
const isDropDownSelectorVisible = ref(false);
const data = ref();


const reset = () => {
    incomeOperations.value = [];
    expenseOperations.value = [];
    amountIncome.value = 0;
    amountExpense.value = 0;
    incomeValues.value = [];
    expenseValues.value = [];
};


const closeDropDownSelector = async() => {
    isDropDownSelectorVisible.value = false;
}; 

const openDropDownSelector = async(type_) => {
    await getListAvailableDates(type_);
    if (data.value.length > 0) {
        isDropDownSelectorVisible.value = true;
    } else {
        const text = type_ == "month"? "месяцев": "годов";
        if (user.value.id == 2) {
            confirm(`Нет данных для других ${text}`)
        } else {
            const params = {
                message: `Нет данных для других ${text}`,
                buttons: [{ id: 'Ok', text: 'Ок' }]
            };
            await new Promise((resolve) => {
                window.Telegram.WebApp.showPopup(params, resolve);
            });
        }
    }
};



const getListAvailableDates = async (type_) => {
    const operations = await getAllOperations(user.value.id);
    const uniqueYears = new Set();
    const uniqueMonths = new Set();
    for (const operation of operations) {
        const operationDate = new Date(operation.date);
        const operationYear = operationDate.getFullYear();
        const operationMonth = operationDate.getMonth();
        if (operationYear !== year.value){
            uniqueYears.add(operationYear);
        }
        if (operationYear === year.value && operationMonth + 1 !== indexMonth.value) {
            uniqueMonths.add(months[operationMonth]);
        }
    }
    const yearsArray = Array.from(uniqueYears);
    const monthsArray = Array.from(uniqueMonths);
    data.value = type_ == 'month'? monthsArray: yearsArray;
}

// TODO OPTIMIZE!!!
const getOperationsForStatistic = async (newTypePeriod) => {
    reset();
    let incomeCounter = 0;
    let expenseCounter = 0;
    let percent;
    const data = {
        "user_id": user.value.id,
        "month": indexMonth.value,
        "year": year.value
    };
    const operations = await getStatisticForPeriod(data);
    
    if (operations.length > 0) {
        const firstOperationDate = new Date(operations[0].date);
        month.value = months[firstOperationDate.getMonth()];
        indexMonth.value = firstOperationDate.getMonth() + 1;
        currencySymbol.value = operations[0].currency.symbol;
        currencyCode.value = operations[0].currency.code;
    }
    
    for (const operation of operations) {
        const operationMonth = new Date(operation.date).getMonth() + 1;
        if (!newTypePeriod) {
            if (operation.type_ === 'income' && operationMonth === indexMonth.value) {
                incomeOperations.value.push(operation);
                if (incomeCounter <= 2) {
                    amountIncome.value += operation.value;
                    percent = (operation.value / amountIncome.value) * 100;
                    incomeValues.value.push(percent);
                }
                incomeCounter++;
            } else if (operation.type_ === 'expense' && operationMonth === indexMonth.value) {
                expenseOperations.value.push(operation);
                if (expenseCounter <= 2) {
                    amountExpense.value += operation.value;
                    percent = (operation.value / amountExpense.value) * 100;
                    expenseValues.value.push(percent);
                }
                expenseCounter++;
            }
        } else {
            if (operation.type_ === 'income') {
                incomeOperations.value.push(operation);
                if (incomeCounter <= 2) {
                    amountIncome.value += operation.value;
                    percent = (operation.value / amountIncome.value) * 100;
                    incomeValues.value.push(percent);
                }
                incomeCounter++;
            } else if (operation.type_ === 'expense') {
                expenseOperations.value.push(operation);
                if (expenseCounter <= 2) {
                    amountExpense.value += operation.value;
                    percent = (operation.value / amountExpense.value) * 100;
                    expenseValues.value.push(percent);
                }
                expenseCounter++;
            }
        }
    }
    store.dispatch("SET_INCOME_AND_EXPENSE_OPERATIONS", incomeOperations.value, expenseOperations.value);
    return operations;
};



const handleSelectedDate = async(date) => {
    typePeriod.value = 'month'
    if (date > 11) {
        year.value = date;
        indexMonth.value = null;
    } else {
        indexMonth.value = date + 1;
        month.value = months[date];
    };
    await getOperationsForStatistic();
    isDropDownSelectorVisible.value = false;
}


const getSstatisticForPeriod = (type_) => {
    if (type_ == "year") {
        indexMonth.value = null;
        getOperationsForStatistic(type_);
    } else {
        getOperationsForStatistic();
    };
}



const getDataStatistic = async() => {
    const statistic = await getStatistic(user.value.id)
    if (statistic) {
        totaAmountIncome.value = formatValue(statistic.total_amount_income, statistic.currency.symbol, statistic.currency.code)
        totalAmountExpense.value = formatValue(statistic.total_amount_expense, statistic.currency.symbol, statistic.currency.code)
        countMoneybox.value = statistic.count_moneybox
    } else {
        totaAmountIncome.value = 0
        totalAmountExpense.value = 0 
    }
}



const getPercent = (operation) => {
    let percent = 0;
    const total = operation.type_ === 'income' ? amountIncome.value : amountExpense.value;
    percent = (operation.value / total) * 100;
    return percent.toFixed(1);
}


getDataStatistic()
getOperationsForStatistic()



</script>

<template>
    <div :class="['m-account-statistic-container', {'m-account-statistic-container-dark': tgUser.theme == 'dark'} ]">
        <div class="m-account-statistic-date">
            <div class="m-account-statistic-date-item" @click="openDropDownSelector('month')"> {{ month }}</div>
            <div class="m-account-statistic-date-item" @click="openDropDownSelector('year')">{{ year }}</div>
        </div>
        <div class="m-account-statistic-radio-btns">
            Месяц <input 
                    type="radio"
                    class="m-account-statistic-radio-btn"
                    required
                    value="month"
                    v-model="typePeriod"
                    @click="getSstatisticForPeriod('month')">
            Год <input 
                    type="radio"
                    class="m-account-statistic-radio-btn"
                    required
                    value="year"
                    v-model="typePeriod"
                    @click="getSstatisticForPeriod('year')"
                    >
        </div>
        <div class="m-account-statistic-data">
            <div>Всего доходов: {{ totaAmountIncome }}</div>
            <div>Всего расходов: {{ totalAmountExpense }}</div>
            <div>Копилок собрано: {{ countMoneybox }}</div>
        </div>
        <div 
            :class="['m-account-statistic-total-value', 'income']" 
            @click="router.push('/all_statistic/income')">
            <m-statistic-data-chart 
                :values="incomeValues" 
                width="80px" 
                height="80px">
            </m-statistic-data-chart>
            <div class="m-account-statistic-total-value-data">
                <div class="m-account-statistic-total-value-data-title">Доходов: {{ formatValue(amountIncome, currencySymbol, currencyCode) }}</div>
                <div v-for="operation in incomeOperations.slice(0, 3)">
                    {{ operation.category_name }} 
                    ({{ formatValue(operation.value, operation.currency.symbol, operation.currency.code) }},
                     {{ getPercent(operation) }}%)
                </div>
                <div 
                    v-if="incomeOperations.length> 3"
                    class="m-account-statistic-total-value-data-more">
                    Другие (еще {{ incomeOperations.length - 3 }})
                </div>
            </div>
        </div>
        <div 
            :class="['m-account-statistic-total-value', 'expense']" 
            @click="router.push('/all_statistic/expense')">
            <m-statistic-data-chart 
                :values="expenseValues" 
                width="80px" 
                height="80px">
            </m-statistic-data-chart>
            <div class="m-account-statistic-total-value-data">
                <div class="m-account-statistic-total-value-data-title">Расходов: {{ formatValue(amountExpense, currencySymbol, currencyCode) }}</div>
                <div v-for="operation in expenseOperations.slice(0, 3)">
                    {{ operation.category_name }}
                    ({{ formatValue(operation.value, operation.currency.symbol, operation.currency.code) }},
                     {{ getPercent(operation) }}%)
                </div>
            </div>
        </div>
    </div>
    <m-dropdown-selector 
        v-if="isDropDownSelectorVisible" 
        :data="data"
        @close="closeDropDownSelector"
        @data="handleSelectedDate">
    </m-dropdown-selector>


</template>
  


<style>

.m-account-statistic-container{
    height: 83vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: black;
}

.m-account-statistic-container-dark{
    color: white;
}

.m-account-statistic-date{
    width: 35%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.m-account-statistic-date-item{
    cursor: pointer;
}


.m-account-statistic-radio-btns{
    width: 50%;
    margin-top: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.m-account-statistic-radio-btn{
    cursor: pointer;
}

.m-account-statistic-data{
    width: 50%;
    margin-top: 8vh;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.m-account-statistic-total-value{
    width: 100%;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.m-account-statistic-total-value.income{
    margin-top: 10vh;
    margin-bottom: 6vh;
}

.m-account-statistic-total-value-data{
    margin-left: 5vh;
    width: 50%;
}


.m-account-statistic-total-value-data-title{
    font-size: 16px;
    font-weight: 600;
}

.m-account-statistic-total-value-data-more{
    cursor: pointer;
}
</style>
