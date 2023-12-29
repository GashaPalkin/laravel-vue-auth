import './bootstrap';
import { createApp } from 'vue';
import App from '@/App.vue'
import Router from '@/router/router.js'
import Store from '@/store/store.js';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(Router)
app.use(Store)
app.mount('#app');