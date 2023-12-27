<script setup>
import { inject, computed } from "vue";
import LogoTimerIcon from '@/ui/icons/LogoTimer.vue'
import DoneHeaderIcon from '@/ui/icons/DoneHeader.vue'
import ProgressHeaderIcon from '@/ui/icons/ProgressHeader.vue'
const timeLineItems = inject('timeLineItems')
const activities = inject('activities')

// вынести в хук. Потому что используется еще и в ActivitiesItem 
function getTotalActivitySeconds(activity, timeLineItems) {
  return timeLineItems.filter((timeLineItem) => timeLineItem.activityId === activity.id)
    .reduce((totalSeconds, timeLineItem) => Math.round(timeLineItem.activitySeconds + totalSeconds), 0)
}

// те активности, у которых задано время на ActivitiesPage
const trackedAcitivities = computed(() => activities.filter(({ secondsToComplete }) => secondsToComplete))


const totalTrackedActivitiesSeconds = computed(() => {
  return trackedAcitivities.value
    .map((activity) => {
      let trackedSeconds = getTotalActivitySeconds(activity, timeLineItems)
      return trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete
    })
    .reduce((total, seconds) => total + seconds, 0)
})

const totalActivitiesSecondsToComplete = computed(() => {
  return trackedAcitivities.value.map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

const totalPercent = computed(() => Math.floor(totalTrackedActivitiesSeconds.value * 100 / totalActivitiesSecondsToComplete.value))

</script>

<template>
  <nav class="navbar navbar-light pb-0">
    <div class="container-fluid align-items-start">
      <LogoTimerIcon title="TimeTracker" />
      <DoneHeaderIcon v-if="trackedAcitivities.length === 0" title="All Done" />
      <ProgressHeaderIcon v-else :title="'Progress ' + totalPercent + '%'" />
    </div>
  </nav>
</template>


<style lang="scss" scoped></style>