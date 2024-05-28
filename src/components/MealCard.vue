<script setup>
    const props = defineProps(['id', 'image', 'title', 'description', 'tag']);
</script>

<template>
    <router-link class="flex py-4 px-2" :to="{ name: 'meal-detail', params: { id: props.id } }">
        <div class="basis-1/3 mr-4">
            <img :src="props.image" class="w-full h-auto rounded" />
        </div>
        <div class="basis-2/3">
            <h5 class="text-lg font-bold text-rose-500">{{ props.title }}</h5>
            <div class="limit-3 text-justify text-xs text-rose-900">{{ props.description }}</div>
            <div class="text-xs text-rose-100 font-medium flex flex-wrap mt-1">
                <div class="p-1 bg-rose-900 rounded mt-1 mr-1" v-for="(tag, index) in props.tag?.split(',')" :key="index">
                    {{ tag }}
                </div>
            </div>
        </div>
    </router-link>
</template>
