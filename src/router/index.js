import { createRouter, createWebHistory } from 'vue-router';
import Layout from "@/view/DefaultLayout.vue";
import HomePage from '@/view/HomePage.vue';
import SearchPage from "@/view/SearchPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Layout,
            children: [
                {
                    path: "/",
                    name: "home",
                    component: HomePage
                },
                {
                    path: "/search",
                    name: "search",
                    component: SearchPage
                }
            ]
        }
    ]
});

export default router;
