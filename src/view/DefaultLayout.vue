<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
</script>

<template>
    <NavigationBar />
    <main>
        <div class="max-w-[800px] mx-auto w-full py-8 px-4">
            <router-view></router-view>
        </div>
    </main>
</template>
