<template>
  <div class="flex justify-around pt-[100px]">
    <Calendar :defaultValue="new Date('2000-08-18')"/>
  </div>
</template>
<script setup lang="ts">
import Calendar from "./components/Calendar.vue";
</script>

<style >
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
