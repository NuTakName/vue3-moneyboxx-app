<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MRegistation from './components/MRegistation.vue';

const store = useStore();
const user = computed(() => store.state.user);

const isRegistrationVisible = computed(() => {
  if (!user.value) {
    return true
  } else return false
});



</script>

<template>
  <MRegistation v-if="isRegistrationVisible"></MRegistation>

</template>

<style scoped>
</style>
