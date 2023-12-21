<script setup>
import Preloader from '@/components/Preloader.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
const router = useRouter()
const store = useStore()
const isPreloader = ref(true)
const email = ref('')
const password = ref('')
const errorText = ref('')
onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 350);
})
const loginHandler = () => {
  axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post('/login', {
      email: email.value,
      password: password.value,
    })
      .then(response => {
        console.log(response)
        console.log('logged in')
        localStorage.setItem('x_xsrf_token', response.config.headers['X-XSRF-TOKEN'])
        store.commit('SET_TOKEN', response.config.headers['X-XSRF-TOKEN'])
        localStorage.setItem('user_name', email.value)
        store.commit('SET_USER', email.value)
        router.push('/')
      })
      .catch(error => {
        errorText.value = error.response.data.message
        console.log(error.response.data.message)
      })
  })
}
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="gradient d-flex flex-column justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <h2 class="text-uppercase text-center">Войти</h2>
          <div v-if="errorText" class="alert alert-danger" role="alert">
            <b>{{ errorText }}</b>
          </div>
          <form @submit.prevent="loginHandler" class="d-flex flex-column gap-3">
            <input type="email" id="field-email" name="email" placeholder="Email" v-model="email"
              class="form-control form-control-lg" />
            <input type="password" id="field-password" name="password" placeholder="Пароль" v-model="password"
              class="form-control form-control-lg" />
            <button type="submit" class="btn w-100 gradient-button">
              Войти
            </button>
            <p class="text-center text-muted">
              Еще не зарегистрированы?
              <router-link to="/register"><u>Регистрация</u></router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped></style>