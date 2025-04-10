<script setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
  
const date = ref(null);

</script>

<template>
    <VueDatePicker v-model="date" />
</template>
  


<style>


</style>