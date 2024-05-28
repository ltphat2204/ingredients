<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import LoadingIcon from '@/icons/LoadingIcon.vue';
import MealCard from '@/components/MealCard.vue';

const loading = ref(false);
const meals = ref(null);
const err = ref(null);
const NUMBER_MEALS = 5;

const fetchMeals = async () => {
    loading.value = true;
    err.value = null;
    try {
        for (let i = 0; i < NUMBER_MEALS; i++) {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
            if (response.status !== 200) {
                throw new Error('Failed to fetch');
            }
            const data = response.data;

            if (meals.value) {
                meals.value = [...meals.value, data.meals[0]];
            } else {
                meals.value = data.meals;
            }
        }
    } catch (error) {
        err.value = error.message;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchMeals);
</script>

<template>
    <div class="px-4">
        <h3 class="text-xl font-bold text-rose-900 mb-4">Suggested for you:</h3>
        <div v-if="loading" class="w-full h-full flex justify-center">
            <LoadingIcon class="animate-spin h-8 w-8 self-center fill-rose-900" />
        </div>
        <div v-else-if="err" class="text-2xl text-center font-bold text-rose-500">
            Oh no, something is wrong in somewhere!!!
        </div>
        <div v-else class="flex flex-col md:flex-row flex-wrap">
            <MealCard
                class="md:basis-1/2"
                v-for="meal in meals"
                :key="meal.idMeal"
                :id="meal.idMeal"
                :image="meal.strMealThumb"
                :title="meal.strMeal"
                :description="meal.strInstructions"
                :tag="meal.strTags"
            />
        </div>
    </div>
</template>
