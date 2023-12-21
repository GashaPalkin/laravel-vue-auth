<script setup>
import Preloader from '@/components/Preloader.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isPreloader = ref(true)
const title = ref('')
const body = ref('')
const image = ref(null)
onMounted(() => {
  setTimeout(() => {
    isPreloader.value = false;
  }, 350);
})

const file = ref(null)
const onChange = (e) => {
  console.log(e.target.files[0])
  image.value = e.target.files[0]
}
const createPost = () => { 
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  let data = new FormData()
  data.append('title', title.value)
  data.append('body', body.value)
  data.append('image', image.value)

  axios.post('/api/posts', data, config)
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
      <h1>Создать пост</h1>
      <div class="d-flex flex-column gap-3">
        <input v-model="title" type="text" id="field-name" name="text" placeholder="Заголовок"
          class="form-control form-control-lg" />
        <textarea v-model="body" class="form-control form-control-lg" id="textArea" placeholder="Текст"
          rows="5"></textarea>     
        <input ref="file" @change="onChange" class="form-control" type="file" id="formFile">
        <div class="buttons d-flex flex-row gap-2">
          <router-link class="nav-link" to="/posts">
            <button type="button" class="btn btn-danger">Отменить</button>
          </router-link>
          <button @click="createPost" type="button" class="btn btn-primary">Создать пост</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>