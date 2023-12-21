// * разные способы подключения
// * ver1 не показывает blade только Vue / мне так удобнее
import './bootstrap';
import { createApp } from 'vue';
import App from '@/App.vue'
import Router from '@/router/router.js'
import Store from '@/store/store.js';

createApp(App)
   .use(Router)
   .use(Store)
   .mount('#app');

// * ver2 показывает еще и blade шаблон если в home.blade указать @extends('layouts.app')
// import './bootstrap';
// import { createApp } from 'vue';
// import App from './src/App.vue'
// const app = createApp({});
// app.component('App', App);
// app.mount('#app');