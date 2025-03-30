<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { formatDate, formatTime, formatValue } from '@/utils';


const store = useStore();
const user = computed(() => store.state.user);
const operations = computed(() => store.state.operations);


const groupOperation = computed(() => {
    return operations.value.reduce((acc, operation) => {
        const dateKey = formatDate(operation.date);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(operation);
        return acc;
    }, {});
});

</script>

<template>
  <div>
    <div> {{ operations[0].category_name }}</div>
      <div v-for="(operations, date) in groupOperation" :key="date">
          <div>{{ date }}</div>
          <div v-for="(operation, index) in operations" :key="index">
              <div>
                  <div>
                      <div>{{ formatValue(operation.value, operation.currency_symbol, operation.currency_code) }}</div>
                      <div v-if="operation.description">{{ o.description }}</div>
                  </div>
                  <div>{{ formatTime(operation.date) }}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>


</style>
