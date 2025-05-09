<template>
    <ModalExito v-show="mostrarExito" :mostrarExito="mostrarExito" />
    <ModalConfirmacion v-if="mostrarModalConfirmacion" @confirmar="eliminarUsuario" @cancelar="cancelarEliminacion"
        :nombreUsuario="nombreAdmin" />
    <LayoutPrincipal>
        <ContainerWhite>
            <div style="height: 100%;">
                <section class="filtrosEmpleados">
                    <div class="tituloModulo">Módulo Administrador</div>
                    <div>
                        <input class="inputBuscador" type="text" v-model="searchText"
                            placeholder="Inserte nombre o ID" />
                        <Button class="btn-agregar" @click="mostrarAddService">Agregar</Button>
                    </div>
                </section>

                <section class="tabla-con-loader">
                    <div class="tabla-scrollable">
                        <table class="default">
                            <thead>
                                <tr class="cabecera">
                                    <th>No. Empleado</th>
                                    <th>Nombre</th>
                                    <th>Apellido Paterno</th>
                                    <th>Apellido Materno</th>
                                    <th>Rol</th>
                                    <th>Correo</th>
                                    <th>Contraseña</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="tbody">
                                <tr v-if="mostrarLoader" class="fila-loader">
                                    <td colspan="8" class="loader-wrapper">
                                        <LoadScreenModal class="loader-solo" />
                                    </td>
                                </tr>
                                <tr v-else-if="filteredList.length === 0">
                                    <td colspan="8" class="mensajeNoResultados">No se encontraron resultados</td>
                                </tr>
                                <tr v-else v-for="usuario in filteredList" :key="usuario.id">
                                    <td>{{ usuario.numero_empleado.toString().padStart(4, '0') }}</td>
                                    <td>{{ usuario.nombre }}</td>
                                    <td>{{ usuario.apellido_paterno === 'No Apellido Paterno' ? '-' : usuario.apellido_paterno }}</td>
                                    <td>{{ usuario.apellido_materno === 'No Apellido Materno' ? '-' : usuario.apellido_materno }}</td>
                                    <td>{{ formatearRol(usuario.rol) }}</td>
                                    <td @click="toggleCorreo(usuario)" style="cursor: pointer;">
                                        {{ usuario.mostrarCorreo ? usuario.correo : '● ● ● @ ● ●' }}
                                    </td>
                                    <td>{{ '● ● ● ●' }}</td>
                                    <td>
                                        <div class="botonesTabla">
                                            <Button class="btn-editar" @click="mostrarEditar(usuario.id)" title="Editar usuario">
                                                <i class="fa-solid fa-pen-to-square"></i>
                                            </Button>
                                            <Button class="btn-eliminar" @click="eliminarAdmin(usuario.numero_empleado)" title="Eliminar usuario">
                                                <i class="fa-solid fa-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </ContainerWhite>

        <AgregarAdministrador v-if="mostrarModal" @cancelar="mostrarModal = false" />
        <EditarAdministrador v-if="mostrarModalEditar" :admin="adminSeleccionado" @cancelar="mostrarModalEditar = false" />
        <Paginacion class="paginacion-fija" />
    </LayoutPrincipal>
</template>

<script>
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import ContainerWhite from "../layouts/ContainerWhite.vue";
import Button from "../components/Forms/Button.vue";
import Paginacion from "../components/Forms/Paginacion.vue";
import AgregarAdministrador from "../components/Administrador/AgregarAdministrador.vue";
import axios from 'axios';
import EditarAdministrador from "../components/Administrador/EditarAdministrador.vue";
import ModalExito from '../components/Modales/ModalExito.vue';
import ModalConfirmacion from '../components/Modales/ModalConfirmacion.vue';
import LoadScreenModal from "../components/Forms/LoadScreenModal.vue";

