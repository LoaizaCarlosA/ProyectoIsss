<template>
  <LoadScreen v-if="mostrarLoader"></LoadScreen>
  <ModalExito v-show="mostrarExito" :mostrarExito="mostrarExito"></ModalExito>
  <ModalConfirmacion v-if="mostrarModalConfirmacion" @confirmar="confirmarEliminacion" @cancelar="cancelarEliminacion"
    :nombreUsuario="empleadoSeleccionado ? empleadoSeleccionado.Nombre_Completo : ''">
  </ModalConfirmacion>
  <LoadScreen v-if="mostrandoLoader" />
  <div id="app">
    <LayoutPrincipal>
      <ContainerWhite>
        <section class="filtrosEmpleados">
          <div class="tituloModulo">Lista de empleados COBAES</div>
          <div class="inputMovil">
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
                  <!--                   <th>Plaza</th> -->
                  <th>Municipio</th>
                  <th>Banco</th>
                  <th>
                    <i class="fa-solid fa-list"></i>
                  </th>
                </tr>
              </thead>
              <tbody class="tbody">
                <template v-if="filteredList.length > 0">
                  <tr v-for="(item, index) in empleadosPaginados" :key="index">
                    <td>{{ item.Numemp }}</td>
                    <td>{{ item.Nombre_Completo }}</td>
                    <td>{{ item.RFC }}</td>
                    <td>{{ item.CURP }}</td>
                    <td>{{ item.Municipio }}</td>
                    <td>{{ item.Banco }}</td>
                    <td>
                      <div class="botonesTabla">
                        <Button class="btn-agregar-cobaes" @click="mostrarEmpleado(item.Numemp)" title="Ver detalles">
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </Button>
                        <!--                         <Button class="btn-editar" @click="mostrarEditar(empleado.idUsuario)" title="Editar empleado">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </Button> -->
                        <Button class="btn-eliminar" @click="eliminarEmpleado(item.Numemp)" title="Eliminar empleado">
                          <i class="fa-solid fa-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="7" class="mensajeNoResultados">No se encontraron empleados.</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </section>
        </section>
        <ExcelEditor />
        <Paginacion :total="totalPaginas" :paginaActualEntrada="paginaActual" @changePagina="cambiarPagina" />


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
import ContainerWhite from "../layouts/ContainerWhite.vue";
import ExcelEditor from '../views/ExcelEditor.vue';
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import Button from "../components/Forms/Button.vue";
import Paginacion from "../components/Forms/Paginacion.vue";
import AgregarEmpleadosCobaes from "../components/Empleados/AgregarEmpleadosCobaes.vue";
import TablaAgregarEmpleadosCobaes from '../components/Empleados/TablaAgregarEmpleadosCobaes.vue';
import LoadScreen from '../components/Forms/LoadScreen.vue';
import ModalExito from '../components/Modales/ModalExito.vue';
import ModalConfirmacion from '../components/Modales/ModalConfirmacion.vue';

export default {
  components: {
    ContainerWhite,
    ExcelEditor,
    Paginacion,
    LayoutPrincipal,
    Button,
    AgregarEmpleadosCobaes,
    TablaAgregarEmpleadosCobaes,
    ModalExito,
    ModalConfirmacion,
    LoadScreen,

  },
  data() {
    return {
      data: [],
      empleadosPorPagina: 50,  // Número de empleados por página
      paginaActual: 1,  // Página actual
      searchText: "",
      mostrarModal: false,
      mostrarModalTabla: false,
      empleado: null,
      empleadoSeleccionado: null,
      mostrarModalConfirmacion: false,
      empleadoAEliminar: null,
      mostrarModalEliminar: false,
      mostrandoLoader: false,
      usuarioSeleccionado: "",
      mostrarExito: false,
    };
  },
  mounted() {
    axios.get('http://localhost:5000/empleados')
      .then(response => {
        this.data = response.data;
        console.log("Datos recibidos del backend:", this.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  },
  computed: {
    filteredList() {
      if (!Array.isArray(this.data)) return [];
      const searchTerm = this.searchText.toLowerCase();
      const mapaUnico = new Map();
      this.data.forEach((item) => {
        const clave = item.Numemp.toString();
        if (!mapaUnico.has(clave)) {
          mapaUnico.set(clave, item);
        }
      });

      return Array.from(mapaUnico.values()).filter((item) =>
        item.Nombre_Completo.toLowerCase().includes(searchTerm) ||
        item.Numemp.toString().includes(searchTerm) ||
        item.RFC.toLowerCase().includes(searchTerm) ||
        item.CURP.toLowerCase().includes(searchTerm)
      );
    },
    empleadosPaginados() {
      if (!this.filteredList || this.filteredList.length === 0) {
        return []; // Devuelve una lista vacía si no hay datos
      }

      const start = (this.paginaActual - 1) * this.empleadosPorPagina;
      const end = start + this.empleadosPorPagina;

      return this.filteredList.slice(start, end);
    },
    totalPaginas() {
      return Math.ceil(this.filteredList.length / this.empleadosPorPagina);
    }
  },
  methods: {
    mostrarAddService() {
      this.mostrarModal = true;
    },
    mostrarTablaService() {
      this.mostrarModalTabla = true;
    },
    seleccionarEmpleado(empleado) {
      this.empleadoSeleccionado = JSON.parse(JSON.stringify(empleado));
    },
    mostrarEmpleado(Numemp) {
      this.empleado = this.data.find(item => item.Numemp.toString() === Numemp.toString());
      if (this.empleado) {
        this.mostrarModalTabla = true;
        this.empleado = JSON.parse(JSON.stringify(this.empleado));
      } else {
        console.error("Empleado no encontrado");
      }
    },
    eliminarEmpleado(id) {
      this.empleadoSeleccionado = this.data.find(empleado => empleado.Numemp === id);
      this.mostrarModalConfirmacion = true;
    },
    confirmarEliminacion() {
      this.mostrarModalConfirmacion = false;
      this.$nextTick(() => {
        this.mostrandoLoader = true;
        setTimeout(() => {
          this.data = this.data.filter((item) => item.Numemp !== this.empleadoSeleccionado.Numemp);
          this.empleadoSeleccionado = null;
          this.mostrandoLoader = false;
          this.mostrarExito = true;
          console.log("Modal de éxito mostrado");
          setTimeout(() => {
            console.log("Ocultando el modal de éxito");
            this.mostrarExito = false;
          }, 2300);
        }, 1500);  // Simula el tiempo de la operación
      });
    },
    cancelarEliminacion() {
      this.empleadoSeleccionado = null;
      this.mostrarModalConfirmacion = false;
    },
    eliminarUsuario() {
      this.mostrandoLoader = true;
      // Simula una espera, o realiza llamada API real
      setTimeout(() => {
        // Aquí va la lógica para eliminar el usuario
        this.mostrandoLoader = false;
        // Opcional: mostrar notificación de éxito
      }, 1500);
    },
    cambiarPagina(nuevaPagina) {
      if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
        this.paginaActual = nuevaPagina;  // Actualiza la página en la vista principal
      }
    },
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
  /*   display: flex;
  justify-content: center;
  align-items: center; */
}

.default {
  border-collapse: collapse;
/*   border-radius: 10px; */
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

@media (max-width: 810px) {
  .default {
    border-collapse: collapse;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;
    table-layout: auto;
    /* o 'fixed' si quieres uniformidad */
    max-width: 100%;
    word-wrap: break-word;
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
</style>