// router.js
import { createRouter, createWebHistory } from 'vue-router';

// Usar rutas relativas correctas
import Home from './views/Home.vue';
import About from './views/About.vue';
import LandingPage from "./views/LogIn.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/Login',
    name: 'LogIn',
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
