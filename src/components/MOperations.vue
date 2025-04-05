<script setup>
import { ref, onMounted, watch, computed} from 'vue';
import { useStore } from 'vuex';
import { router } from '@/router';
import MMainButton from './MMainButton.vue';
import { getOperations, getDifference } from '@/api/operations';
import { formatValue, closeBackButton } from '@/utils';
import MBudgetSummary from './MBudgetSummary.vue';

let buttonName = "+ Добавить операцию"
const store = useStore();
const user = computed(() => store.state.user);
const month = computed(() => store.state.month)
const totalIncome = ref("0")
const totalExpense = ref("0")
const difference = ref("0")

const backButton = window.Telegram.WebApp.BackButton;
backButton.hide()

closeBackButton()
const isCreateOperationVisible = ref(false)



const operations = ref([])

const getAllOperation = async () => {
    let income = 0;
    let expense = 0;
    if (!user.value) {
      return
    }
    const result = await getOperations(user.value.current_budget, month.value);
    operations.value = result;
    if (operations.value.length > 0) {
        for (const operation of operations.value) {
            if (operation.type_ === 'income') {
                income += operation.value;
            } else {
                expense += operation.value;
            }
        }
        const currencySymbol = operations.value[0].currency_symbol;
        const currencyCode = operations.value[0].currency_code;
        const diff = await getDifference(user.value.current_budget)
        difference.value = formatValue(diff.difference, currencySymbol, currencyCode)
        store.dispatch("SET_DIFFERENCE", difference.value)
        totalIncome.value = formatValue(income, currencySymbol, currencyCode);
        totalExpense.value = formatValue(expense, currencySymbol, currencyCode);
    } else {
        totalIncome.value = formatValue(0, '', ''); 
        totalExpense.value = formatValue(0, '', '');
    }
}

getAllOperation()


watch(month, (newMonth, oldMonth) => {
    positions.value = [];
    velocities.value = [];
    operations.value = []
    getAllOperation();
});


watch(user, (newUser, oldUser) => {
  positions.value = [];
  velocities.value = [];
  operations.value = [];
  getAllOperation();
})

const radius = 45;
const velocities = ref([]);
const positions = ref([])
const containerHeight = ref(0)
const containerWidth = ref(0)


const getClass = (operation) => (operation.type_ === "income" ? "income" : "expense");



onMounted(() => {
  const container = document.querySelector(".m-operations");
  containerHeight.value = container.clientHeight;
  containerWidth.value = container.clientWidth;
});


watch(
  () => operations.value,
  (newOperations, oldOperations) => {
    const isFullUpdate = !oldOperations || newOperations.length === 0 || newOperations.length > oldOperations.length + 1;
    if (isFullUpdate) {
      positions.value = [];
      velocities.value = [];
      for (const o of newOperations) {
        setPosition(o);
      }
    } else {
      let changedIndex = -1;
      for (let i = 0; i < newOperations.length; i++) {
        if (oldOperations[i] !== newOperations[i]) {
          changedIndex = i;
          break;
        }
      }

    if (newOperations.length > oldOperations.length) {
        setPosition(newOperations[newOperations.length - 1]);
      }
    }
  },
  { deep: true }
);

const setPosition = () => { 
  let posX, posY;
  let overlap;
  do {
    posX = Math.random() * (containerWidth.value - radius * 2);
    posY = Math.random() * (containerHeight.value - radius * 2);
    overlap = positions.value.some(pos => {
      const dx = pos.x - posX;
      const dy = pos.y - posY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < radius * 2;
    });
  } while (overlap);

  positions.value.push({ x: posX, y: posY });
  velocities.value.push({ vx: 0.7, vy: 0.7 });
};



const updatePositions = () => {
    for (let i = 0; i < positions.value.length; i++) {
        const pos = positions.value[i];
        const vel = velocities.value[i];
        pos.x += vel.vx;
        pos.y += vel.vy;
        if (pos.x < 0 || pos.x > containerWidth.value - radius * 2) {
            vel.vx *= -1;
            pos.x = Math.max(0, Math.min(pos.x, containerWidth.value - radius * 2));
        }
        if (pos.y < 0 || pos.y > containerHeight.value - radius * 2) {
            vel.vy *= -1;
            pos.y = Math.max(0, Math.min(pos.y, containerHeight.value - radius * 2));
        }
        for (let j = i + 1; j < positions.value.length; j++) {
            const otherPos = positions.value[j];
            const otherVel = velocities.value[j];
            const dx = otherPos.x - pos.x;
            const dy = otherPos.y - pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < radius * 2) {
                const angle = Math.atan2(dy, dx);
                const totalMass = radius + radius;
                vel.vx -= (Math.cos(angle) * (radius / totalMass));
                vel.vy -= (Math.sin(angle) * (radius / totalMass));
                otherVel.vx += (Math.cos(angle) * (radius / totalMass));
                otherVel.vy += (Math.sin(angle) * (radius / totalMass));
                const overlap = radius * 2 - distance;
                pos.x -= (overlap / 2) * Math.cos(angle);
                pos.y -= (overlap / 2) * Math.sin(angle);
                otherPos.x += (overlap / 2) * Math.cos(angle);
                otherPos.y += (overlap / 2) * Math.sin(angle);
            }
        }
    }
    requestAnimationFrame(updatePositions);
};

requestAnimationFrame(updatePositions);
</script>

<template>
  <m-budget-summary 
    :totalIncome="totalIncome" 
    :totalExpense="totalExpense"
    >
  </m-budget-summary>
    <div class="m-operations">
        <router-link 
            v-for="(operation, index) in operations"
            :to="{path: `/list_operation/${operation.category_id}/${null}`}"
            :key="index"
            :class="['m-operation', getClass(operation)]"
            :style="{ top: positions[index]?.y + 'px', left: positions[index]?.x + 'px' }"
        >
            <div>{{ operation.category_name }}</div>
            <div>{{ formatValue(operation.value, operation.currency_symbol, operation.currency_code) }}</div>
        </router-link>
    </div>
    <m-main-button :name="buttonName" @click-button="router.push('/add_operation/')"></m-main-button>
</template>

<style scoped>


.m-operations{
    width: 100%;
    border-bottom: 4px solid black;
    height: 66.5vh;
    position: relative;
}


.m-operation{
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  color: white;
  font-size: 12px;
  padding-top: 5px;
  position: absolute;
  transition: transform 0.2s ease; 
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  text-decoration: none;
  background-color: blue;
}


.expense{
  background-color: #6f0f0f;
}

.income{
  background-color: #097004;
}

</style>
