<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <span class="navbar-text d-flex align-items-end">
    <b>{{ title }}</b>
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#198754" class="bi bi-check-circle-fill ms-2"
      viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
  </span>
</template>