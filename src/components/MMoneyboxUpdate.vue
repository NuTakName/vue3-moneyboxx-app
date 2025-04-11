<script setup>
import { ref, computed } from 'vue';
import { router } from '@/router';
import { useStore } from 'vuex';
import MMainButton from './MMainButton.vue';
import { updateMoneyboxCurrentBalance } from '@/api/moneybox';

const store = useStore();
const user = computed(() => store.state.user)
const moneybox = computed(() => store.state.moneybox)
const buttonName = 'Внести'

const amount = ref(0)
const emit = defineEmits(['close'])

const closeForm = () => {
    emit('close')
}


const updateMoneyboxAmount = async () => {
    if (amount.value === 0) {
        return;
    }

    let data = {
        id: moneybox.value.id,
        amount: amount.value
    };

    let newMoneybox;
    const targetBalance = moneybox.value.goal_balance;
    const newBalance = moneybox.value.current_balance + amount.value;

    if (newBalance > targetBalance) {
        const differency = Math.abs(newBalance - targetBalance);
        const message = `Вы превышаете объем копилки на ${differency} ${moneybox.value.currency.code}. Уверены, что хотите продолжить?`;

        if (user.value.id !== 2) {
            const params = {
                message: message,
                buttons: [
                    { id: 'cancel', text: 'Нет' },
                    { id: 'confirm', text: 'Да' }
                ]
            };

            const buttonId = await new Promise((resolve) => {
                window.Telegram.WebApp.showPopup(params, resolve);
            });

            if (buttonId !== "confirm") {
                return;
            }
        }
    }
    if (newBalance >= targetBalance) {
        data.is_finished = true;
    }
    newMoneybox = await updateMoneyboxCurrentBalance(data);
    store.dispatch("UPDATE_MONEYBOX_CURRENT_BALANCE", newMoneybox.current_balance);
    closeForm();
};

</script>

<template>
    <div class="m-moneybox-update-container" @click="closeForm">
        <form class="m-moneybox-update-form" @submit.prevent="updateMoneyboxAmount">
            <div class="m-moneybox-update-form-text">Введите сумму</div>
            <input 
                type="number" 
                required 
                v-model="amount" 
                @click.stop
                >
        </form>
        <m-main-button 
            :name="buttonName" 
            @click.stop="updateMoneyboxAmount">
        </m-main-button>
    </div>
</template>

<style scoped>

.m-moneybox-update-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.m-moneybox-update-form{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 89vh;
}

.m-moneybox-update-form-text{
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
}


</style>
