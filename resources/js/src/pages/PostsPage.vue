<script setup>
import Card from '@/components/Card.vue'
import Preloader from '@/components/Preloader.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const isPreloader = ref(true)
const items = computed(() => store.state.allPostsStore)
// для тестовых данных 
// const items = computed(() => store.state.allObjectsStoreFake)
onMounted(async () => {
   // для тестовых данных 
   // await store.dispatch('fetchAllObjectsFake')
   await store.dispatch('fetchAllPosts')   
   isPreloader.value = false;
})
</script>

<template>
   <div class="container pt-4">
      <Preloader v-show="isPreloader"></Preloader>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
         <Card v-for="item in items" :key="item.id" :item="item" />
      </div>
   </div>
</template>