<script setup>
import { watchPostEffect, ref, nextTick } from 'vue'
import TimeLineItem from '@/components/Timer/TimeLineItem.vue'
const props = defineProps(['timeLineItems', 'activitySelectOptions', 'activities', 'currentPage'])
const emit = defineEmits(['setTimeLineActivityItem', 'updateActivitySeconds'])

// для прокрутки к текущему часу (ссылки на элементы из цикла v-for)
const timelineItemsRefs = ref([])
function scrollToCurrentHour() {
  const currentHour = new Date().getHours()
  if (currentHour == 0) {
    document.body.scrollIntoView()
  } else {
    timelineItemsRefs.value[currentHour - 1].$el.scrollIntoView()
  }
}

// важно именно watchPostEffect в связке с async и nextTick  чтобы успело все отрисоваться
watchPostEffect(async () => {
  if (props.currentPage === 'timeline') {
    await nextTick()
    scrollToCurrentHour()
  }
})
</script>

<template>
  <section class="pt-3">
    <ul class="list">
      <TimeLineItem v-for="timeLineItem in timeLineItems" :key="timeLineItem.hour" :activities="activities"
        :timeLineItem="timeLineItem" :activitySelectOptions="activitySelectOptions" ref="timelineItemsRefs"
        @selectActivity="emit('setTimeLineActivityItem', { timeLineItem, activity: $event })"
        @updateActivitySeconds="emit('updateActivitySeconds', timeLineItem, $event)" />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.list {
  padding: 40px 0px 40px 0px;
  list-style-type: none;
}
</style>