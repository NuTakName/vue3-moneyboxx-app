<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';



const store = useStore();
const difference = computed(() => store.state.difference) 

const navigations = [
  {"name": "Бюджет", "link": '/'},
  {"name": "Аккаунт", "link": '/account'},
  {"name": "Копилка", "link": '/moneybox'},
]

const activeNavigation = ref(0)

</script>

<template>
  <div class="m-navigation">
    <router-link
      v-for="(item, index) in navigations"
      :to="item.link"
      :key="index"
      :class="{ active: activeNavigation === index}"
      class="circle"
      @click="activeNavigation = index"
    > {{ item.name }}
    <div 
      v-if="item.name === 'Бюджет' && difference"
      class="m-navigation-circle-value"
      >
        {{ difference }}
    </div>
    </router-link>
  </div>
</template>

<style scoped>

.m-navigation{
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid black;
}


.circle {
  cursor: pointer;
  width: 81px;
  height: 81px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: var(--tg-theme-button-color);
  transition: transform 0.3s;
  color: black;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.circle.active {
  transform: scale(1.2);
  border: 3px solid black;
  font-style: bold;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}

.circle:last-child{
  margin-right: 20px;
}

.circle:first-child{
  margin-left: 20px;
}


.m-navigation-circle-value{
  margin-top: 5px;
  font-size: 10px;
  color: black;
}

</style>