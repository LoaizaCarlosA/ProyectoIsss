import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import LogIn from "./views/LogIn.vue";
import Prueba from "./views/Prueba.vue";
import Perfil from "./views/Perfil.vue";
import Dashboard from "./views/DashBoard.vue";
import Empleado from "./views/Empleado.vue";

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
    path: "/prueba",
    name: "Prueba",
    component: Prueba,
  },
  {
    path: "/Perfil",
    name: "Perfil",
    component: Perfil,
  },
  {
    path: "/Empleado",
    name: "Empleado",
    component: Empleado,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

console.log(router.getRoutes());
