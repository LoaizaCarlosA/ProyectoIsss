<template>
    <LoadScreen v-if="mostrarLoader"></LoadScreen>
    <ModalExito v-if="mostrarExito" :mostrarExito="mostrarExito"></ModalExito>
    <ModalError v-if="mostrarError" :mostrarError="mostrarError"></ModalError>
    <ModalBase v-if="mostrarModal">
        <section class="contenedorPrincipal">
            <section>
                <div class="titulo">{{ tituloHeader }}</div>
                <div class="separador"></div>
            </section>
            <div>
                <div class="label">Número de empleado:</div>
                <input class="inputEditarNumEmp" type="text" maxlength="20" name="" id="numeroEmpleado"
                    :value="numeroEmpleado.toString().padStart(4, '0')" readonly />
            </div>
            <div>
                <div class="label">Nombre:</div>
                <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="nombre" />
            </div>
            <div>
                <div class="label">Apellido paterno:</div>
                <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="apellidoPaterno" />
            </div>
            <div>
                <div class="label">Apellido materno:</div>
                <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="apellidoMaterno" />
            </div>
            <div>
                <div class="label">Rol:</div>
                <div>
                    <select class="buscadorSelect" name="" id="" v-model="rol">
                        <option value="" disabled selected>Seleccionar...</option>
                        <option value="ROLE_ADMIN">Administrador</option>
                        <option value="ROLE_AUXILIAR">Analista</option>
                        <option value="ROLE_REPARADOR">Jefe</option>
                    </select>
                </div>
            </div>
            <div>
                <div class="label">Correo:</div>
                <input class="inputEditar" type="text" maxlength="40" name="" id="" v-model="correo" />
            </div>
            <div class="contrasenaInput">
                <div class="">Contraseña:</div>
                <Button class="btn-GenNewPass" @click="cancelar">Generar una nueva contraseña</Button>
            </div>
            <section class="contenedorBotones">
                <Button class="btn-regresar" @click="cancelar">Regresar</Button>
                <Button class="btn-guardar" @click="registrarAdministrador">Guardar</Button>
            </section>
        </section>
    </ModalBase>
</template>

<script>

import Button from "../Forms/Button.vue";
import ModalBase from "../Modales/ModalBase.vue";
import axios from 'axios'; // Importa axios
import ModalExito from "../Modales/ModalExito.vue"; // Asegúrate de importar el modal de éxito
import ModalError from "../Modales/ModalError.vue"; // Asegúrate de importar el modal de error
import LoadScreen from '../Forms/LoadScreen.vue';

export default {
    components: {
        Button,
        ModalBase,
        ModalExito,
        ModalError,
        LoadScreen,
    },
    props: {
        tituloHeader: {
            type: String,
            default: "Editar Administrador",
        },
        admin: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showAddProducto: false,
            mostrarLoader: false,
            mostrarModal: true,
            mostrarExito: false,
            mostrarError: false,
            nombre: this.admin.nombre || '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            correo: '',
            clave: '',
            rol: 'ROLE_ADMIN', // Por defecto el rol es Administrador
            numeroEmpleado: '',
        };
    },
    emits: ["cancelar"],
    methods: {
        mostrarAddService() {
            this.showAddProducto = true;
        },
        ocultarAddProd() {
            this.showAddProducto = false;

        },
        cancelar() {
            this.$emit("cancelar");
        },
        registrarAdministrador() {
            this.mostrarModal = false;
            // Verificamos que el número de empleado sea válido
            if (!this.numeroEmpleado || isNaN(this.numeroEmpleado) || this.numeroEmpleado <= 0) {
                this.mostrarError = true;
                // Cerrar el modal de error después de 2 segundos
                setTimeout(() => {
                    this.mostrarError = false;
                }, 2000); // Duración del modal de error (2 segundos)
                return;
            }

            // Mostrar el modal de carga
            this.mostrarLoader = true;

            // Preparar los datos para enviar al backend
            const adminData = {
                numeroEmpleado: this.numeroEmpleado, // Usamos el valor proporcionado por el usuario
                nombre: this.nombre,
                apellidoPaterno: this.apellidoPaterno || null,
                apellidoMaterno: this.apellidoMaterno || null,
                rol: this.rol,
                correo: this.correo,
                clave: this.clave,
            };

            // Enviar la solicitud al backend
            axios.post('http://192.168.21.18:5000/api/usuarios_admin', adminData)
                .then(response => {
                    console.log('Administrador agregado con éxito', response);
                    setTimeout(() => {
                        this.mostrarLoader = false;  // Ocultar el loader
                        this.mostrarExito = true;    // Mostrar el mensaje de éxito

                        // Limpiar los campos
                        this.numeroEmpleado = '';
                        this.nombre = '';
                        this.apellidoPaterno = '';
                        this.apellidoMaterno = '';
                        this.correo = '';
                        this.clave = '';

                        // Ocultar el modal después de guardar
                        this.mostrarModal = false; // Cambia la propiedad que controla el modal

                        // Esperar 2 segundos y luego ocultar el mensaje de éxito
                        setTimeout(() => {
                            this.mostrarExito = false;
                            window.location.reload();
                        }, 2000); // Duración de la notificación de éxito (2 segundos)
                    }, 1500);
                })
                .catch(error => {
                    console.error('Error al agregar el administrador:', error);
                    this.mostrarLoader = false;
                    this.mostrarError = true;
                });
        },

    },
    watch: {
        admin: {
            immediate: true,
            handler(nuevo) {
                if (nuevo) {
                    this.numeroEmpleado = nuevo.numero_empleado || '';
                    this.nombre = nuevo.nombre || '';
                    this.apellidoPaterno = nuevo.apellido_paterno || '';
                    this.apellidoMaterno = nuevo.apellido_materno || '';
                    this.rol = nuevo.rol || 'ROLE_ADMIN';
                    this.correo = nuevo.correo || '';
                    this.clave = nuevo.contrasena || ''; // si no quieres mostrarla, déjalo vacío
                }
            }
        }
    },
};
</script>

<style scoped>
.titulo {
    padding: 30px 0px 0px 0px;
    font-size: 30px;
}

.separador {
    border-top: 3px solid #691c32;
    height: 2px;
    max-width: 100%;
    padding: 0;
    /* margin: 20px auto 0 auto; */
    margin-top: 5px;
    margin-bottom: 30px;
}

.contenedorPrincipal {
    margin: 0px 30px;
}

.label {
    /* font-weight: 500; */
    margin: 17px 0px 5px;
}

.contrasenaInput{
    display: flex;
    align-items: center;
    margin: 25px 0px 5px;
}

.inputEditar {
    width: 300px;
    height: 32px;
    border: 0px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    color: #000000;
    padding: 0px 7px;
    border-radius: 10px;
}

.inputEditarNumEmp {
    width: 300px;
    height: 32px;
    border: 0px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    color: #000000;
    padding: 0px 7px;
    border-radius: 10px;
    user-select: none;
    background-color: #e8e5e5;
}

.buscadorSelect {
    width: 100%;
    height: 32px;
    border: 0px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    padding: 0px 7px;
    border-radius: 10px;
}

.contenedorBotones {
    display: flex;
    justify-content: space-between;
    max-width: 80%;
    margin: auto;
    padding: 20px 0px 20px;
}
</style>
