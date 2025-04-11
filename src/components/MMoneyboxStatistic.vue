<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { formatValue, formatDate } from '@/utils';
import MMainButton from './MMainButton.vue';
import MDataChart from './MDataChart.vue';
import MMoneyboxUpdate from './MMoneyboxUpdate.vue';
    
const store = useStore();
const tgUser = computed(() => store.state.tgUser)
const moneybox = computed(() => store.state.moneybox)
const isMoneyboxUpdateVisible = ref(false)

const toogleMoneyboxUpdateVisible = () => {
  isMoneyboxUpdateVisible.value = !isMoneyboxUpdateVisible.value
}

const buttonName = 'Наполнить'

const moneyboxPercent = computed(() => {
  if (!moneybox.value){
    return 0
  }
  if (moneybox.value.goal_balance <= 0) return 0;
  const percentage = (moneybox.value.current_balance / moneybox.value.goal_balance) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  return clampedPercentage
});


</script>
    

<template>
    <div class='m-moneybox-statistic-container'>
        <div class="m-moneybox-statistic-data">
            <div :class="['m-moneybox-statistic-data-name', {'m-moneybox-statistic-data-name-dark': tgUser.theme == 'dark'}]">
              {{ moneybox.name }}
            </div>
            <div :class="['m-moneybox-statistic-data-info', {'m-moneybox-statistic-data-info-dark': tgUser.theme == 'dark'}]">
              Цель: до {{ formatDate(moneybox.goal_date) }}
            </div>
            <div :class="['m-moneybox-statistic-data-info', {'m-moneybox-statistic-data-info-dark': tgUser.theme == 'dark'}]">
               {{ formatValue(moneybox.current_balance, moneybox.currency.symbol, moneybox.currency.code) }} 
               из {{ formatValue(moneybox.goal_balance, moneybox.currency.symbol, moneybox.currency.code) }}
            </div>
        </div>
        <m-data-chart></m-data-chart>
    </div>
    <div class="m-moneybox-statistic-footer">
        <m-main-button
          v-if="moneyboxPercent < 100"
          :name="buttonName" 
          @click-button="toogleMoneyboxUpdateVisible">
        </m-main-button>
    </div>
    <m-moneybox-update 
      v-if="isMoneyboxUpdateVisible" 
      @close="toogleMoneyboxUpdateVisible">
    </m-moneybox-update>

</template>
    
<style scoped>
  
  
.m-moneybox-statistic-container {
  height: 72vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
}

.m-moneybox-statistic-data{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35%;

}

.m-moneybox-statistic-data-name{
  color: black;
  font-size: 16px;
  font-weight: 700;
}


.m-moneybox-statistic-data-name-dark{
  color: white;
}

  
.m-moneybox-statistic-data-info{
  color: black;
  font-size: 16px;
  margin-top: 10px;
}


.m-moneybox-statistic-data-info-dark{
  color: white;
}


.m-moneybox-statistic-footer{
  height: 11vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
  
  .refill-moneybox{
    position: absolute;
    bottom: 0;
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
  }
  
  .reffil-moneybox-btn{
    cursor: pointer;
    width: 100%;
    height: 100%;
    min-height: 50px;
    border: 3px solid black;
    font-weight: 700;
    font-size: 18px;
    background-color: var(--tg-theme-button-color);
    border-radius: 10px;
    color: black;
  }
  
  .main-circle-container{
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }


</style>