<template>
    <LayoutPrincipal>
        <ContainerWhite>
            <section class="filtrosEmpleados">
                <div class="tituloModulo">Lista de empleados</div>
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
                                <th>Puesto</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="empleado in filteredList" :key="empleado.idUsuario">
                                <td>{{ empleado.idUsuario }}</td>
                                <td>{{ empleado.nombre }}</td>
                                <td>{{ empleado.apellPa }}</td>
                                <td>{{ empleado.apellMa }}</td>
                                <td>{{ empleado.rol }}</td>
                                <td>{{ empleado.telefono }}</td>
                                <td>{{ empleado.correo }}</td>
                                <td>
                                    <div class="botonesTabla">
                                        <Button class="btn-editar" @click="mostrarEditar(empleado.idUsuario)"
                                            title="Editar empleado">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                        <Button class="btn-eliminar" @click="eliminarEmpleado(empleado.idUsuario)"
                                            title="Eliminar empleado">
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
        <!-- Modal de agregar empleado -->
        <AgregarEmpleados v-if="mostrarModal" @cancelar="mostrarModal = false"></AgregarEmpleados>
    </LayoutPrincipal>
</template>

<script>
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import ContainerWhite from "@/layouts/ContainerWhite.vue";
import Button from "../components/Forms/Button.vue";
import Paginacion from "../components/Forms/Paginacion.vue";
import AgregarEmpleados from "../components/Empleados/AgregarEmpleados.vue";

export default {
    components: {
        LayoutPrincipal,
        ContainerWhite,
        Button,
        Paginacion,
        AgregarEmpleados
    },
    data() {
        return {
            searchText: "",
            empleados: [
                { idUsuario: 4955, nombre: "Carlos Andrés", apellPa: "Loaiza", apellMa: "López", rol: "Administrador", telefono: "(667) 247-63-16", correo: "carlos.loaiza@isssteesin.com" },
                { idUsuario: 5001, nombre: "Ana María", apellPa: "Guerrero", apellMa: "Vidales", rol: "Diseñadora", telefono: "(667) 247-63-16", correo: "ana.garcia@isssteesin.com" },
                { idUsuario: 4205, nombre: "Mario Antonio", apellPa: "Pérez", apellMa: "Solís", rol: "Gerente", telefono: "(667) 247-63-16", correo: "marco.perez@isssteesin.com" },
                { idUsuario: 3665, nombre: "Maria Elena", apellPa: "Hernández", apellMa: "Rodríguez", rol: "Soporte Técnico", telefono: "(667) 247-63-16", correo: "maria.hernandez@isssteesin.com" },
            ],
            mostrarModal: false
        };
    },
    computed: {
        filteredList() {
            const searchTerm = this.searchText.toLowerCase();
            return this.empleados.filter((empleado) =>
                empleado.nombre.toLowerCase().includes(searchTerm) || empleado.idUsuario.toString().includes(searchTerm)
            );
        }
    },
    methods: {
        mostrarAddService() {
            this.mostrarModal = true;
        },
        cancelar() {
            this.mostrarModal = false;
        },
        registrarEmpleado() {
            const nuevoEmpleado = {
                idUsuario: Date.now(),
                nombre: this.nombre,
                apellPa: this.apellidoPaterno,
                apellMa: this.apellidoMaterno,
                rol: this.rol,
                telefono: this.telefono,
                correo: this.correo,
            };
            this.empleados.push(nuevoEmpleado);
            this.cancelar();
        },
        mostrarEditar(id) {
            console.log("Editar empleado con ID: ", id);
        },
        eliminarEmpleado(id) {
            this.empleados = this.empleados.filter((empleado) => empleado.idUsuario !== id);
            console.log("Empleado eliminado con ID: ", id);
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
    padding: 12px 15px;
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
</style>
