<script setup>
import { ref } from 'vue';
const searchTerm = ref('');
const search = () => {
    console.log(searchTerm.value);
};
</script>

<template>
    <div>
        <input
            v-model="searchTerm"
            @input="search"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search for a meal..."
        />
    </div>
</template>
