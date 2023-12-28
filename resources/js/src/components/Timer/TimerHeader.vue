<script setup>
import { inject } from "vue";
import LogoTimerIcon from '@/ui/icons/LogoTimer.vue'
import DoneHeaderIcon from '@/ui/icons/DoneHeader.vue'
import ProgressHeaderIcon from '@/ui/icons/ProgressHeader.vue'
import { trackedActivities } from '@/functions.js'
import { useTotalProgress } from '@/composables/totalProgress.js'
const timeLineItems = inject('timeLineItems')
const { totalPercent, colorIconProgress } = useTotalProgress(timeLineItems)
</script>

<template>
  <nav class="navbar navbar-light pb-0">
    <div class="container-fluid align-items-start">
      <LogoTimerIcon title="TimeTracker" />
      <DoneHeaderIcon v-if="trackedActivities.length === 0" title="NOTHING TO DO" />
      <ProgressHeaderIcon v-else :title="'PROGRESS ' + totalPercent + '%'" :color="colorIconProgress" />
    </div>
  </nav>
</template>
