import './assets/main.css'

import { createApp } from 'vue'
// 1. Імпортуйте createPinia
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// 2. Створіть та підключіть Pinia
const pinia = createPinia()
app.use(pinia)

app.mount('#app')