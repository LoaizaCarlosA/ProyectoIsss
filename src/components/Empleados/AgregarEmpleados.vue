<template>
    <ModalBase v-if="mostrarModal">
        <section class="contenedorPrincipal">
            <section>
                <div class="titulo">{{ tituloHeader }}</div>
                <div class="separador"></div>
            </section>

            <div>
                <div class="label">Nombre:</div>
                <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="nombre"
                    placeholder="Ingrese el nombre" />
            </div>
            <div>
                <div class="label">Apellido paterno:</div>
                <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="apellidoPaterno"
                    placeholder="Ingrese el apellido paterno" />
            </div>
            <div>
                <div class="label">Apellido materno:</div>
                <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="apellidoMaterno"
                    placeholder="Ingrese el apellido materno" />
            </div> 
            <!--             <div>
                <div class="label">Genero:</div>
                <div>
                    <select class="buscadorSelect" name="" id="" v-model="sexo">
                        <option value="" disabled selected>Seleccionar...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>

                    </select>
                </div>
            </div> -->
<!--                         <div>
                <div class="label">Fecha de nacimiento:</div>
                <input class="inputEditar" type="date" v-model="fechaNacimiento" @change="formatoFecha" />

            </div> -->
            <div>
                <div class="label">Puesto:</div>
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
                <div class="label">Teléfono:</div>
                <input class="inputEditar" type="text" maxlength="10" name="" id="" v-model="telefono"
                    placeholder="Ingrese un teléfono" />
            </div>
            <div>
                <div class="label">Correo:</div>
                <input class="inputEditar" type="text" maxlength="40" name="" id="" v-model="correo"
                    placeholder="Ingrese un correo electrónico" />
            </div>
            <div>
                <div class="label">Contraseña:</div>
                <input class="inputEditar" type="password" name="" id="clave" v-model="clave"
                    placeholder="Ingrese una contraseña" />
            </div>
            <section class="contenedorBotones">
                <Button class="btn-regresar" @click="cancelar">Regresar</Button>
                <Button class="btn-guardar" @click="registrarEmpleado">Guardar</Button>
            </section>
        </section>
    </ModalBase>
</template>

<script>

import Button from "../Forms/Button.vue";
import ModalBase from "../Modales/ModalBase.vue";

export default {
    components: {
        Button,
        ModalBase,
    },
    props: {

        tituloHeader: {
            type: String,
            default: "Agregar empleado",
        },
    },
    data() {
        return {
            showAddProducto: false,
            mostrarLoader: false,
            mostrarModal: true,
            mostrarExito: false,
            mostrarError: false,
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            sexo: '',
            fechaNacimiento: '',
            rol: '',
            telefono: '',
            correo: '',
            clave: ''
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
        formatoFecha() {
            var partesFecha = this.fechaNacimiento.split('-'); // Divide la fecha en año, mes y día

            // Formato deseado: AAAA-MM-DD
            this.fechaNacimiento = partesFecha[0] + '-' + partesFecha[1] + '-' + partesFecha[2];

            console.log(this.fechaNacimiento); // Muestra la fecha formateada en la consola


        },

        cancelar() {
            this.$emit("cancelar");
        },
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
    padding: 30px 0px 20px;
}
</style>
