<script setup>
import { getAuth } from 'firebase/auth';
import { arrayRemove, arrayUnion, deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import moment from 'moment'

const props = defineProps(["tweet"])
const {uid} = getAuth().currentUser

const like = e => {
    updateDoc(doc(getFirestore(), `tweets/${props.tweet.id}`), {
        likes: props.tweet.likes.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
    })
}

const remove = e => {
    deleteDoc(doc(getFirestore(), `tweets/${props.tweet.id}`))
    deleteObject(ref(getStorage(), props.tweet.id))
}
</script>

<template>
  <div class=" border-b p-4 grid gap-4">
    <div class=" flex items-start gap-4">
        <img :src="tweet.photoURL" class=" size-12 rounded-full object-cover">
        <div>
            <h3 class=" font-semibold">{{ tweet.displayName }}</h3>
            <p class=" text-sm text-gray-400">{{ moment(tweet.timestamp?.toDate()).fromNow() }}</p>
        </div>
        <button @click="remove" class=" ml-auto">
            <i class="fa-solid fa-ellipsis"></i>
        </button>
    </div>
    <p>{{ tweet.message }}</p>
    <img :src="tweet.photo" class=" w-full rounded-2xl">
    <div class=" flex justify-evenly">
        <button>
            <i class="fa-regular fa-comment"></i> 0
        </button>
        <button>
            <i class="fa-solid fa-retweet"></i> 0
        </button>
        <button @click="like">
            <i :class="tweet.likes.includes(uid) ? 'fa-solid text-red-400' : 'fa-regular'" class="fa-heart"></i> {{ tweet.likes.length }}
        </button>
        <button>
            <i class="fa-solid fa-share-square"></i> 0
        </button>
    </div>
  </div>
</template>