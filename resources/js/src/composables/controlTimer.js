import { ref } from 'vue'

export function useControlTimer(emit, seconds) {

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

  return {
    startTimer,
    stopTimer,
    resetTimer,
    isRunning
  }

}
