// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Si tienes un archivo CSS global, impórtalo aquí. 
// import './assets/main.css' 

const app = createApp(App)

app.use(createPinia())// Activamos Pinia
app.use(router)// Activamos Router

app.mount('#app')
