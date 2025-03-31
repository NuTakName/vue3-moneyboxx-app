<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import MDropdownSelector from './MDropdownSelector.vue';


const store = useStore();
const navigations = [
  {"name": "Бюджет", "link": '/'},
  {"name": "Аккаунт", "link": '/account'},
  {"name": "Копилка", "link": '/moneybox'},
]

const activeNavigation = ref(0)
const data = ref('month')


const isDropdownSelectorVisible = ref(false)

const toogleIsDropdownSelectorVisible = () => {
  isDropdownSelectorVisible.value = !isDropdownSelectorVisible.value
}

const setCurrentMonth = (month) => {
  store.dispatch("SET_CURRENT_MONTH", month + 1)
}

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
    </router-link>
  </div>
  <div class="m-nav-data">
    <div class="m-nav-data-income">+100</div>
    <div @click="toogleIsDropdownSelectorVisible">Месяц 2025</div>
    <div class="m-nav-data-expense">-200</div>
  </div>
  <m-dropdown-selector 
    v-if="isDropdownSelectorVisible" 
    :data="data"
    @close="toogleIsDropdownSelectorVisible"
    @data="setCurrentMonth"
    >
  </m-dropdown-selector>
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
}

.circle.active {
  transform: scale(1.2);
  border: 3px solid black;
  font-style: bold;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}

.circle:last-child, .m-nav-data-expense{
  margin-right: 20px;
}

.circle:first-child, .m-nav-data-income{
  margin-left: 20px;
}

.m-nav-data-expense, .m-nav-data-income{
  width: 81px;
  cursor: pointer;
}

.m-nav-data{
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-bottom: 4px solid black;
}



</style>