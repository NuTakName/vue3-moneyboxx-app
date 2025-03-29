<script setup>
import { ref, onMounted, watch} from 'vue';
import MMainButton from './MMainButton.vue';
import MOperation from './MOperation.vue';
import { getOperations } from '@/api/operations';

let buttonName = "+ Добавить операцию"


const isCreateOperationVisible = ref(false)

const toogleIsCreateOperationVisilbe = () => {
    isCreateOperationVisible.value = !isCreateOperationVisible.value
}

const operations = ref([])

const getAllOperation = async() => {
    const result = await getOperations(22)
    operations.value = result

}

getAllOperation()

const radius = 45;
const velocities = ref([]);
const positions = ref([])
const containerHeight = ref(0)
const containerWidth = ref(0)


onMounted(() => {
  const container = document.querySelector(".m-operations");
  containerHeight.value = container.clientHeight;
  containerWidth.value = container.clientWidth;
});


watch(
  () => operations.value,
  (newOperations, oldOperations) => {
    const isFullUpdate = !oldOperations || newOperations.length === 0 || newOperations.length > oldOperations.length + 1 || !oldOperations.every((oldOp, index) => newOperations[index] && JSON.stringify(oldOp) === JSON.stringify(newOperations[index]));
    
    if (isFullUpdate) {
      positions.value = [];
      velocities.value = [];
      for (const o of newOperations) {
        setPosition(o);
      }
    } else {
      setPosition(newOperations[newOperations.length - 1]);
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
    <div class="m-operations">
        <div 
            v-for="(operation, index) in operations"
            :key="index"
            class="m-operation"
            :style="{ top: positions[index]?.y + 'px', left: positions[index]?.x + 'px' }"
        >
            <div>{{ operation.value }}</div>
        </div>
    </div>

    <m-main-button :name="buttonName" @click="toogleIsCreateOperationVisilbe"></m-main-button>
    <m-operation 
        v-if="isCreateOperationVisible"
        @close="toogleIsCreateOperationVisilbe"
        >
    </m-operation>
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

</style>
