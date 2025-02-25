<template>
    <div v-bind:class="'lateral-menu ' + (!collapsedMenu ? 'collapsed-menu ' : '')"></div>
    <aside class="sidebar" :class="collapsedMenu ? 'active' : ''">
        <div class="container-menu" :class="collapsedMenu ? 'active' : ''">
            <div class="cerrarMenuMovil" @click="collapseMenu">X</div>
            <div class="module-list">
                <router-link v-if="isAllowed('/Dashboard')" to="/Dashboard" class="menu-item"
                    active-class="active">Dashboard</router-link>
<!--                 <router-link v-if="isAllowed('/Empleados')" to="/Empleados" class="menu-item"
                    active-class="active">Empleados</router-link> -->
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
  data() {
    return {
      collapsedMenu: false, 
    };
  },
  methods: {
    // Definir la función isAllowed
    isAllowed(route) {
      // Aquí iría tu lógica de autorización para las rutas
      // Esto es solo un ejemplo
      const allowedRoutes = ['/Dashboard', '/Empleados']; // Rutas permitidas
      return allowedRoutes.includes(route);
    },
    collapseMenu() {
      this.collapsedMenu = !this.collapsedMenu;
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
    top: 70px;
    bottom: 0;
    left: 0;
    padding: 0;
    z-index: 1050;
    width: 90px;
    transition: 0.3s all ease-in-out;
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
    align-items: center;
    width: 87px;
    padding-top: 27px;
    box-sizing: border-box;
}

.menu-item {
    padding: 14px;
    padding-left: 5px;
    font-size: 13px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    width: 87%;
    text-decoration: none;
    transition: all 0.4s;
}

.menu-item:hover {
    background-color: #f2f2f2;


}

.menu-item.active {

    background-color: #d2d2d2;


}

.container-menu {
    position: initial;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 0px 3px 6px #00000029;
    -webkit-box-shadow: 0px 3px 6px #00000029;
    -moz-box-shadow: 0px 3px 6px #00000029;
    transition: 0.15s all ease-in-out;
    width: 91px;
    z-index: 10;
    height: 100%;
}

.container-menu.active {
    width: 215px;
}

.collapse-menu-lateral {
    position: absolute;
    top: 45px;
    right: calc(-23px / 2);
    padding: 8px 4px;
    cursor: pointer;
    z-index: 1;
    border-radius: 100%;
    background-color: black;
    width: 23px;
    height: 23px;
    display: flex;
    justify-content: center;
    transition: 0.15s all ease-in-out;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.collapse-menu-lateral:hover {
    transform: scale(1.1);
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

.chevron {
    transition: all 0.5s;
}

@media (max-width: 1279px) {
    .container-menu {
        position: absolute;
    }
}

@media (max-width: 767px) {
    .sidebar {
        width: 0;
    }

    .sidebar.mobile-menu {
        width: 100vw;
    }
}
</style>