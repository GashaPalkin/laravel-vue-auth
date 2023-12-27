<script setup>
import DeleteIcon from '@/ui/icons/Delete.vue'
import BaseSelect from '@/ui/BaseSelect.vue'
import TimeLineTimer from '@/components/Timer/TimeLineTimer.vue'
import { computed } from 'vue'
const props = defineProps(['timeLineItem', 'activitySelectOptions', 'activities'])
const emit = defineEmits(['selectActivity', 'updateActivitySeconds'])

const currentHour = new Date().getHours()

function selectActivity(id) {
  emit(
    'selectActivity',
    props.activities.find((activity) => activity.id == id) || null
  )
}
const resetSelect = () => {
  props.timeLineItem.activityId = null
}
// чтобы часы были в одном стиле hh:mm / добавляет 0 где надо
const formattedHour = computed(() => {
  return `${props.timeLineItem.hour.toString().padStart(2, 0)}:00`
})
</script>

<template>
  <li class="list__item">
    <!-- чтобы не прокручивалось в начало страницы при клике на час - @click.prevent  -->
    <a class="item__time" @click.prevent :class="timeLineItem.hour == currentHour ? 'active' : ''" href="#">{{ formattedHour }}</a>
    <div class="container">
      <div class="d-flex gap-2 mb-3 ">
        <DeleteIcon size="30" @click="resetSelect" />
        <BaseSelect :options="activitySelectOptions" placeholder="nothing" :selectedItem="timeLineItem.activityId"
          @select="selectActivity" />
      </div>     
      <!-- получаем событие updateActivitySeconds из TimeLineComponent и сразу передаем выше в TimelinePage -->
      <TimeLineTimer :timeLineItem="timeLineItem" @updateActivitySeconds="emit('updateActivitySeconds', $event)" />
    </div>
  </li>
</template>

<style lang="scss" scoped>
.list__item {
  padding: 35px 0px;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgb(178, 178, 178);
  background-color: #f3f3f3;
}

.item__time {
  font-size: 22px;
  font-weight: 400;
  color: #494848;
  text-decoration: none;
  padding: 5px 15px;
  background-color: #e1ebf3;
  border-radius: 5px;
  position: absolute;
  top: -25px;
  left: 50%;
  translate: -50%;
}

.active {
  box-shadow: 0px 0px 15px rgb(120, 120, 120);
  color: white;
  font-weight: bold;
  background-color: #226597;
}
</style>