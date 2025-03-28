<script setup>
import { ref } from 'vue';
import MMainButton from './MMainButton.vue';
import MOperation from './MOperation.vue';

let buttonName = "+ Добавить операцию"


const isCreateOperationVisible = ref(false)

const toogleIsCreateOperationVisilbe = () => {
    isCreateOperationVisible.value = !isCreateOperationVisible.value
}


</script>

<template>
    <div></div>
    <m-main-button :name="buttonName" @click="toogleIsCreateOperationVisilbe"></m-main-button>
    <m-operation v-if="isCreateOperationVisible"></m-operation>
</template>

<style scoped>
</style>
