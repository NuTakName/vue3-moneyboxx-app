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
    <div class="m-operations"></div>
    <m-main-button :name="buttonName" @click="toogleIsCreateOperationVisilbe"></m-main-button>
    <m-operation 
        v-if="isCreateOperationVisible"
        @close="toogleIsCreateOperationVisilbe"
        >
    </m-operation>
</template>

<style scoped>


.m-operations{
    width: 100%;
    border-bottom: 4px solid black;
    height: 66.5vh;
}



</style>
