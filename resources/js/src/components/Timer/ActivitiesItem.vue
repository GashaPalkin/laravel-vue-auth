<script setup>
import RestartIcon from '@/ui/icons/Restart.vue'
import DeleteIcon from '@/ui/icons/Delete.vue'
import BaseSelect from '@/ui/BaseSelect.vue'
const props = defineProps(['activity'])
const emit = defineEmits(['delete'])
const generatePeriodSelectOptions = () => {
  const periodsInMinutes = [15, 30, 45, 60, 90, 120]
  return periodsInMinutes.map((periodInMinutes) => ({
    value: periodInMinutes * 60,
    label: generatePeriodSelectOptionsLabel(periodInMinutes)
  }))
}
const generatePeriodSelectOptionsLabel = (periodInMinutes) => {
  const hours = Math.floor(periodInMinutes / 60).toString().padStart(2, 0)
  const minutes = (periodInMinutes % 60).toString().padStart(2, 0)
  return `${hours}:${minutes}`
}
const options = generatePeriodSelectOptions()

const resetSelect = () => {
  props.activity.secondsToComplete = null
}
</script>

<template>
  <div class="mx-2 mt-3">
    <div class="d-flex gap-2 mb-1 align-items-baseline">
      <DeleteIcon size="30" @click="emit('delete')" />
      <p class="ms-2"><b>{{ activity.name }}</b></p>
    </div>
    <div class="d-flex gap-2">
      <RestartIcon size="23" @click="resetSelect" />
      <!-- по хорошему надо @select делать через emit и отправлять вверх -->
      <BaseSelect :options="options" placeholder="hh:mm" :selectedItem="activity.secondsToComplete || null"
        @select="activity.secondsToComplete = $event" />
      <input type="text" id="field-name" name="name" placeholder="00:00:00"
        class="form-control form-control-lg w-25 fs-4 fw-bold text-center" disabled />
    </div>
    <hr>
  </div>
</template>

<style lang="scss" scoped></style>