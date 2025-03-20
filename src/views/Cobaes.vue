<template>
  <div id="app">
    <LayoutPrincipal>
      <ContainerWhite>
        <section class="filtrosEmpleados">
          <div class="tituloModulo">Lista de empleados COBAES</div>
          <div>
            <input class="inputBuscador" type="text" v-model="searchText"
              placeholder="Inserte nombre o número de empleado" />
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
                  <th>RFC</th>
                  <th>CURP</th>
                  <th>Plaza</th>
                  <th>Municipio</th>
                  <th>Banco</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody class="tbody">
                <tr v-for="(item, index) in filteredList" :key="index">
                  <td>{{ item.Numemp }}</td>
                  <td>{{ item.Nombre_Completo }}</td>
                  <td>{{ item.RFC }}</td>
                  <td>{{ item.CURP }}</td>
                  <td>{{ item.Plaza }}</td>
                  <td>{{ item.Municipio }}</td>
                  <td>{{ item.Banco }}</td>
                  <td>
                    <div class="botonesTabla">
                      <Button class="btn-agregar-cobaes" @click="; mostrarEmpleado(item.Numemp)" title="Ver detalles">
                        <i class="fa-solid fa-magnifying-glass"></i>
                      </Button>
                      <Button class="btn-editar" @click="mostrarEditar(empleado.idUsuario)" title="Editar empleado">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </Button>
                      <Button class="btn-eliminar" @click="eliminarEmpleado(item.Numemp)" title="Eliminar empleado">
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
        <Paginacion></Paginacion>
      </ContainerWhite>
      <AgregarEmpleadosCobaes v-if="mostrarModal" @cancelar="mostrarModal = false"></AgregarEmpleadosCobaes>
      <TablaAgregarEmpleadosCobaes v-show="mostrarModalTabla" @cancelar="mostrarModalTabla = false"
      :empleado="empleado">
      </TablaAgregarEmpleadosCobaes>
    </LayoutPrincipal>

  </div>
</template>

<script>
import axios from 'axios';
import ContainerWhite from "@/layouts/ContainerWhite.vue";
import ExcelEditor from '../views/ExcelEditor.vue';
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import Button from "../components/Forms/Button.vue";
import Paginacion from "../components/Forms/Paginacion.vue";
import AgregarEmpleadosCobaes from "../components/Empleados/AgregarEmpleadosCobaes.vue";
import TablaAgregarEmpleadosCobaes from '../components/Empleados/TablaAgregarEmpleadosCobaes.vue';


export default {
  components: {
    ContainerWhite,
    ExcelEditor,
    Paginacion,
    LayoutPrincipal,
    Button,
    AgregarEmpleadosCobaes,
    TablaAgregarEmpleadosCobaes,
  },
  data() {
    return {
      data: [], // Inicializamos el estado donde almacenaremos los datos
      searchText: "",
      mostrarModal: false,
      mostrarModalTabla: false,
      empleado: null,
      empleadoSeleccionado: null,
    };
  },
  mounted() {
    axios.get('http://localhost:5000/empleados')
      .then(response => {
        this.data = response.data;
        console.log("Datos recibidos del backend:", this.data); // 👈 Verifica si hay datos
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  },
  computed: {
    filteredList() {
      const searchTerm = this.searchText.toLowerCase();
      return this.data.filter((item) =>
        item.Nombre_Completo.toLowerCase().includes(searchTerm) ||
        item.Numemp.toString().includes(searchTerm) ||
        item.RFC.toLowerCase().includes(searchTerm) ||
        item.CURP.toLowerCase().includes(searchTerm)
      );
    }
  },
  methods: {
    mostrarAddService() {
      this.mostrarModal = true;
    },
    eliminarEmpleado(id) {
      this.data = this.data.filter((item) => item.Numemp !== id);
      console.log("Empleado eliminado con ID: ", id);
    },
    mostrarTablaService() {
      this.mostrarModalTabla = true;
    },
    /*     mostrarEmpleado(Numemp) {
          this.mostrarModalTabla = true;
          this.$emit('mostrar-empleado', Numemp); // Emite el evento al componente padre
        }, */
/*     mostrarEmpleado(Numemp) {
      console.log("Clic en lupa", Numemp);

      // Encontrar el empleado
      const empleadoSeleccionado = this.data.find(item => item.Numemp.toString() === Numemp.toString());
      console.log("Empleado seleccionado:", empleadoSeleccionado);

      if (empleadoSeleccionado) {
        // Usar $set para asegurarse de que la reactividad se mantenga
        this.empleado = { ...empleadoSeleccionado }; // Crea una copia nueva para asegurar la reactividad
        this.mostrarModalTabla = true;
      } else {
        console.error("Empleado no encontrado");
      }
    }, */
    seleccionarEmpleado(empleado) {
      console.log("Empleado seleccionado:", empleado);
      this.empleadoSeleccionado = JSON.parse(JSON.stringify(empleado)); // 🔥 Convierte el Proxy en objeto normal
    },
    mostrarEmpleado(Numemp) {
    console.log("Clic en lupa", Numemp);
    this.empleado = this.data.find(item => item.Numemp.toString() === Numemp.toString());
    console.log("Empleado seleccionado:", this.empleado);

    if (this.empleado) {
      this.mostrarModalTabla = true;
      this.empleado = JSON.parse(JSON.stringify(this.empleado)); // 🔥 Forzar reactividad
    } else {
      console.error("Empleado no encontrado");
    }
  },
  }
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
  padding: 0px 10px;
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

.tbody {
  font-size: 14.5px;
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