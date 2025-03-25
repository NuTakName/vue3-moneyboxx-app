<script setup>



const props = defineProps({
    name: String,
    required: true
})




</script>

<template>
    <div class="m-main-button-container">
        {{ name }}
    </div>

</template>

<style scoped>

.m-main-button-container {
    position: fixed;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    color: black;
    background-color: white;
    padding: 10px;
    text-align: center;
    border: 3px solid black;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
}


</style>
