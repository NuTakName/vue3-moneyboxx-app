<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: mapGetters([
    'count',
  ]),
  methods: mapActions([
    'increment',
    'decrement',
  ])
}

</script>

<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>

</template>

<style scoped>
</style>
