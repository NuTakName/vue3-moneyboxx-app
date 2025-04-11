<script setup>
import { computed, ref } from 'vue';
import { getBudgets, deleteBudget } from '@/api/budgets'
import MMainButton from './MMainButton.vue';
import MRegistation from './MRegistation.vue';
import { useStore } from 'vuex'
import { setCurrentBudget, setCurrentMoneybox } from '@/api/user';
import { getMoneyboxs, deleteMoneybox, getMoneybox } from '@/api/moneybox';
import MCreateMoneybox from './MCreateMoneybox.vue';


const store = useStore();
const user = computed(() => store.state.user)
const tgUser = computed(() => store.state.tgUser)
const buttonName = 'Добавить'
const data = ref("Добавить")
const list = ref([])
const isCreateItemVisible = ref(false)

const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    closeDropdown()
})

const props = defineProps({
    data: {
        type: String,
        required: true
    }
})


const emit = defineEmits(["close", "data"])
const closeDropdown = () => {
    emit('close')
    backButton.hide()
}


const setData = async (itemId) => {
    const userId = tgUser.value.id;
    const isBudget = props.data === 'Бюджет';
    const data = {
        "user_id": userId,
        [isBudget ? "current_budget" : "current_moneybox"]: itemId
    };
    const newUser = await (isBudget ? setCurrentBudget(data) : setCurrentMoneybox(data));
    store.dispatch("SET_USER", newUser);
    if (isBudget) {
        store.dispatch("REMOVE_OPERATION");
    } else {
        const moneybox = await getMoneybox(newUser.current_moneybox);
        store.dispatch("SET_CURRENT_MONEYBOX", moneybox);
    }
    emit('data', data);
    closeDropdown();
}


const toggleIsCreateItemVisible = () => {
    isCreateItemVisible.value = !isCreateItemVisible.value
}

const toogleAndUpdateListItems = () => {
    getList()
    toggleIsCreateItemVisible()
}

const deleteItemAndGetNewList = async(itemId) => {
    if (user.value.id != 2) {
        const entity = props.data == 'Бюджет' ? "бюджет" : "копилку"
        const params = {
            message: `Вы уверены, что хотите удалить ${entity}?`,
            buttons: [
                { id: 'cancel', text: 'Нет' },
                { id: 'confirm', text: 'Да' }
            ]};
            const buttonId = await new Promise((resolve) => {
                window.Telegram.WebApp.showPopup(params, resolve);
            });
            if (buttonId == "confirm") {
                if (props.data == 'Бюджет') {
                    await deleteBudget(itemId)
                } else {
                    await deleteMoneybox(itemId)
                }
            }
    } else {
        if (props.data == 'Бюджет') {
            await deleteBudget(itemId)
        } else {
            await deleteMoneybox(itemId)
        }
    }
    getList()
}

const getList = async() => {
    let result
    if (props.data == "Бюджет") {
        result = await getBudgets(user.value.id)
    } else {
        result = await getMoneyboxs(user.value.id)
    }
    list.value = result
}


getList()

const condition = computed(() => {
    return props.data === "Бюджет" ? user.value.current_budget : user.value.current_moneybox;
});

</script>

<template>
    <div class="m-financial-controler" @click="closeDropdown">
        <div class="m-financial-controller-content-container">
            <div 
                class="m-financial-controller-content" 
                v-if="list.length"
                v-for="(item, index) in list"
                :key="index">
                <button 
                    @click="setData(item.id)" 
                    @click.stop>
                    {{ item.name }}
                </button>
                <div 
                    v-if="item.id != condition"
                    class="m-finanial-controller-delete"
                    @click="deleteItemAndGetNewList(item.id)"
                    @click.stop>X
                </div>
            </div>
        </div>
        <m-main-button 
            :name="buttonName" 
            @click-button="toggleIsCreateItemVisible" 
            @click.stop>
        </m-main-button>
    </div>
    <m-registation 
        v-if="isCreateItemVisible && props.data == 'Бюджет'"
        :data="data"
        @close="toogleAndUpdateListItems"
        >
    </m-registation>
    <m-create-moneybox
        v-if="isCreateItemVisible && props.data == 'Копилка'"
        @close="toogleAndUpdateListItems"
        >
        
    </m-create-moneybox>
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

.m-financial-controller-content-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 89vh;
    width: 100%;
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