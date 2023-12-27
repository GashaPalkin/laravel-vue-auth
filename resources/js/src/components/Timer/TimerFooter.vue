<script setup>
import TimelineFooterIcon from '@/ui/icons/TimelineFooter.vue'
import ProgressFooterIcon from '@/ui/icons/ProgressFooter.vue'
import ActivitiesFooterIcon from '@/ui/icons/ActivitiesFooter.vue'
import TimerFooterItem from '@/components/Timer/TimerFooterItem.vue'
const props = defineProps({
  currentPage: String,
})
const emit = defineEmits(['navigate'])
const footerLinks = {
  timeline: TimelineFooterIcon,
  activities: ActivitiesFooterIcon,
  progress: ProgressFooterIcon,
}
</script>

<template>
  <nav class="navbar fixed-bottom navbar-light py-0 ">
    <div class="container justify-content-center">
      <!-- перебираем объект. page-ключ icon-значение -->
      <TimerFooterItem v-for="icon, page in footerLinks" :key="page" :page="page"
        :class="{ 'active': page == currentPage }" @click="emit('navigate', page)">
        <!-- динамический компонент. зависит от значения. передаем в slot-->
        <component :is="icon" />
      </TimerFooterItem>
    </div>
  </nav>
</template>


<style lang="scss" scoped></style>