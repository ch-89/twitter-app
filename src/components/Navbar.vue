<script setup>
import { getAuth, signOut } from 'firebase/auth';

const links = [
    { title: "Home", icon: "fa-solid fa-home" },
    { title: "Explore", icon: "fa-solid fa-hashtag" },
    { title: "Notifications", icon: "fa-regular fa-bell" },
    { title: "Messages", icon: "fa-regular fa-envelope" },
    { title: "Bookmarks", icon: "fa-regular fa-bookmark" },
    { title: "Lists", icon: "fa-solid fa-clipboard-list" },
    { title: "Profile", icon: "fa-regular fa-user" },
    { title: "More", icon: "fa-solid fa-ellipsis" },
]

const {displayName, photoURL} = getAuth().currentUser
</script>

<template>
  <div class=" p-4 flex flex-col gap-4 col-span-2">
    <i class="fa-brands fa-twitter text-3xl text-blue-400 ml-4"></i>
    <nav>
        <a href="" v-for="{title, icon} in links" class=" flex items-center gap-4 px-4 py-3 hover:bg-gray-100 rounded-full transition-colors">
            <i :class="icon" class=" text-2xl fa-fw"></i>
            <p class=" text-lg font-semibold">{{ title }}</p>
        </a>
    </nav>
    <button class=" bg-blue-400 text-white px-4 py-3 rounded-full font-semibold">Tweet</button>
    <button @click="signOut(getAuth())" class=" flex items-center gap-4 hover:bg-gray-100 p-4 rounded-full transition-colors mt-auto text-left">
        <img :src="photoURL" class=" size-12 rounded-full object-cover">
        <div>
            <h3 class=" font-semibold">{{ displayName }}</h3>
            <p class=" text-sm text-gray-400">@handle</p>
        </div>
        <i class="fa-solid fa-ellipsis ml-auto"></i>
    </button>
  </div>
</template>