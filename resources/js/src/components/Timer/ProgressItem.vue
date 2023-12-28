<script setup>
import { inject } from "vue";
import DoneHeaderIcon from '@/ui/icons/DoneHeader.vue'
const props = defineProps(['activity', 'progress'])
const timeLineItems = inject('timeLineItems')
import { formatSeconds, getProgressColorClass } from '@/functions.js'
import { useProgress } from '@/composables/progress.js'

const { secondsProgressAcvtivity, percentToCompleteActivity } = useProgress(props.activity, timeLineItems)

</script>

<template>
  <div class="mx-2 mt-4">
    <div class="activity-title">
      <h4 class="m-0">{{ activity.name }}</h4>
      <transition name="slide-fade">
        <DoneHeaderIcon v-if="percentToCompleteActivity >= 100" class="p-0" title="Done" />
      </transition>

    </div>
    <div class="progress mt-2">
      <div :class="getProgressColorClass(percentToCompleteActivity)" class="progress-bar progress-bar-striped bg-success"
        role="progressbar" :style="'width:' + percentToCompleteActivity + '%'" :aria-valuenow="progress" aria-valuemin="0"
        aria-valuemax="100"></div>
    </div>
    <div class="percent d-flex justify-content-between">
      <p>{{ percentToCompleteActivity }}%</p>
      <p>{{ formatSeconds(secondsProgressAcvtivity) }}/ {{ formatSeconds(props.activity.secondsToComplete) }}</p>
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