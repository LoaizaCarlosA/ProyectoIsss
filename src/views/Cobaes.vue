<template>
  <div id="app">
    <LayoutPrincipal>
      <ContainerWhite>
        <section class="filtrosEmpleados">
          <div class="tituloModulo">Lista de empleados COBAES</div>
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
                  <th>Nombre Completo</th>
                  <!--                   <th>Apellido Paterno</th>
                  <th>Apellido Materno</th> -->
                  <th>RFC</th>
                  <th>CURP</th>
                  <th>Plaza</th>
                  <th>Municipio</th>
                  <th>Banco</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="empleado in filteredList" :key="empleado.idUsuario">
                  <td>{{ empleado.idUsuario }}</td>
                  <td>{{ empleado.nombre }}</td>
                  <td>{{ empleado.RFC }}</td>
                  <td>{{ empleado.CURP }}</td>
                  <td>{{ empleado.Plaza }}</td>
                  <td>{{ empleado.Municipio }}</td>
                  <td>{{ empleado.Banco }}</td>
                  <td>
                    <div class="botonesTabla">
                      <Button class="btn-agregar-cobaes" @click="mostrarEditar(empleado.idUsuario)"
                        title="Agregar empleado">
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </Button>
                      <Button class="btn-editar" @click="mostrarEditar(empleado.idUsuario)" title="Editar empleado">
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
        <ExcelEditor />
      </ContainerWhite>
    </LayoutPrincipal>

  </div>
</template>

<script>
import ContainerWhite from "@/layouts/ContainerWhite.vue";
import ExcelEditor from '../views/ExcelEditor.vue';
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import Button from "../components/Forms/Button.vue";

export default {
  components: {
    ContainerWhite,
    ExcelEditor,
    LayoutPrincipal,
    Button,
  },
  data() {
    return {
      searchText: "",
      empleados: [
        { idUsuario: 10000, nombre: "BURGOS LASTRA SOLEDAD", RFC: "BULS530917TX3", CURP: "BULS530917MSLRSL09", Plaza: "24581", Municipio: "MAZATLAN", Banco: "BANCOMER" },
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
};
</script>

<style>
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
</style>



<!-- <template>
  <div>
    <h1>Prueba de conexión con el backend</h1>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">{{ usuario.nombre }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const usuarios = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/usuarios');
    usuarios.value = response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
});
</script>

<style>
.filtrosEmpleados {
    justify-content: space-between;
    display: flex;
    padding: 20px 20px 20px 50px;
    align-items: center;
}
</style>
 -->