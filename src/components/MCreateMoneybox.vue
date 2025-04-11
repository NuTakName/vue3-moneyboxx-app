<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import MMainButton from './MMainButton.vue';
import MDropdownSelector from './MDropdownSelector.vue';
import { getOrAddCurrency } from '@/api/currency';
import MDataPicker from './MDataPicker.vue';
import {formatDateToISO,  format} from '@/utils';
import { addMoneybox } from '@/api/moneybox';
import { setCurrentMoneybox } from '@/api/user';
import { getMoneybox } from '@/api/moneybox';


const store = useStore();
const user = computed(() => store.state.user);

const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    closeAddOperation()
})


const name = ref()
const amount = ref(0)
const currency = ref("Не выбранно")
const date = ref(new Date())
const currentCurrency = ref()
const buttonName = 'Добавить'
const isDropdownSelectorVisible = ref(false)
const isDataPickerVisible = ref(false)
const isPeriodDataVisible = ref(true)

const emit = defineEmits(["close"])

const getFormattedDateString = computed(() => {
  return date.value.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
});



const toogleIsDropdownSelectorVisible = () => {
  isDropdownSelectorVisible.value = !isDropdownSelectorVisible.value
}


const toogleDataPickerVisible = () => {
    isDataPickerVisible.value = !isDataPickerVisible.value
    isPeriodDataVisible.value = !isPeriodDataVisible.value
}

const updateDate = (newDate) => {
  date.value = newDate;
  toogleDataPickerVisible()
};

const setCurrency = (data) => {
    currentCurrency.value = data
    currency.value = `${data.name} ${data.code}`
    toogleIsDropdownSelectorVisible()
}




const createMoneybox = async() => {
    if (!currentCurrency.value || !name.value || !amount.value) {
        return
    }
    let cur = {
        "name": currentCurrency.value.name,
        "code": currentCurrency.value.code,
        "symbol": currentCurrency.value.symbol,
        "type_": "fiat"
    }
    let curEntity = await getOrAddCurrency(cur)
    let moneybox = {
        "user_id": user.value.id,
        "name": name.value,
        "currency_id": curEntity.id,
        "current_balance": 0,
        "goal_balance": amount.value,
        "goal_date": formatDateToISO(date.value)
    }
    let moneyboxEntity = await addMoneybox(moneybox)
    if (!user.value.current_moneybox) {
        let data = {
            "user_id": user.value.id,
            "current_moneybox": moneyboxEntity.id
        }
        let newUser = await setCurrentMoneybox(data)
        store.dispatch("SET_USER", newUser)
        let m = await getMoneybox(moneyboxEntity.id)
        store.dispatch("SET_CURRENT_MONEYBOX", m)
    }
    emit('close')
}

</script>



<template>
    <div class="m-create-moneybox-container">   
        <div class="m-create-moneybox">
            <form>
                <input 
                    type="text" 
                    placeholder="Название копилки" 
                    required 
                    v-model="name"
                    >
                <input 
                    type="number" 
                    placeholder="Сумма" 
                    required 
                    v-model="amount"
                    >
                <div 
                    class="m-create-moneybox-currency" 
                    @click="toogleIsDropdownSelectorVisible"
                    >
                    Валюта: {{ currency }}
                </div>
                <button 
                    v-if="isPeriodDataVisible"
                    type="button"
                    class="m-create-moneybox-date"
                    @click="toogleDataPickerVisible"
                    >Срок:
                    <span>{{ getFormattedDateString }}</span>
                </button>
                <m-data-picker
                    class="m-create-moneybox-date-picker"
                    v-if="isDataPickerVisible" 
                    locale="ru" 
                    cancelText="отменить" 
                    selectText="выбрать"
                    :enable-time-picker="false"
                    :min-date="new Date()"
                    :format="format(date)"
                    @update:model-value="updateDate">
                </m-data-picker>
            </form>
        </div>
        <m-main-button 
            :name="buttonName" 
            @click-button="createMoneybox">
        </m-main-button>
    </div>
    <m-dropdown-selector 
        v-if="isDropdownSelectorVisible" 
        :data="'fiat'"  
        @data="setCurrency">
    </m-dropdown-selector>
</template>

<style scoped>


.m-create-moneybox-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1000;
}

.m-create-moneybox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 89vh;
    width: 50%;
}

input{
    width: 100%;
    display: block;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: black;
    margin-top: 30px;
}


.m-create-moneybox-currency{
    color: black;
    background-color: var(--tg-theme-button-color);
    padding: 10px;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    height: 10vh;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1;
    margin-top: 30px;
}


.m-create-moneybox-date, .m-create-moneybox-date-picker{
  margin-top: 40px;
  height: 40px;
  width: 100%;
  color: black;
  font-size: 16px;
  font-weight: 500;
}
</style>