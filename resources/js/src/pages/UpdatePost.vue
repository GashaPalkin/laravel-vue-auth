<script setup>
import Preloader from '@/components/Preloader.vue'
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
const successDelete = ref(false)
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const id = route.params.id
const isPreloader = ref(true)
let postDetails = reactive({})
const title = ref('')
const body = ref('')

onMounted(async () => {
  await axios.get(`/api/posts/` + id)
    .then(response => {
      postDetails = response.data
      title.value = postDetails.title
      body.value = postDetails.body
      isPreloader.value = false;
    })
    .catch(error => {
      console.log(error);
      router.push('/404')
    })
})

const updatePost = async () => {
  await axios.patch(`/api/posts/` + id, {    
    title: title.value,
    body: body.value,
  })
    .then(response => {
      console.log(response)
      successDelete.value = true
      router.push('/posts')
    })
    .catch(error => {
      console.log(error.response.data.message)
    })
}

const acceptDelete = ref(false)
const acceptDeleteHandler = (value) => {
  acceptDelete.value = value
}
const deletePost = async () => {
  await axios.delete(`/api/posts/` + id)
    .then(response => {
      console.log(response)
      router.push('/posts')
    })
    .catch(error => {
      console.log(error.response.data.message)
    })
}
</script>

<template>
  <Preloader v-show="isPreloader"></Preloader>
  <div class="container pt-4">
    <div class="row">
      <h1>Изменить пост</h1>
      <p>{{ postDetails.body }}</p>
      <!-- можно анимацию добавить -->
      <div v-if="successDelete" class="alert alert-success d-flex align-items-end" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-4"
          viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>
          <h5>Пост успешно обновлен</h5>
        </div>
      </div>
      <div v-if="acceptDelete" class="alert alert-danger d-flex align-items-end" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="50px" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-4"
          viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path
            d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>
          <h5>Вы уверены что хотите удалить пост?</h5>
          <button @click="deletePost" type="button" class="btn btn-outline-dark btn-sm back me-2">Да</button>
          <button @click="acceptDeleteHandler(false)" type="button" class="btn btn-outline-dark btn-sm back">Нет</button>
        </div>
      </div>
      <div class="d-flex flex-column gap-3">
        <input v-model="title" type="text" id="field-name" name="text" placeholder="Заголовок"
          class="form-control form-control-lg" />
        <textarea v-model="body" class="form-control form-control-lg" id="textArea" placeholder="Текст"
          rows="4"></textarea>
        <!-- <input class="form-control" type="file" id="formFile"> -->
        <div class="buttons d-flex flex-row gap-2">
          <button @click="acceptDeleteHandler(true)" type="button" class="btn btn-danger">Удалить пост</button>
          <router-link class="nav-link" to="/posts">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
          </router-link>
          <button @click="updatePost" type="button" class="btn btn-primary">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>