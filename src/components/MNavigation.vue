<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const navigation = ["Бюджет", "Аккаунт", "Копилка"];
const routes = ["/", "/account", "/moneybox"];
const router = useRouter();
</script>

<template>
  <nav>
    <ul>
      <li v-for="(item, index) in navigation" :key="index">
        <router-link :to="routes[index]">{{ item }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>


nav ul {
  list-style-type: none;
}

nav li {
  display: inline;
  margin-right: 15px;
}
</style>