<script setup>
import Preloader from '@/components/Preloader.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const id = route.params.id
const postDetails = ref({})
const isPreloader = ref(true)
onMounted(async () => {
   await axios.get(`/api/posts/` + id)
      .then(response => {
         postDetails.value = response.data
         isPreloader.value = false;
      })
      .catch(error => {
         console.log(error);
         router.push('/404')
      })
})
</script>

<template>
   <Preloader v-show="isPreloader"></Preloader>
   <div class="container mt-4">
      <div class="row">
         <router-link class="nav-link" to="/posts">
            <button type="button" class="btn btn-outline-dark btn-sm back mb-3">Назад</button>
         </router-link>
         <div class="card mb-1 px-0">
            <div class="row">
               <div class="col-md-3">
                  <img src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg" class="img-fluid rounded-start" alt="cat">
               </div>
               <div class="col-md-9">
                  <!-- если не использовать first() в контроллере то возвращает массив и надо v-for -->
                  <div class="card-body">
                     <h1>Детальная поста на отдельной странице</h1>
                     <h1 class="card-title">{{ postDetails.title }}</h1>
                     <p>{{ postDetails.body }}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
   
<style lang="scss" scoped>
.back {
   width: 100px;

}
</style>