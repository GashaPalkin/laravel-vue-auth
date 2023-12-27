<script setup>
import ProgressItem from '@/components/Timer/ProgressItem.vue'
import { inject } from "vue";
const activities = inject('activities')

// те активности, у которых задано время на ActivitiesPage
const trackedAcitivities = activities.filter(({ secondsToComplete }) => secondsToComplete)

</script>

<template>
  <section class="container-lg pt-2 pb-5 d-flex flex-column">
    <ProgressItem v-for="(activity, index) in trackedAcitivities" :key="activity.id" :activity="activity"
      :progress="17 + (index * 19)" />    
      <!-- если нет активностей -->
    <img v-if="!trackedAcitivities.length" class="no_activities my-5" src="../../../../img/no_activities.svg" alt="no activities">  
  </section>
</template>

<style lang="scss" scoped>
.no_activities {
  max-width: 350px;
  align-self: center;
}
</style>