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
                        <!-- Encabezado de la tabla -->
                        <thead>
                            <tr class="cabecera">
                                <th>No. Empleado</th>
                                <th>Nombre</th>
                                <th>Puesto</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <!-- Cuerpo de la tabla -->
                        <tbody>
                            <tr v-for="empleado in filteredList" :key="empleado.idUsuario">
                                <td>{{ empleado.idUsuario }}</td>
                                <td>{{ nombreCompleto(empleado) }}</td>
                                <td>{{ empleado.rol }}</td>
                                <td>{{ empleado.telefono }}</td>
                                <td>{{ empleado.correo }}</td>
                                <td>
                                    <div class="botonesTabla">
                                        <Button class="btn-editar"
                                            @click="mostrarEditar(empleado.idUsuario)">Editar</Button>
                                        <Button class="btn-eliminar"
                                            @click="eliminarEmpleado(empleado.idUsuario)">Eliminar</Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>
            <Paginacion></Paginacion>
        </ContainerWhite>
    </LayoutPrincipal>
</template>

<script>
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import ContainerWhite from "../layouts/ContainerWhite.vue";
import Button from "../components/Forms/Button.vue";
import Paginacion from "../components/Forms/Paginacion.vue";

export default {
    components: {
        LayoutPrincipal,
        ContainerWhite,
        Button,
        Paginacion,
    },
    data() {
        return {
            searchText: "", // Para la búsqueda
            empleados: [
                {
                    idUsuario: 1,
                    nombre: "Carlos Andrés Loaiza López",
                    rol: "Administrador",
                    telefono: "(667) 247-63-16",
                    correo: "carlos.loaiza@isssteesin.com",
                },
                {
                    idUsuario: 2,
                    nombre: "Ana García Luna Gonzalez",
                    rol: "Diseñadora",
                    telefono: "(667) 247-63-16",
                    correo: "ana.garcia@isssteesin.com",
                },
                {
                    idUsuario: 3,
                    nombre: "Mario Antonio Rubio Castañeda",
                    rol: "Gerente",
                    telefono: "(667) 247-63-16",
                    correo: "carlos.lopez@isssteesin.com",
                },
                {
                    idUsuario: 4,
                    nombre: "Maria Elena Ramirez Perez",
                    rol: "Soporte Técnico",
                    telefono: "(667) 247-63-16",
                    correo: "lucia.martinez@isssteesin.com",
                },

            ],
        };
    },
    computed: {
        filteredList() {
            return this.empleados.filter((empleado) => {
                const searchTerm = this.searchText.toLowerCase();
                return (
                    empleado.nombre.toLowerCase().includes(searchTerm) ||
                    empleado.idUsuario.toString().includes(searchTerm)
                );
            });
        },
    },
    methods: {
        nombreCompleto(empleado) {
            return empleado.nombre;
        },
        mostrarAddService() {
            console.log("Mostrar formulario para agregar empleado");
        },
        mostrarEditar(id) {
            console.log("Editar empleado con ID: ", id);
        },
        eliminarEmpleado(id) {
            this.empleados = this.empleados.filter((empleado) => empleado.idUsuario !== id);
            console.log("Empleado eliminado con ID: ", id);
        },
    },
};
</script>

<style scoped>
.proximamente {
    text-align: center;
    display: flex;
    color: #707070;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
}

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
    color: #000000;
    padding: 0px 7px;
    border-radius: 10px;
    margin-right: 20px;
}

.tablaPrincipal {
    justify-content: center;
    align-items: center;
    display: flex;
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

.default td a {
    color: #1abc9c;
    text-decoration: none;
    font-weight: bold;
}

.default td a:hover {
    text-decoration: underline;
}
</style>