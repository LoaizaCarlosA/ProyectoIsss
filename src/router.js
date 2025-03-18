import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import LogIn from "./views/LogIn.vue";
import Cobaes from "./views/Cobaes.vue";
import Perfil from "./views/Perfil.vue";
import Dashboard from "./views/DashBoard.vue";
import Empleados from "./views/Empleados.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/Cobaes",
    name: "Cobaes",
    component: Cobaes,
  },
  {
    path: "/Perfil",
    name: "Perfil",
    component: Perfil,
  },
  {
    path: "/Empleados",
    name: "Empleados",
    component: Empleados,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

console.log(router.getRoutes());
