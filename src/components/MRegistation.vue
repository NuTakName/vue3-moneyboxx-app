<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MMainButton from './MMainButton.vue';
import MCurrency from './MCurrency.vue';
import { fiatCurrencies, cryptoCurrencies } from '@/utils';

const store = useStore();
const tgUser = computed(() => store.state.tgUser);

const buttonName = "Создать аккаунт"

const isMCurrencyVisible = ref(false)

const toogleIsCurrencyVisible = () => {
    isMCurrencyVisible.value = !isMCurrencyVisible.value
}

const currency = ref("fiat");
const currencyData = ref()

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


</script>

<template>
  <div class="m-registration-container">
    <header>
        <h2>Добро пожаловать, {{ tgUser.name }}!</h2>
    </header>
    <section>
      <p>Заполните информацию о бюджете</p>
      <form>
        <input 
            type="text"
            class="m-registration-budget-title"
            placeholder="Название"
            required>
        <div class="m-registration-radio">
            <input 
                type="radio" 
                value="fiat"
                id="fiat" 
                v-model="currency" 
                >Фиат
            <input 
                type="radio" 
                value="crypto"
                id="crypto" 
                v-model="currency" 
                >Криптовалюта
        </div>
        <div 
            class="m-registration-currency"
            @click="toogleIsCurrencyVisible"
            >{{ currentCurrency.name }}: {{ currentCurrency.code }}
        </div>
      </form>
    </section>
    <MMainButton :name="buttonName"></MMainButton>
  </div>
  <MCurrency 
    v-if="isMCurrencyVisible" 
    :currency="currency"
    @close="toogleIsCurrencyVisible"
    @currency="setCurrencyData"
    >
  </MCurrency>
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
