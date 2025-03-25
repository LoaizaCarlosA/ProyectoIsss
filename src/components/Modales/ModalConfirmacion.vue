<template>
  <ModalBaseConfirmacion >
    <section class="contenedorPrincipal">
      <section>
        <div class="contenedorLogo">
          <img class="imgLogo" src="@/assets/images/ISSSTEESIN_HORIZONTAL.png" alt="" />
        </div>
        <div class="separador"></div>
      </section>
      <div class="titulo">
        <div class="mensajeEliminar">
          {{ mensajeExito }}
        </div>
        <div class="NombreUsuario">
          <strong v-if="nombreUsuario"> {{ nombreUsuario }}<span class="signoInt">?</span></strong>
        </div>

      </div>
      <section class="contenedorBotones">
        <Button class="btn-regresar" @click="cancelar">Cancelar</Button>
        <Button class="btn-confirmar-eliminar" @click="eliminarUsuario">Confirmar</Button>
      </section>
    </section>
    <LoadScreen v-if="showAddProducto" @cerrar="ocultarAddProd"></LoadScreen>
  </ModalBaseConfirmacion>
</template>

<script>
import ModalBaseConfirmacion from "./ModalBaseConfirmacion.vue";
import LoadScreen from "../Forms/LoadScreen.vue";
import Button from "../Forms/Button.vue";

export default {
  components: {
    ModalBaseConfirmacion,
    LoadScreen,
    Button,
  },
  props: {
    mensajeExito: {
      type: String,
      default: "¿Está seguro que desea eliminar a: ",
    },
    nombreUsuario: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: [],

      showAddProducto: false,
    };
  },
  emits: ["cancelar"],
  methods: {
    mostrarAddService() {
      this.showAddProducto = true;
    },
    ocultarAddProd() {
      this.showAddProducto = false;
    },
    cancelar() {
      this.$emit("cancelar");
    },
    eliminarUsuario() {
      // Solo emite el evento para que el padre lo controle TODO
      this.$emit("cerrarModal");
      this.$emit("confirmar");
    },
  },
};
</script>

<style scoped>
.contenido-modal {
  min-width: 500px !important;
}

.titulo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 23px;
  align-items: center;
}

.contenedorLogo {
  justify-content: center;
  display: flex;
  padding: 30px 0px 10px;
}

.imgLogo {
  height: 40px;
}

.separador {
  border-top: 3px solid #691c32;
  height: 2px;
  max-width: 100%;
  padding: 0;
  /* margin: 20px auto 0 auto; */
  margin-top: 5px;
  margin-bottom: 30px;
}

.contenedorImg {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px 5px;
}

.contenedorPrincipal {
  margin: 0px 30px;
}

.imgE {
  height: 200px;
}

.label {
  /* font-weight: 500; */
  margin: 17px 0px 5px;
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
  justify-content: space-evenly;
  max-width: 80%;
  margin: auto;
  padding: 30px 0px 30px;
}

.NombreUsuario {
  font-style: italic;
  color: #691c32;
}

.signoInt {
  color: #000000;
  font-style: normal;
  font-weight: 100;
}
</style>