export default {
    components: {
        LayoutPrincipal,
        ContainerWhite,
        Button,
        Paginacion,
        AgregarAdministrador,
        EditarAdministrador,
        ModalExito,
        ModalConfirmacion,
        LoadScreenModal,
    },
    data() {
        return {
            searchText: "",
            usuarios_admin: [],
            mostrarModal: false,
            mostrarModalEditar: false,
            adminSeleccionado: null,
            mostrarModalConfirmacion: false,
            mostrarLoader: false,
            mostrarExito: false,
            numeroEmpleado: "",
            nombreAdmin: "",
        };
    },
    computed: {
        filteredList() {
            const searchTerm = this.searchText.toLowerCase();
            return this.usuarios_admin
                .filter((usuario) =>
                    usuario.nombre.toLowerCase().includes(searchTerm) ||
                    usuario.id.toString().includes(searchTerm)
                )
                .sort((a, b) => a.numero_empleado - b.numero_empleado);
        }
    },
    methods: {
        async obtenerAdministradores() {
            this.mostrarLoader = true;
            try {
                const start = Date.now();
                const response = await axios.get("http://192.168.21.18:5000/administradores");
                const data = response.data.map(usuario => ({
                    ...usuario,
                    mostrarCorreo: false,
                }));
                this.usuarios_admin = data;
                sessionStorage.setItem("administradores", JSON.stringify(data));
                const elapsed = Date.now() - start;
                const delay = Math.max(1300 - elapsed, 0);
                setTimeout(() => {
                    this.mostrarLoader = false;
                }, delay);
            } catch (error) {
                console.error("Error al obtener administradores", error);
                this.mostrarLoader = false;
            }
        },
        mostrarAddService() {
            this.mostrarModal = true;
        },
        cancelar() {
            this.mostrarModal = false;
        },
        formatearRol(rol) {
            switch (rol) {
                case 'ROLE_ADMIN':
                    return 'Admin';
                case 'ROLE_JEFE':
                    return 'Jefe';
                case 'ROLE_KIOSKO':
                    return 'Kiosko';
                case 'ROLE_DESARROLLADOR':
                    return 'Desarrollador';
                case 'ROLE_TESTER':
                    return 'Tester';
                case 'ROLE_RESIDENTE':
                    return 'Residente';
                default:
                    return rol;
            }
        },
        mostrarEditar(id) {
            console.log('ID seleccionado para editar:', id);
            const admin = this.usuarios_admin.find(u => u.id === id);
            if (admin) {
                this.adminSeleccionado = { ...admin };
                this.mostrarModalEditar = true;
            }
        },
        cancelarEditar() {
            this.mostrarModal = false;
        },
        SeleccionarAdmin(usuario) {
            this.adminSeleccionado = JSON.parse(JSON.stringify(usuario));
        },
        eliminarAdmin(NumeroEmpleado) {
            console.log("ID seleccionado para eliminar: ", NumeroEmpleado);
            this.adminSeleccionado = this.usuarios_admin.find(usu => usu.numero_empleado == NumeroEmpleado);
            this.mostrarModalConfirmacion = true;
            this.numeroEmpleado = NumeroEmpleado;

            const apellidoPaterno = this.adminSeleccionado.apellido_paterno !== 'No Apellido Paterno' ? this.adminSeleccionado.apellido_paterno : '';
            const apellidoMaterno = this.adminSeleccionado.apellido_materno !== 'No Apellido Materno' ? this.adminSeleccionado.apellido_materno : '';

            const nombreCompleto = `${this.adminSeleccionado.nombre} ${apellidoPaterno} ${apellidoMaterno}`.trim();

            this.nombreAdmin = nombreCompleto;
            console.log("Nombre del administrador seleccionado: ", nombreCompleto);
        },
        async eliminarUsuario() {
            try {
                this.mostrarModalConfirmacion = false;

                this.$nextTick(() => {
                    this.mostrarLoader = true;
                });

                setTimeout(async () => {
                    const response = await axios.delete(`http://localhost:5000/administradores/${this.numeroEmpleado}`);

                    if (response.status === 200) {
                        this.usuarios_admin = this.usuarios_admin.filter((usuario) => usuario.numero_empleado !== this.numeroEmpleado);

                        this.mostrarLoader = false;
                        this.mostrarExito = true;

                        setTimeout(() => {
                            this.mostrarExito = false;
                        }, 1500);
                    } else {
                        this.mostrarLoader = false;
                    }
                }, 1500);

            } catch (error) {
                console.error("Error al eliminar el administrador", error);
                this.mostrarLoader = false;
            }
        },
        cancelarEliminacion() {
            this.adminSeleccionado = null;
            this.mostrarModalConfirmacion = false;
        },
        toggleCorreo(usuario) {
            usuario.mostrarCorreo = !usuario.mostrarCorreo;
        },
    },
    mounted() {
        this.obtenerAdministradores();
    }
};
</script>

