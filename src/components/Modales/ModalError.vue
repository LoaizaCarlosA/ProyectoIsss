<template>
  <ModalBaseConfirmacion>
    <section class="contenedorPrincipal">
      <section>
        <div class="contenedorLogo">
          <img class="imgLogo" src="@/assets/images/ISSSTEESIN_HORIZONTAL.png" alt="" />
        </div>
        <div class="separador"></div>
      </section>
      <section class="contenedorImg">
        <img class="imgE" src="@/assets/images/error.png" alt="" />
      </section>
      <div class="titulo">{{ mensajeExito }}</div>
      <!--       <section class="contenedorBotones">
      </section> -->
    </section>
    <LoadScreen v-if="showAddProducto" @cerrar="ocultarAddProd"></LoadScreen>
  </ModalBaseConfirmacion>
</template>

<script>
import ModalBaseConfirmacion from "./ModalBaseConfirmacion.vue";
import LoadScreen from "../Forms/LoadScreen.vue";

export default {
  components: {
    ModalBaseConfirmacion,
    LoadScreen,
  },
  props: {
    mensajeExito: {
      type: String,
      default: "¡Ha ocurrido un error, intente de nuevo!",
    },
    mostrarExito: {
      type: Boolean,
      default: false
    },
    watch: {
      mostrarExito(newVal) {
        console.log("Modal de éxito: ", newVal ? "Abierto" : "Cerrado");
      }
    }
  },
  data() {
    return {
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
  },
};
</script>

<style scoped>
.contenido-modal {
  min-width: 500px !important;
}

.titulo {
  display: flex;
  justify-content: center;
  padding: 30px 0px 30px 0px;
  font-size: 23px;
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
}

.contenedorPrincipal {
  margin: 0px 30px;
}

.imgE {
  height: 120px;
}

.label {
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
  justify-content: center;
  max-width: 80%;
  margin: auto;
  padding: 30px 0px 20px;
}
</style>
