
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const user = computed(() => store.state.user)
const token = computed(() => store.state.token)
const logoutHandler = () => {
   console.log('logged out')
   localStorage.removeItem('x_xsrf_token')
   localStorage.removeItem('user_name')
   store.commit('SET_TOKEN', null)
   axios.post('/logout').then(router.push('/login'))
}
</script> 

<template>
   <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-2">
         <div class="container-fluid">
            <a class="navbar-brand" href="#">Laravel & Vue</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
               aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
               <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                     <router-link class="nav-link" to="/">Главная</router-link>
                  </li>
                  <li class="nav-item">
                     <router-link class="nav-link" to="/posts">Статьи</router-link>
                  </li>
                  <li class="nav-item">
                     <router-link class="nav-link" to="/timer">Таймер</router-link>
                  </li>
               </ul>
               <div class="d-flex">
                  <!-- <input class="form-control me-2" type="search" placeholder="Найти..." aria-label="Search">
                  <button class="btn btn-outline-light" type="submit">Поиск</button> -->
                  <router-link class="nav-link" to="/create-post">
                     <button v-if="token" class="btn btn-success mx-2" type="submit">Добавить пост</button>
                  </router-link>
                  <router-link class="nav-link" to="/account">
                     <button v-if="token" class="btn btn-outline-light">{{ user }}</button>
                  </router-link>
                  <router-link class="nav-link" to="/login">
                     <button v-if="!token" class="btn btn-success mx-2" type="submit">Войти</button>
                  </router-link>
                  <router-link class="nav-link" to="/register">
                     <button v-if="!token" class="btn btn-outline-light mx-0" type="submit">Регистрация</button>
                  </router-link>
                  <button v-if="token" @click="logoutHandler" class="btn btn-outline-info mx-2"
                     type="submit">Выйти</button>
               </div>
            </div>
         </div>
      </nav>
   </header>
</template>

<style lang="scss" scoped></style>