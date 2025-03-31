<script setup>



const props = defineProps({
    name: {
        type: String, 
        required: true
    }
})

const emit = defineEmits(["click"])

const clickButton = () => {
    emit('click')
}




</script>

<template>
    <button 
        class="m-main-button-container"
        @click="clickButton"
        type="submit"
        >
            {{ name }}
    </button>

</template>

<style scoped>

.m-main-button-container {
    position: fixed;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    color: black;
    background-color: blue;
    padding: 15px 0px 15px 0px;
    text-align: center;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
}


</style>
