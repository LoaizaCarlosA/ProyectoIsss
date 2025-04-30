<template>
    <LayoutPrincipal>
        <ContainerWhite>
            <div class="contenedor-descargas">
                <h1>Bienvenido a Descargas de Nómina</h1>
                <div class="iconos">
                    <div class="contenedorIconos">
                        <button>
                            <i class="fa-solid fa-file" aria-hidden="true"></i>
                            <div>Nómina</div>
                        </button>
                        <button>
                            <i class="fa-solid fa-receipt" aria-hidden="true"></i>
                            <div>Recibo</div>
                        </button>
                        <button>
                            <i class="" aria-hidden="true"></i>
                            <div></div>
                        </button>
                        <button>
                            <i class="" aria-hidden="true"></i>
                            <div></div>
                        </button>
                    </div>
                    <div class="contenedorIconos">
                        <button>
                            <i class="fa-solid fa-money-check-dollar" aria-hidden="true"></i>
                            <div>Préstamos</div>
                        </button>
                        <button>
                            <i class="fa-solid fa-paperclip" aria-hidden="true"></i>
                            <div>Constancias</div>
                        </button>
                        <button>
                            <i class="" aria-hidden="true"></i>
                            <div></div>
                        </button>
                        <button>
                            <i class="" aria-hidden="true"></i>
                            <div></div>
                        </button>
                    </div>
                </div>
                <Button @click="cerrarSesion" class="btn-cerrar-sesion-kiosko">
                    Cerrar sesión
                </Button>
            </div>
        </ContainerWhite>
    </LayoutPrincipal>
</template>

<script>
import ContainerWhite from '../layouts/ContainerWhite.vue';
import LayoutPrincipal from '../layouts/layoutPrincipal.vue';
import Button from '@/components/Forms/Button.vue';

export default {
    components: {
        LayoutPrincipal,
        ContainerWhite,
        Button
    },
    methods: {
        descargar(tipo) {
            alert(`Descargando ${tipo}...`);
            // Aquí podrías usar window.open(url) o un fetch para iniciar la descarga real
        },
        cerrarSesion() {
            // Aquí puedes usar Vue Router para redirigir a la página de inicio o login
            this.$router.push({ name: 'Kiosko' }); // Cambia 'login' al nombre de la ruta de tu página de login
            // O si no usas Vue Router, puedes usar algo como:
            // window.location.href = '/login'; // Redirige a la página de login
        }
    }
}
</script>

<style scoped>
.contenedor-descargas {
    text-align: center;
    padding: 50px;
    height: 70vh;
}

.iconos button {
    height: 150px;
    width: 280px;
    display: flex;
    font-size: 24px;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    border: none;
}

.iconos button:hover {
    transform: scale(1.08);
    opacity: 1;
    transition: all 0.3s;
    /*     transform: scale(1.02);
     */
}

.contenedorIconos {
    display: flex;
    justify-content: center;
}
</style>