import { computed } from "vue";
import { getTotalActivitySeconds } from '@/functions.js'
import { trackedActivities } from '@/functions.js'

export function useTotalProgress(timeLineItems) {

  const totalTrackedActivitiesSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) => {
        let trackedSeconds = getTotalActivitySeconds(activity, timeLineItems)
        return trackedSeconds < activity.secondsToComplete ? trackedSeconds : activity.secondsToComplete
      })
      .reduce((total, seconds) => total + seconds, 0)
  })

  const totalActivitiesSecondsToComplete = computed(() => {
    return trackedActivities.value.map(({ secondsToComplete }) => secondsToComplete)
      .reduce((total, seconds) => total + seconds, 0)
  })

  const totalPercent = computed(() => Math.floor(totalTrackedActivitiesSeconds.value * 100 / totalActivitiesSecondsToComplete.value))
  const colorIconProgress = computed(() => totalPercent.value >= 100 ? 'green' : '#dc3545')

  return {
    totalPercent,
    colorIconProgress,
  }
}

