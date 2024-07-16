<script setup>
import Navbar from "./components/Navbar.vue"
import Feed from "./components/Feed.vue"
import Sidebar from "./components/Sidebar.vue"
import { ref } from "vue";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const user = ref(null)

const login = e => signInWithPopup(getAuth(), new GoogleAuthProvider)

onAuthStateChanged(getAuth(), u => user.value = u)
</script>

<template>
  <main v-if="user" class=" max-w-7xl mx-auto grid h-screen grid-cols-7 text-gray-600 divide-x">
    <Navbar/>
    <Feed/>
    <Sidebar/>
  </main>
  <div v-else class="h-screen grid place-items-center">
    <div class=" border w-96 p-8 rounded-xl grid gap-8">
      <i class="fa-brands fa-twitter text-6xl text-blue-400 justify-self-center"></i>
      <button @click="login" class=" bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-semibold">Sign In</button>
    </div>
  </div>
</template>