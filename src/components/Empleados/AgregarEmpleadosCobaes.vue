<template>
    <ModalBase v-if="mostrarModal">
        <section class="contenedorPrincipal">
            <section>
                <div class="titulo">{{ tituloHeader }}</div>
                <div class="separador"></div>
            </section>
            <section class="seccionUno">
                <div>
                    <div class="label">Número de empleado:</div>
                    <input class="inputEditar" inputmode="numeric" maxlength="7" name="" id="" v-model="nombre"
                        @input="validateNumber" placeholder="Ingrese el número de empleado" />
                    <div class="errorInputs" v-if="errorNumeroEmpleado">Este campo
                        es obligatorio.
                    </div>
                </div>
                <div>
                    <div class="label">RFC:</div>
                    <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="RFC"
                        placeholder="Ingrese el RFC" />
                    <div class="errorInputs" v-if="errorRFC">Este campo es
                        obligatorio.</div>
                </div>
            </section>
            <section class="seccionDos">
                <div>
                    <div class="label">Nombre:</div>
                    <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="Nombre"
                        placeholder="Ingrese el nombre" />
                    <div class="errorInputs" v-if="errorNombre">Este campo es
                        obligatorio.</div>
                </div>
                <div>
                    <div class="label">CURP:</div>
                    <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="CURP"
                        placeholder="Ingrese el CURP" />
                    <div class="errorInputs" v-if="errorCURP">Este campo es
                        obligatorio.</div>
                </div>
            </section>
            <section class="seccionTres">
                <div>
                    <div class="label">Apellido Paterno:</div>
                    <input class="inputEditar" type="text" maxlength="20" name="" id="" v-model="apellidoPaterno"
                        placeholder="Ingrese el apellido paterno" />
                    <div class="errorInputs" v-if="errorApellidoPaterno">Este campo
                        es obligatorio.
                    </div>
                </div>
                <div>
                    <div class="label">Plaza:</div>
                    <input class="inputEditar" inputmode="numeric" maxlength="12" name="" id="" v-model="Plaza"
                        @input="validateNumber" placeholder="Ingrese el número de plaza" />
                    <div class="errorInputs" v-if="errorPlaza">Este campo es
                        obligatorio.</div>
                </div>
            </section>
            <section class="seccionCuatro">
                <div>
                    <div class="label">Apellido Materno:</div>
                    <input class="inputEditar" type="text" maxlength="7" name="" id="" v-model="apellidoMaterno"
                        placeholder="Ingrese el apellido materno" />
                    <div class="errorInputs" v-if="errorApellidoMaterno">Este campo
                        es obligatorio.
                    </div>
                </div>
                <div>
                    <div class="label">Sueldo Neto Quincenal:</div>
                    <input class="inputEditar" type="text" name="" id="clave" v-model="formattedSalaryNeto"
                        @input="formatSalaryNeto" placeholder="Ingrese el sueldo neto quincenal" />
                    <div class="errorInputs" v-if="errorSueldoNetoQuincenal">Este
                        campo es obligatorio.
                    </div>
                </div>
            </section>
            <section class="seccionCinco">
                <div>
                    <div class="label">Municipio:</div>
                    <input class="inputEditar" type="text" name="" id="clave" v-model="municipio"
                        placeholder="Ingrese el municipio" />
                    <div class="errorInputs" v-if="errorMunicipio">Este campo es
                        obligatorio.</div>
                </div>
                <div>
                    <div class="label">Sueldo Base:</div>
                    <input class="inputEditar" type="text" name="" id="clave" v-model="formattedSalaryBase"
                        @input="formatSalaryBase" placeholder="Ingrese el sueldo base" />
                    <div class="errorInputs" v-if="errorSueldoBase">Este campo es
                        obligatorio.</div>
                </div>
            </section>
            <section class="seccionSeis">
                <div>
                    <div class="label">Fecha Ingreso:</div>
                    <input class="inputEditar" type="date" name="" id="clave" v-model="fechaIngreso"
                        placeholder="Ingrese la fecha de ingreso" />
                    <div class="errorInputs" v-if="errorFechaIngreso">Este campo es
                        obligatorio.</div>
                </div>
                <div>
                    <div class="label">Aportación ISSSTEESIN:</div>
                    <input class="inputEditar" type="text" name="" id="clave" v-model="formattedAportacionIsssteesin"
                        @input="formatAportacionIsssteesin" placeholder="Ingrese la aportación de ISSSTEESIN" />
                    <div class="errorInputs" v-if="errorAportacionIsssteesin">Este
                        campo es
                        obligatorio.</div>
                </div>
            </section>
            <section class="seccionSeis">
                <div>
                    <div class="label">Banco:</div>
                    <input class="inputEditar" type="text" name="" id="clave" v-model="Banco"
                        placeholder="Ingrese el banco" />
                    <div class="errorInputs" v-if="errorBanco">Este campo es
                        obligatorio.</div>
                </div>
                <div>
                    <div class="label">Aportación Vivienda:</div>
                    <input class="inputEditar" type="text" name="" id="clave" v-model="formattedAportacionVivienda"
                        @input="formatAportacionVivienda" placeholder="Ingrese la aportación de vivienda" />
                    <div class="errorInputs" v-if="errorAportacionVivienda">Este
                        campo es obligatorio.
                    </div>
                </div>
            </section>
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
            default: "Agregar empleado de COBAES",
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
            clave: '',
            formattedSalaryBase: "", // Sueldo Base
            formattedSalaryNeto: "", // Sueldo Neto
            SueldoBase: "", // Para almacenar el valor numérico del sueldo base sin el signo de pesos
            SueldoNetoQuincenal: "", // Para almacenar el valor numérico del sueldo neto sin el signo de pesos
            formattedAportacionIsssteesin: "", // Aportación ISSSTEESIN con formato
            formattedAportacionVivienda: "", // Aportación Vivienda con formato
            AportacionIsssteesin: "", // Valor numérico de la aportación ISSSTEESIN
            AportacionVivienda: "", // Valor numérico de la aportación Vivienda

            errorNombre: false,
            errorRFC: false,
            errorApellidoPaterno: false,
            errorApellidoMaterno: false,
            errorPlaza: false,
            errorSueldoBase: false,
            errorSueldoNeto: false,
            errorMunicipio: false,
            errorFechaIngreso: false,
            errorAportacionIsssteesin: false,
            errorAportacionVivienda: false,
            errorBanco: false,
            errorNumeroEmpleado: false,
            errorCURP: false,
            errorSueldoNetoQuincenal: false,
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
            var partesFecha = this.fechaNacimiento.split('-');
            this.fechaNacimiento = partesFecha[0] + '-' + partesFecha[1] + '-' + partesFecha[2];
            console.log(this.fechaNacimiento);
        },

        cancelar() {
            this.$emit("cancelar");
        },
        validateNumber(event) {
            const regex = /^[0-9]*$/;
            const value = event.target.value;
            if (!regex.test(value)) {
                event.target.value = value.replace(/[^0-9]/g, '');
                this.nombre = event.target.value;
            }
        },
        formatSalaryBase(event) {
            let value = event.target.value;
            value = value.replace(/[^0-9.]/g, "");
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            value = value.replace(/(\.\d{2})\d+$/, "$1");
            if (value && value !== "0") {
                value = "$" + value;
            }
            this.formattedSalaryBase = value;
            this.SueldoBase = value.replace(/[^0-9.]/g, "");
        },

        formatSalaryNeto(event) {
            let value = event.target.value;
            value = value.replace(/[^0-9.]/g, "");
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            value = value.replace(/(\.\d{2})\d+$/, "$1");
            if (value && value !== "0") {
                value = "$" + value;
            }
            this.formattedSalaryNeto = value;
            this.SueldoNetoQuincenal = value.replace(/[^0-9.]/g, "");
        },
        formatAportacionIsssteesin(event) {
            let value = event.target.value;
            value = value.replace(/[^0-9.]/g, "");
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            value = value.replace(/(\.\d{2})\d+$/, "$1");
            if (value && value !== "0") {
                value = "$" + value;
            }
            this.formattedAportacionIsssteesin = value;
            this.AportacionIsssteesin = value.replace(/[^0-9.]/g, "");
        },

        formatAportacionVivienda(event) {
            let value = event.target.value;
            value = value.replace(/[^0-9.]/g, "");
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            value = value.replace(/(\.\d{2})\d+$/, "$1");
            if (value && value !== "0") {
                value = "$" + value;
            }
            this.formattedAportacionVivienda = value;
            this.AportacionVivienda = value.replace(/[^0-9.]/g, "");
        },
        registrarEmpleado() {
            this.errorNumeroEmpleado = !this.nombre;
            this.errorRFC = !this.RFC;
            this.errorNombre = !this.Nombre;
            this.errorCURP = !this.CURP;
            this.errorApellidoPaterno = !this.apellidoPaterno;
            this.errorApellidoMaterno = !this.apellidoMaterno;
            this.errorPlaza = !this.Plaza;
            this.errorSueldoBase = !this.formattedSalaryBase;
            this.errorSueldoNeto = !this.formattedSalaryNeto;
            this.errorMunicipio = !this.municipio;
            this.errorFechaIngreso = !this.fechaIngreso;
            this.errorAportacionIsssteesin = !this.formattedAportacionIsssteesin;
            this.errorAportacionVivienda = !this.formattedAportacionVivienda;
            this.errorBanco = !this.Banco;
            this.errorSueldoNetoQuincenal = !this.SueldoNetoQuincenal;

            if (this.errorNumeroEmpleado || this.errorRFC || this.errorNombre || this.errorCURP ||
                this.errorApellidoPaterno || this.errorApellidoMaterno || this.errorPlaza ||
                this.errorSueldoBase || this.errorSueldoNeto || this.errorMunicipio ||
                this.errorFechaIngreso || this.errorAportacionIsssteesin || this.errorAportacionVivienda ||
                this.errorBanco || this.errorSueldoNetoQuincenal) {
                return;
            }

            // Aquí va el código para registrar el empleado
        },
    },
};
</script>

<style scoped>
.titulo {
    padding: 30px 10px 0px 10px;
    font-size: 30px;
}

.separador {
    border-top: 3px solid #691c32;
    height: 2px;
    max-width: 100%;
    padding: 0;
    margin-top: 5px;
    margin: 5px 10px 10px;
}

.contenedorPrincipal {
    margin: 0px 20px;
}

.label {
    margin: 17px 10px 5px;
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
    margin: 0px 10px;
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

.seccionUno {
    display: flex;
}

.seccionDos {
    display: flex;
}

.seccionTres {
    display: flex;
}

.seccionCuatro {
    display: flex;
}

.seccionCinco {
    display: flex;
}

.seccionSeis {
    display: flex;
}

.errorInputs {
    color: red;
    font-size: 12px;
    padding: 5px 20px 0px;
}



@media (max-width: 810px){
    .inputEditar {
    width: 300px;
    height: 32px;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    color: #000000;
    padding: 0px 7px;
    border-radius: 10px;
    margin: 0px 10px;
    border: 0.5px solid #000000;
}
.errorInputs{
    padding: 5px 18px 0px;
}

}



</style>
