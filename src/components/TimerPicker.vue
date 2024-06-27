<template lang="">
  <div
    style="border-top: 1px solid #eee"
    class="flex flex-col pt-[15px] mt-[10px] text-[14px] relative"
  >
    <div
      @click="pickTime('start')"
      class="flex justify-between mb-[10px] items-center cursor-pointer"
    >
      <div class="font-[600]">开始时间</div>
      <div>
        <span class="timeNum">{{ addZero(timeQuantum.start[0]) }}</span> :
        <span class="timeNum">{{ addZero(timeQuantum.start[1]) }}</span>
      </div>
    </div>
    <div
      @click="pickTime('end')"
      class="flex items-center justify-between cursor-pointer"
    >
      <div class="font-[600]">结束时间</div>
      <div>
        <span class="timeNum">{{ addZero(timeQuantum.end[0]) }}</span> :
        <span class="timeNum">{{ addZero(timeQuantum.end[1]) }}</span>
      </div>
    </div>
    <div
      class="flex flex-col p-[15px] h-[330px] absolute bottom-0 right-[-140px] w-[100px] rounded"
      style="border: 1px solid #eee"
      v-show="pickerShow"
    >
      <div class="grid grid-cols-2">
        <div
          class="h-[270px] overflow-y-auto text-red scoll flex flex-col items-center"
        >
          <span
            v-for="item in 24"
            :key="item"
            :class="`my-[3px] cursor-pointer hover:bg-slate-500 px-[5px] ${
              time.hour === item ? 'bg-blue-500 text-white' : ''
            }`"
            @click="pickerTime('hour', item)"
            >{{ addZero(item) }}
          </span>
        </div>
        <div
          class="h-[270px] overflow-y-auto text-red scoll flex flex-col items-center"
        >
          <span
            v-for="item in 60"
            :key="item"
            :class="`my-[3px] cursor-pointer hover:bg-slate-500 px-[5px] ${
              time.minute === item ? 'bg-blue-500 text-white' : ''
            }`"
            @click="pickerTime('minute', item)"
            >{{ addZero(item) }}
          </span>
        </div>
      </div>
      <div class="flex py-[10px] justify-around">
        <button @click="affirm" class="text-blue-500">确认</button>
        <button @click="cancel" class="text-red-500">取消</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {addZero} from "../util/addZero"

const pickerShow = ref(false);
const pickerType = ref("");
const timeQuantum = ref({
  start: [0, 0],
  end: [0, 0],
});
const time = ref<{
  hour: number;
  minute: number;
}>({
  hour: 0,
  minute: 0,
});

const pickTime = (type: string) => {
  pickerType.value = type;
  pickerShow.value = true;
};

const pickerTime = (type: string, num: number) => {
  let newTime = { ...time.value };
  if (type === "hour") {
    if (time.value.hour === num) newTime.hour = 0;
    else newTime.hour = num;
  }
  if (type === "minute") {
    if (time.value.minute === num) newTime.minute = 0;
    else newTime.minute = num;
  }
  console.log(newTime);

  time.value = newTime;
};

const affirm = () => {
  if (pickerType.value === "start") {
    timeQuantum.value = {
      ...timeQuantum.value,
      start: [time.value.hour, time.value.minute],
    };
  }
  if (pickerType.value === "end") {
    timeQuantum.value = {
      ...timeQuantum.value,
      end: [time.value.hour, time.value.minute],
    };
  }
  time.value = {
    hour: 0,
    minute: 0,
  };
  pickerShow.value = false;
};

const cancel = () => {
  time.value = {
    hour: 0,
    minute: 0,
  };
  pickerShow.value = false
};
</script>

<style lang="scss">
.scoll {
  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
}
</style>
