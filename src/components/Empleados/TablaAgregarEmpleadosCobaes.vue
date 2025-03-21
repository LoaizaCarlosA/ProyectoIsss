<template>
    <ModalBase v-show="mostrarModalTabla" @onCancelar="cancelar">
        <section class="contenedorPrincipal">
            <section>
                <div class="titulo">{{ tituloHeader }} {{ empleado ? empleado.Nombre_Completo : '' }}</div>
                <div class="separador"></div>
            </section>
            <section>
                <section class="tablaPrincipal">
                    <table class="default">
                        <thead>
                            <tr class="cabecera">
                                <th>Plaza</th>
                                <th>Nombre Completo</th>
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
                                    <td>{{ empleadoLocal.Nombre_Completo || 'No disponible' }}</td>
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
                    </table>
                </section>
            </section>
            <section class="contenedorBotones">
                <Button class="btn-regresar" @click="$emit('onCancelar')">Regresar</Button>
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
        nombreUsuario: {
            type: String,
            default: "Carlos Andrés Loaiza López",
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
                Plazas: []
            },
            mostrarModalTabla: false,
        };
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
    methods: {
        mostrarEmpleado(Numemp) {
            if (!this.data || this.data.length === 0) {
                console.warn("Los datos aún no están cargados.");
                return;
            }
            const plazasEmpleado = this.data.filter(item => item.Numemp.toString() === Numemp.toString());
            if (plazasEmpleado.length > 0) {
                this.empleadoLocal = {
                    Nombre_Completo: plazasEmpleado[0].Nombre_Completo,
                    Numemp: plazasEmpleado[0].Numemp,
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
            this.$forceUpdate();
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
        }
    }
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
    margin: 5px 10px 20px;
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
    justify-content: center;
    max-width: 80%;
    margin: auto;
    padding: 30px 0px 20px;
}
</style>
