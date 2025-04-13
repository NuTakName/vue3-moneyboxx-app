  <script setup>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { Pie } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement);

const store = useStore();
const moneybox = computed(() => store.state.moneybox);
  

  
const getThemeColor = () => {
    return getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-button-color').trim();
};

const filledPercentage = computed(() => {
    if (moneybox.value.goal_balance <= 0) return 0;
    const percentage = (moneybox.value.current_balance / moneybox.value.goal_balance) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    return Number.isInteger(clampedPercentage) ? clampedPercentage.toString() : clampedPercentage.toFixed(1);
});

const data = computed(() => {
    let filled = (moneybox.value.current_balance / moneybox.value.goal_balance) * 100;
    if (moneybox.value.goal_balance <= 0) {
        filled = 0;
    } else {
        filled = Math.min(100, filled);
    }

const notFilled = 100 - filled;

return {
    labels: [],
    datasets: [
        {
            label: 'Процент заполнения',
            data: [filled, notFilled],
            backgroundColor: [getThemeColor(), '#E0E0E0'],
        },
    ],
};
});


const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    tooltip: {
        enabled: false
    },
},
};
</script>


<template>
    <div class="m-data-chart-container">
        <Pie :data="data" :options="options"/>
        <div class="m-data-chart-circle">
            <div class="m-data-chart-circle-percentage">{{ filledPercentage || 0}}%</div>
        </div>
    </div>
</template>
  
<style scoped>

.m-data-chart-container{
    position: relative;
    width: 250px;
    height: 250px;
}

.m-data-chart-circle{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.m-data-chart-circle-percentage{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: 700;
    color: black;
}


</style>