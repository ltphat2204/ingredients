<script setup>
import HamburgerIcon from '@/icons/HamburgerIcon.vue';
import CrossIcon from '@/icons/CrossIcon.vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { ref } from 'vue';

const mobileNav = ref(false);
const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
};

onBeforeRouteUpdate(() => {
    mobileNav.value = false;
});
</script>

<template>
    <header class="flex bg-rose-950 text-rose-50 py-4 px-8 justify-between">
        <div class="text-2xl">RANDOM INGREDIENT</div>
        <HamburgerIcon class="md:hidden w-8 h-8 fill-rose-50" @click="toggleMobileNav()" />
        <nav
            class="fixed md:hidden right-0 top-0 h-screen bg-rose-900 p-6 flex flex-col transition-transform duration-500 ease-in-out text-xl"
            :class="mobileNav ? 'translate-x-0' : 'translate-x-full'"
        >
            <CrossIcon
                class="md:hidden w-8 h-8 fill-rose-50 self-end mb-8"
                @click="toggleMobileNav()"
            />
            <router-link class="py-4 px-16 border-b border-rose-100" :to="{ name: 'home' }">
                Home
            </router-link>
            <router-link class="p-4 px-16" :to="{ name: 'search' }"> Search </router-link>
        </nav>
        <nav class="md:block hidden">
            <router-link class="px-4 py-2 hover:text-rose-300" :to="{ name: 'home' }">
                Home
            </router-link>
            <router-link class="px-4 py-2 hover:text-rose-300" :to="{ name: 'search' }">
                Search
            </router-link>
        </nav>
    </header>
</template>
