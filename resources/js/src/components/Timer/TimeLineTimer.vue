<script setup>
import RestartIcon from '@/ui/icons/Restart.vue'
import StartIcon from '@/ui/icons/Start.vue'
import PauseIcon from '@/ui/icons/Pause.vue'
import { ref } from 'vue'
import { formatSeconds } from '@/functions.js'
import { useControlTimer } from '@/composables/controlTimer.js'
const props = defineProps({
  timeLineItem: {
    type: Object
  },
})

const emit = defineEmits(['updateActivitySeconds'])
// чтобы кнопка была активна только для текущего часа
const isStartButtonDisabled = props.timeLineItem.hour == new Date().getHours()
const seconds = ref(props.timeLineItem.activitySeconds)

// const {  } = useControlTimer()

// TODO: перенести в хук controlTimer
const isRunning = ref(false)
function startTimer() {
  // в переменную, чтобы можно было сбросить (clearInterval)
  isRunning.value = setInterval(() => {
    // для обновления в объекте timeLineItem по цепочке до корневого компонента
    emit('updateActivitySeconds', 1)
    seconds.value++
  }, 1000)
}
function stopTimer() {
  clearInterval(isRunning.value)
  isRunning.value = false
}
function resetTimer() {
  stopTimer()
  emit('updateActivitySeconds', -seconds.value)
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
