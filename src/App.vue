<template>
  <div class="flex justify-around pt-[100px]">
    <Calendar :defaultValue="new Date('2000-08-18')" :onChange="change"/>
    <Calendar :defaultValue="new Date('2024-08-22')" :onChange="change"/>
  </div>
</template>
<script setup lang="ts">
import Calendar from "./components/Calendar.vue";
const change = (date) => {
  console.log(`选择了${date}`);
}
</script>

<style >
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
