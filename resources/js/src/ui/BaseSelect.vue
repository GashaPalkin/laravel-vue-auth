<script setup>
const props = defineProps({
  selectedItem: [Number, String],
  options: {
    required: true,
    type: Array,
  },
  placeholder: {
    required: true,
    type: String
  }
})
const emit = defineEmits(['select'])
function select(value) {
  emit('select', normilizeSelectedValue(value))
}
// если null или нельзя преобразовать в number - то осталяем как есть
function normilizeSelectedValue(value) {
  return typeof value == null || isNaN(value) ? value : +value
}
</script>
  
<template>
  <select class="form-select" name="selectedItem" aria-label="default select" @change="(select($event.target.value))">
    <option :selected="selectedItem == null" disabled value="">{{ placeholder }}</option>
    <option v-for="{ value, label } in options" :key="value" :value="value" :selected="value == selectedItem">
      {{ label }}
    </option>
  </select>
</template>


<style lang="scss" scoped>
select.form-select {
  font-size: 16px;
  font-weight: 900;
  text-transform: uppercase;
  background-color: #d4e3ef;
}

@media (max-width: 768px) {
  select.form-select {
    font-size: 14px;
  }
}
</style>