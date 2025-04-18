<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import MFinancialController from './MFinancialController.vue';
import { router } from '@/router';



const store = useStore();
const difference = computed(() => store.state.difference) 
const index = computed(() => store.state.index)
const user = computed(() => store.state.user)
const moneybox = computed(() => store.state.moneybox)
const isFinancialControllerVisible = ref(false)
const currentPage = ref("/")
const data = ref()


const moneyboxPercent = computed(() => {
  if (!moneybox.value){
    return 0
  }
  if (moneybox.value.goal_balance <= 0) return 0;
  const percentage = (moneybox.value.current_balance / moneybox.value.goal_balance) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  return Number.isInteger(clampedPercentage) ? clampedPercentage.toString() : clampedPercentage.toFixed(1);
});


const navigations = [
  {"name": "Бюджет", "link": '/'},
  {"name": "Аккаунт", "link": '/account'},
  {"name": "Копилка", "link": '/moneybox'},
  {"name": "Статистика", "link": '/statistic'}
]

const updateIndex = () => {
  let index
  const currentPath = window.location.pathname;
  if (currentPath == "/account") {
    index = 1
  } else if (currentPath == "/moneybox"){
    index = 2
  } else if ( currentPath == '/statistic'){
    index = 3
  } else {
    index = 0
  }
  store.dispatch("SET_INDEX", index)
}


updateIndex()


let longPressTimer = null;

const startLongPress = (name) => {
  longPressTimer = setTimeout(() => {
    handleTouchStart(name);
  }, 1500);
};

const endLongPress = () => {
  clearTimeout(longPressTimer);
};


const handleTouchStart = (name) => {
  if (name == "Копилка" || name == "Бюджет") {
    data.value = name
    isFinancialControllerVisible.value = true
  }
}

const setData = (index, link) => {
  store.dispatch("SET_INDEX", index)
  if (link != '/account') {
    currentPage.value = link
  }
  router.push(link)
}


const closeMFinancialController = () => {
  isFinancialControllerVisible.value = false
  router.push(currentPage.value)
}

</script>

<template>
  <div class="m-navigation">
    <div
      v-for="(item, i) in navigations"
      :key="i"
      :class="{ active: i === index}"
      class="circle"
      @click="setData(i, item.link)"
      @contextmenu.prevent="handleTouchStart(item.name)"
      @touchstart="startLongPress(item.name)"
      @touchend="endLongPress"
      @touchcancel="endLongPress"
    > {{ item.name }}
    <div 
      v-if="item.name === 'Бюджет' && difference"
      class="m-navigation-circle-value"
      >
        {{ difference }}
    </div>
    <div 
      v-if="item.name === 'Аккаунт' && user.money"
      class="m-navigation-circle-value"
      >
        {{ user.money }}
    </div>
    <div
      v-if="item.name === 'Копилка' && moneyboxPercent && moneyboxPercent != 0"
      class="m-navigation-circle-value"
      >
        {{ moneyboxPercent }} %
    </div>
  </div>
  </div>
  <m-financial-controller 
    v-if="isFinancialControllerVisible" 
    @close="closeMFinancialController"
    :data="data"
    >
  </m-financial-controller>
</template>

<style scoped>

.m-navigation{
  width: 100%;
  height: 17vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid black;
}


.circle {
  cursor: pointer;
  width: 78px;
  height: 78px;
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

@media (min-width: 768px) {
  .circle {
    width: 78px;
    height: 78px;
  }
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
  font-size: 10px;
  color: black;
}

</style>