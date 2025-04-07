<script setup>
import { computed, ref } from 'vue';
import { getBudgets, deleteBudget } from '@/api/budgets'
import MMainButton from './MMainButton.vue';
import MRegistation from './MRegistation.vue';
import { useStore } from 'vuex'
import { setCurrentBudget } from '@/api/user';


const store = useStore();
const user = computed(() => store.state.user)
const tgUser = computed(() => store.state.tgUser)
const buttonName = 'Добавить'
const data = ref("Добавить")
const budgets = ref([])
const isCreateBudgetVisible = ref(false)

const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    closeDropdown()
})



const emit = defineEmits(["close", "data"])
const closeDropdown = () => {
    emit('close')
    backButton.hide()
}


const setData = async (currentBudgetId) => {
    let data = {
        "user_id": tgUser.value.id,
        "current_budget": currentBudgetId
    }
    let newUser = await setCurrentBudget(data) 
    store.dispatch("SET_USER", newUser)
    store.dispatch("REMOVE_OPERATION")
    emit('data', data)
    closeDropdown()
}

const toggleIsCreateBudgetVisible = () => {
    isCreateBudgetVisible.value = !isCreateBudgetVisible.value
}

const toogleAndUpdateListBudgets = () => {
    getList()
    toggleIsCreateBudgetVisible()
}

const deleteAndGetNewListBudgets = async(budgetId) => {
    if (user.value.id != 2) {
        const params = {
            message: 'Вы уверены, что хотите удалить бюджет?',
            buttons: [
                { id: 'cancel', text: 'Нет' },
                { id: 'confirm', text: 'Да' }
            ]};
            const buttonId = await new Promise((resolve) => {
                window.Telegram.WebApp.showPopup(params, resolve);
            });
            if (buttonId == "confirm") {
                await deleteBudget(budgetId)
            }
    } else {
        await deleteBudget(budgetId)
    }
    getList()
}

const getList = async() => {
    const result = await getBudgets(user.value.id)
    budgets.value = result
}


getList()



</script>

<template>
    <div class="m-financial-controler" @click="closeDropdown">
        <div 
            class="m-financial-controller-content" 
            v-if="budgets.length"
            v-for="(item, index) in budgets"
            :key="index">
            <button 
                @click="setData(item.id)" 
                @click.stop>
                {{ item.name }}
            </button>
            <div 
                v-if="item.id != user.current_budget"
                class="m-finanial-controller-delete"
                @click="deleteAndGetNewListBudgets(item.id)"
                @click.stop>X
            </div>
        </div>
        <m-main-button 
            :name="buttonName" 
            @click-button="toggleIsCreateBudgetVisible" 
            @click.stop>
        </m-main-button>
    </div>
    <m-registation 
        v-if="isCreateBudgetVisible"
        :data="data"
        @close="toogleAndUpdateListBudgets"
        >
    </m-registation>
</template>

<style scoped>

.m-financial-controler{
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
  color: white;
  z-index: 1000;

}

.m-financial-controller-content{
    width: 60%;
    display: flex;
}

button{
    width: 90%;
    text-align: center;
    color: black;
    background-color: var(--tg-theme-button-color);
    padding: 10px;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
}

.m-finanial-controller-delete{
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    color: red;
    cursor: pointer;
}

</style>