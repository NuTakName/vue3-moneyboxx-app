<script setup>
import { router } from '@/router';
import { useStore } from 'vuex';

const store = useStore();


const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    store.dispatch("SET_INDEX", 0)
    router.push('/')
})
</script>

<template>
    <div>Аккаунт</div>

</template>

<style scoped>
</style>
