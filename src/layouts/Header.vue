<template>
    <header class="header">
        <section class="contenedorInformacion">
            <img class="imagenLogo" src="../assets/images/ISSSTEESIN_HORIZONTAL_UNA_TINTA.png" alt="" />
            <div class="infoContainer">
                <router-link to="/Perfil">
                    <button class="burgerMenu mostrar-movil">
                        <img src="../assets/svg/icono-usuario.svg" alt="" />
                    </button>
                </router-link>
                <div class="infoUsuario ocultar-movil">
                    <div class="nombreUsuario">{{ nombreCompletoUsuario }}</div>
                    <div class="locacionSistema">{{ rolUsuario }}</div>
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
    data() {
        return {
            nombreUsuario: '',
            rolUsuario: '',
        };
    },
    mounted() {
        let nombre = localStorage.getItem("nombreUsuario") || "";

        const partesInvalidas = [
            "no apellido paterno",
            "no apellido materno",
            "no apellido",
            "null",
            "undefined"
        ];

        partesInvalidas.forEach(parte => {
            const regex = new RegExp(parte, 'i');
            nombre = nombre.replace(regex, "").trim();
        });

        // Reemplaza espacios múltiples con uno solo
        this.nombreCompletoUsuario = nombre.replace(/\s\s+/g, ' ');

        const rolRaw = localStorage.getItem("rolUsuario") || "ROL NO DISPONIBLE";
        this.rolUsuario = this.formatearRolUsuario(rolRaw);
    },
    methods: {
        formatearRolUsuario(rol) {
            const mapaRoles = {
                "ROLE_ADMIN": "ADMINISTRADOR",
                "ROLE_KIOSKO": "KIOSKO",
                "ROLE_USER": "USUARIO",
                "ROLE_JEFE": "JEFE",
                "ROLE_DESARROLLADOR": "DESARROLLADOR",
                "ROLE_TESTER": "TESTER",
                "ROLE_RESIDENTE": "RESIDENTE",
                // Puedes añadir más roles aquí
            };
            return mapaRoles[rol] || rol.replace("ROLE_", "").toUpperCase();
        }
    }
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
    user-select: none;
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
    font-size: 17px;
    text-align: center;
    margin-right: 20px;
    color: #ffffff;
    min-height: 18px;
}

.locacionSistema {
    font-size: 14px;
    margin-right: 20px;
    color: #d5d5d5;
    min-height: 18px;
    text-align: center;
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
    border-radius: 100%;
    border: 0;
    width: 50px;
    height: 50px;
    cursor: pointer;
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

@media (max-width: 810px) {
    .imagenLogo {
        height: 45px;
    }

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