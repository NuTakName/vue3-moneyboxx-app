<script setup>
import { computed } from 'vue';
import { router } from '@/router';
import { useStore } from 'vuex';
import MCreateMoneybox from './MCreateMoneybox.vue';
import MMoneyboxStatistic from './MMoneyboxStatistic.vue';

const store = useStore();
const moneybox = computed(() => store.state.moneybox)


const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    store.dispatch("SET_INDEX", 0)
    router.push('/')
})


</script>

<template>
    <m-create-moneybox v-if="!moneybox"></m-create-moneybox>
    <m-moneybox-statistic v-if="moneybox"></m-moneybox-statistic>

</template>

<style scoped>
</style>