<style scoped>
.filtrosEmpleados {
    justify-content: space-between;
    display: flex;
    padding: 20px 20px 20px 50px;
    align-items: center;
}

.tituloModulo {
    font-size: 25px;
    color: #691c32;
    font-weight: bolder;
    font-style: italic;
}

.inputBuscador {
    width: 300px;
    height: 32px;
    border: 0px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    padding: 0px 10px;
    border-radius: 10px;
    margin-right: 20px;
    position: relative;
    z-index: 10;
}

.tablaPrincipal {
    width: 100%;
    overflow-x: auto;
    overflow-x: hidden;
}

.default {
    border-collapse: collapse;
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;
}

.cabecera {
    background: black;
    color: white;
}

.default td,
.default th {
    border: none;
    padding: 15px 12px;
    text-align: center;
}

.default tr:nth-child(even) {
    background-color: #f8f8f8;
}

.default th {
    background-color: black;
    color: #fff;
    font-size: 16px;
    letter-spacing: 1px;
}

.tbody {
    font-size: 14.5px;
}

.mensajeNoResultados {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #691c32;
    padding: 20px 0;
}

.contenedor-principal {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 120px);
}

.contenido-flex {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.paginacion-fija {
    margin-top: auto;
}

.container-white {
    height: calc(90vh - 100px);
}

.tabla-con-loader {
    position: relative;
}

.fila-loader {
    position: relative;
    height: 58vh;
}

.tabla-scrollable {
    max-height: 60vh;
    overflow-y: auto;
    border-radius: 5px;
    background: white;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead th {
    position: sticky;
    top: 0;
    background-color: #000; /* O el color de fondo del encabezado */
    color: white;
    z-index: 10;
}

/* Opcional: para mantener el thead fijo si quieres */
.tabla-scrollable table thead {
    position: sticky;
    top: 0;
    background-color: black;
    z-index: 1;
}

@media (max-width: 810px) {
    .default {
        border-collapse: collapse;
        border-radius: 10px;
        width: 100%;
        box-shadow: 0px 3px 6px #00000029;
        table-layout: auto;
        max-width: 100%;
    }

    .default td {
        padding: 10px 5px;
    }

    .default th {
        font-size: 13px;
        letter-spacing: 0px;
    }

    .tbody {
        font-size: 11px;
    }

    .tituloModulo {
        font-size: 20px;
    }

    .filtrosEmpleados {
        padding: 20px 20px 20px 20px;
    }

    .inputBuscador {
        width: 150px;
        margin-right: 10px;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
        z-index: 10;
        border: 0.5px solid #000000;
        border-radius: 18px;
    }

    .btn-agregar-cobaes {
        width: 23px;
        height: 23px;
        font-size: 10px;
        color: black;
        justify-content: center;
        text-align: center;
        display: flex;
        align-items: center;
    }

    .btn-editar {
        width: 23px;
        height: 23px;
        font-size: 10px;
        color: black;
        justify-content: center;
        text-align: center;
        display: flex;
        align-items: center;
    }

    .btn-eliminar {
        width: 23px;
        height: 23px;
        font-size: 10px;
        justify-content: center;
        text-align: center;
        display: flex;
        align-items: center;
    }

    .botonesTabla {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }

    .inputMovil {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
