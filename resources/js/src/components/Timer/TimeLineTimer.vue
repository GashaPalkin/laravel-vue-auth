<script setup>
import RestartIcon from '@/ui/icons/Restart.vue'
import StartIcon from '@/ui/icons/Start.vue'
import PauseIcon from '@/ui/icons/Pause.vue'
import { ref } from 'vue'
const props = defineProps({
  timeLineItem: {
    type: Object
  },
  seconds: {
    default: 0,
    type: Number
  },
})
// получить в формате 00:00:00 в placeholder
function formatSeconds(seconds) {
  const date = new Date()
  date.setTime(Math.abs(seconds) * 1000)
  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

const seconds = ref(props.seconds)
const isRunning = ref(false)
const isStartButtonDisabled = props.timeLineItem.hour == new Date().getHours()
function startTimer() {
  isRunning.value = setInterval(() => {
    seconds.value++
  }, 1000)
}
function stopTimer() {
  clearInterval(isRunning.value)
  isRunning.value = false
}
function resetTimer() {
  stopTimer()
  seconds.value = 0
}
</script>

<template>
  <div class="d-flex gap-2">
    <RestartIcon size="22" @click="resetTimer" :disabled="!seconds" />
    <input type="text" :id="timeLineItem.hour" :name="timeLineItem.hour" :placeholder="formatSeconds(seconds)"
      autocomplete="off" class="form-control form-control-lg fs-4 fw-bold" disabled />
    <PauseIcon v-if="isRunning" size="25" @click="stopTimer" />
    <StartIcon v-else size="25" @click="startTimer" :disabled="!isStartButtonDisabled" />
  </div>
</template>

<style lang="scss" scoped></style>