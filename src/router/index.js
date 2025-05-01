import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'events',
        component: () => import('../views/EventsView.vue')
    },
    {
        path: '/events/:id',
        name: 'event-details',
        component: () => import('../views/EventDetailsView.vue'),
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;
