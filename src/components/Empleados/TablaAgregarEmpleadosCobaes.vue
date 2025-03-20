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
                                <th>RFC</th>
                                <th>CURP</th>
                                <th>Plaza</th>
                                <th>Municipio</th>
                                <th>Banco</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-if="empleadoLocal">
                                <td>{{ empleadoLocal.Plaza || 'No disponible' }}</td>
                                <td>{{ empleadoLocal.Sueldo_Neto_Quincenal || 'No disponible' }}</td>
                                <td>{{ empleadoLocal.CURP || 'No disponible' }}</td>
                                <td>{{ empleadoLocal.Plaza || 'No disponible' }}</td>
                                <td>{{ empleadoLocal.Municipio || 'No disponible' }}</td>
                                <td>{{ empleadoLocal.Banco }}</td>
                            </tr>
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
            data: [], // Lista completa de empleados
            empleadoLocal: null, // Copia reactiva del empleado seleccionado
            mostrarModalTabla: false, // Estado del modal
        };
    },
    watch: {
        empleado: {
            immediate: true, // Se ejecuta al montar el componente
            handler(nuevoValor) {
                console.log("Empleado recibido en el modal:", nuevoValor);
                this.empleadoLocal = nuevoValor ? JSON.parse(JSON.stringify(nuevoValor)) : null;
            }
        }
    },
    mounted() {
        axios.get('http://localhost:5000/empleados')
            .then(response => {
                this.data = response.data;
                console.log("Datos recibidos del backend:", this.data); // Verifica si hay datos
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    },
    methods: {
        mostrarEmpleado(Numemp) {
            console.log("Clic en lupa", Numemp);

            // Encontrar el empleado
            const empleadoSeleccionado = this.data.find(item => item.Numemp.toString() === Numemp.toString());
            if (empleadoSeleccionado) {
                this.empleadoLocal = JSON.parse(JSON.stringify(empleadoSeleccionado)); // Crear copia reactiva
                this.mostrarModalTabla = true;
            } else {
                console.error("Empleado no encontrado");
            }
        },
        cancelar() {
            console.log("Cerrando modal...");
            this.mostrarModalTabla = false;
            this.$forceUpdate(); // 👈 Fuerza la actualización del componente
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
