<script setup>

import { incomeСategories, expenseСategories, fiatCurrencies, cryptoCurrencies } from '@/utils';
import { months } from '@/utils';

const props = defineProps({
    data: {
        type: [String, Array],
        required: true
    }
})

const emit = defineEmits(["close", "data"])

const closeDropdown = () => {emit('close')}

const setData = (data) => {
    const index = months.findIndex(month => month === data);
    if (index !== -1) {
        data = index
    }
    emit('data', data )
    closeDropdown()
}

const getList = () => {
    if (props.data === 'income') {
        return incomeСategories
    } else if (props.data === "expense") {
        return expenseСategories
    } else if (props.data === "fiat") {
        return fiatCurrencies
    } else if (props.data === "crypto") {
        return cryptoCurrencies
    } else if (Array.isArray(props.data)) {
        return props.data;
    } else {
        return months
    }
}


</script>

<template>
    <div class="m-category" @click="closeDropdown">
        <button 
            v-for="(c, index) in getList()"
            :key="index"
            @click.stop="setData(c)">
            <span v-if="props.data === 'fiat' || props.data === 'crypto'">
                {{ c.name }}: {{ c.code }}
            </span>
            <span v-else>
                {{ c }}
            </span>
        </button>
    </div>


</template>

<style scoped>

.m-category{
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

button{
    width: 60%;
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

.m-category button span{
    font-size: 18px;
    font-weight: 700;
}
</style>