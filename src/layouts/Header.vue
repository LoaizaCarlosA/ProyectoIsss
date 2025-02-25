<template>
    <header class="header">
        <section class="contenedorInformacion">
            <img class="imagenLogo" src="../assets/images/IsssteesinLogoBlanco.png" alt="" />
            <div class="infoContainer">
                <button class="burgerMenu mostrar-movil">
                    <!-- <img src="@assets/img/menu-movil.svg" alt="" /> -->
                </button>
                <div class="infoUsuario ocultar-movil">
                    <div class="nombreUsuario">Carlos Andrés</div>
                    <div class="locacionSistema">Administrador</div>
                </div>
                <router-link to="/Perfil">
                    <div class="contenedorIconoUsuario ocultar-movil">
                        <img class="imagenUsuario" src="../assets/svg/icono-usuario.svg" alt="" />
                    </div>
                </router-link>
            </div>
        </section>
    </header>
</template>

<script>

export default {


};
</script>

<style scoped>
.header {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    height: 70px;
    background-color: #000000;
    box-shadow: 0px 3px 6px #00000029;
    -webkit-box-shadow: 0px 3px 6px #00000029;
    -moz-box-shadow: 0px 3px 6px #00000029;
}

.contenedorInformacion {
    height: 85px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 35px;
    background-color: #691c32;
    transition: padding 0.2s;
}

.infoContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.informacionUsuario {
    display: flex;
}

.infoUsuario {
    display: flex;
    flex-direction: column;
}

.nombreUsuario {
    margin-right: 19px;
    color: #ffffff;
    min-height: 18px;
}

.locacionSistema {
    margin-right: 19px;
    color: #d5d5d5;
    min-height: 18px;
}

.contenedorIconoUsuario {
    width: 48px;
    height: 48px;
    background-color: #ffffff;
    box-shadow: 0px 3px 6px #00000029;
    -webkit-box-shadow: 0px 3px 6px #00000029;
    -moz-box-shadow: 0px 3px 6px #00000029;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.imagenUsuario {
    width: 22px;
    height: 27px;
}

.imagenLogo {
    width: auto;
    height: 50px;
}

.burgerMenu {
    width: 55px;
    height: 50px;
    background-color: #000000;
    border: 0;
    cursor: pointer;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.burgerMenu:hover {
    background-color: #202020;
}

.burgerMenu:active {
    background-color: #000000;
    transform: scale(0.95);
}

.ocultar-movil {
    display: flex;
}

.mostrar-movil {
    display: none;
}

@media (max-width: 767px) {
    .contenedorInformacion {
        padding: 0 20px;
    }

    .ocultar-movil {
        display: none;
    }

    .mostrar-movil {
        display: flex;
    }
}
</style>