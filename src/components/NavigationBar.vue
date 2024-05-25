<script setup>
    import HamburgerIcon from '@/icons/HamburgerIcon.vue';
    import CrossIcon from '@/icons/CrossIcon.vue';
    import { ref } from 'vue';

    const mobileNav = ref(false);
    const toggleMobileNav = () => {
        mobileNav.value = !mobileNav.value;
    };
</script>

<template>
    <header class="flex bg-rose-950 text-rose-50 py-4 px-8 justify-between">
        <div class="text-2xl">RANDOM INGREDIENT</div>
        <div class="md:hidden">
            <HamburgerIcon v-if="!mobileNav" class="w-8 h-8 fill-rose-50" @click="toggleMobileNav()"/>
            <CrossIcon v-else class="w-8 h-8 fill-rose-50" @click="toggleMobileNav()"/>
        </div>
        <nav class="md:block" :class="mobileNav ? 'block' : 'hidden'">
            <router-link
                :to="{ name: 'home' }"
            >
                Home
            </router-link>
            <router-link
                :to="{ name: 'search' }"
            >
                Search
            </router-link>
        </nav>
    </header>
</template>