<template>
  <div :class="'lateral-menu ' + (!collapsedMenu ? 'collapsed-menu ' : '')"></div>
  <aside class="sidebar" :class="collapsedMenu ? 'active' : ''">
    <div class="container-menu" :class="collapsedMenu ? 'active' : ''">
      <div class="cerrarMenuMovil" @click="collapseMenu">X</div>
      <div class="module-list">
        <router-link v-if="isAllowed('/Dashboard')" to="/Dashboard" class="menu-item" active-class="active">
          <i class="fa-solid fa-table-columns" aria-hidden="true"></i>
          <span v-if="collapsedMenu">Dashboard</span>
        </router-link>
        <router-link v-if="isAllowed('/Empleados')" to="/Empleado" class="menu-item" active-class="active">
          <i class="fa fa-users" aria-hidden="true"></i>
          <span v-if="collapsedMenu">Empleados</span>
        </router-link>
      </div>
      <a class="cerrar-sesion" @click="cerrarSesion">
        <img src="../assets/svg/cerrarSesion.svg" alt="icon" />
        <div class="cerrar-txt" :class="!collapsedMenu ? 'off' : ''" v-if="collapsedMenu">Cerrar sesión</div>
      </a>
      <div class="collapse-menu-lateral" @click="collapseMenu">
        <img class="chevron" src="../assets/svg/chevron.svg" alt="icon"
          v-bind:style="{ transform: collapsedMenu ? 'rotate(0deg)' : 'rotate(180deg)' }" />
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'MenuLateral',
  computed: {
    collapsedMenu() {
      return this.$store.state.collapsedMenu;
    },
  },
  methods: {
    isAllowed(route) {
      const allowedRoutes = ['/Dashboard', '/Empleados'];
      return allowedRoutes.includes(route);
    },
    collapseMenu() {
      this.$store.commit('toggleMenu');
    },
    cerrarSesion() {
      this.$router.push('/Login');
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  display: block;
  top: 85px;
  bottom: 0;
  left: 0;
  padding: 0;
  z-index: 1050;
  width: 90px;
  transition: width 0.3s ease-in-out;
  /* Solo animar width para evitar saltos */
  overflow: hidden;
  /* Evita el "salto" de contenido */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar.active {
  width: 215px;
}

.item-list-module {
  font-family: Roboto;
}

.module-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Centrado vertical */
  align-items: center;
  /* Centrado horizontal */
  width: 100%;
  /* padding-top: 27px; */
  box-sizing: border-box;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  font-size: 13px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  width: 100%;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, padding 0.3s ease-in-out;
  /* Suaviza el efecto */
}

.menu-item i {
  font-size: 30px;
  margin-right: 10px;
}

.menu-item span {
  font-size: 15px;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

/* Ocultar texto cuando está colapsado */
.sidebar:not(.active) .menu-item span {
  opacity: 0;
  width: 0;
  overflow: hidden;
  transition: width 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.menu-item:hover {
  background-color: #f2f2f2;
}

.menu-item.active {
  background-color: #d2d2d2;
  /* Esto cubre todo el ancho ahora */
}

.container-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  transition: width 0.3s ease-in-out;
  /* Transición suave */
  min-width: 90px;
  /* Evita que se colapse demasiado */
  max-width: 215px;
  /* Evita expansión irregular */
  width: 90px;
  height: 100%;
  overflow: hidden;
}

.container-menu.active {
  width: 215px;
}

.collapse-menu-lateral {
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  padding: 8px 4px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  background-color: black;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.15s all ease-in-out;
  -webkit-tap-highlight-color: transparent;
}

.collapse-menu-lateral:hover {
  transform: translateY(-50%) scale(1.1);
}

.cerrar-sesion {
  display: flex;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.4s;
}

.cerrar-sesion:hover {
  background-color: #f2f2f2;
}

.cerrar-sesion:active {
  background-color: #d2d2d2;
  transform: scale(0.9);
  border-radius: 6px;
}

.cerrar-sesion img {
  margin-right: 10px;
  opacity: 0.2;
}

.cerrar-txt {
  transition: all 0.4s;
  font-size: 12px;
  color: #616161;
  font-family: Roboto;
  display: flex;
  align-items: center;
  opacity: 1;
  overflow: hidden;
  width: max-content;
  white-space: nowrap;
}

.cerrar-sesion:active .cerrar-txt {
  color: #000;
}

.cerrar-txt.off {
  opacity: 0;
}

.cerrarMenuMovil {
  display: none;
}

.sidebar,
.container-menu {
  overflow: visible;
  /* Evita que recorte el botón */
}

.chevron {
  transition: transform 0.3s ease-in-out;
  width: 18px;
  /* Asegurar que el ícono sea visible */
  height: 18px;
}
</style>