import "bootstrap/dist/css/bootstrap.min.css"
import '@/assets/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

import "bootstrap/dist/js/bootstrap.js"