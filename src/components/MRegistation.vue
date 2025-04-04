<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MMainButton from './MMainButton.vue';
import MDropdownSelector from './MDropdownSelector.vue';
import { fiatCurrencies, cryptoCurrencies } from '@/utils';
import { getOrAddCurrency } from '@/api/currency';
import { addBudget } from '@/api/budgets';
import { addUser, setCurrentBudget } from '@/api/user';

const store = useStore();
const tgUser = computed(() => store.state.tgUser);



const isDropDownVisible = ref(false)

const toogleDropDownVisible = () => {
    isDropDownVisible.value = !isDropDownVisible.value
}

const currency = ref("fiat");
const budgetName = ref()
const currencyData = ref()

const props = defineProps({
    data: {
        type: String,
        required: false
    }
})

const emit = defineEmits(["close"])

const closeRegistartion = () => {
    emit("close")
}


const buttonName = ref(props.data ? "Добавить" : "Создать аккаунт")

const currentCurrency = computed(() => {
    if (!currencyData.value) {
        return currency.value === "fiat" ? fiatCurrencies[0] : cryptoCurrencies[0];
    } else {
        return currencyData.value
    }
});

const setCurrencyData = (currency) => {
    currencyData.value = currency
}


const getCurrency = async() => {
    let cur = {
        "name": currentCurrency.value.name,
        "code": currentCurrency.value.code,
        "symbol": currentCurrency.value.symbol,
        "type_": currency.value
    }
    let curEntity = await getOrAddCurrency(cur)
    return curEntity
}

const getUser = async() => {
    let u = {
        "id": tgUser.value.id,
        "name": tgUser.value.name,
        "current_moneybox": null,
        "current_budget": null
        }
    await addUser(u)
}

const getBudget = async(curEntity) => {
    let budget = {
        "name": budgetName.value,
        "user_id": tgUser.value.id,
        "currency_id": curEntity.id
        }
    let budgetEntity = await addBudget(budget)
    return budgetEntity
}

const updateCurrentBudget = async(budgetEntity) => {
    let data = {
        "user_id": tgUser.value.id,
        "current_budget": budgetEntity.id
    }
    let newUser = await setCurrentBudget(data) 
    store.dispatch("SET_USER", newUser)
}



const initUser = async() => {
    if (!budgetName.value) {
        return;
    }
    if (props.data){
        let curEntity = await getCurrency()
        await getBudget(curEntity)
        closeRegistartion()
        return
    }
    let curEntity = await getCurrency()
    await getUser()
    let budgetEntity = await getBudget(curEntity)
    await updateCurrentBudget(budgetEntity)
}


</script>

<template>
  <div class="m-registration-container" @click="closeRegistartion">
    <header>
        <h2  v-if="!props.data">Добро пожаловать, {{ tgUser.name }}!</h2>
    </header>
    <section>
      <p>Заполните информацию о бюджете</p>
      <form @submit.prevent="initUser">
        <input 
            type="text"
            class="m-registration-budget-title"
            placeholder="Название"
            required
            v-model="budgetName"
            @click.stop 
            >
        <div class="m-registration-radio">
            <input 
                type="radio" 
                value="fiat"
                id="fiat" 
                v-model="currency"
                @click.stop 
                >Фиат
            <input 
                type="radio" 
                value="crypto"
                id="crypto" 
                v-model="currency" 
                @click.stop
                >Криптовалюта
        </div>
        <div 
            class="m-registration-currency"
            @click="toogleDropDownVisible"
            @click.stop
            >{{ currentCurrency.name }}: {{ currentCurrency.code }}
        </div>
        <MMainButton :name="buttonName" @click.stop></MMainButton>
      </form>
    </section>
  </div>
  <m-dropdown-selector
    v-if="isDropDownVisible" 
    :data="currency"
    @close="toogleDropDownVisible"
    @data="setCurrencyData"
    >
  </m-dropdown-selector>
</template>

<style scoped>


.m-registration-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

h2{
    color: white;
    font-weight: 500;
}

.m-registration-budget-title{
    width: 100%;
    height: 5vh;
    border-radius: 12px;
    border: none;
    outline: none;
    color: black;
}

.m-registration-radio{
    display: flex;
    justify-content: space-between;
    margin: 15px 0px 15px 0px;
    color: white;
    font-weight: 500;
    font-size: 14px;
}

.m-registration-currency{
    text-align: center;
    color: black;
    background-color: white;
    padding: 10px;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
}

p{
    margin: 15px 0px 15px 0px;
    color: white;
    font-size: 16px;
    font-weight: 400;
}

</style>
