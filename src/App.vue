<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MRegistation from './components/MRegistation.vue';
import MNavigation from './components/MNavigation.vue';


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
  <m-navigation></m-navigation>
  <router-view></router-view>

</template>

<style scoped>
</style>
