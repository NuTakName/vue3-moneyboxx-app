<script setup>

const props = defineProps({
    name: {
        type: String, 
        required: true
    }
})

const emit = defineEmits(["click-button"])
const clickButton = () => {emit('click-button')}



</script>

<template>
    <button 
        class="m-main-button"
        @click="clickButton"
        type="submit"
        >
            {{ name }}
    </button>

</template>

<style scoped>

.m-main-button{
    width: 80%;
    color: black;
    background-color: var(--tg-theme-button-color);
    padding: 10px 0px 10px 0px;
    text-align: center;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
}


</style>
