<script setup>
import { ref, computed } from 'vue';
import MMainButton from './MMainButton.vue';
import MDropdownSelector from './MDropdownSelector.vue';
import { expenseСategories, incomeСategories } from '@/utils';

let buttonName = "Добавить"


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


</script>



<template>
    <div class="m-operation" @click="closeOperation">
        <form class="m-operation-form">
            <label>Размер операции</label>
            <input type="number" required v-model="ammount">
            <label>Описание</label>
            <input type="text" v-model="description">
            <div class="m-operation-form-radio">
                <input type="radio" value="income" v-model="typeOperation">Доход
                <input type="radio" value="expense" v-model="typeOperation">Расход
            </div>
            <div 
                class="m-operation-category"
                @click="toogleDropDownVisible"
                >{{ currentCategory }}
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
    <m-main-button :name="buttonName"></m-main-button>
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
}

.m-operation-form-radio{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.m-operation-category{
    text-align: center;
    color: black;
    background-color: white;
    padding: 10px;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
}


</style>