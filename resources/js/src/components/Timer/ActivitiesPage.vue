<script setup>
import AddIcon from '@/ui/icons/Add.vue'
import ActivitiesItem from '@/components/Timer/ActivitiesItem.vue'
import { ref } from 'vue'
const props = defineProps(['activities'])
const emit = defineEmits(['deleteActivity', 'createActivity'])
const newActivity = ref('')
</script>

<template>
  <section class="container pt-2 pb-5 d-flex flex-column">
    <div class="d-flex mt-3 mx-2 gap-2">
      <input v-model="newActivity" type="text" id="field-name" name="name" placeholder="Добавить активность"
        class="form-control form-control-lg" />
      <AddIcon size="28" :disabled="newActivity.trim() == ''"
        @click="emit('createActivity', newActivity), newActivity = ''" />
    </div>
    <!-- получаем событие delete из ActivitiesItem и сразу передаем выше в Timer событие deleteActivity с payload activity в компонент Timer" -->
    <ActivitiesItem v-for="activity in activities" :key="activity.id" :activity="activity"
      @delete="emit('deleteActivity', activity)" />
    <!-- если нет активностей -->
    <img v-if="!activities.length" class="no_activities my-5" src="../../../../img/no_activities.svg" alt="no activities">
  </section>
</template>

<style lang="scss" scoped>
.no_activities {
  max-width: 350px;
  align-self: center;
}
</style>