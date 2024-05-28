<script setup>
import axios from 'axios';
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import LoadingIcon from '@/icons/LoadingIcon.vue';

const route = useRoute();

const loading = ref(false);
const meal = ref(null);
const error = ref(null);

watch(() => route.params.id, (id) => {
    if (id) {
        fetchData(id);
    }
}, { immediate: true });

async function fetchData(id) {
    error.value = meal.value = null;
    loading.value = true;

    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = response.data;
        meal.value = data.meals[0];
    } catch (err) {
        error.value = err.toString();
    } finally {
        loading.value = false;
    }
}

const ingredients = computed(() => {
    if (!meal.value) return [];
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal.value[`strIngredient${i}`];
        const measure = meal.value[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList.push({ ingredient, measure });
        }
    }
    return ingredientsList;
});
</script>

<template>
    <div v-if="loading" class="w-full h-full flex justify-center">
        <LoadingIcon class="animate-spin h-8 w-8 self-center fill-rose-900" />
    </div>
    <div v-else-if="error" class="text-2xl text-center font-bold text-rose-500">
        Oh no, something is wrong in somewhere!!!
    </div>
    <div class="text-rose-900 px-4" v-else>
        <h1 class="font-bold text-3xl text-rose-500">{{ meal.strMeal }}</h1>
        <div class="text-sm">
            <p><b>Area:</b> {{ meal.strArea }}</p>
            <p><b>Category:</b> {{ meal.strCategory }}</p>
        </div>
        <img class="aspect-video object-cover w-full object-center rounded mt-4 mb-8" :src="meal.strMealThumb" />
        <section class="py-4 border-b border-rose-100">
            <h3 class="font-semibold text-2xl text-rose-500 mb-2">Ingredients</h3>
            <div class="grid grid-cols-2 gap-2">
                <ul>
                    <li class="font-medium text-lg">Ingredient</li>
                    <li v-for="(item, index) in ingredients" :key="index">
                        {{ item.ingredient }}
                    </li>
                </ul>
                <ul>
                    <li class="font-medium text-lg">Measure</li>
                    <li v-for="(item, index) in ingredients" :key="index">
                        {{ item.measure }}
                    </li>
                </ul>
            </div>
        </section>
        <section class="py-4 border-b border-rose-100">
            <h3 class="font-semibold text-2xl text-rose-500 mb-2">Instruction</h3>
            <p class="text-justify">{{ meal.strInstructions }}</p>
        </section>
        <section class="py-4">
            <h3 class="font-semibold text-2xl text-rose-500 mb-2">Video</h3>
            <div v-if="meal.strYoutube" class="aspect-video">
                <iframe
                    class="w-full h-full"
                    :src="`https://www.youtube.com/embed/${getYoutubeVideoId(meal.strYoutube)}`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            <p v-else>No video available.</p>
        </section>
    </div>
</template>

<script>
function getYoutubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
</script>
