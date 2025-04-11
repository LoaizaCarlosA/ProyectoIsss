<template>
    <LayoutPrincipal>
        <ContainerWhite>
            <section class="filtrosEmpleados">
                <div class="tituloModulo">Módulo Administrador</div>
                <div>
                    <input class="inputBuscador" type="text" v-model="searchText" placeholder="Inserte nombre o ID" />
                    <Button class="btn-agregar" @click="mostrarAddService">Agregar</Button>
                </div>
            </section>
            <section>
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
                        <tbody>
                            <tr v-for="usuario in filteredList" :key="usuario.id">
                                <td>{{ usuario.numero_empleado.toString().padStart(4, '0') }}</td>
                                <td>{{ usuario.nombre }}</td>
                                <td>{{ usuario.apellido_paterno }}</td>
                                <td>{{ usuario.apellido_materno }}</td>
                                <td>{{ formatearRol(usuario.rol) }}</td>
                                <td>{{ usuario.correo }}</td>
                                <td>{{ "● ● ● ● ● ● ●" }}</td>
                                <td>
                                    <div class="botonesTabla">
                                        <Button class="btn-editar" @click="mostrarEditar(usuario.id)"
                                            title="Editar usuario">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button class="btn-eliminar" @click="eliminarUsuario(usuario.numero_empleado)"
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
            <Paginacion></Paginacion>
        </ContainerWhite>
        <AgregarAdministrador v-if="mostrarModal" @cancelar="mostrarModal = false"></AgregarAdministrador>
        <EditarAdministrador v-if="mostrarModalEditar" :admin="adminSeleccionado"
            @cancelar="mostrarModalEditar = false"></EditarAdministrador>
    </LayoutPrincipal>
</template>

<script>
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import ContainerWhite from "@/layouts/ContainerWhite.vue";
import Button from "../components/Forms/Button.vue";
import Paginacion from "../components/Forms/Paginacion.vue";
import AgregarAdministrador from "../components/Administrador/AgregarAdministrador.vue";
import axios from 'axios';
import EditarAdministrador from "@/components/Administrador/EditarAdministrador.vue";

export default {
    components: {
        LayoutPrincipal,
        ContainerWhite,
        Button,
        Paginacion,
        AgregarAdministrador,
        EditarAdministrador
    },
    data() {
        return {
            searchText: "",
            usuarios_admin: [],
            mostrarModal: false,
            mostrarModalEditar: false,
            adminSeleccionado: null,
        };
    },
    computed: {
        filteredList() {
            const searchTerm = this.searchText.toLowerCase();
            return this.usuarios_admin.filter((usuario) =>
                usuario.nombre.toLowerCase().includes(searchTerm) || usuario.id.toString().includes(searchTerm)
            );
        }
    },
    methods: {
        async obtenerAdministradores() {
            console.log("Usuarios admin:", this.usuarios_admin);

            try {
                const response = await axios.get("http://localhost:5000/administradores"); // Asegúrate de que la URL sea correcta
                console.log(response.data);
                this.usuarios_admin = response.data;
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
                    return 'Administrador';
                case 'ROLE_USER':
                    return 'Usuario';
                case 'ROLE_AUXILIAR':
                    return 'Auxiliar';
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
        async eliminarUsuario(numeroEmpleado) {
            try {
                // Enviar la solicitud DELETE al backend usando el numero_empleado
                const response = await axios.delete(`http://localhost:5000/administradores/${numeroEmpleado}`);
                if (response.status === 200) {
                    // Si la eliminación es exitosa, actualizamos la lista de usuarios
                    this.usuarios_admin = this.usuarios_admin.filter((usuario) => usuario.numero_empleado !== numeroEmpleado);
                    console.log("Administrador eliminado con éxito", numeroEmpleado);
                }
            } catch (error) {
                console.error("Error al eliminar el administrador", error);
            }
        }
    },
    mounted() {
        this.obtenerAdministradores(); // Al montar el componente, obtener los administradores
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
    padding: 0px 7px;
    border-radius: 10px;
    margin-right: 20px;
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

.cabecera {
    background: black;
    color: white;
}

.default td,
.default th {
    border: none;
    padding: 15px 12px;
    /*     padding: 12px 15px; */
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

@media (max-width: 768px) {
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
}
</style>
