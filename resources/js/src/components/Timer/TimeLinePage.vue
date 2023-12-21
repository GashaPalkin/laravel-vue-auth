<script setup>
import TimeLineItem from '@/components/Timer/TimeLineItem.vue'
const props = defineProps(['timeLineItems', 'activitySelectOptions', 'activities'])
const emit = defineEmits(['setTimeLineActivityItem'])
import { onMounted, ref } from 'vue'

// todo: вынести в хук
const timelineItemsRefs = ref([])
function scrollToCurrentHour() {
  const currentHour = new Date().getHours()
  if (currentHour == 0) {
    document.body.scrollIntoView()
  } else {
    timelineItemsRefs.value[currentHour - 1].$el.scrollIntoView()
  }
}
// ***
onMounted(scrollToCurrentHour)
</script>

<template>
  <section class="pt-3">
    <ul class="list">
      <TimeLineItem v-for="timeLineItem in timeLineItems" :key="timeLineItem.hour" :activities="activities"
        :timeLineItem="timeLineItem" :activitySelectOptions="activitySelectOptions" ref="timelineItemsRefs"
        @selectActivity="emit('setTimeLineActivityItem', { timeLineItem, activity: $event })" />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.list {
  padding: 40px 0px 40px 0px;
  list-style-type: none;
}
</style>