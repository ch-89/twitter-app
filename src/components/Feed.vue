<script setup>
import { getAuth } from "firebase/auth";
import Tweet from "./Tweet.vue"
import { ref } from "vue";
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, doc, setDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";

const {displayName, photoURL} = getAuth().currentUser
const message = ref("")
const tweets = ref([])
const photo = ref(null)
const loading = ref(false)

const reader = new FileReader
reader.addEventListener("load", e => photo.value = reader.result)
const preview = e => reader.readAsDataURL(e.target.files[0])

const add = async e => {
    loading.value = true

    const docRef = doc(collection(getFirestore(), "tweets"))
    const photoRef = storageRef(getStorage(), docRef.id)

    await uploadString(photoRef, photo.value, "data_url")

    await setDoc(docRef, {
        displayName,
        photoURL,
        message: message.value,
        photo: await getDownloadURL(photoRef),
        likes: [],
        timestamp: serverTimestamp()
    })

    message.value = ""
    photo.value = null
    loading.value = false
}

onSnapshot(
    query(
        collection(getFirestore(), "tweets"),
        orderBy("timestamp", "desc")
    ),
    snapshot => tweets.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)
</script>

<template>
  <div class=" col-span-3 overflow-auto scrollbar-hide">
    <header class=" border-b p-4 flex items-center justify-between sticky top-0 z-10 bg-white/50 backdrop-blur">
        <h2 class=" font-semibold">Home</h2>
        <i class="fa-regular fa-star"></i>
    </header>
    <form @submit.prevent="add" class=" border-b p-4 grid grid-cols-[auto_1fr] gap-4">
        <img :src="photoURL" class=" size-12 rounded-full object-cover">
        <input v-model.trim="message" required placeholder="What's happening?" class=" outline-none">
        <img :src="photo" v-if="photo" @click="photo = null" class=" col-start-2 w-24 rounded-xl cursor-pointer">
        <div class=" col-start-2 flex items-center gap-4 text-blue-400">
            <label class=" cursor-pointer">
                <input type="file" hidden required accept="image/*" @change="preview">
                <i class="fa-regular fa-image"></i>
            </label>
            <button type="button">
                <i class="fa-solid fa-film"></i>
            </button>
            <button type="button">
                <i class="fa-regular fa-chart-bar"></i>
            </button>
            <button type="button">
                <i class="fa-regular fa-smile"></i>
            </button>
            <button type="button">
                <i class="fa-regular fa-calendar-alt"></i>
            </button>
            <button type="button">
                <i class="fa-solid fa-location-dot"></i>
            </button>
            <button type="submit" :disabled="loading" :class="{ loading }" class=" bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold ml-auto">Tweet</button>
        </div>
    </form>
    <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
  </div>
</template>

<style scoped>
.loading {
    @apply text-transparent cursor-not-allowed grid place-items-center after:absolute after:w-4 after:h-4 after:border-2 after:border-white after:rounded-full after:border-r-transparent after:border-t-transparent after:animate-spin;
}
</style>