import { computed } from "vue";
import { getTotalActivitySeconds } from '@/functions.js'

export function useProgress(activity, timeLineItems) {
  const secondsProgressAcvtivity = computed(() => getTotalActivitySeconds(activity, timeLineItems))
  const secondsRemainToComplete = computed(() => activity.secondsToComplete - getTotalActivitySeconds(activity, timeLineItems))
  const percentToCompleteActivity = computed(() => 100 - Math.floor(secondsRemainToComplete.value * 100 / activity.secondsToComplete))

  return {
    secondsProgressAcvtivity,
    percentToCompleteActivity,
  }
}

