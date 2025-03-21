<template>
    <ModalBase v-show="mostrarModalTabla">
        <section class="contenedorPrincipal">
            <section>
                <section class="contenedorTituloNombre">
                    <div class="titulo">
                        {{ tituloHeader }} <span class="tituloNombre">{{ empleado ? empleado.Nombre_Completo : ''
                            }}</span>
                    </div>
                    <section class="botonesTitulo">
                        <Button class="btn-descargar-excel">
                            <i class="fa-solid fa-file-excel"></i>
                        </Button>
                        <Button class="btn-atras" @click="cancelar">
                            <i class="fa-solid fa-xmark"></i>
                        </Button>
                    </section>
                </section>
                <div class="separador"></div>
            </section>
            <section class="SeccionInfoGeneral" v-if="empleadoLocal">
                <div class="separacion">Numero de empleado: <span class="fuenteSep">{{ empleadoLocal.Numemp }}</span>
                </div>
                <div class="separacion">Género: <span class="fuenteSep">{{ formatearSexo(empleadoLocal.Sexo) }}</span>
                </div>
                <div class="separacion">RFC: <span class="fuenteSep">{{ empleadoLocal.RFC }}</span></div>
                <div class="separacion">CURP: <span class="fuenteSep">{{ empleadoLocal.CURP }}</span></div>
                <div class="separacion">Municipio: <span class="fuenteSep">{{ empleadoLocal.Municipio }}</span></div>
            </section>
            <section>
                <section class="tablaPrincipal">
                    <table class="default">
                        <thead>
                            <tr class="cabecera">
                                <th>Plaza</th>
                                <th>Fecha Ingreso</th>
                                <th>Sueldo Neto Quincenal</th>
                                <th>Sueldo Base</th>
                                <th>Aportación ISSSTEESIN</th>
                                <th>Aportación Vivienda</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <template v-if="empleadoLocal && empleadoLocal.Plazas.length">
                                <tr v-for="(plaza, index) in empleadoLocal.Plazas" :key="index">
                                    <td>{{ plaza.Plaza || 'No disponible' }}</td>
                                    <td>{{ formatearFecha(plaza.Fecha_Ingreso) || 'No disponible' }}</td>
                                    <td>$ {{ formatearNumero(plaza.Sueldo_Neto_Quincenal) || 'No disponible' }}</td>
                                    <td>$ {{ formatearNumero(plaza.Sueldo_Base) || 'No disponible' }}</td>
                                    <td>$ {{ formatearNumero(plaza.Aportación_ISSSTEESIN) || 'No disponible' }}</td>
                                    <td>$ {{ formatearNumero(plaza.Aportación_Vivienda) || 'No disponible' }}</td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="7">No hay plazas disponibles para este empleado.</td>
                                </tr>
                            </template>
                        </tbody>
                        <tfoot>
                            <tr class="totales">
                                <td><strong>Totales:</strong></td>
                                <td></td>
                                <td><strong>$ {{ formatearNumero(totalSueldoNeto) }}</strong></td>
                                <td><strong>$ {{ formatearNumero(totalSueldoBase) }}</strong></td>
                                <td><strong>$ {{ formatearNumero(totalAportacionISSSTEESIN) }}</strong></td>
                                <td><strong>$ {{ formatearNumero(totalAportacionVivienda) }}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </section>
            </section>
            <section class="contenedorBotones">

            </section>
        </section>
    </ModalBase>
</template>

<script>
import Button from "../Forms/Button.vue";
import ModalBase from "../Modales/ModalBase.vue";
import axios from 'axios';

