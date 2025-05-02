<template>
    <LoadScreen v-if="mostrarLoader"></LoadScreen>
    <ModalExito v-show="mostrarExito" :mostrarExito="mostrarExito"></ModalExito>
    <ModalConfirmacion v-if="mostrarModalConfirmacion" @confirmar="eliminarUsuario" @cancelar="cancelarEliminacion"
        :nombreUsuario="nombreAdmin">
    </ModalConfirmacion>
    <LayoutPrincipal>
        <ContainerWhite>
            <section class="filtrosEmpleados">
                <div class="tituloModulo">Módulo Administrador</div>
                <div>
                    <input class="inputBuscador" type="text" v-model="searchText" placeholder="Inserte nombre o ID" />
                    <Button class="btn-agregar" @click="mostrarAddService">Agregar</Button>
                </div>
            </section>
            <section style="box-shadow: 0px 3px 6px #00000029;">
                <section class="tablaPrincipal">
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
                            <tr v-if="filteredList.length === 0">
                                <td colspan="8" class="mensajeNoResultados">No se encontraron resultados</td>
                            </tr>
                            <tr v-else v-for="usuario in filteredList" :key="usuario.id">
                                <td>{{ usuario.numero_empleado.toString().padStart(4, '0') }}</td>
                                <td>{{ usuario.nombre }}</td>
                                <td>{{ usuario.apellido_paterno === 'No Apellido Paterno' ? '-' :
                                    usuario.apellido_paterno }}</td>
                                <td>{{ usuario.apellido_materno === 'No Apellido Materno' ? '-' :
                                    usuario.apellido_materno }}</td>
                                <td>{{ formatearRol(usuario.rol) }}</td>
                                <td @click="toggleCorreo(usuario)" style="cursor: pointer;">
                                    {{ usuario.mostrarCorreo ? usuario.correo : '● ● ● @ ● ●' }}
                                </td>
                                <td>{{ "● ● ● ●" }}</td>
                                <td>
                                    <div class="botonesTabla">
                                        <Button class="btn-editar" @click="mostrarEditar(usuario.id)"
                                            title="Editar usuario">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button class="btn-eliminar" @click="eliminarAdmin(usuario.numero_empleado)"
                                            title="Eliminar usuario">
                                            <i class="fa-solid fa-trash"></i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>
        </ContainerWhite>
        <AgregarAdministrador v-if="mostrarModal" @cancelar="mostrarModal = false"></AgregarAdministrador>
        <EditarAdministrador v-if="mostrarModalEditar" :admin="adminSeleccionado"
            @cancelar="mostrarModalEditar = false"></EditarAdministrador>
        <Paginacion class="paginacion-fija"></Paginacion>

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
import LoadScreen from "@/components/Forms/LoadScreen.vue";

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
        LoadScreen,
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
                .sort((a, b) => a.numero_empleado - b.numero_empleado); // Aquí ordenas de menor a mayor
        }
    },
    methods: {
        async obtenerAdministradores() {
            try {
                const response = await axios.get("http://192.168.21.18:5000/administradores");
                const data = response.data.map(usuario => ({
                    ...usuario,
                    mostrarCorreo: false,
                }));

                this.usuarios_admin = data;
                sessionStorage.setItem("administradores", JSON.stringify(data));
            } catch (error) {
                console.error("Error al obtener administradores", error);
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

            // Verificar si los apellidos son "No Apellido Paterno" o "No Apellido Materno"
            const apellidoPaterno = this.adminSeleccionado.apellido_paterno !== 'No Apellido Paterno' ? this.adminSeleccionado.apellido_paterno : '';
            const apellidoMaterno = this.adminSeleccionado.apellido_materno !== 'No Apellido Materno' ? this.adminSeleccionado.apellido_materno : '';

            // Concatenar solo el nombre y los apellidos válidos
            const nombreCompleto = `${this.adminSeleccionado.nombre} ${apellidoPaterno} ${apellidoMaterno}`.trim();

            // Asignamos directamente a la propiedad nombreAdmin
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

                        this.mostrarLoader = false; // Apagar el loader antes de mostrar el éxito
                        this.mostrarExito = true;

                        // Ocultar el mensaje de éxito luego de 1.5 segundos
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
        if (!sessionStorage.getItem("administradores")) {
            this.obtenerAdministradores();
        } else {
            this.usuarios_admin = JSON.parse(sessionStorage.getItem("administradores"));
        }
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
    /* Asegura que el shadow se vea correctamente */
    z-index: 10;
    /* Coloca el input por encima de otros elementos si es necesario */
}

.tablaPrincipal {
    width: 100%;
    overflow-x: auto;
    overflow-x: hidden;
    /*   display: flex;
  justify-content: center;
  align-items: center; */
}

.default {
    border-collapse: collapse;
    /*     border-radius: 10px; */
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;
    /*     table-layout: fixed; */
    /* Muy importante: fuerza a las columnas a respetar el ancho */


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
    /* Ajusta según el alto de tus menús */
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

@media (max-width: 810px) {
    .default {
        border-collapse: collapse;
        border-radius: 10px;
        width: 100%;
        box-shadow: 0px 3px 6px #00000029;
        table-layout: auto;
        /* o 'fixed' si quieres uniformidad */
        max-width: 100%;
        /*         word-wrap: break-word; */
        /*         word-break: break-word; */
    }

    /*   .default td,
  .default th {
    white-space: normal;
    word-break: break-word;
    overflow-wrap: anywhere;
  } */

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
        /* Sombra más visible */
        z-index: 10;
        /* Asegura que el shadow esté visible */
        border: 0.5px solid #000000;
        border-radius: 18px;

        /*     border: 1px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 10px; */
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

/* @media (max-width: 768px) {
    .menu-item span {
        font-size: 13px;
    }

    .container-menu.active {
        width: 135px;
    }

    .filtrosEmpleados {
        padding: 20px;
    }

    .inputBuscador {
        width: 180px;
    }

    .tablaPrincipal {
        justify-content: normal;
    }

    .tituloModulo {
        font-size: 20px;
    }

    .inputBuscador {
        width: 145px;
        margin-right: 12px;
    }

    .btn-agregar {
        width: 90px;
    }
} */
</style>
