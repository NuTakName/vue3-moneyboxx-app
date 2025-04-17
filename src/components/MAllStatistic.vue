<script setup>
import { ref, computed } from 'vue';
import { router } from '@/router';
import { useStore } from 'vuex';
import MStatisticDataChart from './MStatisticDataChart.vue';
import { formatValue } from '@/utils';


const store = useStore();

const tgUser = computed(() => store.state.tgUser);
const incomeOperations = computed(() => store.state.incomeOperations);
const expenseOperations = computed(() => store.state.expenseOperations);
const values = ref([])

const backButton = window.Telegram.WebApp.BackButton;
backButton.show();
backButton.onClick(function() {
    exitBack()
})

const props = defineProps({
    type_: {
        type: String,
        require: true
    }
});


const exitBack = () => {
    router.push('/statistic')
}

const operations = ref(props.type_ == 'income'? incomeOperations.value: expenseOperations.value);

const calculateTotal = (operations) => {
    return operations.reduce((total, operation) => {
        return total + operation.value;
    }, 0);
};


const getPercent = (operation) => {
    let percent = 0;
    const total = calculateTotal(operations.value);
    percent = (operation.value / total) * 100;
    values.value.push(percent)
    return percent.toFixed(1);
}



</script>


<template>
    <div 
        class="m-all-statistic-container"
        @click="exitBack">
        <m-statistic-data-chart 
            :values="values" 
            width="250px" 
            height="250px">
        </m-statistic-data-chart>
        <div :class="['m-all-statistic-operations', {'m-all-statistic-operations-dark': tgUser.theme == 'dark'} ]">
            <div 
                v-for="operation in operations">
                {{ operation.category_name }}
                ({{ formatValue(operation.value, operation.currency.symbol, operation.currency.code) }},
                 {{ getPercent(operation) }}%)
            </div>
        </div>
    </div>
</template>

  
<style scoped>

.m-all-statistic-container{
    height: 83vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.m-all-statistic-operations{
    margin-top: 5vh;
    color: black;
    font-size: 16px;
}

.m-all-statistic-operations-dark{
    color: white;
}

</style>