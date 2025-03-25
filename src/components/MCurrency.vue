<script setup>
import { computed, ref } from 'vue';
import { fiatCurrencies, cryptoCurrencies } from '@/utils';

const props = defineProps({
    currency: String,
    required: true
})

const emit = defineEmits(["close", "currency"])

const closeCurrency = () => {
    emit('close')
}

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
</style>
