// src/router/index.js 
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ConversationsIndexPage from '../components/ConversationsIndexPage.vue';
import ConversationShowPage from '../components/ConversationShowPage.vue'; // Component for dynamic route

// Define the routes
const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'HomePage',
    },
    {
        path: '/conversations',
        component: ConversationsIndexPage,
        name: 'Conversations',
        meta: { requiresAuth: true },  // Requires authentication
    },
    {
        path: '/conversations/:id',  // Dynamic route with an id parameter
        component: ConversationShowPage,
        name: 'ConversationShowPage',
        meta: { requiresAuth: true }  // This route also requires authentication
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,  // Pass the routes to the router
});

// Add global navigation guard to check authentication
router.beforeEach((to, from, next) => {
    // Check if user is authenticated (using localStorage as an example)
    const loggedIn = !!localStorage.getItem('user');  // Assume user info is stored in localStorage

    // If the route requires authentication and the user is not logged in, redirect to HomePage
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next({ name: 'HomePage' });  // Redirect to HomePage if not authenticated
    } else {
        next();  // Proceed to the next route if authenticated
    }
});

export default router;
