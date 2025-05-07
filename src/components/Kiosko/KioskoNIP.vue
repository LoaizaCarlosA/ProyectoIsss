<template>
    <ModalBaseConfirmacion v-if="mostrarModal">
        <section class="contenedorPrincipal">
            <section>
                <div class="contenedorLogo">
                    <img class="imgLogo" src="@/assets/images/ISSSTEESIN_HORIZONTAL.png" alt="" />
                </div>
                <div class="separador"></div>
            </section>
            <div class="titulo">
                <div class="mensajeEliminar">
                    {{ mensajeExito }}
                </div>
                <div class="NombreUsuario">
                    <input ref="input1" maxlength="1" type="password" @input="handleInput($event, 0)"
                        @keydown="handleBackspace($event, 0)" />
                    <input ref="input2" maxlength="1" type="password" @input="handleInput($event, 1)"
                        @keydown="handleBackspace($event, 1)" />
                    <input ref="input3" maxlength="1" type="password" @input="handleInput($event, 2)"
                        @keydown="handleBackspace($event, 2)" />
                    <input ref="input4" maxlength="1" type="password" @input="handleInput($event, 3)"
                        @keydown="handleBackspace($event, 3)" />
                </div>
            </div>
            <section class="contenedorBotones">
                <Button class="btn-regresar" @click="cancelar">Cancelar</Button>
                <Button class="btn-confirmar-eliminar" @click="confirmarNIP">Confirmar</Button>
            </section>
        </section>

    </ModalBaseConfirmacion>
    <LoadScreen v-if="showAddProducto" @cerrar="ocultarAddProd"></LoadScreen>
</template>

<script>
import ModalBaseConfirmacion from "../Modales/ModalBaseConfirmacion.vue";
import LoadScreen from "../Forms/LoadScreen.vue";
import Button from "../Forms/Button.vue";

export default {
    components: {
        ModalBaseConfirmacion,
        LoadScreen,
        Button,
    },
    props: {
        mensajeExito: {
            type: String,
            default: "Ingrese su NIP ",
        },
        nombreUsuario: {
            type: String,
            default: "",
        },
        mostrarModal: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            nip: ["", "", "", ""],
            showAddProducto: false,
        };
    },
    emits: ["cancelar", "confirmar-nip"],
    watch: {
        mostrarModal(newValue) {
            // Si el modal se muestra, enfocar el primer campo de NIP
            if (newValue) {
                this.$nextTick(() => {
                    this.$refs.input1.focus();
                });
            }
        }
    },
    methods: {
        handleInput(event, index) {
            const value = event.target.value;
            if (/^\d$/.test(value)) {
                this.nip[index] = value;
                const nextInput = this.$refs[`input${index + 2}`]; // Índice para el siguiente input
                if (nextInput) {
                    nextInput.focus();
                }
            } else {
                event.target.value = ""; // Limpiar si no es un número
            }
        },
        handleBackspace(event, index) {
            if (event.key === "Backspace" && this.nip[index] === "") {
                // Retroceder al primer campo vacío hacia atrás
                for (let i = index - 1; i >= 0; i--) {
                    if (this.nip[i] === "") {
                        const prevInput = this.$refs[`input${i + 1}`]; // Enfocar el input anterior
                        if (prevInput) {
                            prevInput.focus();
                        }
                        break;
                    }
                }
            }
        },
        cancelar() {
            this.$emit("cancelar");
        },
        confirmarNIP() {
            if (this.nip.every(n => n !== "")) {
                const nip = this.nip.join("");
                console.log("✅ NIP completo ingresado:", nip);

                this.modalConfirmado = true;
                this.$emit("confirmar-nip", nip);
                this.resetInputs();

                console.log("🔄 Activando loader...");
                this.showAddProducto = true;

                this.$nextTick(() => {
                    console.log("🕐 Loader debería estar visible ahora");

                    setTimeout(() => {
                        console.log("✅ Espera terminada, redirigiendo...");
                        this.showAddProducto = false;
                        this.$emit("cancelar"); // Cierra el modal
                        this.$router.push({ name: 'KioskoInicio' });
                    }, 1300);
                });
            } else {
                console.warn("⚠️ NIP incompleto, no se puede confirmar");
                alert("Por favor ingrese un NIP de 4 dígitos.");
            }
        },
        resetInputs() {
            this.nip = ["", "", "", ""];
            Object.keys(this.$refs).forEach((ref) => {
                this.$refs[ref].value = "";
            });
            this.$refs.input1.focus(); // Volver a enfocar el primer input después de reiniciar
        },
    }
};
</script>

<style scoped>
.contenido-modal {
    min-width: 500px !important;
}

.titulo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 25px;
    align-items: center;
    font-weight: bold;
}

.contenedorLogo {
    justify-content: center;
    display: flex;
    padding: 30px 0px 10px;
}

.imgLogo {
    height: 40px;
}

.separador {
    border-top: 3px solid #691c32;
    height: 2px;
    max-width: 100%;
    margin-top: 5px;
    margin-bottom: 30px;
}

.contenedorPrincipal {
    margin: 0px 30px;
}

.contenedorBotones {
    display: flex;
    justify-content: space-evenly;
    max-width: 80%;
    margin: auto;
    padding: 30px 0px 30px;
}

.NombreUsuario {
    font-style: italic;
    color: #691c32;
}

input {
    margin: 25px 10px 0px;
    height: 150px;
    width: 100px;
    border-radius: 10px;
    font-size: 70px;
    text-align: center;
    border: 2px solid #ccc;
}
</style>
