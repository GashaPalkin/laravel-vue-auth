<script setup>
import LogoTimerIcon from '@/ui/icons/LogoTimer.vue'
import DoneHeaderIcon from '@/ui/icons/DoneHeader.vue'
import ProgressHeaderIcon from '@/ui/icons/ProgressHeader.vue'
</script>

<template>
    <nav class="navbar navbar-light pb-0">
    <div class="container-fluid align-items-start">
      <LogoTimerIcon title="TimeTracker" />
      <DoneHeaderIcon title="All Done" />
      <ProgressHeaderIcon title="Progress 10%" />
    </div>
  </nav>
</template>


<style lang="scss" scoped>

</style>