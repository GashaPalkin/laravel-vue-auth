<script setup>
const props = defineProps({
  page: String,
})
</script>

<template>
  <div class="d-flex justify-content-center w-25 ">
    <a :href="`#${page}`">
      <span class="navbar-text footer-icon">
        <b>{{ page }}</b>
        <slot></slot>
      </span>
    </a>
  </div>
</template>



<style lang="scss" scoped>
a {
  text-decoration: none;
}

.active>a>.footer-icon {
  color: #ef5b6a;
}

.active>a>.footer-icon>b {
  color: black;

}

.footer-icon {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  text-transform: uppercase;
}</style>