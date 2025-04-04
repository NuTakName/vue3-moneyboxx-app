<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MRegistation from './components/MRegistation.vue';
import MNavigation from './components/MNavigation.vue';


const store = useStore();
const tgUser = computed(() => store.state.tgUser);
const user = computed(() => store.state.user)





</script>

<template>
  <MRegistation v-if="!user"></MRegistation>
  <m-navigation></m-navigation>
  <router-view></router-view>

</template>

<style scoped>
</style>
