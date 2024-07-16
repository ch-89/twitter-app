<script setup>

const users = [
    { name: "Sailor Moon", avatar: "/images/sailor.png" },
    { name: "Zelda", avatar: "/images/zelda.png" },
    { name: "Harry Potter", avatar: "/images/harry.png" },
]
</script>

<template>
  <div class="col-span-2 p-4 flex flex-col gap-4">
    <div class=" bg-gray-100 px-4 py-3 rounded-full text-gray-400 flex items-center gap-2">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input placeholder="Search Twitter" class=" flex-1 bg-transparent outline-none">
    </div>
    <div class=" bg-gray-50 rounded-2xl">
        <header class=" p-4 flex items-center justify-between">
            <h3 class=" font-semibold">Trends for you</h3>
            <button class=" text-blue-400">
                <i class="fa-solid fa-gear"></i>
            </button>
        </header>
        <div v-for="trend in ['Kalmar Slott', 'Ironman', 'Shopping']" class=" p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer transition-colors">
            <div>
                <p class=" text-sm text-gray-400">Trending in Kalmar</p>
                <h3 class=" font-semibold">{{ trend }}</h3>
            </div>
            <button>
                <i class="fa-solid fa-ellipsis"></i>
            </button>
        </div>
        <footer class=" p-4 text-sm text-blue-400">Show more</footer>
    </div>
    <div class=" bg-gray-50 rounded-2xl">
        <header class=" p-4 font-semibold">Who to follow</header>
        <div v-for="{name, avatar} in users" class=" p-4 flex items-center gap-4">
            <img :src="avatar" class=" size-12 rounded-full object-cover">
            <div>
                <h3 class=" font-semibold">{{ name }}</h3>
                <p class=" text-sm text-gray-400">@handle</p>
            </div>
            <button class=" bg-blue-400 text-white px-4 py-2 text-xs rounded-full font-semibold ml-auto">Follow</button>
        </div>
        <footer class=" p-4 text-sm text-blue-400">Show more</footer>
    </div>
  </div>
</template>