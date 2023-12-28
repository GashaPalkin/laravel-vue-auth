<script setup>
import Preloader from '@/components/Preloader.vue'
import TimerHeader from '@/components/Timer/TimerHeader.vue'
import TimerFooter from '@/components/Timer/TimerFooter.vue'
import TimeLinePage from '@/components/Timer/TimeLinePage.vue'
import ActivitiesPage from '@/components/Timer/ActivitiesPage.vue'
import ProgressPage from '@/components/Timer/ProgressPage.vue'
import { onMounted, ref, watch, computed, provide } from 'vue'
import { activities, createActivity, deleteActivity, timeLineItems } from '@/functions.js'

const isPreloader = ref(true)
// чтобы при перезагрузке страницы был нужный активный класс из хэша
const currentPage = ref(window.location.hash.slice(1) || 'timeline')

let activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value))

function generateActivitySelectOptions(activities) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

function setTimeLineActivityItem({ timeLineItem, activity }) {
  timeLineItem.activityId = activity?.id || null
}

function updateActivitySeconds(timeLineItem, activitySeconds) {
  timeLineItem.activitySeconds += activitySeconds
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

provide('timeLineItems', timeLineItems.value)
provide('activities', activities.value)

</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <TimerHeader />
  <main>
    <TimeLinePage v-show="currentPage === 'timeline'" :activities="activities" ref="timeline"
      :activitySelectOptions="activitySelectOptions" :timeLineItems="timeLineItems" :currentPage="currentPage"
      @setTimeLineActivityItem="setTimeLineActivityItem" @updateActivitySeconds="updateActivitySeconds" />
    <ActivitiesPage v-if="currentPage === 'activities'" :activities="activities" @deleteActivity="deleteActivity"
      @createActivity="createActivity" />
    <ProgressPage v-if="currentPage === 'progress'" />
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