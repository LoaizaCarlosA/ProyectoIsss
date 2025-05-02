<template>
    <LayoutPrincipal>
        <ContainerWhite style="user-select: none;">
            <div class="proximamente">
                <h1>Bienvenido <span>derechohabiente</span></h1>
                <h2>Escanea tu credencial</h2>
                <div class="contenedorBuscar">
                    <i class="fa-solid fa-magnifying-glass iconoBuscar" aria-hidden="true"></i>
                    <input class="inputBuscar" type="text" v-model="codigoEscaneado" @keyup.enter="buscar"
                        ref="inputBuscar" />
                </div>
            </div>
        </ContainerWhite>

        <!-- Modal de NIP -->
        <KioskoNIP :mostrarModal="mostrarModalNIP" @cancelar="cancelarModal" @confirmar-nip="manejarNIP" />
    </LayoutPrincipal>
</template>

<script>
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import ContainerWhite from "@/layouts/ContainerWhite.vue";
import KioskoNIP from "../components/Kiosko/KioskoNIP.vue"; 

export default {
    components: {
        LayoutPrincipal,
        ContainerWhite,
        KioskoNIP, 
    },
    data() {
        return {
            codigoEscaneado: "",      // Aquí almacenas el código escaneado
            mostrarModalNIP: false,   // Controla la visibilidad del modal de NIP
        };
    },
    mounted() {
        // Selecciona el input automáticamente al cargar el componente
        this.$nextTick(() => {
            this.$refs.inputBuscar.focus();
        });
    },
    methods: {
        buscar() {
            if (this.codigoEscaneado.trim()) {
                console.log("Código escaneado:", this.codigoEscaneado);
                this.mostrarModalNIP = true;
                this.$nextTick(() => {
                    console.log("Mostrar modal después de renderizado:", this.mostrarModalNIP);
                });
            }
        },
        cancelarModal() {
            this.mostrarModalNIP = false; // Cerrar el modal si el usuario cancela
        },
        manejarNIP(nip) {
            console.log("NIP ingresado:", nip);
            this.mostrarModalNIP = false; // Cerrar el modal después de confirmar
            // Aquí puedes hacer algo con el NIP, como verificarlo contra una API o similar
        }
    }
};
</script>

<style scoped>
.proximamente {
    text-align: center;
    font-size: 28px;
    color: #444;
    display: flex;
    flex-direction: column;
    height: 80vh;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

h1 {
    margin-top: 0px;
    font-style: italic;
}

h2 {
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 20px;
    color: #707070;
}

span {
    color: #691c32;
}

.contenedorBuscar {
    display: flex;
    align-items: center;
    background: #f1f1f1;
    border-radius: 12px;
    padding: 10px 15px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.inputBuscar {
    border: none;
    outline: none;
    background: transparent;
    padding: 8px 10px;
    font-size: 16px;
    width: 100%;
    color: black;
    font-size: 26px;
    text-align: center;
}

.iconoBuscar {
    font-size: 18px;
    margin-right: 10px;
}
/* .container-white{
    height: calc(95vh - 100px);
} */
</style>
