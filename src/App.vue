<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MRegistation from './components/MRegistation.vue';

const store = useStore();
const user = computed(() => store.state.user);

const isRegistrationVisible = ref()

if (Object.keys(user.value).length === 0) {
  isRegistrationVisible.value = true
} else {
  isRegistrationVisible.value = false
}



</script>

<template>
  <MRegistation v-if="isRegistrationVisible"></MRegistation>

</template>

<style scoped>
</style>
