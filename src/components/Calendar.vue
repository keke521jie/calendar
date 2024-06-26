<template>
  <div class="flex flex-col w-[300px] bg-white shadow-md p-[20px] rounded">
    <div class="flex justify-around font-bold">
      <button @click="handlePrevYear">&lt;&lt;</button>
      <button @click="handlePrevMonth">&lt;</button>
      <div>{{ date.getFullYear() }} 年 {{ getMonth() }}</div>
      <button @click="handleNextMonth">&gt;</button>
      <button @click="handleNextYear">&gt;&gt;</button>
    </div>
    <div class="grid grid-cols-7 py-[20px]">
      <div class="week">S</div>
      <div class="week">M</div>
      <div class="week">T</div>
      <div class="week">W</div>
      <div class="week">T</div>
      <div class="week">F</div>
      <div class="week">S</div>
    </div>
    <div class="grid grid-cols-7 gap-[5px]">
      <div
        v-for="(day, index) in renderDates()"
        :key="index"
        :class="`${day === '' ? 'empty' : 'day'} ${day === 14 || day === 15 ? 'fill' : undefined}`"
        :style="day === date.getDate() ? checkStyle : undefined"
        @click="clickHandle(day)"
      >
        {{ day }}
      </div>
    </div>
    <div style="border-top:1px solid #eee;" class="flex flex-col pt-[15px] mt-[10px] text-[14px]">
      <div class="flex justify-between mb-[10px] items-center">
        <div class="font-[600]">开始时间</div>
        <div><span class="timeNum">23</span> : <span class="timeNum">36</span></div>
      </div>
      <div class="flex items-center justify-between">
        <div class="font-[600]">结束时间</div>
        <div><span class="timeNum">23</span> : <span class="timeNum">36</span></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,withDefaults } from "vue";

const checkStyle = {
  border: "1px solid #a855f7",
  color: "#a855f7",
};

const props = withDefaults(defineProps<{
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}>(),{
  defaultValue:new Date()
}) 
const date = ref(props.defaultValue);

const getMonth = () => {
  return date.value.getMonth() + 1 > 10
    ? date.value.getMonth() + 1
    : `0${date.value.getMonth() + 1}`;
};

const handlePrevMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1, date.value.getDate());
};

const handleNextMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1, date.value.getDate());
};

const handlePrevYear = () => {
  date.value = new Date(date.value.getFullYear() - 1 , date.value.getMonth(), date.value.getDate());
};

const handleNextYear = () => {
  date.value = new Date(date.value.getFullYear() + 1, date.value.getMonth(), date.value.getDate());
};

const daysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const firstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const renderDates = () => {
  let days = [];
  const daysCount = daysOfMonth(
    date.value.getFullYear(),
    date.value.getMonth()
  );
  const firstDay = firstDayOfMonth(
    date.value.getFullYear(),
    date.value.getMonth()
  );
  for (let i = 0; i < firstDay; i++) {
    days.push("");
  }
  for (let i = 1; i <= daysCount; i++) {
    days.push(i);
  }
  return days;
};

const clickHandle = (day:number|string) => {
  if(day === '') return
  const curDate = new Date(date.value.getFullYear(), date.value.getMonth(), day as number);
  date.value = curDate
  props.onChange?.(curDate)
}
</script>

<style>
.week {
  @apply text-gray-500 text-[12px] text-center;
}

.day {
  @apply flex items-center justify-center aspect-[1] rounded-full text-[12px];
}

.timeNum{
  @apply rounded font-[600] bg-[#eee] p-[3px]
}

.fill{
  @apply bg-[#a855f7] !text-white
}
</style>
