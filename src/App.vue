<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const count = computed(() => store.state.count);
const increment = () => {
    store.dispatch('increment');
  };

const decrement = () => {
  store.dispatch('decrement')
}

</script>

<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>

</template>

<style scoped>
</style>
