<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import MOperation from './MOperation.vue';
import { formatDate, formatTime, formatValue } from '@/utils';
import { getOperationsByCategoryId } from '@/api/operations';


const mark = ref()
const store = useStore();
const tgUser = computed(() => store.state.tgUser);
const month = computed(() => store.state.month)
const isUpdateOperationVisible = ref(false)
const operations = ref([])
const currentOperation = ref()


const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const getOperations = async() => {
  const result = await getOperationsByCategoryId(props.id, month.value)
  operations.value = result
}

getOperations()


const toogleUpdateOperationVisible = (operation) => {
  if (operation) {
    currentOperation.value = operation
  }
  getOperations()
  isUpdateOperationVisible.value = !isUpdateOperationVisible.value
}


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


const getClass = (operation) => {
  let className
  if (operation.type_ == "income" && tgUser.tehme == "dark") {
    className = "dark-income"
    mark.value = "+"
  } else if (operation.type_ == "income" && tgUser.tehme != "dark") {
    className = "white-income"
    mark.value = "+"
  } else if (operation.type_ == "expense" && tgUser.tehme == "dark") {
    className = "dark-expense"
    mark.value = "-"
  } else {
    className = "white-expense"
    mark.value = "-"
  }
  return className
};


</script>

<template>
    <div v-if=operations.length :class="['m-list-operation-name', getClass(operations[0])]">
       {{ operations[0].category_name }}
    </div>
    <div class="scrollable">
      <div 
        v-for="(operations, date) in groupOperation" 
        :key="date"
      >
        <div :class="['m-list-operation-date', {'m-list-operation-date-dark': tgUser.theme == 'dark'} ]">
          {{ date }}
        </div>
        <div v-for="(operation, index) in operations" :key="index">
          <div 
            :class="['m-list-operation-info-container', {'m-list-operation-info-container-dark': tgUser.theme == 'dark'}]"
            @click="toogleUpdateOperationVisible(operation)"
          >
            <div class="m-list-operation-info">
              <div> {{ mark }} {{ formatValue(operation.value, operation.currency_symbol, operation.currency_code) }}</div>
              <div v-if="operation.description">{{ operation.description }}</div>
            </div>
            <div class="m-list-operation-time">{{ formatTime(operation.date) }}</div>
          </div>
          <m-operation 
            v-if="isUpdateOperationVisible" 
            @close="toogleUpdateOperationVisible"
            :operation="currentOperation"
            :operations="operations"
          >
          </m-operation>
        </div>
      </div>
    </div>
</template>

<style scoped>

.scrollable{
  max-height: 65vh;
  overflow-y: auto;
}

.m-list-operation-name{
  margin: 16px 0px 16px 0px;
  font-size: 22px;
  font-weight: 700;
  width: 100%;
  text-align: center;
}

.dark-income{
  color: white;
  text-shadow: 
        -1px -1px 0 rgba(9, 112, 4, 1),  
         1px -1px 0 rgba(9, 112, 4, 1),
        -1px  1px 0 rgba(9, 112, 4, 1),
         1px  1px 0 rgba(9, 112, 4, 1);
}

.dark-expense{
  color: white;
  text-shadow: 
        -1px -1px 0 rgba(136, 17, 17, 1),  
         1px -1px 0 rgba(136, 17, 17, 1),
        -1px  1px 0 rgba(136, 17, 17, 1),
         1px  1px 0 rgba(136, 17, 17, 1);
}

.white-income{
  color: #097004;
}

.white-expense{
  color: #6f0f0f;
}

.m-list-operation-date{
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  color: black;
  margin-bottom: 16px;
}

.m-list-operation-date-dark{
  color: white;
  flex-grow: 1;
  text-shadow: 
    -1px -1px 0 black,  
    1px -1px 0 black,
    -1px  1px 0 black,
    1px  1px 0 black;
}

.m-list-operation-info-container{
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: black;
  cursor: pointer;
}

.m-list-operation-info-container-dark{
  color: white;
}

.m-list-operation-info{
  width: 81px;
  text-align: center;
  margin-left: 20px;
}

.m-list-operation-time{
  width: 81px;
  text-align: center;
  margin-right: 20px;
}
</style>
