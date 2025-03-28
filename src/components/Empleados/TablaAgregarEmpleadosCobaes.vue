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
                        <Button class="btn-descargar-excel" @click="exportarExcel">
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
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import * as XLSX from "xlsx";


dayjs.extend(customParseFormat);

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
            if (!this.empleadoLocal || !this.empleadoLocal.Plazas) return 0;
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
        axios.get('http://192.168.21.18:5000/empleados')
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
        convertirFechaExcel(serialDate) {
            const fecha = new Date(1900, 0, serialDate - 1);
            return fecha;
        },
        formatearFecha(fecha) {
            if (!fecha) return 'No disponible';
            if (typeof fecha === 'number') {
                fecha = this.convertirFechaExcel(fecha);
            }
            return dayjs(fecha).format('DD/MM/YYYY');
        },
        formatearSexo(sexo) {
            if (sexo === 'F') {
                return 'FEMENINO';
            } else if (sexo === 'M') {
                return 'MASCULINO';
            } else {
                return 'No disponible';
            }
        },
        cerrarModal() {
            this.mostrarModalTabla = false;
        },
        exportarExcel() {
    if (!this.empleadoLocal || !this.empleadoLocal.Plazas.length) {
        console.warn("No hay datos para exportar.");
        return;
    }

    // 1. Encabezado con información del empleado
    const infoEmpleado = [
        ["Nombre completo:", this.empleadoLocal.Nombre_Completo],
        ["Número de empleado:", this.empleadoLocal.Numemp],
        ["RFC:", this.empleadoLocal.RFC],
        ["CURP:", this.empleadoLocal.CURP],
        ["Municipio:", this.empleadoLocal.Municipio],
        ["Sexo:", this.formatearSexo(this.empleadoLocal.Sexo)],
        [], // Espacio
        ["PLAZAS:"]
    ];

    // 2. Encabezados de la tabla de plazas
    const encabezados = [
        "Plaza",
        "Fecha Ingreso",
        "Sueldo Neto Quincenal",
        "Sueldo Base",
        "Aportación ISSSTEESIN",
        "Aportación Vivienda"
    ];

    // 3. Datos de plazas
    const datosPlazas = this.empleadoLocal.Plazas.map(plaza => ([
        plaza.Plaza || '',
        this.formatearFecha(plaza.Fecha_Ingreso),
        parseFloat(plaza.Sueldo_Neto_Quincenal) || 0,
        parseFloat(plaza.Sueldo_Base) || 0,
        parseFloat(plaza.Aportación_ISSSTEESIN) || 0,
        parseFloat(plaza.Aportación_Vivienda) || 0
    ]));

    // 4. Totales
    const filaTotales = [
        "TOTALES", "", this.totalSueldoNeto,
        this.totalSueldoBase,
        this.totalAportacionISSSTEESIN,
        this.totalAportacionVivienda
    ];

    // 5. Construir hoja
    const hoja = XLSX.utils.aoa_to_sheet([]);

    XLSX.utils.sheet_add_aoa(hoja, infoEmpleado, { origin: "A1" });
    XLSX.utils.sheet_add_aoa(hoja, [encabezados], { origin: `A${infoEmpleado.length + 1}` });
    XLSX.utils.sheet_add_aoa(hoja, datosPlazas, { origin: `A${infoEmpleado.length + 2}` });
    XLSX.utils.sheet_add_aoa(hoja, [filaTotales], { origin: `A${infoEmpleado.length + 2 + datosPlazas.length}` });

    // 6. Aplicar formato a encabezados y totales (negritas)
    const boldRows = [
        infoEmpleado.length, // fila de encabezados
        infoEmpleado.length + 2 + datosPlazas.length // fila de totales
    ];

    boldRows.forEach(rowIdx => {
        for (let col = 0; col < encabezados.length; col++) {
            const cellRef = XLSX.utils.encode_cell({ c: col, r: rowIdx });
            if (!hoja[cellRef]) continue;
            hoja[cellRef].s = {
                font: { bold: true }
            };
        }
    });

    // 7. Crear libro y exportar
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Datos del Empleado");

    const nombreArchivo = `Plazas_${this.empleadoLocal.Nombre_Completo.replace(/\s+/g, '_')}.xlsx`;
    XLSX.writeFile(libro, nombreArchivo, { cellStyles: true });
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

.cabecera {
    background: black;
    color: white;
}

.tablaPrincipal {
    display: flex;
    justify-content: center;
    align-items: center;
}

.default {
    border-collapse: collapse;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;
}

.default th {
    background-color: black;
    color: #fff;
    font-size: 16px;
    letter-spacing: 1px;
}

.default td,
.default th {
    border: none;
    padding: 15px 12px;
    text-align: center;
}

.tbody {
    font-size: 14.5px;
}

.totales[data-v-850ffab6] {
    background-color: #f1f1f1;
    font-weight: bold;
}

.default tr:nth-child(even) {
    background-color: #f8f8f8;
}

@media (max-width: 810px) {
    .titulo {
        font-size: 25px
    }

    .tituloNombre {
        font-size: 24px
    }

    .separacion {
        font-size: 15px
    }

    .fuenteSep {
        font-size: 13px
    }

    .default td {
        font-size: 12px;
        letter-spacing: 0px;
        padding: 15px 10px;
    }

    .default th {
        padding: 15px 10px;
        font-size: 14px;
        letter-spacing: 0px;
    }

    .tbody {
        font-size: 10px;
    }
}
</style>
