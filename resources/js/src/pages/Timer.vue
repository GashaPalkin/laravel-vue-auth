<script setup>
import Preloader from '@/components/Preloader.vue'
import TimerHeader from '@/components/Timer/TimerHeader.vue'
import TimerFooter from '@/components/Timer/TimerFooter.vue'
import TimeLinePage from '@/components/Timer/TimeLinePage.vue'
import ActivitiesPage from '@/components/Timer/ActivitiesPage.vue'
import ProgressPage from '@/components/Timer/ProgressPage.vue'
import { onMounted, ref, watch, computed } from 'vue'
const isPreloader = ref(true)
// чтобы при перезагрузке страницы был нужный активный класс из хэша
const currentPage = ref(window.location.hash.slice(1) || 'timeline')

const timeLineItems = ref(generateTimeLineItems())
// генерация массива объектов
function generateTimeLineItems() {
  const timeLineItems = []
  for (let hour = 0; hour < 24; hour++) {
    // по дефолту в инпуте / activitySeconds: 0
    timeLineItems.push({ hour, activityId: null, activitySeconds: 900 })
  }
  return timeLineItems
}

const activities = ref(generateActivities())
const secondsInHour = 3600
function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
function generateActivities() {
  // здесь hours - это индекс в массиве
  return ['reading', 'coding', 'workout', 'sleep'].map((name, hours) => ({
    id: id(),
    name: name,    
    secondsToComplete: null
    // secondsToComplete: hours * secondsInHour
  }))
}

let activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))
function generateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

function setTimeLineActivityItem({ timeLineItem, activity }) {
  timeLineItem.activityId = activity?.id || null
}

const createActivity = (activity) => {
  activities.value.push({
    id: id(),
    name: activity,
    secondsToComplete: 0
  })
}

const deleteActivity = (activity) => {
  // обнуление activityId в селекте, если удалить активность на странице activities
  timeLineItems.value.forEach((timeLineItem) => {
    if (timeLineItem.activityId == activity.id) {    
      timeLineItem.activityId = null
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

// для обновления activitySelectOptions при изменении activities. используется в select в TimeLinePage
watch(activities.value, (newActivities) => {
  activitySelectOptions = generateActivitySelectOptions(newActivities)
})

onMounted(async () => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 350);
})

</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <TimerHeader />
  <main>
    <TimeLinePage v-if="currentPage == 'timeline'" :activities="activities" :activitySelectOptions="activitySelectOptions"
      :timeLineItems="timeLineItems" @setTimeLineActivityItem="setTimeLineActivityItem" />
    <ActivitiesPage v-if="currentPage == 'activities'" :activities="activities" @deleteActivity="deleteActivity"
      @createActivity="createActivity" />
    <ProgressPage v-if="currentPage == 'progress'" />
  </main>
  <!-- $event - спец переменная для emit -->
  <TimerFooter :currentPage="currentPage" @navigate="currentPage = $event" />
</template>

<style lang="scss" scoped>
.navbar {
  background-color: #e3f2fd;
}

.percent {
  font-weight: bold;

}
</style>