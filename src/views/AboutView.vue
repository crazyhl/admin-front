<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div>
      count: {{ counter.count }} doubleCOunt: {{ counter.doubleCount }}
      <el-button type="primary" @click="counter.increment()">Primary</el-button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter.ts'
import axios from '@/request/axios.ts'

const counter = useCounterStore()

axios.get('/test').then((response) => {
  console.log('response', response)
})

// axios.post('http://localhost/api/login', {
//   email: "crazyhl@163.com",
//   password: "123456789",
//   device_name: 'api',
// }).then(response => {
//   console.log(response.data);
// })
</script>
