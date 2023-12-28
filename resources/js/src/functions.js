import { ref, computed } from 'vue'

export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export const activities = ref(generateActivities())

function generateActivities() {
  // hours - это индекс в массиве
  return ['coding', 'workout', 'reading'].map((name, hours) => ({
    id: id(),
    name: name,
    secondsToComplete: null
  }))
}

export const createActivity = (activity) => {
  activities.value.push({
    id: id(),
    name: activity,
    secondsToComplete: 0
  })
}

export const deleteActivity = (activity) => {
  // обнуление activityId в селекте, если удалить активность на странице activities
  timeLineItems.value.forEach((timeLineItem) => {
    if (timeLineItem.activityId == activity.id) {
      timeLineItem.activityId = null
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export const timeLineItems = ref(generateTimeLineItems())

function generateTimeLineItems() {
  const timeLineItems = []
  for (let hour = 0; hour < 24; hour++) {
    // по дефолту в инпуте 
    timeLineItems.push({ hour, activityId: null, activitySeconds: 0 })
  }
  return timeLineItems
}

export function getTotalActivitySeconds(activity, timeLineItems) {
  return timeLineItems.filter((timeLineItem) => timeLineItem.activityId === activity.id)
    .reduce((totalSeconds, timeLineItem) => Math.round(timeLineItem.activitySeconds + totalSeconds), 0)
}

export function formatSeconds(seconds) {
  const date = new Date()
  date.setTime(Math.abs(seconds) * 1000)
  const utc = date.toUTCString()
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

// активности, у которых задано время на ActivitiesPage
export const trackedActivities = computed(() => activities.value.filter(({ secondsToComplete }) => secondsToComplete))

export function getProgressColorClass(percent) {
  if (percent < 30) return 'bg-danger'
  if (percent < 60) return 'bg-warning'
  if (percent < 90) return 'bg-info'
  return 'bg-success'
}


