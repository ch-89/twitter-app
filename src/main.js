import './assets/main.css'
import { initializeApp } from "firebase/app";
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

initializeApp({
    apiKey: "AIzaSyAmI0oisjnd_4Ea0-yIhxsingh33krGJyc",
    authDomain: "twitter-clone-b6abb.firebaseapp.com",
    projectId: "twitter-clone-b6abb",
    storageBucket: "twitter-clone-b6abb.appspot.com",
    messagingSenderId: "727828701111",
    appId: "1:727828701111:web:2e3239dc9ae50254509232",
    measurementId: "G-TQ2YFT522N"
})

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
