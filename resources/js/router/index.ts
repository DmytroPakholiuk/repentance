import { createRouter, createWebHistory } from 'vue-router';

import Default from "../layouts/default/Default.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import MenusPage from "../pages/MenusPage.vue";
import DesignersPage from "../pages/DesignersPage.vue";
import CategoriesPage from "../pages/CategoriesPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import QuotesPage from "../pages/QuotesPage.vue";
import FaqsPage from "../pages/FaqsPage.vue";
import PagesPage from "../pages/PagesPage.vue";
import FeedbacksPage from "../pages/FeedbacksPage.vue";
import SocialLinksPage from "../pages/SocialLinksPage.vue";

const routes = [
    // {
    //     path: "/",
    //     name: "home",
    //     beforeEnter() {location.href = '/'}
    // },
    {
        // todo add actual routes for application
        path: '/',
        component: Default,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: DashboardPage
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    next();
});

export default router
