<template>
  <div class="flex flex-col w-[300px] bg-white shadow-md p-[20px] rounded">
    <div class="flex justify-around font-bold">
      <button @click="handleChange('year', -1)">&lt;&lt;</button>
      <button @click="handleChange('month', -1)">&lt;</button>
      <div>{{ date.getFullYear() }} 年 {{ getMonth() }}</div>
      <button @click="handleChange('month', 1)">&gt;</button>
      <button @click="handleChange('year', 1)">&gt;&gt;</button>
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
    <div class="grid grid-cols-7">
      <div
        v-for="(day, index) in renderDates()"
        :key="index"
        :class="`${day.content === '' ? 'empty' : 'day'} ${
          isLike(day.date, timeQuantum.start) ? 'fill' : ''
        } ${isLike(day.date, timeQuantum.end) ? 'fill' : ''} ${isBetween(day.date) ? 'bgshadow' : ''}`"
        :style="isLike(day.date, carDate) ? checkStyle : undefined"
        @click="clickHandle(day.date)"
      >
        {{ day.content }}
      </div>
    </div>
    <TimerPicker />
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect, withDefaults } from "vue";
import TimerPicker from "./TimerPicker.vue"

const checkStyle = {
  border: "1px solid #a855f7",
  color: "#a855f7",
};

const props = withDefaults(
  defineProps<{
    defaultValue?: Date;
    onChange?: (date: Date) => void;
  }>(),
  {
    // @ts-ignore
    defaultValue: new Date(),
  }
);
const date = ref(props.defaultValue);
const carDate = ref(props.defaultValue);
const carYear = ref(props.defaultValue.getFullYear());
const carMonth = ref(props.defaultValue.getMonth());

const getMonth = () => {
  return date.value.getMonth() + 1 > 10
    ? date.value.getMonth() + 1
    : `0${date.value.getMonth() + 1}`;
};

const handleChange = (type: string, num: number) => {
  if (type === "month") carMonth.value += num;
  if (type === "year") carYear.value += num;
};

watchEffect(() => {
  date.value = new Date(carYear.value, carMonth.value, date.value.getDate());
});

// 算某个月有多少天
const daysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 第一天是从周几开始的
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
    days.push({
      content: "",
    });
  }
  for (let i = 1; i <= daysCount; i++) {
    days.push({
      content: i,
      date: new Date(carYear.value, carMonth.value, i),
    });
  }
  return days;
};

// 判断俩时间是不是同一天
const isLike = (day1?: Date, day2?: Date) => {
  if (!day1 || !day2) return;
  return (
    `${day1.getFullYear()}-${day1.getMonth()}-${day1.getDate()}` ===
    `${day2.getFullYear()}-${day2.getMonth()}-${day2.getDate()}`
  );
};

const timeQuantum = ref<{
  start: Date | undefined;
  end: Date | undefined;
}>({
  start: undefined,
  end: undefined,
});

const clickHandle = (day?: Date) => {
  if (!day) return;
  if (!timeQuantum.value.start) {
    timeQuantum.value = { end:undefined, start: day };
  } else if (!timeQuantum.value.end) {
    timeQuantum.value =
      timeQuantum.value.start.getTime() > day.getTime()
        ? { end: timeQuantum.value.start, start: day }
        : { ...timeQuantum.value, end: day };
  } else {
    timeQuantum.value = { end: undefined, start: day };
  }
};

// 判断某个时间是不是在时间段内
const isBetween = (day?:Date) => {
  if(!timeQuantum.value.start || !timeQuantum.value.end || !day) return false
  return timeQuantum.value.start.getTime() <= day.getTime() && day.getTime() <= timeQuantum.value.end.getTime()
}
</script>

<style>
.week {
  @apply text-gray-500 text-[12px] text-center;
}

.day {
  @apply flex items-center justify-center aspect-[1] rounded-full text-[12px] hover:bg-slate-200 cursor-pointer;
}

.timeNum {
  @apply rounded font-[600] bg-[#eee] p-[3px];
}

.fill {
  @apply !bg-[#a855f7] !text-white;
}

.bgshadow {
  @apply before:content-[''] before:absolute before:inset-0 before:bg-purple-200 relative before:bg-opacity-30
} 
</style>
