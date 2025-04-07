<script setup>

import { ref, computed } from 'vue';
import MDropdownSelector from './MDropdownSelector.vue';
import { useStore } from 'vuex';
import { months } from '@/utils';


const store = useStore();
const tgUser = computed(() => store.state.tgUser)
const month = computed(() => store.state.month)
const currentMonth = computed(() => months[month.value - 1]);
const currentYear = ref(new Date().getFullYear())
const data = ref('month')
const isDropdownSelectorVisible = ref(false)


const props = defineProps({
    totalIncome: {
        type: String,
        required: true
    },
    totalExpense: {
        type: String,
        required: true
    }
})



const toogleIsDropdownSelectorVisible = () => {
  isDropdownSelectorVisible.value = !isDropdownSelectorVisible.value
}

const setCurrentMonth = (month) => {
  store.dispatch("SET_CURRENT_MONTH", month + 1)
}



</script>

<template>
    <div class="m-budget-summary">
      <router-link
        :to="{path: `/list_operation/${null}/income`}"
        :class="['m-budget-summary-income', {'m-budget-summary-income-dark': tgUser.theme == 'dark'}]"
      >
      + {{ totalIncome }}
      </router-link>
      <div
        :class="['m-budget-summary-date', {'m-budget-summary-date-dark': tgUser.theme == 'dark'}]" 
        @click="toogleIsDropdownSelectorVisible">
        {{ currentMonth }} {{ currentYear }}
      </div>
      <router-link
        :to="{path: `/list_operation/${null}/expense`}"
        :class="['m-budget-summary-expense', {'m-budget-summary-expense-dark': tgUser.theme == 'dark'}]"
      >
      - {{ totalExpense }}
      </router-link>
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


.m-budget-summary-income{
    color: #097004;
    margin-left: 20px;
}

.m-budget-summary-income:hover, .m-budget-summary-expense:hover{
    background-color: transparent;
}



.m-budget-summary-expense{
    color: #6f0f0f;
    margin-right: 20px;
}

.m-budget-summary-income-dark{
  color: white;
  text-shadow: 
        -1px -1px 0 rgba(9, 112, 4, 1),  
         1px -1px 0 rgba(9, 112, 4, 1),
        -1px  1px 0 rgba(9, 112, 4, 1),
         1px  1px 0 rgba(9, 112, 4, 1);
}

.m-budget-summary-expense-dark{
  color: white;
  text-shadow: 
        -1px -1px 0 rgba(136, 17, 17, 1),  
         1px -1px 0 rgba(136, 17, 17, 1),
        -1px  1px 0 rgba(136, 17, 17, 1),
         1px  1px 0 rgba(136, 17, 17, 1);
}

.m-budget-summary-expense, .m-budget-summary-income{
  width: 81px;
  cursor: pointer;
}

.m-budget-summary{
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-bottom: 4px solid black;
}

.m-budget-summary-date{
  cursor: pointer;
  font-size: 18px;
  color: black;
}

.m-budget-summary-date-dark{
  color: white;
  text-shadow: 
        -1px -1px 0 black,  
         1px -1px 0 black,
        -1px  1px 0 black,
         1px  1px 0 black;
}

</style>
