<script setup>
import { fiatCurrencies, cryptoCurrencies } from '@/utils';

const props = defineProps({
    currency: {
        type: String,
        required: true
    }
})

const emit = defineEmits(["close", "currency"])
const closeCurrency = () => {emit('close')}

const setCurrency = (currency) => {
    emit('currency', currency )
    closeCurrency()
}


</script>

<template>
    <div class="m-currency" @click="closeCurrency">
        <button 
            v-for="c in (currency === 'fiat' ? fiatCurrencies : cryptoCurrencies)"
            :key="c.code"
            @click.stop="setCurrency(c)">
            {{ c.name }}: {{ c.code }}
        </button>
    </div>


</template>

<style scoped>

.m-currency{
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
</style>
