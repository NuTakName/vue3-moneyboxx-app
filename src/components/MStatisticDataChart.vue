<script setup>
  import { computed } from 'vue';
  import { Pie } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement);


const props = defineProps({
    values: {
        type: Array,
        required: true,
    },
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    }
});



const data = computed(() => {
    const filled = props.values;
    const notFilledValue = 100 - props.values.reduce((acc, value) => acc + value, 0);
    return {
        datasets: [
            {
                label: 'Процент заполнения',
                data: [...filled, notFilledValue],
                backgroundColor: ['#36A2EB'],
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
            enabled: false,
        },
    },
};
</script>


<template>
    <div class="m-data-chart-container" :style="{ width: width, height: height }">
        <Pie :data="data" :options="options"/>
    </div>
</template>
  
<style scoped>


</style>