<script setup>

import Animated from '@/components/Animated.vue'
import Preloader from '@/components/Preloader.vue'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const counter = computed(() => store.state.count)
const decrement = () => store.commit('decrement')
const increment = () => store.commit('increment')
const isPreloader = ref(true)
onMounted(() => {
   setTimeout(() => {
      isPreloader.value = false;
   }, 350);
})
// validator
import { useForm } from 'vee-validate';
import * as yup from 'yup';
const { values, errors, defineInputBinds } = useForm({
   validationSchema: yup.object({
      email: yup.string().email().required(),
   }),
});
const email = defineInputBinds('email');
</script>

<template>
   <div class="pb-1 bg-light rounded d-flex flex-column align-items-center">
      <Preloader v-show="isPreloader"></Preloader>
      <Animated />
      <div class="pb-1 bg-light rounded w-100 d-flex flex-column align-items-center">
         <h4 class="mt-2 mb-2">Просто счетчик: <b>{{ counter }}</b></h4>
         <div class="btn-group mb-3" role="group" aria-label="btn">
            <button @click="decrement" type="button" class="btn btn-outline-primary px-4 py-1 fs-5 ">-</button>
            <button @click="increment" type="button" class="btn btn-outline-primary px-4 py-1 fs-5">+</button>
         </div>
         <!-- VeeValidate -->
         <!-- <h3>VeeValidate</h3>
         <input class="form-control w-25 mt-0 mb-1" v-bind="email" type="email" id="field-email" name="email"
            placeholder="Email" />
         <div v-if="Object.keys(errors).length !== 0" class="alert alert-danger" role="alert">
            <b v-for="err in errors">{{ err }}</b>
         </div> -->
      </div>
   </div>
   <div class="container mb-4">
      <div class="row">
         <h4 class="mt-2 mb-2 text-center mt-3">Rich Text Editor</h4>
         <QuillEditor toolbar="full" style="min-height: 120px;" />
      </div>
   </div>
   <div class="container">
      <div class="row">
         <div class="card mb-1 px-0">
            <div class="row">
               <div class="col-md-3">
                  <img src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg" class="img-fluid rounded-start" alt="cat">
               </div>
               <div class="col-md-9">
                  <div class="card-body">
                     <h1 class="card-title">Card title</h1>
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
         
<!-- old style -->
<!-- <script>
   export default {
      setup(){
         return {
            message: "World !"
         }
      }
   }
</script> -->
         
<style lang="scss" scoped>
h1 {
   color: grey;
   padding-top: 25px;
}
</style>