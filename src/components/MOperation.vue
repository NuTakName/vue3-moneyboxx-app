<script setup>
import { ref, computed } from 'vue';
import MMainButton from './MMainButton.vue';
import MDropdownSelector from './MDropdownSelector.vue';
import { expenseСategories, incomeСategories } from '@/utils';

let buttonName = "Добавить"

const emit = defineEmits(['close'])


const ammount = ref()
const description = ref()
const typeOperation = ref('income')
const category = ref()
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

const closeAddOperation = () => {
    emit('close')
}

const addOperation = () => {
    console.log("Добавили")
    closeAddOperation()
}


</script>



<template>
    <div class="m-operation" @click="closeAddOperation">
        <form class="m-operation-form" @submit.prevent="addOperation">
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
            <div @click.stop>
                <m-main-button :name="buttonName"></m-main-button>
            </div>
        </form>
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
    width: 50%;
}

.m-operation-form-radio{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0px 10px 0px;
    color: white;
    font-size: 16px;
    font-weight: 700;
}



.m-operation-category{
    color: black;
    background-color: blue;
    padding: 10px;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    height: 7vh;
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