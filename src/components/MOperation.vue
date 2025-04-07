<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { router } from '@/router';
import MMainButton from './MMainButton.vue';
import MDropdownSelector from './MDropdownSelector.vue';
import { expenseСategories, incomeСategories } from '@/utils';
import { getOrAddCategory } from '@/api/categories';
import { addOperation, deleteOperation, updateOperation } from '@/api/operations';


const store = useStore();
const user = computed(() => store.state.user);
const month = computed(() => store.state.month)
const operation = computed(() => store.state.operation)
const length = computed(() => store.state.length)

const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    closeAddOperation()
})


const ammount = ref(operation.value ? operation.value.value : 0);
const description = ref(operation.value ? operation.value.description : null);
const typeOperation = ref(operation.value ? operation.value.type_ : "income");
const category = ref(operation.value ? operation.value.category_name : "Образование");
const buttonName = ref(operation.value ? "Удалить" : "Добавить");
const isDropDownVisible = ref(false)


const toogleDropDownVisible = () => {
    isDropDownVisible.value = !isDropDownVisible.value
}

const setCategory = (data) => {
    category.value = data
} 

const currentCategory = computed(() => {
    if (!category.value) {
        return typeOperation.value === "income" ? incomeСategories[0] : expenseСategories[0];
    } else {
        return category.value
    }

})

const closeAddOperation = async() => {
    if (operation.value) {
        if (
            operation.value.value != ammount.value ||
            operation.value.description != description.value ||
            operation.value.category_name != category.value || 
            operation.value.type_ != typeOperation.value
        ) {
            const cat = await getCategory()
            const o = generateOperation(cat)
            o.id = operation.value.id
            await updateOperation(o)
        }
    }
    if (length.value == 1) {
        router.push("/")
    } else {
        router.back()
    }
    store.dispatch("REMOVE_OPERATION")
}

const getCategory = async() => {
    let c = {
        "photo_path": null,
        "type_": typeOperation.value,
        "name": category.value,
        "description": null,
        "user_id": user.value.id
    }
    let cat = await getOrAddCategory(c)
    return cat
}

const generateOperation = (cat) => {
    const currentDate = new Date()
    currentDate.setMonth(month.value - 1)
    let operation = {
        "budget_id": user.value.current_budget,
        "type_": typeOperation.value,
        "value": ammount.value,
        "description": description.value,
        "category_id": cat.id,
        "sub_category_id": null,
        "date": currentDate
    }
    return operation
}

const insertOrDeleteOperation = async() => {
    if (buttonName.value == 'Удалить') {
        if (user.value.id != 2) {
            const params = {
                message: 'Вы уверены, что хотите удалить операцию?',
                buttons: [
                    { id: 'cancel', text: 'Нет' },
                    { id: 'confirm', text: 'Да' }
                ]};
            const buttonId = await new Promise((resolve) => {
                window.Telegram.WebApp.showPopup(params, resolve);
            });
            if (buttonId == "confirm") {
                await deleteOperation(operation.value.id)
            }
        } else {
            await deleteOperation(operation.value.id)
        }
        closeAddOperation()
    }
    else {
        if (ammount.value == 0) {
            return
        }
        const cat = await getCategory()
        const o = generateOperation(cat)
        let result = await addOperation(o)
        if (result) {
            closeAddOperation()
        }
    }
    return;
}


</script>



<template>
    <div class="m-operation" @click="closeAddOperation">
        <form class="m-operation-form" @submit.prevent="insertOrDeleteOperation">
            <label>Размер операции</label>
            <input 
                type="number" 
                class="m-operation-form-input" 
                v-model="ammount"
                required
                @click.stop
            >
            <label class="m-operation-form-desc">Описание</label>
            <input 
                type="text" 
                v-model="description"
                class="m-operation-form-input" 
                @click.stop
            >
            <div class="m-operation-form-radio">
                <input 
                    type="radio" 
                    value="income" 
                    v-model="typeOperation"
                    @click.stop
                >Доход
                <input 
                    type="radio" 
                    value="expense" 
                    v-model="typeOperation"
                    @click.stop
                >Расход
            </div>
            <div 
                class="m-operation-category"
                @click.stop="toogleDropDownVisible" 
                >Категория: {{ currentCategory }}
            </div>
        </form>
        <m-main-button :name="buttonName" @click.stop="insertOrDeleteOperation"></m-main-button>
    </div>
    <m-dropdown-selector
        v-if="isDropDownVisible"
        :data="typeOperation"
        @close="toogleDropDownVisible"
        @data="setCategory"
        >
    </m-dropdown-selector>
</template>

<style scoped>


.m-operation{
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
}


.m-operation-form{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    height: 89vh;
}

.m-operation-form-radio{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px 10px 0px;
    color: white;
    font-size: 16px;
    font-weight: 700;
}



.m-operation-category{
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
}

label{
    font-size: 18px;
    color: white;
    font-weight: 700;

}

.m-operation-form-desc{
    margin-top: 10px;
}

.m-operation-form-input{
    width: 100%;
}


</style>