export default {
    components: {
        Button,
        ModalBase,
    },
    props: {
        empleado: {
            type: Object,
            required: true
        },
        tituloHeader: {
            type: String,
            default: "Detalle de",
        },
        newStyle: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            data: [],
            empleadoLocal: {
                Nombre_Completo: '',
                Numemp: '',
                RFC: '',
                Plazas: []
            },
            mostrarModalTabla: false,
        };
    },
    computed: {
        totalSueldoNeto() {
            if (!this.empleadoLocal || !this.empleadoLocal.Plazas) return 0;  // Validar que 'empleadoLocal' y 'Plazas' existan
            return this.empleadoLocal.Plazas.reduce((total, plaza) => {
                return total + (parseFloat(plaza.Sueldo_Neto_Quincenal) || 0);
            }, 0);
        },
        totalSueldoBase() {
            if (!this.empleadoLocal || !this.empleadoLocal.Plazas) return 0;
            return this.empleadoLocal.Plazas.reduce((total, plaza) => {
                return total + (parseFloat(plaza.Sueldo_Base) || 0);
            }, 0);
        },
        totalAportacionISSSTEESIN() {
            if (!this.empleadoLocal || !this.empleadoLocal.Plazas) return 0;
            return this.empleadoLocal.Plazas.reduce((total, plaza) => {
                return total + (parseFloat(plaza.Aportación_ISSSTEESIN) || 0);
            }, 0);
        },
        totalAportacionVivienda() {
            if (!this.empleadoLocal || !this.empleadoLocal.Plazas) return 0;
            return this.empleadoLocal.Plazas.reduce((total, plaza) => {
                return total + (parseFloat(plaza.Aportación_Vivienda) || 0);
            }, 0);
        }
    },
    watch: {
        empleado: {
            immediate: true,
            handler(nuevoValor) {
                console.log("Empleado recibido en el modal:", nuevoValor);
                if (nuevoValor && nuevoValor.Numemp) {
                    this.mostrarEmpleado(nuevoValor.Numemp);
                } else {
                    this.empleadoLocal = null;
                }
            }
        }
    },

    mounted() {
        axios.get('http://localhost:5000/empleados')
            .then(response => {
                this.data = response.data;
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    },
    emits: ["cancelar"],
    methods: {
        mostrarEmpleado(Numemp) {
            if (!this.data || this.data.length === 0) {
                console.warn("Los datos aún no están cargados.");
                return;
            }
            const plazasEmpleado = this.data.filter(item => item.Numemp.toString() === Numemp.toString());
            if (plazasEmpleado.length > 0) {
                this.empleadoLocal = {
                    Nombre_Completo: plazasEmpleado[0].Nombre_Completo || 'No disponible',
                    Numemp: plazasEmpleado[0].Numemp,
                    RFC: plazasEmpleado[0].RFC || 'No disponible',
                    CURP: plazasEmpleado[0].CURP || 'No disponible',
                    Municipio: plazasEmpleado[0].Municipio || 'No disponible',
                    Sexo: plazasEmpleado[0].Sexo || 'No disponible',
                    Plazas: plazasEmpleado
                };
                this.mostrarModalTabla = true;
            } else {
                console.warn("No se encontraron plazas para ese número de empleado.");
                this.empleadoLocal = { Nombre_Completo: '', Numemp: Numemp, Plazas: [] };
            }
        },
        cancelar() {
            this.mostrarModalTabla = false;
        },
        formatearNumero(valor) {
            if (!valor && valor !== 0) return 'No disponible';
            return Number(valor).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        },
        formatearFecha(fecha) {
            if (!fecha) return 'No disponible';
            const fechaObj = new Date(fecha);
            if (isNaN(fechaObj)) return 'No disponible';
            const dia = String(fechaObj.getDate()).padStart(2, '0');
            const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
            const anio = fechaObj.getFullYear();
            return `${dia}/${mes}/${anio}`;
        },
        formatearSexo(sexo) {
            if (sexo === 'F') {
                return 'FEMENINO';
            } else if (sexo === 'M') {
                return 'MASCULINO';
            } else {
                return 'No disponible'; // Para manejar valores no definidos
            }
        },
        cerrarModal() {
            this.mostrarModalTabla = false; // Aquí cerramos el modal al recibir el evento
        }
    }
};
</script>

<style scoped>
.titulo {
    padding: 30px 0px 0px 0px;
    font-size: 30px;
}

.tituloNombre {
    font-style: italic;
    font-size: 27px;
    color: #691c32;
    font-weight: 600;
}

.botonesTitulo {
    padding-top: 30px;
}

.separador {
    border-top: 3px solid #691c32;
    height: 2px;
    max-width: 100%;
    padding: 0;
    margin-top: 5px;
    margin: 5px 0px 20px;
}

.SeccionInfoGeneral {
    padding-bottom: 20px;
}

.separacion {
    padding: 2.5px 0px;
    font-size: 17px;
    font-weight: bold;
}

.fuenteSep {
    font-size: 15px;
    font-weight: normal;
}

.contenedorPrincipal {
    margin: 0px 30px;
}

.contenedorTituloNombre {
    display: flex;
    justify-content: space-between;
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
    justify-content: center;
    max-width: 80%;
    margin: auto;
    padding: 30px 0px 20px;
}
.totales {
  background-color: #f1f1f1;
  font-weight: bold;
}

</style>
