<script setup>
import { onMounted, ref, watch } from 'vue';
import SearchIcon from '@/icons/SearchIcon.vue';
import DropdownSelection from '@/components/DropdownSelection.vue';
import MealCard from '@/components/MealCard.vue';
import LoadingIcon from '@/icons/LoadingIcon.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const meals = ref(null);
const mealEmpty = () => {
    return meals.value.length === 0;
};
const loading = ref(false);
const error = ref(null);

const router = useRouter();

const searchDebounce = ref(null);
const debounce = () => {
    clearTimeout(searchDebounce.value);

    searchDebounce.value = setTimeout(async () => {
        router.push({ name: 'search', query: { search: searchTerm.value, category: selectedCategory.value } });
    }, 500);
}

const searchTerm = ref('');
const search = () => {
    debounce();
};

const categories = ref(null);
const selectedCategory = ref('');
const setCategory = (category) => {
    selectedCategory.value = category;
    debounce();
};

const getCategory = async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = response.data;
    categories.value = data.meals.map(meal => ({
        value: meal.strCategory,
        text: meal.strCategory,
    }));
    categories.value = [...categories.value, { value: '', text: 'All Categories' }];
    selectedCategory.value = categories.value.find(category => category.value === router.currentRoute.value.query.category)?.value || '';
};

const getMeals = async () => {
    loading.value = true;
    try {
        let response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm.value}`);
        const data = response.data.meals;

        response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.value}`);
        const categoriesData = response.data.meals;

        if (categoriesData) {
            meals.value = data.filter(meal => categoriesData.some(category => category.strMeal === meal.strMeal));
        } else {
            meals.value = data;
        }
    } catch (error) {
        error.value = error.message;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getCategory();
    searchTerm.value = router.currentRoute.value.query.search || '';
    getMeals();
});

watch(()=>router.currentRoute.value.query, () => {
    getMeals();
});

</script>

<template>
    <form class="flex flex-wrap items-center justify-between">
        <div class="basis-full md:basis-2/3 flex">
            <input
                v-model="searchTerm"
                @input="search"
                type="text"
                class="w-full p-2 border-b border-gray-300 outline-none focus:border-gray-500 transition-colors duration-300"
                placeholder="Search for a meal..."
                id="search"
                name="search"
            />
            <SearchIcon class="w-6 h-6"/>
        </div>
        <DropdownSelection class="mt-4 ml-0 md:ml-4 md:mt-0" :options="categories" :selectedOption="selectedCategory" v-on:update:selectedOption="setCategory" :name="'category'"/>
    </form>
    <div class="mt-4">
        <div v-if="loading" class="w-full h-full flex justify-center">
            <LoadingIcon class="animate-spin h-8 w-8 self-center fill-rose-900" />
        </div>
        <div v-else-if="error" class="text-2xl text-center font-bold text-rose-500">
            Oh no, something is wrong in somewhere!!!
        </div>
        <div v-else-if="meals === null || mealEmpty()" class="text-2xl text-center font-bold text-rose-900">
            There is no meals to show
        </div>
        <div v-else>
            <div class="flex flex-col md:flex-row flex-wrap">
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
    </div>
</template>
