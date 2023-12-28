<script setup>
import { inject, computed } from "vue";
import RestartIcon from '@/ui/icons/Restart.vue'
import DeleteIcon from '@/ui/icons/Delete.vue'
import BaseSelect from '@/ui/BaseSelect.vue'
import { getTotalActivitySeconds, formatSeconds } from '@/functions.js'
const props = defineProps(['activity'])
const timeLineItems = inject('timeLineItems')
const emit = defineEmits(['delete'])

const generatePeriodSelectOptions = () => {
  const periodsInMinutes = [1, 15, 30, 45, 60, 90, 120]
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

const secondsDiff = computed(() => getTotalActivitySeconds(props.activity, timeLineItems) - props.activity.secondsToComplete)
const sign = computed(() => secondsDiff.value >= 0 ? '+' : '-')
const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)
const colorsClasses = computed(() => secondsDiff.value < 0 ? 'bg-red' : 'bg-green')

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
      <input v-if="activity.secondsToComplete" type="text" id="field-name" name="name" :placeholder="seconds"
        :class="colorsClasses" class="form-control form-control-lg fw-bold text-center restOfSeconds" disabled />
    </div>
    <hr>
  </div>
</template>

<style lang="scss" scoped>
.restOfSeconds {
  padding: 0;
  width: 30%;
  font-size: 20px;
}

.bg-red {
  background-color: #ff000040 !important;
}

.bg-green {
  background-color: #0af00a42 !important;
}

@media screen and (max-width: 600px) {
  .restOfSeconds {
    width: 50%;
    font-size: 16px;
  }
}
</style>