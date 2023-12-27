<script setup>
import { inject, computed } from "vue";
import DoneHeaderIcon from '@/ui/icons/DoneHeader.vue'
const props = defineProps(['activity', 'progress'])
const timeLineItems = inject('timeLineItems')

// вынести в хук. Потому что используется еще и в ActivitiesItem 
function getTotalActivitySeconds(activity, timeLineItems) {
  return timeLineItems.filter((timeLineItem) => timeLineItem.activityId === activity.id)
    .reduce((totalSeconds, timeLineItem) => Math.round(timeLineItem.activitySeconds + totalSeconds), 0)
}

// todo: вынести в хук. используется еще в компоненте TimeLineTimer и ActivitiesItem
function formatSeconds(seconds) {
  const date = new Date()
  date.setTime(Math.abs(seconds) * 1000)
  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

const totalSeconds = computed(() => getTotalActivitySeconds(props.activity, timeLineItems))
const seconds = computed(() => props.activity.secondsToComplete - getTotalActivitySeconds(props.activity, timeLineItems))
const percent = computed(() => 100 - Math.floor(seconds.value * 100 / props.activity.secondsToComplete))

function getProgressColorClass(percent) {
  if (percent < 30) return 'bg-danger'
  if (percent < 60) return 'bg-warning'
  if (percent < 90) return 'bg-info'

  return 'bg-success'
}

</script>

<template>
  <div class="mx-2 mt-4">
    <div class="activity-title">
      <h4 class="m-0">{{ activity.name }}</h4>
      <transition name="slide-fade">
        <DoneHeaderIcon v-if="percent >= 100" class="p-0" title="Done" />
      </transition>

    </div>
    <div class="progress mt-2">
      <div :class="getProgressColorClass(percent)" class="progress-bar progress-bar-striped bg-success" role="progressbar"
        :style="'width:' + percent + '%'" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="percent d-flex justify-content-between">
      <p>{{ percent }}%</p>
      <p>{{ formatSeconds(totalSeconds) }}/ {{ formatSeconds(props.activity.secondsToComplete) }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activity-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>