<script setup>
import Preloader from '@/components/Preloader.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const user = computed(() => store.state.user)
const isPreloader = ref(true)
onMounted(async () => {   
   isPreloader.value = false;
})
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="container mt-4">
      <div class="row">
         <div class="card mb-1 px-0">
            <div class="row">
               <div class="col-md-3">
                  <img src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg" class="img-fluid rounded-start" alt="cat">
               </div>
               <div class="col-md-9">
                  <div class="card-body">
                     <h1 class="card-title">{{ user }}</h1>
                     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                     <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. A itaque inventore
                        commodi perferendis necessitatibus vitae velit sint distinctio beatae tenetur ipsa saepe, culpa
                        esse? Ratione quaerat nisi quasi nihil. Odio corrupti quas unde fuga ad minus numquam, autem aut
                        quam eveniet molestias voluptas accusantium, obcaecati, omnis nostrum quia illo consequatur.</p>
                     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>

</style>