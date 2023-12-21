<script setup>
import Preloader from '@/components/Preloader.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
const router = useRouter()
const store = useStore()
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const errorText = ref('')
const isPreloader = ref(true)
onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 350);
})
const registerHandler = () => {
  axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    })
      .then(response => {
        console.log(response)
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
          <h2 class="text-uppercase text-center">Создать аккаунт</h2>
          <div v-if="errorText" class="alert alert-danger" role="alert">
            <b>{{ errorText }}</b>
          </div>
          <form @submit.prevent="registerHandler" class="d-flex flex-column gap-2">
            <input type="text" id="field-name" name="name" placeholder="Ваше Имя" v-model="name"
              class="form-control form-control-lg" />
            <input type="email" id="field-email" name="email" placeholder="Ваш Email" v-model="email"
              class="form-control form-control-lg" />
            <input type="password" id="field-password" name="password" placeholder="Пароль" v-model="password"
              class="form-control form-control-lg" />
            <input type="password" id="field-password-confirmation" name="password_confirmation"
              placeholder="Повторите Ваш пароль" v-model="password_confirmation" class="form-control form-control-lg" />
            <p class="text-center text-muted">
              Уже зарегистрированы?
              <router-link to="/login"><u>Залогиньтесь здесь</u></router-link>
            </p>
            <button type="submit" class="btn w-100 gradient-button ">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>